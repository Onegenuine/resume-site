package com.flashcard.repository;

import com.flashcard.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByTopicId(Long topicId);
    
    @Query("SELECT q FROM Question q WHERE q.topic.id = :topicId AND (q.nextReview IS NULL OR q.nextReview <= :now)")
    List<Question> findQuestionsForReview(Long topicId, LocalDateTime now);
    
    @Query("SELECT q FROM Question q WHERE q.nextReview IS NULL OR q.nextReview <= :now")
    List<Question> findAllQuestionsForReview(LocalDateTime now);
}

