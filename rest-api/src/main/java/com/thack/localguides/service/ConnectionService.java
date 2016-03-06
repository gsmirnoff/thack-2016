package com.thack.localguides.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pusher.rest.Pusher;
import com.pusher.rest.data.Result;
import com.thack.localguides.database.entities.User;
import com.thack.localguides.database.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRepository userRepository;

    private ObjectMapper om = new ObjectMapper();

    @PostConstruct
    public void init() {
        this.pusher = new Pusher(appId, apiKey, apiSecret);
        pusher.setHost("api-eu.pusher.com");

    }

    private HashMap<String,String> establishConnectionRequests = new HashMap<String, String>();

    public void establishConnection(String from, String to) {
        User fromUser = userRepository.findOne(from);
        if (fromUser == null) {
            fromUser = userRepository.findAll().get(0);
        }
        String json = null;
        try {
            json = om.writeValueAsString(fromUser);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        Result r = pusher.trigger(to,REQUEST_CONNECTION,json);
        establishConnectionRequests.put(from,to);

//      notify clients that both have accepted connections and now we can chat
        if (establishConnectionRequests.containsKey(from) && establishConnectionRequests.containsKey(to)) {
            pusher.trigger(to,CONNECTION_DONE,from);
            pusher.trigger(from,CONNECTION_DONE,to);
        }
    }
}
