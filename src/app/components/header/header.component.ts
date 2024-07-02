import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CartComponent,
    CartComponent,
    CommonModule,
    CurrencyPipe,
    RouterLinkWithHref,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  private categoriesService = inject(CategoriesService);

  categories = signal<Category[]>([]);

  cart = this.cartService.perfumes;
  total = this.cartService.total;

  sidebarShowctrl = new FormControl(false);
  toggleSidebar() {
    this.sidebarShowctrl.setValue(!this.sidebarShowctrl.value);
  }

  hideCart = signal(false);

  toggleShowCart() {
    this.hideCart.update((prevState) => !prevState);
  }

  async ngOnInit() {
    await new Promise<void>((resolve) => {
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.categories.set(data);
          resolve();
        },
        error: (err) => {
          console.error('Error fetching category:', err);
          resolve();
        }
      });
    });
  }
}
