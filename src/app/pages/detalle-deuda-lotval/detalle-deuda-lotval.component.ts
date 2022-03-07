import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-deuda-lotval',
  templateUrl: './detalle-deuda-lotval.component.html',
})
export class DetalleDeudaLotvalComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  varTmpDisplayCreaReg: string = 'inline-block';
  idvisSEL: string = '';

  p_anylot: string;
  p_numlot: string;
  p_codcon: string;
  p_tipval: string;

  rowSelected: any;

  dataDetalleDeudaLoteValor: any;

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
    this.p_anylot = this.route.snapshot.params.anylot;
    this.p_numlot = this.route.snapshot.params.numlot;
    this.p_codcon = this.route.snapshot.params.codcon;
    this.p_tipval = this.route.snapshot.params.tipval;

    this.detalleDeudaLoteValor();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  detalleDeudaLoteValor() {
    const data_post = {
      p_anylot: this.p_anylot,
      p_numlot: this.p_numlot,
      p_codcon: this.p_codcon,
      p_tipval: this.p_tipval
    };
    
    this.api.getDataLoteValorDetalle(data_post).subscribe((data: any) => {
      if (data.length != 0) {
        this.dataDetalleDeudaLoteValor = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.dataDetalleDeudaLoteValor = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
      console.log(data);
    });
  }

  regresarDetalleLoteValor() {
    this.router.navigate(["/detalle-lotval", this.p_anylot, this.p_numlot, this.p_tipval]);
  }

}
