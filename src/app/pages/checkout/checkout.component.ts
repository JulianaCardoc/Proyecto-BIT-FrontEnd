import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { CartService } from '../../services/cart.service';
import { SellsService } from '../../services/sells.service';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CartComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private sellService = inject(SellsService);
  private userService = inject(UserService);

  cart = this.cartService.perfumes;
  total = this.cartService.total;
  user = this.userService.user;

  async buyNow() {
    console.log(this.user());
    
    if (this.userService.user()) {
      const newSell = {
        total: this.total(),
        date: new Date(),
        status: 2,
        user: this.user()?._id
      };
      console.log(newSell);
      await new Promise<void>((resolve) => {
        this.sellService.createSell(newSell).subscribe({
          next: () => {
            this.cartService.removeCart();
            resolve();
          },
        });
      });
    }
  }
}
