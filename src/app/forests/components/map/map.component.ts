import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IForest } from '../../../core/models/forest';
import { IParcel } from '../../../core/models/parcel';
import { Area } from '../../../core/models/area';
import { Subject } from 'rxjs/Subject';

const COLORS = {
  conserved : '#9b9b9b',
  unconserved : '#b8e986'
}

@Component({
  selector: 'conserve-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('map') mapRef: ElementRef;

  @Input() forest: IForest;

  map: any;

  @Output() parcelClick = new Subject<IParcel>();

  constructor() {
  }

  ngOnInit() {
    // if (!map) {
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      mapTypeControl : false,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      streetViewControl: false
    });
    // }

    this.forest.parcels.forEach(parcel => this.drawParcel(parcel));
    this.setupView(this.forest.parcels);

  }

  ngOnDestroy(): void {
    // this.map.
  }

  /**
   * Draws parcel on the map
   * @param {IParcel} parcel
   */
  private drawParcel(parcel: IParcel) {
    const area = new Area(parcel.area);
    const polygon = new google.maps.Polygon({
      paths: area.asLatLng(),
      strokeColor: COLORS.conserved,
      strokeWeight: 1,
      fillColor: parcel.transactions.length ? COLORS.conserved : COLORS.unconserved,
      fillOpacity: 0.76
    });
    polygon.setMap(this.map);

    google.maps.event.addListener(polygon, 'click', (...args) => {
      this.parcelClick.next(parcel);
    });
  }

  /**
   * Setups map view - centers map and apply correct zoom level
   * @param {IParcel[]} parcels
   */
  private setupView(parcels: IParcel[]) {
    const points = [].concat(...parcels.map(p => new Area(p.area).asLatLng()));
    const lat0 = Math.max(...points.map(p => p.lat));
    const lng0 = Math.max(...points.map(p => p.lng));
    const lat1 = Math.min(...points.map(p => p.lat));
    const lng1 = Math.min(...points.map(p => p.lng));

    this.map.setCenter({lat: (lat0 + lat1) / 2, lng: (lng0 + lng1) / 2});


    const zoom = this.getBoundsZoomLevel({lat: lat0, lng: lng0}, {lat: lat1, lng: lng1}, {
      width: 900,
      height: 500
    });

    this.map.setZoom(zoom);
  }

  /**
   * Returns zoom level that should be applied to view bounds specified by ne, sw coordinates
   * @param ne
   * @param sw
   * @param mapSize
   * @returns {number}
   */
  private getBoundsZoomLevel(ne, sw, mapSize) {
    const GOOGLE_WIDTH = 256;
    const GOOGLE_HEIGHT = 256;
    const GOOGLE_MAX_ZOOM = 21;

    const latFrq = (ne.lat - sw.lat) / 180;
    const lngFrq = (ne.lng - sw.lng) / 360;

    const zoom = (googleSize, mapSize, fraction) =>
      Math.floor(Math.log(mapSize / googleSize / fraction) / Math.LN2);

    return Math.min(
      zoom(GOOGLE_WIDTH, mapSize.width, lngFrq),
      zoom(GOOGLE_HEIGHT, mapSize.height, latFrq),
      GOOGLE_MAX_ZOOM
    );
  }
}
