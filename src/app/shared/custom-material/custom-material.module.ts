import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCheckboxModule],
  exports: [MatButtonModule, MatToolbarModule, MatCheckboxModule]
})
export class CustomMaterialModule { }
