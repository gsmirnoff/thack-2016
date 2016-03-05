package com.thack.localguides.database.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Data
public class User {
    @Id
    private String id;

    private String firstName;
    private String lastName;
    private double[] position;

    public User() {}

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}
