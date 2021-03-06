import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'shared/services/order/order.service';
import {ShoppingCart} from 'shared/models/shopping-cart';
import {Router} from '@angular/router';
import {AuthService} from 'shared/services/auth/auth.service';
import {Order} from 'shared/models/order';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping: any = {};
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
