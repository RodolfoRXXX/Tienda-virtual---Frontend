import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  template: `
    <section class="products">
      <app-product 
          (addToCartClick)="addToCart($event)"
          [product] = "product" 
          *ngFor="let product of products"
      ></app-product>
    </section>
  `,
  styles: [`
    section.products {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
  `]
})
export class ProductsComponent implements OnInit {

  products!: Product[]; //Para no inicializar la variable se puede colocar "!" o colocar "undefined"

  constructor(
    private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap( (products: Product[]) => this.products = products )
    )
    .subscribe();
  }

  addToCart(product: Product):void {
    console.log("Add To Cart: ", product);
    this.shoppingCartSvc.updateCart(product);
  }

}
