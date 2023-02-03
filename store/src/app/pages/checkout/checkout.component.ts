import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  stores: Store[] = [];

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

  onSubmit(): void {
    console.log('Guardar');
  }

}
