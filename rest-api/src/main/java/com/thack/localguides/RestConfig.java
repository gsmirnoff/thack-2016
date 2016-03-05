package com.thack.localguides;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class RestConfig extends ResourceConfig {

    public RestConfig() {
        packages("com.thack.localguides.controller");
    }

}
