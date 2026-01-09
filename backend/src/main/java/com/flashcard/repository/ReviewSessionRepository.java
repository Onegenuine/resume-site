package com.flashcard.repository;

import com.flashcard.model.ReviewSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewSessionRepository extends JpaRepository<ReviewSession, Long> {
    List<ReviewSession> findByQuestionId(Long questionId);
}

