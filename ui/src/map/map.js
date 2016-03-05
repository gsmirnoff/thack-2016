import {Component, View, provide} from 'angular2/core';

import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
  selector: 'map'

})

@View({
  templateUrl: 'map/map.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class Map {

    constructor() {
        // google maps zoom level
        this.
            zoom = 8;

        // initial center position for the map
        this.lat = 51.673858;
        this.lng = 7.815982;
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'A',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'B',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'C',
                draggable: true
            }
        ];
    }

    clickedMarker(label, index) {
        window.alert('clicked the marker: ${label || index}');
        this.markers.splice(index, 1);
    }


    mapClicked($event) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng
        });
    }

    markerDragEnd(m, $event) {
        console.log('dragEnd', m, $event);
    }
}
