import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'guideInfo',
    templateUrl: 'guide_info/guideInfo.html'
})

export class GuideInfo {
    id: string;
    connectButtonText : string;
    nameText:string;
    constructor(params: RouteParams, http:Http) {
        this.id = params.get('id');
        this.http = http;
        this.guideData = {};
        this.loadGuide();
    }

    loadGuide() {
        var url = '/api/users/' + this.id;
        this.http.get(url)
            .subscribe(this.processGuide.bind(this));
    }

    processGuide(response) {
        this.guideData = response.json();
        console.log(this.guideData);
        this.updateConnectLabel();
    }

    onConnect () {
        console.log("connecting");
    }

    updateConnectLabel () {
        this.connectButtonText = 'Connect with ' + this.guideData.name;
        this.nameText = this.guideData.name ? this.guideData.name : "" + " (" + this.guideData.age ? this.guideData.age : "" + ")";
    }

}