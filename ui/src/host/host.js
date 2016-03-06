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
    active:boolean;
    transport:boolean;
    constructor(params: RouteParams, http:Http,router:Router,pusherService:PusherService) {
        this.id = params.get('id');
        this.http = http;
        this.guideData = {};
        this.pusherService = pusherService;
        this.router = router;
        this.active = false;
        this.transport = false;
    }

    toggleActive () {
        this.active = !this.active;
        if (this.active) {
            this.connectionChannel = this.pusherService.getApi().subscribe('' + this.id);
            this.connectionChannel.bind('connection-done', this.handleConnectionDone.bind(this));
            this.connectionChannel.bind('request-connection', this.handleConnectionRequest.bind(this));
        } else {
            this.connectionChannel.unbind('connection-done', this.handleConnectionDone.bind(this));
            this.connectionChannel.unbind('request-connection', this.handleConnectionRequest.bind(this));
            this.connectionChannel = this.pusherService.getApi().unsubscribe('' + this.id);
        }
    }

    handleConnectionDone(){
        console.log('redirect to chat')
    }

    handleConnectionRequest(data) {
        console.log(data);

    }

    toggleTransport () {
        this.transport = !this.transport;
    }
}