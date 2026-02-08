package com.expensetracker.repository;

import com.expensetracker.model.Category;
import com.expensetracker.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    List<Category> findByUserIdOrderByNameAsc(UUID userId);

    List<Category> findByUserIdAndTypeOrderByNameAsc(UUID userId, TransactionType type);

    Optional<Category> findByUserIdAndNameAndType(UUID userId, String name, TransactionType type);

    boolean existsByUserIdAndNameAndType(UUID userId, String name, TransactionType type);
}
