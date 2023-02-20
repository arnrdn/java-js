package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("")
public class MainController {
    private final UserService userService;
    private final RoleService roleService;

    public MainController(RoleService roleService, UserService userService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String index() {
        return "redirect:/login";
    }

    @GetMapping("/admin")
    public String adminIndex(ModelMap model, Principal principal) {
        User admin = userService.findByEmail(principal.getName());
        model.addAttribute("admin", admin);
        List<Role> roles = roleService.findAll();
        model.addAttribute("roles", roles);
        return "admin";
    }

    @GetMapping("/user")
    public String userIndex(ModelMap model, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        model.addAttribute("user", user);
        return "user";
    }
}
