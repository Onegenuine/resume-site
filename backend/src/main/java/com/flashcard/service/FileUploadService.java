package com.flashcard.service;

import com.flashcard.dto.QuestionDTO;
import com.flashcard.model.Topic;
import com.flashcard.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {
    
    private final QuestionService questionService;
    private final TopicRepository topicRepository;
    
    @Transactional
    public int uploadQuestionsFromFile(MultipartFile file, Long topicId) {
        int importedCount = 0;
        
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            
            String line;
            QuestionDTO currentQuestion = null;
            List<String> options = new ArrayList<>();
            
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) {
                    continue;
                }
                
                if (line.startsWith("Q:")) {
                    // Save previous question if exists
                    if (currentQuestion != null) {
                        currentQuestion.setOptions(options);
                        questionService.createQuestion(currentQuestion);
                        importedCount++;
                    }
                    
                    // Start new question
                    currentQuestion = new QuestionDTO();
                    currentQuestion.setTopicId(topicId);
                    currentQuestion.setQuestionText(line.substring(2).trim());
                    options = new ArrayList<>();
                } else if (line.startsWith("A:") && currentQuestion != null) {
                    currentQuestion.setCorrectAnswer(line.substring(2).trim());
                } else if (line.startsWith("O:") && currentQuestion != null) {
                    options.add(line.substring(2).trim());
                }
            }
            
            // Save last question
            if (currentQuestion != null) {
                currentQuestion.setOptions(options);
                questionService.createQuestion(currentQuestion);
                importedCount++;
            }
            
            log.info("Imported {} questions from file", importedCount);
            
        } catch (Exception e) {
            log.error("Error importing questions from file", e);
            throw new RuntimeException("Failed to import questions: " + e.getMessage());
        }
        
        return importedCount;
    }
}

