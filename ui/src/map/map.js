import {Component, View, provide} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/Rx';


@Component({
  selector: 'map'

})

@View({
  templateUrl: 'map/map.html'
})

export class Map {
    constructor(http: Http) {
        console.log(http);
        this.http = http;
        // google maps zoom level
        this.zoom = 8;
        this.markers = [];

        navigator.geolocation.getCurrentPosition(this.setCurrentLocationFromBrowser.bind(this));
    }

    setCurrentLocationFromBrowser(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.loadMarkers();
        this.processMarkers();
    }

    loadMarkers() {
        var url = '/api/location/guides/' + this.lat + '/' + this.lng;
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                data => this.markers = data,
                err => this.logError(err),
                () => console.log('getting guides Complete')
            );
    }

    processMarkers() {
        this.loadMap()
    }

    loadMap() {
        let latLng = new google.maps.LatLng(this.lat, this.lng);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
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
