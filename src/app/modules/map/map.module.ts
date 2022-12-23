import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SearchLocationsComponent } from './search-locations/search-locations.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LocationsPipePipe } from './locations-pipe.pipe';

@NgModule({
  declarations: [
    MapComponent,
    SearchLocationsComponent,
    LocationsPipePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    MapComponent,
    SearchLocationsComponent
  ]
})
export class MapModule { }