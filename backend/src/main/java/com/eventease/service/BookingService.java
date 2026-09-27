package com.eventease.service;

import com.eventease.dto.BookingRequest;
import com.eventease.model.*;
import com.eventease.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Handles the full booking flow:
 * 1. Validate ticket availability
 * 2. Create Booking with PENDING status
 * 3. Process demo payment
 * 4. Confirm booking + deduct seats
 */
@Service
public class BookingService {

    @Autowired private BookingRepository  bookingRepo;
    @Autowired private EventRepository    eventRepo;
    @Autowired private TicketRepository   ticketRepo;
    @Autowired private UserRepository     userRepo;
    @Autowired private PaymentRepository  paymentRepo;

    @Transactional
    public Booking createBooking(Long userId, BookingRequest req) {

        User   user   = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Event  event  = eventRepo.findById(req.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        Ticket ticket = ticketRepo.findById(req.getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket type not found"));

        // Validate
        if (event.getAvailableSeats() < req.getQuantity()) {
            throw new RuntimeException("Not enough seats available. Only "
                    + event.getAvailableSeats() + " left.");
        }
        if (ticket.getAvailable() < req.getQuantity()) {
            throw new RuntimeException("Not enough tickets of this type. Only "
                    + ticket.getAvailable() + " left.");
        }

        BigDecimal total = ticket.getPrice().multiply(BigDecimal.valueOf(req.getQuantity()));

        // Generate unique booking reference
        String ref = generateBookingRef();

        // Create booking
        Booking booking = Booking.builder()
                .bookingRef(ref)
                .user(user)
                .event(event)
                .ticket(ticket)
                .quantity(req.getQuantity())
                .totalAmount(total)
                .status(Booking.BookingStatus.CONFIRMED)
                .bookedAt(LocalDateTime.now())
                .build();
        bookingRepo.save(booking);

        // Process demo payment
        Payment payment = Payment.builder()
                .booking(booking)
                .transactionRef("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .amount(total)
                .method(Payment.PaymentMethod.valueOf(req.getPaymentMethod()))
                .status(Payment.PaymentStatus.SUCCESS)
                .build();
        paymentRepo.save(payment);

        // Deduct seats
        event.setAvailableSeats(event.getAvailableSeats() - req.getQuantity());
        ticket.setSold(ticket.getSold() + req.getQuantity());
        eventRepo.save(event);
        ticketRepo.save(ticket);

        return booking;
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepo.findByUserIdOrderByBookedAtDesc(userId);
    }

    @Transactional
    public void cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: not your booking");
        }
        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        // Restore seats
        Event  event  = booking.getEvent();
        Ticket ticket = booking.getTicket();
        event.setAvailableSeats(event.getAvailableSeats() + booking.getQuantity());
        ticket.setSold(Math.max(0, ticket.getSold() - booking.getQuantity()));
        eventRepo.save(event);
        ticketRepo.save(ticket);

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setCancelledAt(LocalDateTime.now());
        bookingRepo.save(booking);

        // Mark payment as refunded
        Payment pay = paymentRepo.findByBookingId(bookingId).orElse(null);
        if (pay != null) {
            pay.setStatus(Payment.PaymentStatus.REFUNDED);
            paymentRepo.save(pay);
        }
    }

    private String generateBookingRef() {
        String ref;
        do {
            int num = (int)(Math.random() * 900000) + 100000;
            ref = "EVT-2026-" + num;
        } while (bookingRepo.existsByBookingRef(ref));
        return ref;
    }
}
