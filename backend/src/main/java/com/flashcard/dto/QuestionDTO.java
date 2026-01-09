package com.flashcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Long id;
    private String questionText;
    private String correctAnswer;
    private List<String> options;
    private Long topicId;
    private String topicName;
    private LocalDateTime lastReviewed;
    private LocalDateTime nextReview;
    private Integer reviewCount;
    private Integer difficultyLevel;
    private Double easeFactor;
    private Integer intervalDays;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

