import {Component, View} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';
import {PusherService} from '../services/pusherService'
import 'rxjs/Rx';

@Component({
    selector: 'guideInfo',
    templateUrl: 'guide_info/guideInfo.html',
    providers: [PusherService]
})

export class GuideInfo {
    id: string;
    connectButtonText : string;
    nameText:string;

    constructor(params: RouteParams, http:Http,router:Router,pusherService:PusherService) {
        this.id = params.get('id');
        this.http = http;
        this.guideData = {};
        this.loadGuide();
        this.pusherService = pusherService;
        this.router = router;
        //  TODO: make sure we get current user ID from the local storage here
        this.myId = 1;
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
        this.connectionChannel = this.pusherService.getApi().subscribe('' + this.myId);
        this.connectionChannel.bind('connection-done', this.handleConnection.bind(this));

        var url = '/api/connection/establish/' + this.myId + '/' + this.guideData.id;
        console.log(url);
        this.http.get(url)
            .subscribe(function(e){});
    }

    handleConnection () {
        this.router.navigate(['Chat']);
    }

    updateConnectLabel () {
        this.connectButtonText = 'Connect with ' + this.guideData.name;
        this.nameText = this.guideData.name ? this.guideData.name : "" + " (" + this.guideData.age ? this.guideData.age : "" + ")";
    }

}
