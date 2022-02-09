import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProcesoComponent } from './pages/proceso/proceso.component';
import { ListadoContribComponent } from './pages/listado-contrib/listado-contrib.component';
import { DetalleDeudaComponent } from './pages/detalle-deuda/detalle-deuda.component';
import { NuevoProcesoComponent } from './pages/nuevo-proceso/nuevo-proceso.component';
import { LoteComponent } from './pages/lote/lote.component';
import { NuevoLoteComponent } from './pages/nuevo-lote/nuevo-lote.component';
import { ListadoContribLoteComponent } from './pages/listado-contrib-lote/listado-contrib-lote.component';
import { DetalleDeudaLoteComponent } from './pages/detalle-deuda-lote/detalle-deuda-lote.component';
import { GenerarValoresComponent } from './pages/generar-valores/generar-valores.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    ChatComponent,
    FooterComponent,
    WelcomeComponent,
    ProcesoComponent,
    ListadoContribComponent,
    DetalleDeudaComponent,
    NuevoProcesoComponent,
    LoteComponent,
    NuevoLoteComponent,
    ListadoContribLoteComponent,
    DetalleDeudaLoteComponent,
    GenerarValoresComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {useHash: false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
