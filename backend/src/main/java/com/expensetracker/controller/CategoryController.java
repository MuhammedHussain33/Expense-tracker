package com.expensetracker.controller;

import com.expensetracker.config.JwtConfig;
import com.expensetracker.dto.ApiResponse;
import com.expensetracker.dto.CategoryRequest;
import com.expensetracker.model.Category;
import com.expensetracker.model.TransactionType;
import com.expensetracker.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final JwtConfig jwtConfig;

    private UUID getUserIdFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization header");
        }
        String token = authHeader.substring(7);
        return UUID.fromString(jwtConfig.getUserIdFromToken(token));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) TransactionType type) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            List<Category> categories;

            if (type != null) {
                categories = categoryService.getCategoriesByType(userId, type);
            } else {
                categories = categoryService.getAllCategoriesByUser(userId);
            }

            return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categories));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Error retrieving categories: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Category category = categoryService.getCategoryById(id, userId);
            return ResponseEntity.ok(ApiResponse.success("Category retrieved successfully", category));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Category not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Category>> createCategory(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CategoryRequest request) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Category category = categoryService.createCategory(request, userId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Category created successfully", category));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error creating category: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id,
            @RequestBody CategoryRequest request) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            Category category = categoryService.updateCategory(id, request, userId);
            return ResponseEntity.ok(ApiResponse.success("Category updated successfully", category));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error updating category: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable UUID id) {
        try {
            UUID userId = getUserIdFromHeader(authHeader);
            categoryService.deleteCategory(id, userId);
            return ResponseEntity.ok(ApiResponse.success("Category deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Error deleting category: " + e.getMessage()));
        }
    }
}
