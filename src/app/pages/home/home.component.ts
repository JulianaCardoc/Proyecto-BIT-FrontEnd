import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Perfume } from '../../models/perfume.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    CurrencyPipe,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  categories = signal<Category[]>([]);
  perfumesOnSale = signal<Perfume[]>([]);

  async ngOnInit() {
    await new Promise<void>((resolve) => {
      this.productsService.getProducts('true', undefined, '3').subscribe({
        next: (data) => {
          this.perfumesOnSale.set(data);
          resolve();
        },
      });
    });
    await new Promise<void>((resolve) => {
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.categories.set(data);
          resolve();
        },
        error: (err) => {
          console.error('Error fetching category:', err);
          resolve();
        },
      });
    });
  }
}
