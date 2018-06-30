import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {AdminAuthGuard} from './services/admin-auth-guard/admin-auth-guard.service';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular5-data-table';
import {SharedModule} from 'shared/shared.module';
import {AuthGuard} from 'shared/services/auth-guard/auth-guard.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard,
  ]
})
export class AdminModule {
}
