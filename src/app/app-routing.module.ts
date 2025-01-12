import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserrolesListComponent } from './admin/userrole/userroles-list/userroles-list.component';
import { ProductsListComponent } from './admin/product/products-list/products-list.component';
import { OrdersListComponent } from './admin/order/orders-list/orders-list.component';
import { CartslistComponent } from './admin/cart/cartslist/cartslist.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CartDetailsComponent } from './admin/cart/cart-details/cart-details.component';
import { CategoryDetailsComponent } from './admin/category/category-details/category-details.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { ProductInfoComponent } from './admin/product/product-info/product-info.component';
import { adminGuard, authGuard } from './guard/auth.guard';
import { OrderDetailsComponent } from './admin/order/order-details/order-details.component';
import { UserDetailComponent } from './admin/user/user-detail/user-detail.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { UserroleDetailsComponent } from './admin/userrole/userrole-details/userrole-details.component';
import { AddRoleComponent } from './admin/userrole/add-role/add-role.component';
import { GeneralUpdatesComponent } from './admin/general-updates/general-updates.component';
import { ContactFormComponent } from './admin/contact-form/contact-form.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'category/:type', component: CategoryComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'checkout',component:OrderComponent,canActivate:[authGuard]},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path:'FAQs',component:FaqsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'cart',component:CartComponent,canActivate:[authGuard]},
  {path:'profile',component:UserProfileComponent,canActivate:[authGuard]},
  {
    path: 'admin',
    component: AdminDashboardComponent
    ,canActivate:[adminGuard],
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'adduser',component:AddUserComponent},
      {
        path: 'user-details/:id',
        component: UserDetailComponent,
        data: { mode: 'view' }
      },
      {
        path: 'user-details/edit/:id',
        component: UserDetailComponent,
        data: { mode: 'edit' }
      },
      { path: 'user-roles', component: UserrolesListComponent },
      { path: 'adduserrole',component:AddRoleComponent},
      {
        path: 'userrole-details/:id',
        component: UserroleDetailsComponent,
        data: { mode: 'view' }
      },
      {
        path: 'userrole-details/edit/:id',
        component: UserroleDetailsComponent,
        data: { mode: 'edit' }
      },
      { path: 'products', component: ProductsListComponent },
      {
        path: 'products-info/:id',
        component: ProductInfoComponent,
        data: { mode: 'view' }
      },
      {
        path: 'products-info/edit/:id',
        component: ProductInfoComponent,
        data: { mode: 'edit' }
      },
      {path:  'addproduct',component: AddProductComponent},
      { path: 'orders', component: OrdersListComponent },
      {
        path: 'order-details/:id',
        component: OrderDetailsComponent,
        data: { mode: 'view' }
      },
      {
        path: 'order-details/edit/:id',
        component: OrderDetailsComponent,
        data: { mode: 'edit' }
      },
      { path: 'cart', component: CartslistComponent },
      { path: 'cart-details/:id', component: CartDetailsComponent },
      { path: 'categories', component: CategoryListComponent },
      {
        path: 'categories-details/:id',
        component: CategoryDetailsComponent,
        data: { mode: 'view' }
      },
      {
        path: 'categories-details/edit/:id',
        component: CategoryDetailsComponent,
        data: { mode: 'edit' }
      },
      {path:  'addcategory',component: AddCategoryComponent},
      { path: 'general', component: GeneralUpdatesComponent },
      { path: 'contact-form', component: ContactFormComponent }
    ],
  },
  {path:'**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
