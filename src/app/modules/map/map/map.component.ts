import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map: any;

  constructor(private mapService: MapService){}

  private initMap() : void{
    this.map = L.map('map', {
      center: [45.2496, 19.8227],
      zoom: 13
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    this.registerOnClick();
  }

  ngOnInit(): void{
    // this.mapService.startSelectedValue$.subscribe((value) => {
    //   const coord = value[0].latlng;
    //   const lat = coord.lat;
    //   const lng = coord.lng;
    //   const mp = new L.Marker([lat, lng]).addTo(this.map);
    // });

    // this.mapService.endSelectedValue$.subscribe((value) => {
    //   const coord = value[0].latlng;
    //   const lat = coord.lat;
    //   const lng = coord.lng;
    //   const mp = new L.Marker([lat, lng]).addTo(this.map);
    // });
  }



  //TODO Fill input fields with results of reverse search
  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
    });
  }


  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

}
