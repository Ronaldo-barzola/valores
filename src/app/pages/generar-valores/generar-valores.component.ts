import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "app-generar-valores",
  templateUrl: "./generar-valores.component.html",
  styleUrls: [],
})
export class GenerarValoresComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  varTmpDisplayCreaReg: string = 'inline-block';
  modalRef: BsModalRef;
  idvisSEL: string = '';


  fb_fecini: Date;
  fb_fecfin: Date;
  p_numlot: string;
  dataLoteValor: any;
  dtTrigger: Subject<any> = new Subject<any>();

  rowSelected: any;

  dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [
      'excel'
    ],
    select: true,
    responsive: true,
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      $('td', row).off('click');
      $('td', row).on('click', () => {
        this.rowSelected = data;
        let btnDetalleProceso = document.getElementById('detalleProceso') as HTMLButtonElement;
        btnDetalleProceso.disabled = false;
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
  ) { }


  ngOnInit() {
    let btnDetalleProceso = document.getElementById('detalleProceso') as HTMLButtonElement;
    let btnExportaExcel = document.getElementById('descargaProceso') as HTMLButtonElement;
    btnDetalleProceso.disabled = true;
    btnExportaExcel.disabled = true;
    this.fb_fecini = new Date();
    this.fb_fecfin = new Date();
    this.loadDataLoteValor();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  verDetalleLotVal() {
    console.log(this.rowSelected);
    this.router.navigate(['/detalle-lotval', this.rowSelected[0], this.rowSelected[1], this.rowSelected[6]]);
  }

  loadDataLoteValor() {
    const data_post = {
      p_anypro: 2022
    };

    this.api.getDataLoteValor(data_post).subscribe((data: any) => {
      console.log(data);
      let btnExportaExcel = document.getElementById('descargaProceso') as HTMLButtonElement;

      if (data.length != 0) {
        this.dataLoteValor = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
        btnExportaExcel.disabled = false;
      } else {
        this.dataLoteValor = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
      console.log(data);
    });
  }
}
