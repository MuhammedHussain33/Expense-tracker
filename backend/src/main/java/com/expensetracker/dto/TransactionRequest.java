package com.expensetracker.dto;

import com.expensetracker.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    private UUID categoryId;
    private BigDecimal amount;
    private TransactionType type;
    private String description;
    private LocalDate date;
}
