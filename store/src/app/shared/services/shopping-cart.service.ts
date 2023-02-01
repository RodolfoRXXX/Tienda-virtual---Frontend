import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    
    products: Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get cartAction$(): Observable<Product[]> { //si la función devuelve un observable, entonces por convención lleva "$" en el nombre de la función
        return this.cartSubject.asObservable();
    }

    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    updateCart(product: Product): void { //Este metodo es accesible desde el componente y guarda un nuevo producto, además de actualizar el total y la cantidad de artículos en el carrito
        this.addToCart(product);
        this.calcTotal();
        this.quantityProducts();
    }

    private addToCart(product: Product): void {
        this.products.push(product);
        this.cartSubject.next(this.products);
    }

    private calcTotal(): void {
        const total = this.products.reduce( (act, prod) => act +=prod.price, 0);
        this.totalSubject.next(total);
    }

    private quantityProducts(): void {
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }

}