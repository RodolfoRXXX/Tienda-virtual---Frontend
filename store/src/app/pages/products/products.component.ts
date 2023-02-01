import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Product[]; //Para no inicializar la variable se puede colocar "!" o colocar "undefined"

  constructor(
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap( (products: Product[]) => this.products = products )
    )
    .subscribe();
  }

}
