import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Perfume } from '../models/perfume.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  

  constructor() { }

  getCategories() {
    const url = new URL('http://localhost:3000/api/category');
    return this.http.get<Category[]>(url.toString());
  }

  getCategory(categoryId: string) {
    const url = new URL(`http://localhost:3000/api/category/${categoryId}`);
    return this.http.get<Category>(url.toString());
  }
}
