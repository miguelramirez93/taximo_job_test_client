import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { FishStoresRoutingModule } from './fish-stores-routing.module';
import { FishStoresComponent } from './fish-stores.component';
import { FishStoresApiServiceService } from './fish-stores-api-service.service';

@NgModule({
  declarations: [FishStoresComponent],
  imports: [CommonModule, FishStoresRoutingModule, MaterialModule, FormsModule, SweetAlert2Module],
  providers: [FishStoresApiServiceService]
})
export class FishStoresModule {}
