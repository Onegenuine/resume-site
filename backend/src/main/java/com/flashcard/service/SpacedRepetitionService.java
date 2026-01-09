package com.flashcard.service;

import com.flashcard.model.Question;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SpacedRepetitionService {
    
    /**
     * SM-2 Algorithm implementation for spaced repetition
     * Updates question based on review quality (0-5)
     */
    public void updateQuestionAfterReview(Question question, Integer quality) {
        if (quality == null || quality < 0 || quality > 5) {
            quality = 0;
        }
        
        question.setLastReviewed(LocalDateTime.now());
        question.setReviewCount(question.getReviewCount() + 1);
        
        if (quality < 3) {
            // Failed - reset
            question.setIntervalDays(1);
            question.setEaseFactor(Math.max(1.3, question.getEaseFactor() - 0.2));
        } else {
            // Passed
            if (question.getReviewCount() == 1) {
                question.setIntervalDays(1);
            } else if (question.getReviewCount() == 2) {
                question.setIntervalDays(6);
            } else {
                question.setIntervalDays((int) (question.getIntervalDays() * question.getEaseFactor()));
            }
            
            // Update ease factor based on quality
            double ef = question.getEaseFactor() + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            question.setEaseFactor(Math.max(1.3, ef));
        }
        
        question.setNextReview(LocalDateTime.now().plusDays(question.getIntervalDays()));
        question.setDifficultyLevel(quality);
    }
}

