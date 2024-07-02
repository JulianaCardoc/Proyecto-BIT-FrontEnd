import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts(onSale?: string, brand?: string, limit?: string, category?: string) {
    const url = new URL('http://localhost:3000/api/perfume');
    const params = {
      onSale,
      brand,
      limit,
      category,
    };
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    });
    return this.http.get<Perfume[]>(url.toString());
  }

  getOneProduct(perfumeId: string) {
    return this.http.get<Perfume>(
      `http://localhost:3000/api/perfume/${perfumeId}`
    );
  }
}
