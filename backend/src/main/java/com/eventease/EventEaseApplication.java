package com.eventease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * EventEase – Online Event Registration and Ticket Booking Platform
 * Supports SDG 9: Industry, Innovation and Infrastructure
 */
@SpringBootApplication
public class EventEaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(EventEaseApplication.class, args);
        System.out.println("✅ EventEase backend started at http://localhost:8080/api");
    }
}
