package com.thack.localguides.database.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * Created by aakhmerov on 05.03.16.
 */
@Data
public class User {
    @Id
    private String id;

    private String name;
    private String email;
    private double[] position;
    private String password;
    private String address;
    private List<String> interests;
    private List<String> languages;
    private List<String> badges;
    private String bio;

    private String role;
    private String status;

}
