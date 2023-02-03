import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    
    products: Product[] = [];

    //VER VIDEO DE DIFERENCIA ENTRE SUBJECT Y BEHAVIORSUBJECT
    //En este caso Subject entrega valores futuros y no los anteriores como sí lo hace behaviorSubject

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

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
        const isProductInCart = this.products.find( ({id}) => id === product.id );
        if(isProductInCart){
            isProductInCart.qty += 1;
        } else{
            this.products.push({...product, qty:1});
        }
        this.cartSubject.next(this.products);
    }

    private calcTotal(): void {
        const total = this.products.reduce( (act, prod) => act += (prod.price * prod.qty), 0);
        this.totalSubject.next(total);
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce( (act, prod) => act += prod.qty, 0 );
        this.quantitySubject.next(quantity);
    }

}