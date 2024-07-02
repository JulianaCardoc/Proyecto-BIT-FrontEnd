import { Component, Input, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Perfume } from '../../models/perfume.model';
import { RouterLinkWithHref } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    RouterLinkWithHref,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);

  perfumes = signal<Perfume[]>([]);
  category = signal<Category | null>(null);

  @Input() categoryId?: string;

  ngOnInit() {
    this.filterAdmin(this.categoryId);
  }

  ngOnChanges() {
    this.filterAdmin(this.categoryId);
    if (this.categoryId && this.categoryId != 'onSale') {
      this.getCategory();
    }
    console.log(this.categoryId, typeof this.categoryId)
  }

  async filterAdmin(category?: string) {
    if (category === 'onSale') {
      await new Promise<void>((resolve) => {
        this.productsService
          .getProducts('true', undefined, undefined, undefined)
          .subscribe({
            next: (data) => {
              this.perfumes.set(data);
              resolve();
            },
            error: (err) => {
              console.error('Error fetching perfume:', err);
              resolve();
            }
          });
      });
    } else if (category) {
      await new Promise<void>((resolve) => {
        this.productsService
          .getProducts(undefined, undefined, undefined, category)
          .subscribe({
            next: (data) => {
              this.perfumes.set(data);
              resolve();
            },
          });
      });
    } else {
      await new Promise<void>((resolve) => {
        this.productsService.getProducts().subscribe({
          next: (data) => {
            this.perfumes.set(data);
            resolve();
          },
        });
      });
    }
  }

  async getCategory() {
    if (this.categoryId) {
      await new Promise<void>((resolve) => {
        this.categoriesService.getCategory(this.categoryId!).subscribe({
          next: (data) => {
            this.category.set(data);
            resolve();
          },
        });
      });
    }
  }
}
