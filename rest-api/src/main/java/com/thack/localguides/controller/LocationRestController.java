package com.thack.localguides.controller;

import com.thack.localguides.database.entities.User;
import com.thack.localguides.database.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.geo.Box;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Component
@Path("location")
@EnableAutoConfiguration
public class LocationRestController {
    private static final double DEFAULT_RANGE = 5;
    @Autowired
    private UserRepository userRepository;

    /**
     * This endpoint is intended to return to the client list of available guides
     * based on current location of a person
     *
     * sample JS to test with jQuery
     * navigator.geolocation.getCurrentPosition(function (position){$.get('http://localhost:8080/api/location/guides/' + position.coords.latitude + '/' + position.coords.longitude, function (data) {console.log(data)});})
     *
     * http://localhost:8080/api/location/guides/52.5196530/13.3728780
     * @return
     */
    @GET
    @Path("guides/{lat}/{longitude}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Iterable<User> getGuides(@PathParam("lat") String lat,@PathParam("longitude") String longitude) {
        System.out.println(lat);
        System.out.println(longitude);
        return userRepository.findByPositionNear(new Point(Double.valueOf(lat), Double.valueOf(longitude)), new Distance(DEFAULT_RANGE, Metrics.KILOMETERS));
    }
}
