package com.eventease.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/** DTO for creating a new booking */
@Data
public class BookingRequest {

    @NotNull(message = "Event ID is required")
    private Long eventId;

    @NotNull(message = "Ticket ID is required")
    private Long ticketId;

    @NotNull @Min(value = 1) @Max(value = 10)
    private Integer quantity;

    @NotBlank
    private String paymentMethod; // CARD, UPI, NETBANKING, WALLET

    // For demo payment - not persisted in real money
    private String cardNumber;
    private String cardExpiry;
    private String cardCvv;
    private String upiId;
}
