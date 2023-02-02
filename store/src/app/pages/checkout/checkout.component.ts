import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  stores = [{
    "id": 1,
    "name": "Park Row at Beekman St",
    "address": "38 Park Row",
    "city": "New York",
    "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
  },
  {
    "id": 2,
    "name": "Store Alcalá",
    "address": "Calle de Alcalá, 21",
    "city": "Madrid",
    "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
  },]

  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onPickupOrDelivery(value: boolean): void {
    console.log(value)
  }

}
