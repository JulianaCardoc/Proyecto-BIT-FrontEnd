import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Perfume } from '../../models/perfume.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    CurrencyPipe,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private productsService = inject(ProductsService);

  perfumesOnSale = signal<Perfume[]>([]);

  ngOnInit() {
    this.productsService.getProducts('true', undefined ,'3').subscribe({
      next: (data) => {
        this.perfumesOnSale.set(data);
      },
    });
  }
}
