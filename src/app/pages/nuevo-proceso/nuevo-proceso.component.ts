import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-nuevo-proceso",
  templateUrl: "./nuevo-proceso.component.html",
  styleUrls: [],
})
export class NuevoProcesoComponent implements OnInit {
  dataTipoContribuyente: any;
  dataTipoValor: any;
  dataTipoUbicacion: any;
  dataTipoSector: any;

  tipoContrib: string = "";
  tipoValor: string = "";
  anioDesde: string = "";
  anioHasta: string = "";
  montoDesde: string = "";
  montoHasta: string = "";
  tipoSector: string = "";
  tipoUbicacion: string = "";
  filterPerIni: string = "1";
  filterPerFin: string = "3";
  fechaProyec: Date;
  disabledHasta: boolean = true;
  perIni: string = "";
  perFin: string = "";

  anios: any = [];
  arrayAniosHasta: any = [];

  simpleForm: FormGroup;
  submitted = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.simpleForm = this.formBuilder.group({
      tipoContrib: ["", [Validators.required]],
      tipoValor: ["", [Validators.required]],
      montoDesde: ["", [Validators.required]],
      montoHasta: ["", [Validators.required]],
      // tipoSector: ["", [Validators.required]],
      anioDesde: ["", [Validators.required]],
      anioHasta: ["", [Validators.required]],
      // tipoUbicacion: ["", [Validators.required]],
      fechaProyec: ["", [Validators.required]],
      perIni: ["", [Validators.required]],
      perFin: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.fillTipoContribuyente();
    this.fillTipoValor();
    this.fillTipoUbicacion();
    this.fillTipoSector();
    this.listarAnios();
  }

  get f() {
    return this.simpleForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.simpleForm.invalid) {
      return;
    }

    console.log(this.simpleForm.value);
  }

  listarAnios() {
    const max = new Date().getFullYear();
    const min = 2004;

    for (var i = max; i >= min; i--) {
      this.anios.push({ anio: i });
    }

    console.log(this.anios);
  }

  guardarProceso() {
    this.submitted = true;
    if (this.simpleForm.invalid) {
      return;
    } else {
      const data_post = {
        p_secuen: 1234567890,
        p_fecpro: this.fechaProyec,
        p_anoini: this.anioDesde,
        p_anofin: this.anioHasta,
        p_perini: this.perIni,
        p_perfin: this.perFin,
        p_tipcon: this.tipoContrib,
        p_tipval: this.tipoValor,
        p_disdfu: this.tipoUbicacion,
        p_sector: this.tipoSector,
        p_monini: this.montoDesde,
        p_monfin: this.montoHasta,
      };

      console.log(data_post);
      swal.fire({
        title: "Guardando información...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: function () {
          swal.showLoading();
        },
      });
      this.api.postDataProceso(data_post).subscribe((data: any) => {
        if (data[0].RETORNA === "0") {
          swal
            .fire({
              title: "Mensaje informativo",
              text: "Proceso generado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(["/proceso"]);
              }
            });
        } else {
          swal.fire({
            icon: "error",
            title: "Ocurrió algo inesperado",
            text: "Hubo un error al guardar la informacion",
            showCancelButton: true,
            cancelButtonText: "Cerrar",
          });
        }
      });
    }
  }

  cambiaProyeccion() {
    const date = new Date();
    const primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const fecha_actual = new Date(this.fechaProyec);

    if (fecha_actual > ultimoDia) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: "La fecha no puede ser mayor al último día del presente mes.",
        // showCancelButton: true,
        cancelButtonText: "Cerrar",
      });
      this.fechaProyec = new Date();
    } else if (fecha_actual < primerDia) {
      swal.fire({
        icon: "error",
        title: "Error",
        text: "La fecha no puede ser menor al primer día del presente mes.",
        // showCancelButton: true,
        cancelButtonText: "Cerrar",
      });
      this.fechaProyec = new Date();
    }
  }

  cambiarAnio() {
    const max = new Date().getFullYear();
    const min = parseInt(this.anioDesde);
    console.log(max + "" + min);
    this.arrayAniosHasta = [];
    for (var i = min; i <= max; i++) {
      this.arrayAniosHasta.push({ anio: i });
    }
    this.disabledHasta = false;
  }

  soloNumeros(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  regresarProceso() {
    this.router.navigate(["/proceso"]);
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

  fillTipoUbicacion() {
    const data_post = {
      p_ubidfd: 0,
    };

    this.api.getDataTipoUbicacion(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoUbicacion = data;
    });
  }

  fillTipoSector() {
    const data_post = {};

    this.api.getDataTipoSector(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoSector = data;
    });
  }
}
