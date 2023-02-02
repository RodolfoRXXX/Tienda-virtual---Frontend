import { Component } from "@angular/core";
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
    selector: 'app-cart',
    template: `
        <ng-container *ngIf="{ total: total$ | async, cantidad: quantity$ | async } as dataCart">
            <ng-container *ngIf="dataCart.total">
                <mat-icon>add_shopping_cart</mat-icon>
                {{ dataCart.total | currency }}
                ({{ dataCart.cantidad }})
            </ng-container>
        </ng-container>
    `
})
// "async" es un pipe que se suscribe y luego desuscribe al observable
// "dataCart" es un alias del objeto
export class CartComponent {

    cart$ = this.shoppingCartSvc.cartAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    quantity$ = this.shoppingCartSvc.quantityAction$;

    constructor(private shoppingCartSvc: ShoppingCartService) {}

}