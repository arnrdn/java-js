package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.DAO.UserRepository;

import javax.persistence.Id;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }


    @Override
    public void saveUser(User user) {
        User userDB = userRepository.findByEmail(user.getUsername());

        if (userDB == null) {
            User userToSave = new User(user.getUsername(), user.getName(), user.getLastName(), user.getAge(), passwordEncoder().encode(user.getPassword()), user.getRoles());
            userRepository.save(userToSave);
        }

    }

    @Override
    public void updateUser(User user) {
        User userDB = findById(user.getId());

        if (passwordEncoder().matches(user.getPassword(), userDB.getPassword())) {
            user.setPassword(userDB.getPassword());
        } else {
            user.setPassword(user.getPassword());
        }
        userRepository.save(user);
    }



    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with email '%s' not found", email));
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole())).collect(Collectors.toSet());
    }
}
