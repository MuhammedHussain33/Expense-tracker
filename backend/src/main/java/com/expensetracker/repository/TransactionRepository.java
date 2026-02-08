package com.expensetracker.repository;

import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    List<Transaction> findByUserIdOrderByDateDesc(UUID userId);

    List<Transaction> findByUserIdAndDateBetweenOrderByDateDesc(
            UUID userId, LocalDate startDate, LocalDate endDate);

    List<Transaction> findByUserIdAndTypeOrderByDateDesc(
            UUID userId, TransactionType type);

    @Query("SELECT t FROM Transaction t WHERE t.userId = :userId AND " +
           "(:type IS NULL OR t.type = :type) AND " +
           "(:categoryId IS NULL OR t.categoryId = :categoryId) AND " +
           "(:startDate IS NULL OR t.date >= :startDate) AND " +
           "(:endDate IS NULL OR t.date <= :endDate) " +
           "ORDER BY t.date DESC")
    List<Transaction> findByFilters(
            @Param("userId") UUID userId,
            @Param("type") TransactionType type,
            @Param("categoryId") UUID categoryId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
