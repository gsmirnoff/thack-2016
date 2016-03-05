import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'guideInfo',
    templateUrl: 'guide_info/guideInfo.html'
})

export class GuideInfo {
    id: string;
    constructor(params: RouteParams, http:Http) {
        this.id = params.get('id');
        this.http = Http;

        this.loadGuide();
    }

    loadGuide() {
        var url = '/api/users/' + this.id;
        this.http.get(url)
            .subscribe(this.processGuide.bind(this));
    }

    processGuide(response) {
        this.guideData = response.json();
    }

}