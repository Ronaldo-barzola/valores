import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-lote',
  templateUrl: './nuevo-lote.component.html',
  styles: []
})
export class NuevoLoteComponent implements OnInit {
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
  filterPerIni: string = '1';
  filterPerFin: string = '3';

  anios: any = [];

  simpleForm: FormGroup;
  submitted = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.simpleForm = this.formBuilder.group({
      tipoContrib: ["", [Validators.required]],
      tipoValor: ["", [Validators.required]],
      montoDesde: ["", [Validators.required]],
      montoHasta: ["", [Validators.required]],
      tipoSector: ["", [Validators.required]],
      anioDesde: ["", [Validators.required]],
      anioHasta: ["", [Validators.required]],
      tipoUbicacion: ["", [Validators.required]],
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
    const max = new Date().getFullYear()
    const min = 2004

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
        p_anoini: this.anioDesde,
        p_anofin: this.anioHasta,
        p_perini: this.filterPerIni,
        p_perfin: this.filterPerFin,
        p_tipcon: this.tipoContrib,
        p_tipval: this.tipoValor,
        p_disdfu: this.tipoUbicacion,
        p_sector: this.tipoSector,
        p_monini: this.montoDesde,
        p_monfin: this.montoHasta
      }

      swal.fire({
        title: 'Guardando información...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: function () {
          swal.showLoading();
        }
      });
      this.api.postDataLote(data_post).subscribe((data: any) => {
        if (data[0].RETORNA === '0') {
          swal.fire({
            title: 'Mensaje informativo',
            text: 'Lote generado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/lote']);
            }
          })

        } else {
          swal.fire({
            icon: 'error',
            title: 'Ocurrió algo inesperado',
            text: "Hubo un error al guardar la informacion",
            showCancelButton: true,
            cancelButtonText: 'Cerrar',

          });
        }

      });
    }
  }

  regresarProceso() {
    this.router.navigate(['/lote']);
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
    const data_post = {
    };

    this.api.getDataTipoSector(data_post).subscribe((data: any) => {
      console.log(data);
      this.dataTipoSector = data;
    });
  }
}
