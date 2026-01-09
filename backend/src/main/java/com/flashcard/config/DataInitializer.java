package com.flashcard.config;

import com.flashcard.model.Question;
import com.flashcard.model.Topic;
import com.flashcard.repository.QuestionRepository;
import com.flashcard.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Проверяем, есть ли уже данные
        if (topicRepository.count() > 0) {
            log.info("База данных уже содержит данные. Пропускаем инициализацию.");
            return;
        }
        
        log.info("Начинаем инициализацию данных из Excel файла...");
        
        try {
            ClassPathResource resource = new ClassPathResource("initial-data.xlsx");
            if (!resource.exists()) {
                log.warn("Файл initial-data.xlsx не найден. Пропускаем инициализацию.");
                return;
            }
            
            InputStream inputStream = resource.getInputStream();
            Workbook workbook = WorkbookFactory.create(inputStream);
            
            // Создаем тему "Методичка"
            Topic topic = new Topic();
            topic.setName("Методичка");
            topic.setDescription("Вопросы из методички");
            topic = topicRepository.save(topic);
            log.info("Создана тема: {}", topic.getName());
            
            int totalQuestionCount = 0;
            
            // Обрабатываем все листы
            for (int sheetIndex = 0; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
                Sheet sheet = workbook.getSheetAt(sheetIndex);
                String sheetName = sheet.getSheetName();
                
                // Создаем тему для каждого листа (если название не пустое)
                Topic sheetTopic = topic;
                if (sheetName != null && !sheetName.trim().isEmpty() && !sheetName.equalsIgnoreCase("Sheet1")) {
                    Topic existingTopic = topicRepository.findByName(sheetName).orElse(null);
                    if (existingTopic == null) {
                        sheetTopic = new Topic();
                        sheetTopic.setName(sheetName);
                        sheetTopic.setDescription("Вопросы из листа: " + sheetName);
                        sheetTopic = topicRepository.save(sheetTopic);
                        log.info("Создана тема из листа: {}", sheetName);
                    } else {
                        sheetTopic = existingTopic;
                    }
                }
                
                int sheetQuestionCount = 0;
                
                // Пропускаем заголовок (первая строка)
                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row row = sheet.getRow(i);
                    if (row == null) continue;
                    
                    // Читаем вопрос (первая колонка) и ответ (вторая колонка)
                    Cell questionCell = row.getCell(0);
                    Cell answerCell = row.getCell(1);
                    
                    String questionText = getCellValueAsString(questionCell);
                    String answerText = getCellValueAsString(answerCell);
                    
                    // Пропускаем пустые строки
                    if (questionText == null || questionText.trim().isEmpty()) {
                        continue;
                    }
                    
                    // Если нет ответа, используем пустую строку
                    if (answerText == null || answerText.trim().isEmpty()) {
                        answerText = "";
                    }
                    
                    // Создаем вопрос
                    Question question = new Question();
                    question.setQuestionText(questionText.trim());
                    question.setCorrectAnswer(answerText.trim());
                    question.setTopic(sheetTopic);
                    question.setNextReview(LocalDateTime.now());
                    question.setReviewCount(0);
                    question.setEaseFactor(2.5);
                    question.setIntervalDays(1);
                    
                    questionRepository.save(question);
                    sheetQuestionCount++;
                    totalQuestionCount++;
                }
                
                log.info("Обработан лист '{}': {} вопросов", sheetName, sheetQuestionCount);
            }
            
            workbook.close();
            inputStream.close();
            
            log.info("Инициализация завершена. Создано тем: {}, вопросов: {}", 
                    topicRepository.count(), totalQuestionCount);
                    
        } catch (Exception e) {
            log.error("Ошибка при инициализации данных из Excel: ", e);
        }
    }
    
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return null;
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    double numValue = cell.getNumericCellValue();
                    if (numValue == (long) numValue) {
                        return String.valueOf((long) numValue);
                    } else {
                        return String.valueOf(numValue);
                    }
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    return cell.getStringCellValue();
                } catch (Exception e) {
                    return String.valueOf(cell.getNumericCellValue());
                }
            default:
                return null;
        }
    }
}
