package com.expensetracker.service;

import com.expensetracker.model.Transaction;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final TemplateService templateService;

    public byte[] generateTransactionReport(String userEmail, List<Transaction> transactions, 
                                           LocalDate startDate, LocalDate endDate) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Calculate summary
            BigDecimal totalIncome = transactions.stream()
                    .filter(t -> t.getType().toString().equals("INCOME"))
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal totalExpense = transactions.stream()
                    .filter(t -> t.getType().toString().equals("EXPENSE"))
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal balance = totalIncome.subtract(totalExpense);

            // Title
            Paragraph title = new Paragraph("💰 Expense Tracker Report")
                    .setFontSize(24)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(10);
            document.add(title);

            // Date Range
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
            String dateRange = (startDate != null && endDate != null) 
                ? startDate.format(formatter) + " - " + endDate.format(formatter)
                : "All Time";
            
            Paragraph period = new Paragraph("Period: " + dateRange)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(5);
            document.add(period);

            Paragraph userInfo = new Paragraph("User: " + userEmail)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(userInfo);

            // Summary Section
            Paragraph summaryTitle = new Paragraph("📊 Financial Summary")
                    .setFontSize(16)
                    .setBold()
                    .setMarginBottom(10);
            document.add(summaryTitle);

            Table summaryTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .useAllAvailableWidth()
                    .setMarginBottom(20);

            // Income row
            summaryTable.addCell(new Cell().add(new Paragraph("💰 Total Income:").setBold())
                    .setBackgroundColor(new DeviceRgb(220, 252, 231)));
            summaryTable.addCell(new Cell().add(new Paragraph("₹" + totalIncome.toString()))
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(new DeviceRgb(220, 252, 231)));

            // Expense row
            summaryTable.addCell(new Cell().add(new Paragraph("💸 Total Expenses:").setBold())
                    .setBackgroundColor(new DeviceRgb(254, 226, 226)));
            summaryTable.addCell(new Cell().add(new Paragraph("₹" + totalExpense.toString()))
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(new DeviceRgb(254, 226, 226)));

            // Balance row
            DeviceRgb balanceColor = balance.compareTo(BigDecimal.ZERO) >= 0 
                ? new DeviceRgb(219, 234, 254) 
                : new DeviceRgb(254, 226, 226);
            summaryTable.addCell(new Cell().add(new Paragraph("📈 Balance:").setBold())
                    .setBackgroundColor(balanceColor));
            summaryTable.addCell(new Cell().add(new Paragraph("₹" + balance.toString()))
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBackgroundColor(balanceColor));

            document.add(summaryTable);

            // Category Breakdown
            if (!transactions.isEmpty()) {
                Map<String, BigDecimal> categoryBreakdown = transactions.stream()
                        .filter(t -> t.getCategoryId() != null)
                        .collect(Collectors.groupingBy(
                                t -> "Category " + t.getCategoryId().toString().substring(0, 8),
                                Collectors.mapping(Transaction::getAmount, 
                                        Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))
                        ));

                if (!categoryBreakdown.isEmpty()) {
                    Paragraph categoryTitle = new Paragraph("📂 Category Breakdown")
                            .setFontSize(16)
                            .setBold()
                            .setMarginBottom(10);
                    document.add(categoryTitle);

                    Table categoryTable = new Table(UnitValue.createPercentArray(new float[]{3, 1}))
                            .useAllAvailableWidth()
                            .setMarginBottom(20);

                    categoryTable.addHeaderCell(new Cell().add(new Paragraph("Category").setBold())
                            .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                    categoryTable.addHeaderCell(new Cell().add(new Paragraph("Amount").setBold())
                            .setTextAlignment(TextAlignment.RIGHT)
                            .setBackgroundColor(ColorConstants.LIGHT_GRAY));

                    categoryBreakdown.forEach((category, amount) -> {
                        categoryTable.addCell(new Cell().add(new Paragraph(category)));
                        categoryTable.addCell(new Cell().add(new Paragraph("₹" + amount.toString()))
                                .setTextAlignment(TextAlignment.RIGHT));
                    });

                    document.add(categoryTable);
                }
            }

            // Transactions Table
            Paragraph transactionsTitle = new Paragraph("📝 Transaction Details")
                    .setFontSize(16)
                    .setBold()
                    .setMarginBottom(10);
            document.add(transactionsTitle);

            if (transactions.isEmpty()) {
                Paragraph noData = new Paragraph("No transactions found for this period.")
                        .setFontSize(12)
                        .setItalic()
                        .setTextAlignment(TextAlignment.CENTER);
                document.add(noData);
            } else {
                Table table = new Table(UnitValue.createPercentArray(new float[]{2, 1, 3, 1}))
                        .useAllAvailableWidth();

                // Header
                table.addHeaderCell(new Cell().add(new Paragraph("Date").setBold())
                        .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                table.addHeaderCell(new Cell().add(new Paragraph("Type").setBold())
                        .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                table.addHeaderCell(new Cell().add(new Paragraph("Description").setBold())
                        .setBackgroundColor(ColorConstants.LIGHT_GRAY));
                table.addHeaderCell(new Cell().add(new Paragraph("Amount").setBold())
                        .setTextAlignment(TextAlignment.RIGHT)
                        .setBackgroundColor(ColorConstants.LIGHT_GRAY));

                // Rows
                for (Transaction transaction : transactions) {
                    table.addCell(new Cell().add(new Paragraph(
                            transaction.getDate().format(formatter))));
                    
                    Cell typeCell = new Cell().add(new Paragraph(transaction.getType().toString()));
                    if (transaction.getType().toString().equals("INCOME")) {
                        typeCell.setBackgroundColor(new DeviceRgb(220, 252, 231));
                    } else {
                        typeCell.setBackgroundColor(new DeviceRgb(254, 226, 226));
                    }
                    table.addCell(typeCell);
                    
                    table.addCell(new Cell().add(new Paragraph(
                            transaction.getDescription() != null ? transaction.getDescription() : "-")));
                    
                    String amountStr = (transaction.getType().toString().equals("INCOME") ? "+" : "-") 
                            + "₹" + transaction.getAmount().toString();
                    table.addCell(new Cell().add(new Paragraph(amountStr))
                            .setTextAlignment(TextAlignment.RIGHT));
                }

                document.add(table);
            }

            // Footer
            Paragraph footer = new Paragraph("\n\nGenerated on: " + LocalDate.now().format(formatter))
                    .setFontSize(8)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginTop(20);
            document.add(footer);

            Paragraph footerNote = new Paragraph("Thank you for using Expense Tracker! 🎉")
                    .setFontSize(8)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setItalic();
            document.add(footerNote);

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF: " + e.getMessage());
        }
    }
}
