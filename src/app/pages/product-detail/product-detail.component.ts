import { Component, Input, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Perfume } from '../../models/perfume.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CurrencyPipe,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);

  @Input() perfumeId?: string;

  perfume = signal< Perfume | null >(null);
  relatedPerfumes = signal<Perfume[]>([])

  async ngOnInit() {
    if (this.perfumeId !== undefined) {
      await new Promise<void>((resolve) => {
        this.productsService.getOneProduct(this.perfumeId!).subscribe({
          next: (data) => {
            this.perfume.set(data);
            resolve();
          },
          error: (err) => {
            console.error('Error fetching perfume:', err);
            resolve();
          }
        });
      });
  
      const brand = this.perfume()?.brand;
      const limit = "3";
      if (brand) {
        this.productsService.getProducts(undefined, brand, limit).subscribe({
          next: (data) => {
            this.relatedPerfumes.set(data);
          },
          error: (err) => {
            console.error('Error fetching related perfumes:', err);
          }
        });
      }
    }
  }

  addToCart() {
    const currentPerfume = this.perfume();
    if (currentPerfume) {
      this.cartService.addToCart(currentPerfume);
    } else {
      console.error('Cannot add to cart: Perfume is null');
    }
  }
}
