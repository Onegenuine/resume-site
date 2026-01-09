package com.flashcard.service;

import com.flashcard.dto.QuestionDTO;
import com.flashcard.dto.ReviewRequestDTO;
import com.flashcard.model.Question;
import com.flashcard.model.Topic;
import com.flashcard.repository.QuestionRepository;
import com.flashcard.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    private final TopicRepository topicRepository;
    private final SpacedRepetitionService spacedRepetitionService;
    
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<QuestionDTO> getQuestionsByTopic(Long topicId) {
        return questionRepository.findByTopicId(topicId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<QuestionDTO> getQuestionsForReview(Long topicId) {
        LocalDateTime now = LocalDateTime.now();
        List<Question> questions;
        
        if (topicId != null) {
            questions = questionRepository.findQuestionsForReview(topicId, now);
        } else {
            questions = questionRepository.findAllQuestionsForReview(now);
        }
        
        // Перемешиваем вопросы случайным образом
        java.util.Collections.shuffle(questions);
        
        return questions.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public QuestionDTO getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        return toDTO(question);
    }
    
    @Transactional
    public QuestionDTO createQuestion(QuestionDTO dto) {
        Topic topic = topicRepository.findById(dto.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        
        Question question = new Question();
        question.setQuestionText(dto.getQuestionText());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setOptions(dto.getOptions() != null ? dto.getOptions() : List.of());
        question.setImageUrl(dto.getImageUrl());
        question.setTopic(topic);
        
        Question saved = questionRepository.save(question);
        return toDTO(saved);
    }
    
    @Transactional
    public QuestionDTO updateQuestion(Long id, QuestionDTO dto) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (dto.getTopicId() != null && !question.getTopic().getId().equals(dto.getTopicId())) {
            Topic topic = topicRepository.findById(dto.getTopicId())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
            question.setTopic(topic);
        }
        
        question.setQuestionText(dto.getQuestionText());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        if (dto.getOptions() != null) {
            question.setOptions(dto.getOptions());
        }
        if (dto.getImageUrl() != null) {
            question.setImageUrl(dto.getImageUrl());
        }
        
        Question saved = questionRepository.save(question);
        return toDTO(saved);
    }
    
    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found");
        }
        questionRepository.deleteById(id);
    }
    
    @Transactional
    public QuestionDTO reviewQuestion(ReviewRequestDTO reviewRequest) {
        Question question = questionRepository.findById(reviewRequest.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        spacedRepetitionService.updateQuestionAfterReview(question, reviewRequest.getQuality());
        
        Question saved = questionRepository.save(question);
        return toDTO(saved);
    }
    
    private QuestionDTO toDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setCorrectAnswer(question.getCorrectAnswer());
        dto.setOptions(question.getOptions());
        dto.setTopicId(question.getTopic().getId());
        dto.setTopicName(question.getTopic().getName());
        dto.setLastReviewed(question.getLastReviewed());
        dto.setNextReview(question.getNextReview());
        dto.setReviewCount(question.getReviewCount());
        dto.setDifficultyLevel(question.getDifficultyLevel());
        dto.setEaseFactor(question.getEaseFactor());
        dto.setIntervalDays(question.getIntervalDays());
        dto.setImageUrl(question.getImageUrl());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setUpdatedAt(question.getUpdatedAt());
        return dto;
    }
}

