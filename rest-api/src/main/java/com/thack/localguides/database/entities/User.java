package com.thack.localguides.database.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.data.annotation.Id;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by aakhmerov on 05.03.16.
 */
@JsonAutoDetect
public class User {
    @Id
    private String id;

    private String firstName;
    private String lastName;

    public User() {}

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "User[id=%s, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }
}
