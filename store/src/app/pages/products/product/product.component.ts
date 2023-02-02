import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// "changeDetection" es la estrategía que definimos para que Angular sepa cuando debe actualizar el componente cuando la data haya cambiado
// "OnPush" Angular achequea el componente cuando el input de nuestra data cambie
// "Default" lo chequea siempre
// eventos que hace q Angular revise los cambios: eventos del mouse, llamadas Ajax, setInterval, setTimeout
export class ProductComponent {

  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();

  onClick():void {
    this.addToCartClick.emit(this.product);
  }

}
