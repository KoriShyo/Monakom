// contact-us.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './demo.html',
  styleUrls: ['./demo.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  loading = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  webhookUrl: string = 'https://script.google.com/macros/s/AKfycbxRdjQEcdIRnm9fNtwOLycehC5c_TOpP8gdyqSPtfxW/exec';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[\d\s\-\(\)]+$/)]],
      restaurantName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (!this.webhookUrl || this.webhookUrl.includes('REPLACE_WITH')) {
      this.submitError = true;
      this.errorMessage = 'Please configure the webhook URL in the component.';
      return;
    }

    this.loading = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    const formData = {
      firstName: this.contactForm.value.firstName?.trim(),
      lastName: this.contactForm.value.lastName?.trim(),
      phone: this.contactForm.value.phone?.trim(),
      restaurantName: this.contactForm.value.restaurantName?.trim(),
      email: this.contactForm.value.email?.trim().toLowerCase(),
      message: this.contactForm.value.message?.trim(),
    };

    // 🛠️ Use text/plain to bypass CORS issues
    this.http.post(this.webhookUrl, JSON.stringify(formData), {
      headers: {
        'Content-Type': 'text/plain',
      },
      responseType: 'text', // important for Google Apps Script
    }).subscribe({
      next: (response: any) => {
        console.log('✅ Form submitted successfully:', response);
        this.submitSuccess = true;
        this.contactForm.reset();
        this.loading = false;
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (err) => {
        console.error('❌ Error submitting form:', err);
        this.submitError = true;
        this.loading = false;
        if (err.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else if (err.status === 403) {
          this.errorMessage = 'Access denied. Please contact support.';
        } else if (err.status >= 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        setTimeout(() => {
          this.submitError = false;
          this.errorMessage = '';
        }, 8000);
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${minLength} characters.`;
      }
      if (field.errors['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must not exceed ${maxLength} characters.`;
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid phone number.';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone',
      restaurantName: 'Restaurant name',
      email: 'Email',
      message: 'Message',
    };
    return displayNames[fieldName] || fieldName;
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';
  }

  getFormSummary(): any {
    return {
      valid: this.contactForm.valid,
      errors: this.getFormErrors(),
      values: this.contactForm.value,
    };
  }

  private getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
}
