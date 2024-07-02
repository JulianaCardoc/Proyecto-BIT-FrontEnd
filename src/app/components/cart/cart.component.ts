import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Perfume } from '../../models/perfume.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService)

  @Input() perfume: any;

  perfumesOnCart = this.cartService.perfumes;

  perfumeQuantity = new FormControl(0);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['perfume'] && this.perfume) {
      this.perfumeQuantity.setValue(this.perfume.quantity);
    }
  }

  increment(perfumeId: string) {
    this.cartService.incrementQuantity(perfumeId)
  }

  decrement(perfumeId: string) {
    this.cartService.decrementQuantity(perfumeId)
  }

  remove(perfumeId: string) {    
    this.cartService.deleteProduct(perfumeId)
  }
}
