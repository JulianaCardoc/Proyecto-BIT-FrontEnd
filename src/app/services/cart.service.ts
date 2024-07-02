import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  perfumes = signal(new Map());

  total = computed(() => {
    const perfumesMap = this.perfumes();
    let total = 0;

    perfumesMap.forEach(perfume => {
      total += perfume.price * perfume.quantity;
    });

    return total;
  });

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.perfumes().entries())));
  }

  getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.perfumes.set(new Map<string, string>(JSON.parse(cart)));
    }
  }

  removeCart() {
    localStorage.removeItem('cart');
    this.perfumes.set(new Map());
  }

  constructor() { 
    this.getCart();
  }

  addToCart(perfume: Perfume) {
    this.perfumes.update(perfumesMap => {
      const perfumeInCart = perfumesMap.get(perfume._id);
      if (perfumeInCart) {
        perfumesMap.set(perfume._id, { ...perfumeInCart, quantity: perfumeInCart.quantity + 1 });
      } else {
        perfumesMap.set(perfume._id, { ...perfume, quantity: 1 });
      }
      this.saveCart();
      return new Map(perfumesMap);
    });
  }

  incrementQuantity(perfumeId: string) {
    this.perfumes.update(perfumesMap => {
      const perfumeInCart = perfumesMap.get(perfumeId);

      if (perfumeInCart) {
        perfumesMap.set(perfumeId, { ...perfumeInCart, quantity: perfumeInCart.quantity + 1 })
      }
      this.saveCart();
      return new Map(perfumesMap);
    })
  }

  decrementQuantity(perfumeId: string) {
    this.perfumes.update(perfumesMap => {
      const perfumeInCart = perfumesMap.get(perfumeId);
      if (perfumeInCart!.quantity === 1) {
        perfumesMap.delete(perfumeId)
      } else {
        perfumesMap.set(perfumeId, { ...perfumeInCart!, quantity: perfumeInCart!.quantity - 1 })
      }
      this.saveCart();
      return new Map(perfumesMap);
    })
  }

  deleteProduct(perfumeId: string) {    
    this.perfumes.update(perfumesMap => {
      perfumesMap.delete(perfumeId);
      this.saveCart();
      return new Map(perfumesMap)
    })
  }
}
