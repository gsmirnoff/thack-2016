package com.thack.localguides.controller;

import com.thack.localguides.database.entities.User;
import com.thack.localguides.database.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.ws.rs.*;
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
     * This endpoint is here for debugging and testing purposes only,
     * there is no plan so far to display all the users available in the system
     *
     * @return - list of all users available in the system
     */
    @GET
    @Path("all")
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
     * @return - specific user corresponding to provided ID
     */
    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public User getUser(@PathParam("id") String id) {
        return userRepository.findOne(id);
    }

    /**
     * This method is handling both save new user entity and update existing user entity
     * with new data set.
     *
     * Please note that update operation is performed based on id field in user entity
     *
     * curl -H "Content-Type: application/json" -X POST -d '{"firstName" : "JoeTest","lastName" : "BlackTest", "position" : [52.50023,13.40490]}' http://localhost:8080/api/users
     * @param toSave
     * @return
     */
    @POST
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public User createUser(User toSave) {
        return userRepository.save(toSave);
    }

    /**
     * This endpoint is here for convenience only, implementation is same as createUser
     *
     * curl -H "Content-Type: application/json" -X PUT -d '{"id":"56daef6d54504486af708c7a","firstName":"JoeTest1","lastName":"BlackTest1","position":[52.50023,13.4049]}' http://localhost:8080/api/users
     * @param toSave
     * @return
     */
    @PUT
    @Path("/")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    public User updateUser(User toSave) {
        return userRepository.save(toSave);
    }
}
