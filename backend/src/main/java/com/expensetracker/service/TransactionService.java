package com.expensetracker.service;

import com.expensetracker.dto.TransactionRequest;
import com.expensetracker.dto.TransactionSummary;
import com.expensetracker.model.Category;
import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.CategoryRepository;
import com.expensetracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;

    public List<Transaction> getAllTransactionsByUser(UUID userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }

    public List<Transaction> getTransactionsByFilters(
            UUID userId, TransactionType type, UUID categoryId,
            LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByFilters(userId, type, categoryId, startDate, endDate);
    }

    public Transaction getTransactionById(UUID id, UUID userId) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to transaction");
        }
        
        return transaction;
    }

    @Transactional
    public Transaction createTransaction(TransactionRequest request, UUID userId) {
        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setCategoryId(request.getCategoryId());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate() != null ? request.getDate() : LocalDate.now());
        
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction updateTransaction(UUID id, TransactionRequest request, UUID userId) {
        Transaction transaction = getTransactionById(id, userId);
        
        transaction.setCategoryId(request.getCategoryId());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate());
        
        return transactionRepository.save(transaction);
    }

    @Transactional
    public void deleteTransaction(UUID id, UUID userId) {
        Transaction transaction = getTransactionById(id, userId);
        transactionRepository.delete(transaction);
    }

    public TransactionSummary getTransactionSummary(UUID userId, LocalDate startDate, LocalDate endDate) {
        List<Transaction> transactions;
        
        if (startDate != null && endDate != null) {
            transactions = transactionRepository.findByUserIdAndDateBetweenOrderByDateDesc(
                    userId, startDate, endDate);
        } else {
            transactions = transactionRepository.findByUserIdOrderByDateDesc(userId);
        }

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpense = BigDecimal.ZERO;
        Map<String, BigDecimal> categoryBreakdown = new HashMap<>();

        for (Transaction transaction : transactions) {
            if (transaction.getType() == TransactionType.INCOME) {
                totalIncome = totalIncome.add(transaction.getAmount());
            } else {
                totalExpense = totalExpense.add(transaction.getAmount());
            }

            if (transaction.getCategoryId() != null) {
                Category category = categoryRepository.findById(transaction.getCategoryId())
                        .orElse(null);
                if (category != null) {
                    String categoryName = category.getName();
                    categoryBreakdown.put(categoryName, 
                            categoryBreakdown.getOrDefault(categoryName, BigDecimal.ZERO)
                                    .add(transaction.getAmount()));
                }
            }
        }

        BigDecimal balance = totalIncome.subtract(totalExpense);

        TransactionSummary summary = new TransactionSummary();
        summary.setTotalIncome(totalIncome);
        summary.setTotalExpense(totalExpense);
        summary.setBalance(balance);
        summary.setCategoryBreakdown(categoryBreakdown);
        summary.setTransactionCount(transactions.size());

        return summary;
    }
}
