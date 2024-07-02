import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Address } from '../models/address.model';
import { UserService } from './user.service';
import { CreditCard } from '../models/credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private baseUrl = 'http://localhost:3000/api';

  creditCards = signal<CreditCard[]>([]);

  constructor() { }

  getPersonCreditCards() {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/creditCard/${this.userService.user()?.person._id}`).pipe(
      tap((response) => {
        this.creditCards.set(response);
      })
    );
  }

  createCreditCard(address: CreditCard) {
    return this.http.post<CreditCard>(`${this.baseUrl}/creditCard`, address).pipe(
      tap((response) => {
        this.getPersonCreditCards();
      })
    );
  }

  updateCreditCard(id: string, address: CreditCard) {
    return this.http.patch<CreditCard>(`${this.baseUrl}/creditCard/${id}`, address).pipe(
      tap((response) => {
        this.getPersonCreditCards();
      })
    );
  }
}
