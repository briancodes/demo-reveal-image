import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { CustomMaterialModule } from './shared/custom-material/custom-material.module';
import { SettingsEventService, AbstractSettingsManager, AbstractSettingsConsumer } from './shared/services/events/settings-event.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    CustomMaterialModule
  ],
  providers: [
    {provide: AbstractSettingsManager, useClass: SettingsEventService},
    {provide: AbstractSettingsConsumer, useExisting: AbstractSettingsManager}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
