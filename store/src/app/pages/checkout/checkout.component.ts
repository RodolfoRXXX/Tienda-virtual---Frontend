import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  stores: Store[] = [];

  cart: Product[] = [];

  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }
  isDelivery = true;

  constructor(
    private dataSvc: DataService,
    private ShoppingCartSvc: ShoppingCartService,
    private router: Router,
    private ProductSvc: ProductsService
  ) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  private getStores(): void {
    this.dataSvc.getStores()
                .pipe(
                  tap( (res: Store[]) => this.stores = res )
                )
                .subscribe();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = !value;
  }

  onSubmit({ value: formData }: NgForm): void { //hace un destructuring de la información del formulario que llega
    const data: Order = {
      ... formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    console.log(data);

    this.dataSvc.saveorder(data)
                .pipe(
                  tap( res => console.log('Order ->', res) ), //lo podemos dejar como debugger
                  switchMap( ({id: orderId}) => {
                    const details = this.prepareDetails();
                    return this.dataSvc.saveDetailOrder({details, orderId});
                  } ),
                  tap( () => this.router.navigate(['/checkout/thank-you-page']) ),
                  delay(500),
                  tap( () => this.ShoppingCartSvc.resetCart() )
                  )
                .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach( (product: Product) => {

      //creamos un objeto con los valores que obtenemos desde cada item del array cart y renombramos cada atributo de este objeto 
      //para que estos sean iguales a los que pide el objeto details (desestructuring de javascript)
      const {id: productId, name: productName, qty: quantity, stock} = product;
      const updateStock = (stock - quantity);

      this.ProductSvc.updateStock(productId, updateStock)
                     .pipe(
                      tap( () => details.push({productId, productName, quantity}) )
                     )
                     .subscribe();
      //details.push({productId, productName, quantity})
    })
    return details;
  }

  private getDataCart(): void {
    this.ShoppingCartSvc.cartAction$
        .pipe(
          tap( (products: Product[]) => this.cart = products )
        )
        .subscribe();
  }

  private checkIfCartIsEmpty(): void {
    this.ShoppingCartSvc.cartAction$
        .pipe(
          tap( (products: Product[]) => {
            if(Array.isArray(products) && !products.length){ //Verifica que sea un array y que esté vacío
              this.router.navigate(['/products']);
            }
          } )
        )
        .subscribe();
  }

}
