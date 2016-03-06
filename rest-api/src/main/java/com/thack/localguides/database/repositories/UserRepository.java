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

    List<User> findByPositionNear(Point p, Distance d);
    User findByEmailAndPassword(String name, String password);
}
