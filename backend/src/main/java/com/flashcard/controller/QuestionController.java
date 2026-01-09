package com.flashcard.controller;

import com.flashcard.dto.QuestionDTO;
import com.flashcard.dto.ReviewRequestDTO;
import com.flashcard.service.QuestionService;
import com.flashcard.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class QuestionController {
    
    private final QuestionService questionService;
    private final FileUploadService fileUploadService;
    
    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getAllQuestions(
            @RequestParam(required = false) Long topicId) {
        if (topicId != null) {
            return ResponseEntity.ok(questionService.getQuestionsByTopic(topicId));
        }
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
    
    @GetMapping("/review")
    public ResponseEntity<List<QuestionDTO>> getQuestionsForReview(
            @RequestParam(required = false) Long topicId) {
        return ResponseEntity.ok(questionService.getQuestionsForReview(topicId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
    
    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody QuestionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(questionService.createQuestion(dto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @RequestBody QuestionDTO dto) {
        return ResponseEntity.ok(questionService.updateQuestion(id, dto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/review")
    public ResponseEntity<QuestionDTO> reviewQuestion(@RequestBody ReviewRequestDTO reviewRequest) {
        return ResponseEntity.ok(questionService.reviewQuestion(reviewRequest));
    }
    
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadQuestions(
            @RequestParam("file") MultipartFile file,
            @RequestParam("topicId") Long topicId) {
        try {
            int importedCount = fileUploadService.uploadQuestionsFromFile(file, topicId);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Successfully imported " + importedCount + " questions");
            response.put("importedCount", importedCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}

