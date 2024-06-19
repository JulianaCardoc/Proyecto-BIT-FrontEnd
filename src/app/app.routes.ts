import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail', component: ProductDetailComponent},
    { path: 'productslist', component: ProductsListComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
