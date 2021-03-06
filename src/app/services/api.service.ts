import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  // urlApi: string = 'https://backendmdsb.latamdeveloper.com/api/v1/';
  // urlApi: string = 'https://api.municallao.gob.pe/mdsb/public/v1/';
  urlApi: string = 'http://192.168.2.253/mdsb/public/v1/';

  getQuery(query: string) {
    const url = `${ this.urlApi + query }`;
    return this.httpClient.get(url);
  }

  postQuery(query: string, params: any) {
    const url = `${ this.urlApi + query }`;
    return this.httpClient.post(url, params);
  }

  getDataTipoValor(data: object) {
    return this.postQuery('general/tipovalor/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataTipoContribuyente(data: object) {
    return this.postQuery('general/tipocontri/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataTipoUbicacion(data: object) {
    return this.postQuery('general/ubicacion/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataProceso(data: object) {
    return this.postQuery('valores/proceso/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataProcesoDetalle(data: object) {
    return this.postQuery('valores/proceso/listar/detalle', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataDeudaContri(data: object) {
    return this.postQuery('valores/deudacontri/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataDeudaListar(data: object) {
    return this.postQuery('valores/deudadetalle/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  postDataProceso(data: object) {
    return this.postQuery('valores/procdeuda/guardar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  postDataLote(data: object) {
    return this.postQuery('lotes/lotemision/guardar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  postAnulaContriLote(data: object) {
    return this.postQuery('lotes/lotemision/anular-contrib', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteListar(data: object) {
    return this.postQuery('lotes/lotemision/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteDetalleListar(data: object) {
    return this.postQuery('lotes/lotedetalle/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteListadoContrib(data: object) {
    return this.postQuery('lotes/lotemision/listado-contrib', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteDeudaContrib(data: object) {
    return this.postQuery('lotes/lotemision/deuda-contrib', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataTipoSector(data: object) {
    return this.postQuery('general/tiposector/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteValor(data: object) {
    return this.postQuery('lotes/lotevalor/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getDataLoteValorContrib(data: object) {
    return this.postQuery('lotes/lotevalorcon/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  getDataLoteValorDetalle(data: object) {
    return this.postQuery('lotes/lotevalordet/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
