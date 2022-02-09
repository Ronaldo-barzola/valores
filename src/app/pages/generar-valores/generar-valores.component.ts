import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-generar-valores",
  templateUrl: "./generar-valores.component.html",
  styleUrls: [],
})
export class GenerarValoresComponent implements OnInit {
  fb_fecini: Date;
  fb_fecfin: Date;
  p_numlot: string;

  constructor() {}

  ngOnInit() {
    this.fb_fecini = new Date();
    this.fb_fecfin = new Date();
  }
}
