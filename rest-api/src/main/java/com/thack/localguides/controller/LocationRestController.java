package com.thack.localguides.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Component
@Path("location")
@EnableAutoConfiguration
public class LocationRestController {

    /**
     * This endpoint is intended to return to the client list of available guides
     * based on current location of a person
     *
     * sample JS to test with jQuery
     * navigator.geolocation.getCurrentPosition(function (position){$.get('http://localhost:8080/api/locations/guide/' + position.coords.latitude + '/' + position.coords.longitude, function (data) {console.log(data)});})
     * @return
     */
    @GET
    @Path("guides/{lat}/{longitude}")
    public Response getGuides(@PathParam("lat") String lat,@PathParam("longitude") String longitude) {
        System.out.println(lat);
        System.out.println(longitude);
        return Response.ok("ok").build();
    }
}
