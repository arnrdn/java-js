package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(Long id);

    User findById(Long id);

    User findByEmail(String email);

    User loadCurrUser();
    void setUserRoles(User user);



}
