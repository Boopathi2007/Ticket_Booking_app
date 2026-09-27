package com.eventease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Event entity – stores all event details.
 */
@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event title is required")
    @Size(min = 5, max = 200)
    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    private String description;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(length = 150)
    private String organizer;

    @NotBlank(message = "Venue is required")
    @Column(nullable = false, length = 300)
    private String venue;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @NotNull(message = "Event date is required")
    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Min(1)
    @Column(name = "total_seats", nullable = false)
    @Builder.Default
    private Integer totalSeats = 100;

    @Min(0)
    @Column(name = "available_seats", nullable = false)
    @Builder.Default
    private Integer availableSeats = 100;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EventStatus status = EventStatus.UPCOMING;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // Transient: loaded separately
    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Ticket> tickets;

    public enum EventStatus { UPCOMING, ONGOING, COMPLETED, CANCELLED }
}
