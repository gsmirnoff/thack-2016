import {Component, View} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {PusherService} from '../services/pusherService';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'host',
    templateUrl: 'host/host.html',
    providers: [PusherService]
})

export class HostStatus {

    constructor(params: RouteParams, http:Http,router:Router,pusherService:PusherService) {
        this.id = params.get('id');
        this.http = http;
        this.guideData = {};
        this.pusherService = pusherService;
        this.router = router;
    }
}