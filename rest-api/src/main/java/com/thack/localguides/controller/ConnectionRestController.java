package com.thack.localguides.controller;

import com.pusher.rest.Pusher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Component
@Path("connection")
@EnableAutoConfiguration
public class ConnectionRestController {
    private static final String REQUEST_CONNECTION = "request-connection";

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

    /**
     * This method is intended to request connection from one user to another using pusher
     * API.
     *
     * to - user that has to accept connection, will be notified that user with specific ID
     * wants to connect to him. Can either accept that connection by providing corresponding
     * establish connection call, or request more information about user that requests connection
     * using proper API endpoint (/users/{id})
     *
     * from - user that is requesting connection to be established, his ID will be pushed to the user
     * who is destination point of this request in order to enable further operations.
     *
     * @return
     */
    @GET
    @Path("/establish/{from}/{to}")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public Response establishConnection(@PathParam("from") String from,@PathParam("to") String to) {
        pusher.trigger(to,REQUEST_CONNECTION,from);
        return Response.ok().build();
    }
}
