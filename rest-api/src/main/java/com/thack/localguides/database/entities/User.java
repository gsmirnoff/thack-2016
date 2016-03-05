package com.thack.localguides.database.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

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
    private String password;
    private List<String> interests;
    private List<String> languages;
    private List<String> badges;
    private String bio;

    private String role;
    private String status;

    public User() {}

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}
