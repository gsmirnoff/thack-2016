package com.thack.localguides.controller;

import com.thack.localguides.AuthResponse;
import com.thack.localguides.database.entities.User;
import com.thack.localguides.database.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Component
@Path("auth")
@EnableAutoConfiguration
public class AuthenticationRestController {

    @Autowired
    private UserRepository userRepository;

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    public Response authenticate(@RequestBody User user) {
        User found = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (found != null) {
            return Response.ok(new AuthResponse(found.getId(), UUID.randomUUID().toString())).build();
        } else {
            return Response.notAcceptable(null).build();
        }
    }

}
