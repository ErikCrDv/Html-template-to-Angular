import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoResponse } from '../../interfaces/productos.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto!: ProductoResponse;
  productoId!: string;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      this.productoId = parametros['id'];
      this.productoService.getProducto( parametros['id'] )
        .subscribe( producto => {
          this.producto = producto;
        });
    });
  }

}
