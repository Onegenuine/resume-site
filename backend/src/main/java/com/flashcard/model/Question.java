package com.flashcard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String correctAnswer;
    
    @ElementCollection
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private List<String> options = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;
    
    // Spaced repetition fields
    @Column(name = "last_reviewed")
    private LocalDateTime lastReviewed;
    
    @Column(name = "next_review")
    private LocalDateTime nextReview;
    
    @Column(name = "review_count")
    private Integer reviewCount = 0;
    
    @Column(name = "difficulty_level")
    private Integer difficultyLevel = 0; // 0-5 scale
    
    @Column(name = "ease_factor")
    private Double easeFactor = 2.5; // SM-2 algorithm
    
    @Column(name = "interval_days")
    private Integer intervalDays = 1;
    
    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (nextReview == null) {
            nextReview = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

