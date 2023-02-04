import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Product } from '../products/interfaces/product.interface';

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
  isDelivery = false;

  constructor(
    private dataSvc: DataService
  ) { }

  ngOnInit(): void {
    this.getStores();
  }

  private getStores(): void {
    this.dataSvc.getStores()
                .pipe(
                  tap( (res: Store[]) => this.stores = res )
                )
                .subscribe();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void { //hace un destructuring de la información del formulario que llega
    console.log('Guardar');
    const data: Order = {
      ... formData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery
    }

    this.dataSvc.saveorder(data)
                .pipe(
                  tap( res => console.log('Order ->', res) ),
                  switchMap( (order) => {
                    const details = {};
                    return this.dataSvc.saveDetailOrder(details);
                  } ),
                  tap( res => console.log('Finish ->', res) ),
                  )
                .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];

  }

}
