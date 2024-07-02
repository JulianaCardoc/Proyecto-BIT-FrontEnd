import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(CartService);

  cart = this.cartService.perfumes;
  total = this.cartService.total;
}
