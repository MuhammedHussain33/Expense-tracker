package com.expensetracker.service;

import com.expensetracker.dto.CategoryRequest;
import com.expensetracker.model.Category;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategoriesByUser(UUID userId) {
        return categoryRepository.findByUserIdOrderByNameAsc(userId);
    }

    public List<Category> getCategoriesByType(UUID userId, TransactionType type) {
        return categoryRepository.findByUserIdAndTypeOrderByNameAsc(userId, type);
    }

    public Category getCategoryById(UUID id, UUID userId) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        if (!category.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to category");
        }
        
        return category;
    }

    @Transactional
    public Category createCategory(CategoryRequest request, UUID userId) {
        if (categoryRepository.existsByUserIdAndNameAndType(userId, request.getName(), request.getType())) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();
        category.setUserId(userId);
        category.setName(request.getName());
        category.setType(request.getType());
        
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(UUID id, CategoryRequest request, UUID userId) {
        Category category = getCategoryById(id, userId);
        
        if (!category.getName().equals(request.getName()) || 
            !category.getType().equals(request.getType())) {
            if (categoryRepository.existsByUserIdAndNameAndType(userId, request.getName(), request.getType())) {
                throw new RuntimeException("Category with this name and type already exists");
            }
        }
        
        category.setName(request.getName());
        category.setType(request.getType());
        
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(UUID id, UUID userId) {
        Category category = getCategoryById(id, userId);
        categoryRepository.delete(category);
    }
}
