import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-deuda',
  templateUrl: './detalle-deuda.component.html',
  styleUrls: []
})
export class DetalleDeudaComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  varTmpDisplayCreaReg: string = 'inline-block';
  idvisSEL: string = '';

  paramNumProceso: any;
  paramCodContrib: any;
  detalleDeuda: any;


  dtOptions: any = {
    pagingType: 'full_numbers',
    dom: 'Bfrtip',
    buttons: [
      'excel'
    ],
    select: true,
    processing: true,
    responsive: true,
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

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramNumProceso = this.route.snapshot.params.numpro;
    this.paramCodContrib = this.route.snapshot.params.numcon;
    this.listarDetalleDeuda();
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

  regresarDetalleProceso(){
    
    this.router.navigate(['/listado-contrib', this.paramNumProceso]);
  }

  listarDetalleDeuda() {
    const data_post = {
      p_pdlnid: this.paramNumProceso,
      p_codcon: this.paramCodContrib
    };

    this.api.getDataDeudaListar(data_post).subscribe((data: any) => {
      if (data.length != 0) {
        this.detalleDeuda = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.detalleDeuda = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
    });
  }

}
