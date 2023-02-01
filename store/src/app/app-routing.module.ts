import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) }, //Esto lo carga por LazyLoading
    {
        path: "**", redirectTo: "", pathMatch: "full", //Esta ruta siempre va al final de todo, porque primero debe comprobar las sí existentes
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }