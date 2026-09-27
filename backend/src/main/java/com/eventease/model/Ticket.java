package com.eventease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

/**
 * Ticket entity – represents a ticket type for an event (General, VIP, etc.)
 */
@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    @ToString.Exclude
    private Event event;

    @NotBlank(message = "Ticket type name is required")
    @Column(name = "type_name", nullable = false, length = 100)
    private String typeName;

    @NotNull
    @DecimalMin(value = "0.00")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Min(1)
    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    @Builder.Default
    private Integer sold = 0;

    @Column(length = 300)
    private String description;

    /**
     * Convenience method to check availability.
     */
    public int getAvailable() {
        return quantity - sold;
    }

    public boolean isAvailable() {
        return getAvailable() > 0;
    }
}
