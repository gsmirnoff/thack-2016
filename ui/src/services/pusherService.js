import 'rxjs/Rx';

export class PusherService {
    constructor() {
        // Enable pusher logging - don't include this in production
        Pusher.log = function(message) {
            if (window.console && window.console.log) {
                window.console.log(message);
            }
        };
        let pusher = new Pusher('6f8e28ffde924531da1b', {
            cluster: 'eu',
            encrypted: true
        });
        this.pusher = pusher;
    }

    getApi() {
        return this.pusher;
    }
}
