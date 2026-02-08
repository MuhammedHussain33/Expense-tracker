package com.expensetracker.controller;

import com.expensetracker.config.JwtConfig;
import com.expensetracker.dto.ApiResponse;
import com.expensetracker.dto.TransactionRequest;
import com.expensetracker.dto.TransactionSummary;
import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.service.PdfService;
import com.expensetracker.service.TemplateService;
import com.expensetracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final TemplateService templateService;
    private final PdfService pdfService;
    private final JwtConfig jwtConfig;

    private UUID getUserIdFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization header");
        }
        String token = authHeader.substring(7);
        return UUID.fromString(jwtConfig.getUserIdFromToken(token));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Transaction>>> getAllTransactions(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            List<Transaction> transactions;

            if (type != null || categoryId != null || startDate != null || endDate != null) {
                transactions = transactionService.getTransactionsByFilters(
                        userId, type, categoryId, startDate, endDate);
            } else {
                transactions = transactionService.getAllTransactionsByUser(userId);
            }

            return ResponseEntity.ok(ApiResponse.success("Transactions retrieved successfully", transactions));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving transactions: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Transaction>> getTransactionById(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Transaction transaction = transactionService.getTransactionById(id, userId);
            return ResponseEntity.ok(ApiResponse.success("Transaction retrieved successfully", transaction));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Transaction not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, String>>> createTransaction(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody TransactionRequest request) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Transaction transaction = transactionService.createTransaction(request, userId);
            
            String successMessage = templateService.generateTransactionSuccessMessage(
                    transaction.getType().toString(),
                    transaction.getAmount().toString(),
                    transaction.getDescription());
            
            // Generate threshold advice message
            String adviceMessage = templateService.generateExpenseThresholdMessage(
                    transaction.getType().toString(),
                    transaction.getAmount());

            // Return both messages in custom response
            Map<String, String> data = new HashMap<>();
            data.put("id", transaction.getId().toString());
            data.put("adviceMessage", adviceMessage);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(successMessage, data));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error creating transaction: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, String>>> updateTransaction(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id,
            @RequestBody TransactionRequest request) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Transaction transaction = transactionService.updateTransaction(id, request, userId);
            
            String successMessage = templateService.generateTransactionUpdateMessage(
                    transaction.getType().toString(),
                    transaction.getAmount().toString());

            // Generate threshold advice message
            String adviceMessage = templateService.generateExpenseThresholdMessage(
                    transaction.getType().toString(),
                    transaction.getAmount());

            // Return both messages in custom response
            Map<String, String> data = new HashMap<>();
            data.put("id", transaction.getId().toString());
            data.put("adviceMessage", adviceMessage);

            return ResponseEntity.ok(ApiResponse.success(successMessage, data));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error updating transaction: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTransaction(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            transactionService.deleteTransaction(id, userId);
            
            String message = templateService.generateTransactionDeleteMessage();

            return ResponseEntity.ok(ApiResponse.success(message, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error deleting transaction: " + e.getMessage()));
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<TransactionSummary>> getTransactionSummary(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            TransactionSummary summary = transactionService.getTransactionSummary(userId, startDate, endDate);
            return ResponseEntity.ok(ApiResponse.success("Summary retrieved successfully", summary));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving summary: " + e.getMessage()));
        }
    }

    @GetMapping("/download/pdf")
    public ResponseEntity<byte[]> downloadPdfReport(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            String token = authHeader.substring(7);
            String userEmail = jwtConfig.verifyToken(token).getClaim("email").asString();
            
            // Get transactions
            List<Transaction> transactions;
            if (startDate != null || endDate != null) {
                transactions = transactionService.getTransactionsByFilters(
                        userId, null, null, startDate, endDate);
            } else {
                transactions = transactionService.getAllTransactionsByUser(userId);
            }

            // Generate PDF
            byte[] pdfBytes = pdfService.generateTransactionReport(userEmail, transactions, startDate, endDate);

            // Create filename
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String filename = "expense-tracker-report-" + LocalDate.now().format(formatter) + ".pdf";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", filename);
            headers.setContentLength(pdfBytes.length);

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
