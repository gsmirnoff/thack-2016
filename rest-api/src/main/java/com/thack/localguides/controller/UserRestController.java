package com.thack.localguides.controller;

import com.thack.localguides.database.entities.User;
import com.thack.localguides.database.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Component
@Path("users")
@EnableAutoConfiguration
public class UserRestController {
    @Autowired
    private UserRepository userRepository;

    /**
     *
     * @return
     */
    @GET
    @Path("guides")
    @Produces({ MediaType.APPLICATION_JSON })
    public Iterable<User> getGuides() {
        return userRepository.findAll();
    }

    /**
     * This method is used to obtain detailed information about specific user in the szstem.
     * can be used on following flows:
     *  - guide see more information about specific users that have booked contact with him
     *  - tourist see more information about the guide near him
     *
     * @return
     */
    @GET
    @Path("guide/{id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public User getUser(@PathParam("id") String id) {
        return userRepository.findOne(id);
    }
}
