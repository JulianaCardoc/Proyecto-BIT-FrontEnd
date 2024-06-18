import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail', component: ProductDetailComponent},
    { path: 'productslist', component: ProductsListComponent}
];
