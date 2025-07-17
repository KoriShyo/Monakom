import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
  HostBinding,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {

  /* ──────────────
     Your own state
     ────────────── */
  isMenuOpen = false;

  /* ──────────────────────────────────
     Scroll handler state and bindings
     ────────────────────────────────── */
  private lastScroll = 0;
  private scrollTimeout: any = null;
  private isScrolling = false;

  @HostBinding('class.navbar--hidden')
  public isHidden = false;

  // Navigation items for template iteration
  navItems = [
    { label: 'Home', section: 'home', href: '#hero' },
    { label: 'Pricing', section: 'pricing', href: '#pricing' },
    { label: 'Features', section: 'feature', href: '#feature' },
    { label: 'About', section: 'about', href: '#about' },
    { label: 'Contact', section: 'contact', href: '#contact' }
  ];

  // Track the currently active section
  activeSection = 'home';

  constructor() {}

  ngOnInit(): void {
    // Initialize any early setup here
  }

  /**
   * Listen to the window's scroll event. No arguments needed.
   */
  @HostListener('window:scroll')
  public onWindowScroll(): void {
    // Clear existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Set a new timeout to throttle scroll events
    this.scrollTimeout = setTimeout(() => {
      this.handleScroll();
    }, 10); // 10ms throttle
  }

  /**
   * Handle scroll logic with improved performance
   */
  private handleScroll(): void {
    // This method is no longer needed as activeSection is handled by Angular bindings
    // The logic for hiding/showing navbar based on scroll position is removed
    // as the navbar is now hidden/shown based on the 'isHidden' binding.
    // The scroll handler is primarily for the smooth scroll functionality.
  }

  /**
   * Handle window resize events
   */
  @HostListener('window:resize')
  public onWindowResize(): void {
    // Close mobile menu on resize
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  /**
   * Handle escape key press to close mobile menu
   */
  @HostListener('document:keydown.escape')
  public onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  // Remove navButtons and handleNavClick as they are no longer needed

  /**
   * Smooth scroll to a section
   */
  private smoothScrollToSection(targetId: string | undefined): void {
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Close mobile menu before scrolling
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
      
      // Calculate offset for fixed navbar
      const navbarHeight = this.isHidden ? 0 : 64; // Adjust based on your navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  ngAfterViewInit(): void {
    // grab the buttons once the template is in the DOM
    // The navButtons and handleNavClick logic is removed as active state is handled by Angular bindings.
  }

  ngOnDestroy(): void {
    // clean‑up to avoid leaks when the component is destroyed
    // The navButtons and handleNavClick listeners are removed.

    // Clear any pending timeouts
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  /* ──────────────────
     Your existing API
     ────────────────── */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Close mobile menu (useful for template)
   */
  closeMobileMenu(): void {
    this.isMenuOpen = false;
  }

  onNavClick(section: string): void {
    this.activeSection = section;
    // TODO: add real routing logic here
  }

  onCallSales(): void {
    window.location.href = 'tel:+16172971005';
  }

  onLogin(): void {
    console.log('Login clicked');
    // TODO: login logic here
    // Example: this.router.navigate(['/login']);
  }

  onGetDemo(): void {
    console.log('Get a Demo clicked');
    // TODO: demo request logic here
    // Example: this.router.navigate(['/demo']);
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    console.log('Language switched to:', select.value);
    // TODO: language‑switching logic here
    // Example: this.translateService.use(select.value);
  }

  /**
   * Handle mobile menu overlay click
   */
  onOverlayClick(event: MouseEvent): void {
    // Close menu when clicking overlay (but not the menu itself)
    if (event.target === event.currentTarget) {
      this.isMenuOpen = false;
    }
  }

  /**
   * Prevent event propagation for mobile menu content
   */
  onMenuContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}