import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { SellerProductUpdateComponent } from './seller-product-update/seller-product-update.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'search/:query',
    component:SearchComponent,
  },
  {
    path:'seller',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-product-list',
    component:SellerProductListComponent,
    canActivate:[AuthGuard]  
  },
  {
    path:'seller-product-update/:id',
    component:SellerProductUpdateComponent,
    canActivate:[AuthGuard]  
  },
  {
    path:'details/:productId',
    component:ProductDetailsComponent,
  },
  {
    path:'user-auth',
    component:UserAuthComponent,
  },
  {
    path:'cart-page',
    component:CartPageComponent,
  },
  {
    path:'checkout',
    component:CheckOutComponent,
  },
  {
    path:'myorders',
    component:MyordersComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
