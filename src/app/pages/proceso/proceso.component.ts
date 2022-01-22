import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styles: []
})
export class ProcesoComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  varTmpDisplayCreaReg: string = 'inline-block';
  modalRef: BsModalRef;
  idvisSEL: string = '';


  // dtOptions: DataTables.Settings = {};



  fb_fecini: string = "";
  fb_fecfin: string = "";
  tipoContrib: string = '';
  tipoValor: string = '';
  tipoSector: string = '';
  dataTipoContribuyente: any;
  dataTipoValor: any;
  dataTipoSector: any;
  dataProceso: any;
  rowSelected: any;
  message = '';

  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    select: true,
    responsive: true,
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      $('td', row).off('click');
      $('td', row).on('click', () => {
        this.rowSelected = data;
      });
      return row;
    },
    language: {
      processing: "Procesando...",

      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
      info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
      infoEmpty: "Mostrando ningún elemento.",
      infoFiltered: "(filtrado _MAX_ elementos total)",
      infoPostFix: "",
      loadingRecords: "Cargando registros...",
      zeroRecords: "No se encontraron registros",
      emptyTable: "No hay datos disponibles en la tabla",
      select: {
        rows: {
          _: "Selected %d rows",
          0: "Click a row to select it",
          1: "Proceso seleccionado"
        }
      },
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      },
      aria: {
        sortAscending: ": Activar para ordenar la tabla en orden ascendente",
        sortDescending: ": Activar para ordenar la tabla en orden descendente"
      }
    }
  };

  constructor(
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.fillTipoContribuyente();
    this.fillTipoValor();
    this.fillTipoSector();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  someClickHandler(info: any): void {
    console.log(info);

    this.message = info[0] + ' - ' + info.firstName;
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  verDetalleProceso() {
    console.log(this.rowSelected[0]);
    this.router.navigate(['/listado-contrib', this.rowSelected[0]]);
  }

  loadDataProceso() {
    // alert("prueba");
    const data_post = {
      p_fecini: this.fb_fecini,
      p_fecfin: this.fb_fecfin,
      p_tipval: this.tipoValor,
      p_tipdfd: this.tipoValor,
      p_sector: this.tipoContrib,
    };

    this.api.getDataProceso(data_post).subscribe((data: any) => {
      console.log(data);
      // this.dataProceso = data;
      if (data.length != 0) {
        this.dataProceso = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.dataProceso = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
    });
  }

  fillTipoContribuyente() {
    const data_post = {
      p_tipcon: 0,
    };

    this.api.getDataTipoContribuyente(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoContribuyente = data;
    });
  }

  fillTipoValor() {
    const data_post = {
      p_tipval: 0,
    };

    this.api.getDataTipoValor(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoValor = data;
    });
  }

  fillTipoSector() {
    const data_post = {
    };

    this.api.getDataTipoSector(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoSector = data;
    });
  }

}

