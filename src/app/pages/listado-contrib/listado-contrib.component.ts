import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listado-contrib',
  templateUrl: './listado-contrib.component.html',
  styleUrls: []
})
export class ListadoContribComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  varTmpDisplayCreaReg: string = 'inline-block';
  idvisSEL: string = '';

  paramNumProceso: any;
  dataListado: any;
  rowSelected: any;


  dtOptions: any = {
    pagingType: 'full_numbers',
    dom: 'Bfrtip',
    buttons: [
      'excel'
    ],
    select: true,
    processing: true,
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
      lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;mentos",
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
          1: "Proceso seleccionado",
        },
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

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let btnDetalleProceso = document.getElementById('detalleProceso') as HTMLButtonElement;
    btnDetalleProceso.disabled = true;

    this.paramNumProceso = this.route.snapshot.params.numpro;
    this.detalleProceso();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  descargaExcel(){
    let btnExcel = document.querySelector('#tablaDetalleProceso .dt-buttons .dt-button.buttons-excel.buttons-html5') as HTMLButtonElement;

    btnExcel.click();
  }

  anulaRegistro(){
    console.log('Anula registro');
  }

  detalleProceso() {
    const data_post = {
      p_pdlnid: this.paramNumProceso,
    };

    this.api.getDataDeudaContri(data_post).subscribe((data: any) => {
      if (data.length != 0) {
        this.dataListado = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.dataListado = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
    });
  }

  verDetalleDeuda() {
    console.log(this.rowSelected);
    this.router.navigate(['/detalle-deuda', this.paramNumProceso, this.rowSelected[0]]);
  }

}
