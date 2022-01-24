import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-proceso',
  templateUrl: './nuevo-proceso.component.html',
  styleUrls: []
})
export class NuevoProcesoComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { name: '', alterEgo: 'Dr. What', power: this.powers[0] };


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

  // tipoContrib: string;


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

  }

  get f() {
    return this.simpleForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }
    console.log(this.simpleForm.value);
  }

  guardarProceso() {

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

    console.log('==================================');
    console.log('Enviado:', data_post);

    this.api.postDataProceso(data_post).subscribe((data: any) => {
      console.log(data);
    });

    // this.message.create('success', `Nuevo proceso generado correctamente.`);

    this.router.navigate(['/proceso']);
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
