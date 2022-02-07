import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { EquipoResponse } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
   
  info: InfoPagina = {};
  cargada: boolean = false;
  equipo: any;

  constructor(
    private http: HttpClient
  ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get<InfoPagina>('assets/data/data-pagina.json')
    .subscribe( res => {
      this.cargada = true;
      this.info = res;
    });
  }

  private cargarEquipo(){
    this.http.get<EquipoResponse>('https://angular-html-82783-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( res => {
        this.equipo = res;
      });
  }



}
