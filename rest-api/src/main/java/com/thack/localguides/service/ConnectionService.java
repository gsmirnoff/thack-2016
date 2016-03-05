package com.thack.localguides.service;

import com.pusher.rest.Pusher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Service
public class ConnectionService {

    private static final String REQUEST_CONNECTION = "request-connection";
    private static final String CONNECTION_DONE = "connection-done";

    private Pusher pusher;

    @Value("${pusher.appId}")
    private String appId;

    @Value("${pusher.apiKey}")
    private String apiKey;

    @Value("${pusher.apiSecret}")
    private String apiSecret;

    @PostConstruct
    public void init() {
        this.pusher = new Pusher(appId, apiKey, apiSecret);
    }

    private HashMap<String,String> establishConnectionRequests = new HashMap<String, String>();

    public void establishConnection(String from, String to) {
        pusher.trigger(to,REQUEST_CONNECTION,from);
        establishConnectionRequests.put(from,to);

//      notify clients that both have accepted connections and now we can chat
        if (establishConnectionRequests.containsKey(from) && establishConnectionRequests.containsKey(to)) {
            pusher.trigger(to,CONNECTION_DONE,from);
            pusher.trigger(from,CONNECTION_DONE,to);
        }
    }
}
