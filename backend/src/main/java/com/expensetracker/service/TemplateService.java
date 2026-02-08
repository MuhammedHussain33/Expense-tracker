package com.expensetracker.service;

import com.samskivert.mustache.Mustache;
import com.samskivert.mustache.Template;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final Mustache.Compiler mustacheCompiler;

    private String renderTemplate(String templateName, Map<String, Object> context) {
        try {
            Reader reader = new InputStreamReader(
                    getClass().getResourceAsStream("/templates/" + templateName + ".mustache"));
            Template template = mustacheCompiler.compile(reader);
            return template.execute(context);
        } catch (Exception e) {
            throw new RuntimeException("Error rendering template: " + e.getMessage());
        }
    }

    public String generateWelcomeMessage(String userName) {
        Map<String, Object> context = new HashMap<>();
        context.put("userName", userName);
        return renderTemplate("welcome", context);
    }

    public String generateTransactionSuccessMessage(String transactionType, String amount, String description) {
        Map<String, Object> context = new HashMap<>();
        context.put("transactionType", transactionType);
        context.put("amount", amount);
        context.put("description", description);
        return renderTemplate("transaction-success", context);
    }

    public String generateTransactionUpdateMessage(String transactionType, String amount) {
        Map<String, Object> context = new HashMap<>();
        context.put("transactionType", transactionType);
        context.put("amount", amount);
        return renderTemplate("transaction-update", context);
    }

    public String generateTransactionDeleteMessage() {
        return renderTemplate("transaction-delete", new HashMap<>());
    }

    public String generateExpenseThresholdMessage(String transactionType, BigDecimal amount) {
        Map<String, Object> context = new HashMap<>();
        context.put("transactionType", transactionType);
        context.put("amount", amount.toString());
        context.put("isExpense", transactionType.equals("EXPENSE"));
        
        // Threshold logic: 10000
        if (amount.compareTo(new BigDecimal("10000")) < 0) {
            return renderTemplate("expense-threshold-good", context);
        } else {
            return renderTemplate("expense-threshold-high", context);
        }
    }

    public String generateMonthlyReport(String userName, Month month, int year,
                                       BigDecimal totalIncome, BigDecimal totalExpense,
                                       BigDecimal balance, Map<String, BigDecimal> categoryBreakdown,
                                       int transactionCount) {
        Map<String, Object> context = new HashMap<>();
        context.put("userName", userName);
        context.put("month", month.toString());
        context.put("year", year);
        context.put("totalIncome", totalIncome.toString());
        context.put("totalExpense", totalExpense.toString());
        context.put("balance", balance.toString());
        context.put("transactionCount", transactionCount);

        List<Map<String, String>> categories = categoryBreakdown.entrySet().stream()
                .map(entry -> {
                    Map<String, String> cat = new HashMap<>();
                    cat.put("name", entry.getKey());
                    cat.put("amount", entry.getValue().toString());
                    return cat;
                })
                .toList();
        context.put("categories", categories);

        if (balance.compareTo(BigDecimal.ZERO) > 0) {
            context.put("tips", "Great job! You have a positive balance this month.");
        } else if (balance.compareTo(BigDecimal.ZERO) < 0) {
            context.put("tips", "Consider reviewing your expenses to improve your balance.");
        }

        return renderTemplate("monthly-report", context);
    }
}
