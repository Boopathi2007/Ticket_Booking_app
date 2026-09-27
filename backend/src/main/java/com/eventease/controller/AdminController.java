package com.eventease.controller;

import com.eventease.model.*;
import com.eventease.repository.*;
import com.eventease.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * Admin dashboard endpoints – ROLE_ADMIN only.
 *   GET /api/admin/stats    – revenue, bookings, users, events
 *   GET /api/admin/users    – all users
 *   GET /api/admin/bookings – all bookings
 */
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired private EventService    eventService;
    @Autowired private UserRepository  userRepo;
    @Autowired private BookingRepository bookingRepo;

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalUsers",      userRepo.countByRole(User.Role.USER));
        stats.put("totalEvents",     eventService.getStats().get("totalEvents"));
        stats.put("upcomingEvents",  eventService.getStats().get("upcomingEvents"));
        stats.put("totalBookings",   bookingRepo.count());
        stats.put("confirmedBookings", bookingRepo.countByStatus(Booking.BookingStatus.CONFIRMED));
        stats.put("cancelledBookings", bookingRepo.countByStatus(Booking.BookingStatus.CANCELLED));
        stats.put("totalRevenue",    bookingRepo.totalRevenue());
        stats.put("ticketsSold",     eventService.getStats().get("ticketsSold"));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> users() {
        return ResponseEntity.ok(userRepo.findAll());
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> bookings() {
        return ResponseEntity.ok(bookingRepo.findAll());
    }

    @PutMapping("/users/{id}/toggle")
    public ResponseEntity<?> toggleUser(@PathVariable Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(!user.getIsActive());
        userRepo.save(user);
        return ResponseEntity.ok(Map.of(
                "message", "User " + (user.getIsActive() ? "activated" : "deactivated"),
                "isActive", user.getIsActive()
        ));
    }
}
