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
        this.markerPins = [];

        navigator.geolocation.getCurrentPosition(this.setCurrentLocationFromBrowser.bind(this));
    }

    setCurrentLocationFromBrowser(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.loadMarkers();
    }

    loadMarkers() {
        var url = '/api/location/guides/' + this.lat + '/' + this.lng;
        this.http.get(url)
            .subscribe(this.processMarkers.bind(this));
    }

    processMarkers(response) {
        this.markers = response.json();
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

        var myIcon = {
            url: "/img/map_pin_red.svg",
            fillOpacity: 0.8,
            scale: 0.1
        };

        this.myMarker = new google.maps.Marker({
            map: this.map,
            icon: myIcon,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

//      add guides
        for (let i = 0; i < this.markers.length; i++) {
            let marker = this.markers[i];
            var guideIcon = {
                url: "/img/map_pin_green.svg",
                fillOpacity: 0.8,
                scale: 0.1
            };

            let markerPin = new google.maps.Marker({
                map: this.map,
                icon : guideIcon,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(marker.position[0], marker.position[1])
            });
            this.addInfoWindow(markerPin, marker);
            this.markerPins.push(markerPin);
        }

    }

    addInfoWindow (markerPin, info) {
        let infoWindow = new google.maps.InfoWindow({
            content: info.description
        });

        google.maps.event.addListener(markerPin, 'click', function(){
            infoWindow.open(this.map, markerPin);
        });
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
