import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  // You can add properties here to dynamically bind data,
  // for example, if the links or contact info came from a service.
  contactEmail = 'business@youdingapp.com';
}