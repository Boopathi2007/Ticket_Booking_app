package com.eventease.service;

import com.eventease.model.*;
import com.eventease.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Handles event retrieval, search/filter, and admin CRUD.
 */
@Service
public class EventService {

    @Autowired private EventRepository eventRepo;
    @Autowired private TicketRepository ticketRepo;

    // ---- Public ----

    public Page<Event> searchEvents(String keyword, String city, Integer categoryId,
                                    LocalDateTime fromDate, LocalDateTime toDate,
                                    int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by("eventDate").ascending());
        return eventRepo.searchEvents(keyword, city, categoryId, fromDate, toDate, pageable);
    }

    public List<Event> getAllUpcoming() {
        return eventRepo.findByStatus(Event.EventStatus.UPCOMING);
    }

    public Event getById(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public List<Ticket> getTicketsForEvent(Long eventId) {
        return ticketRepo.findByEventId(eventId);
    }

    // ---- Admin CRUD ----

    public Event createEvent(Event event) {
        event.setAvailableSeats(event.getTotalSeats());
        event.setCreatedAt(LocalDateTime.now());
        return eventRepo.save(event);
    }

    public Event updateEvent(Long id, Event updated) {
        Event existing = getById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCategoryId(updated.getCategoryId());
        existing.setOrganizer(updated.getOrganizer());
        existing.setVenue(updated.getVenue());
        existing.setCity(updated.getCity());
        existing.setState(updated.getState());
        existing.setEventDate(updated.getEventDate());
        existing.setEndDate(updated.getEndDate());
        existing.setImageUrl(updated.getImageUrl());
        existing.setTotalSeats(updated.getTotalSeats());
        existing.setStatus(updated.getStatus());
        return eventRepo.save(existing);
    }

    public void deleteEvent(Long id) {
        if (!eventRepo.existsById(id)) {
            throw new RuntimeException("Event not found");
        }
        eventRepo.deleteById(id);
    }

    public Map<String, Object> getStats() {
        return Map.of(
                "totalEvents",    eventRepo.count(),
                "upcomingEvents", eventRepo.countByStatus(Event.EventStatus.UPCOMING),
                "completedEvents",eventRepo.countByStatus(Event.EventStatus.COMPLETED),
                "ticketsSold",    eventRepo.totalTicketsSold()
        );
    }
}
