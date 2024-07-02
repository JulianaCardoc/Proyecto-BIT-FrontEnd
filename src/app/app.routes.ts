import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'perfume/:perfumeId', component: ProductDetailComponent },
      { path: 'productsList', component: ProductsListComponent},
      { path: 'productsList/:categoryId', component: ProductsListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'aboutUs', component: AboutusComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];
