import { Component, Input, inject} from '@angular/core';
import { Perfume } from '../../models/perfume.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() perfume!: Perfume;

  private cartService = inject(CartService)

  addToCart(perfume: any) {
    this.cartService.addToCart(perfume)
  }

  removeFromCart() {

  }

}
