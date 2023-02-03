import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root' //esto indica que este servicio estará disponible para toda la aplicación
})
export class ProductsService {

  private apiURL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURL}/products`);
  }
}


//Un service es una capa que añadimos para manejar los datos que podemos recibir desde una fuente externa
//Este encapsula todos los métodos necesarios para acceder a la información y manejarla, luego la consumimos desde los componentes

  //Un OBSERVABLE es un flujo de datos en el tiempo, es decir, representan una colección de datos a recibir en el futuro