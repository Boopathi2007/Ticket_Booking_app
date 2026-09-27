package com.eventease.controller;

import com.eventease.dto.BookingRequest;
import com.eventease.model.Booking;
import com.eventease.service.BookingService;
import com.eventease.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * Booking endpoints:
 *   POST   /api/bookings              – create booking
 *   GET    /api/bookings/my           – current user's bookings
 *   DELETE /api/bookings/{id}/cancel  – cancel booking
 *   GET    /api/admin/bookings        – all bookings (admin)
 */
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired private BookingService bookingService;
    @Autowired private JwtUtil        jwtUtil;

    private Long getUserId(HttpServletRequest req) {
        String token = req.getHeader("Authorization").substring(7);
        return jwtUtil.extractUserId(token);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest req,
                                            HttpServletRequest httpReq) {
        try {
            Long userId = getUserId(httpReq);
            Booking booking = bookingService.createBooking(userId, req);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "bookingRef",   booking.getBookingRef(),
                    "bookingId",    booking.getId(),
                    "totalAmount",  booking.getTotalAmount(),
                    "status",       booking.getStatus(),
                    "message",      "Booking confirmed! Your tickets are ready."
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> myBookings(HttpServletRequest httpReq) {
        Long userId = getUserId(httpReq);
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, HttpServletRequest httpReq) {
        try {
            Long userId = getUserId(httpReq);
            bookingService.cancelBooking(id, userId);
            return ResponseEntity.ok(Map.of("message", "Booking cancelled and refund initiated."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
