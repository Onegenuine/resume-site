package com.flashcard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "review_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    
    @Column(name = "is_correct")
    private Boolean isCorrect;
    
    @Column(name = "quality")
    private Integer quality; // 0-5 for SM-2 algorithm
    
    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
    
    @PrePersist
    protected void onCreate() {
        reviewedAt = LocalDateTime.now();
    }
}

