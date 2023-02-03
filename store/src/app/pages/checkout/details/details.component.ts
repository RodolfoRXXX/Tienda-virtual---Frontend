import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../products/interfaces/product.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  total$ = this.ShoppingCartSvc.totalAction$;
  cart$ = this.ShoppingCartSvc.cartAction$;

  constructor(private ShoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {

  }

}
