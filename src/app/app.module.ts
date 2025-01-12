import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { FaqsComponent } from './faqs/faqs.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserDetailComponent } from './admin/user/user-detail/user-detail.component';
import { CartslistComponent } from './admin/cart/cartslist/cartslist.component';
import { CartDetailsComponent } from './admin/cart/cart-details/cart-details.component';
import { OrdersListComponent } from './admin/order/orders-list/orders-list.component';
import { OrderDetailsComponent } from './admin/order/order-details/order-details.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryDetailsComponent } from './admin/category/category-details/category-details.component';
import { ProductsListComponent } from './admin/product/products-list/products-list.component';
import { UserrolesListComponent } from './admin/userrole/userroles-list/userroles-list.component';
import { UserroleDetailsComponent } from './admin/userrole/userrole-details/userrole-details.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { AddRoleComponent } from './admin/userrole/add-role/add-role.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { ProductInfoComponent } from './admin/product/product-info/product-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductScrollerComponent } from './product-scroller/product-scroller.component';
import { GeneralUpdatesComponent } from './admin/general-updates/general-updates.component';
import { ContactFormComponent } from './admin/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    AdminDashboardComponent,
    UserProfileComponent,
    ContactComponent,
    AboutComponent,
    CategoryComponent,
    FaqsComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    UserListComponent,
    UserDetailComponent,
    CartslistComponent,
    CartDetailsComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    ProductsListComponent,
    UserrolesListComponent,
    UserroleDetailsComponent,
    AddUserComponent,
    AddRoleComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductInfoComponent,
    ProductScrollerComponent,
    GeneralUpdatesComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
