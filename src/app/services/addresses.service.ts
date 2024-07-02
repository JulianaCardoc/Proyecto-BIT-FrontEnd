import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Address } from '../models/address.model';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private baseUrl = 'http://localhost:3000/api';

  addresses = signal<Address[]>([]);

  constructor() { }

  getPersonAddresses() {
    return this.http.get<Address[]>(`${this.baseUrl}/addresses/${this.userService.user()?.person._id}`).pipe(
      tap((response) => {
        this.addresses.set(response);
      })
    );
  }

  createAddress(address: Address) {
    return this.http.post<Address>(`${this.baseUrl}/addresses`, address).pipe(
      tap((response) => {
        this.getPersonAddresses();
      })
    );
  }

  updateAddress(id: string, address: Address) {
    return this.http.patch<Address>(`${this.baseUrl}/addresses/${id}`, address).pipe(
      tap((response) => {
        this.getPersonAddresses();
      })
    );
  }
}
