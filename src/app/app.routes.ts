import { Routes } from "@angular/router";
import { ProcesoComponent } from "./pages/proceso/proceso.component";
import { ListadoContribComponent } from "./pages/listado-contrib/listado-contrib.component";
import { DetalleDeudaComponent } from "./pages/detalle-deuda/detalle-deuda.component";
import { NuevoProcesoComponent } from "./pages/nuevo-proceso/nuevo-proceso.component";
import { LoteComponent } from "./pages/lote/lote.component";
import { NuevoLoteComponent } from "./pages/nuevo-lote/nuevo-lote.component";
import { ListadoContribLoteComponent } from "./pages/listado-contrib-lote/listado-contrib-lote.component";
import { DetalleDeudaLoteComponent } from "./pages/detalle-deuda-lote/detalle-deuda-lote.component";
import { GenerarValoresComponent } from "./pages/generar-valores/generar-valores.component";
import { DetalleLotvalComponent } from "./pages/detalle-lotval/detalle-lotval.component";
import { DetalleDeudaLotvalComponent } from "./pages/detalle-deuda-lotval/detalle-deuda-lotval.component";

export const ROUTES: Routes = [
  { path: "proceso", component: ProcesoComponent },
  { path: "nuevo-proceso", component: NuevoProcesoComponent },
  { path: "listado-contrib/:numpro", component: ListadoContribComponent },
  { path: "detalle-deuda/:numpro/:numcon", component: DetalleDeudaComponent },
  { path: "lote", component: LoteComponent },
  { path: "nuevo-lote", component: NuevoLoteComponent },
  {
    path: "listado-contrib-lote/:numpro",
    component: ListadoContribLoteComponent,
  },
  {
    path: "detalle-deuda-lote/:numpro/:numcon",
    component: DetalleDeudaLoteComponent,
  },
  {
    path: "deuda-lotval/:anylot/:numlot/:codcon/:tipval",
    component: DetalleDeudaLotvalComponent,
  },
  { path: "detalle-lotval/:anylot/:numlot/:tipval", component: DetalleLotvalComponent },
  { path: "generar-valores", component: GenerarValoresComponent },
  { path: "", pathMatch: "full", redirectTo: "proceso" },
  { path: "**", pathMatch: "full", redirectTo: "proceso" },
];
