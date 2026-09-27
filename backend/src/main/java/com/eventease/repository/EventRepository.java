package com.eventease.repository;

import com.eventease.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByStatus(Event.EventStatus status);

    @Query("SELECT e FROM Event e WHERE " +
           "(:keyword IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:city IS NULL OR LOWER(e.city) = LOWER(:city)) " +
           "AND (:categoryId IS NULL OR e.categoryId = :categoryId) " +
           "AND e.status = 'UPCOMING' " +
           "AND (:fromDate IS NULL OR e.eventDate >= :fromDate) " +
           "AND (:toDate IS NULL OR e.eventDate <= :toDate) " +
           "ORDER BY e.eventDate ASC")
    Page<Event> searchEvents(@Param("keyword")    String keyword,
                             @Param("city")       String city,
                             @Param("categoryId") Integer categoryId,
                             @Param("fromDate")   LocalDateTime fromDate,
                             @Param("toDate")     LocalDateTime toDate,
                             Pageable pageable);

    long countByStatus(Event.EventStatus status);

    @Query("SELECT SUM(e.totalSeats - e.availableSeats) FROM Event e")
    Long totalTicketsSold();
}
