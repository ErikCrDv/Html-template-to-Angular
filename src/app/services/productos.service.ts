import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoIDXResponse, ProductoResponse } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoIDXResponse[] = [];
  productosFiltrado: ProductoIDXResponse[] = [];

  constructor(
    private http: HttpClient
  ) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise( (resolve, reject) => {

      this.http.get<ProductoIDXResponse[]>('https://angular-html-82783-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( res => {
          this.productos = res;
          setTimeout(() => {
            this.cargando = false;
            resolve('');
          }, 200);
        })
      });

    }

  getProducto( id: string ){
    return this.http.get<ProductoResponse>(`https://angular-html-82783-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( term: string ){
    if( !this.productos ){
      this.cargarProductos().then( () =>{
        this.filtrarProductos( term );
      })
    }else{
      this.filtrarProductos( term );
    }
  }

  filtrarProductos( term: string){
    this.productosFiltrado = [];
    this.productos.forEach( producto => {
      term = term.toLowerCase();
      if( producto.categoria.indexOf( term ) >= 0 || producto.titulo.toLowerCase().indexOf( term )){
        this.productosFiltrado.push( producto );
      }
    })
    console.log(this.productosFiltrado);
  }

}
