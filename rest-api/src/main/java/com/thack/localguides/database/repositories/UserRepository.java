package com.thack.localguides.database.repositories;

import com.thack.localguides.database.entities.User;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by aakhmerov on 05.03.16.
 */
public interface UserRepository extends MongoRepository<User, String> {

    public User findByFirstName(String firstName);
    public List<User> findByLastName(String lastName);

    List<User> findByPositionNear(Point p, Distance d);
}
