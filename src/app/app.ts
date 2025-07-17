import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Ensure all these are importing standalone components
import { Navbar } from './components/navbar/navbar';
import {Footer} from './components/footer/footer';
import {Pricing} from './components/pricing/pricing';
import {HeroSection} from './components/hero-section/hero-section';
import {ContactUsComponent} from './components/demo/demo';
import {Feature} from './components/feature/feature';
import { Addon } from './components/addon/addon';
import {AboutUs} from './components/abou-us/abou-us';
// import {TeamSectionComponent} from './components/leader/leader';
import {Customer} from './components/customer/customer';

// ... keep your other imports

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    Navbar,
    HeroSection,
    Pricing,
    ContactUsComponent,
    Feature,
    Addon,
    Footer,
    AboutUs,
    Customer,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
