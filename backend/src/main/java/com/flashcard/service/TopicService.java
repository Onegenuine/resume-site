package com.flashcard.service;

import com.flashcard.dto.TopicDTO;
import com.flashcard.model.Topic;
import com.flashcard.repository.TopicRepository;
import com.flashcard.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TopicService {
    
    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    
    public List<TopicDTO> getAllTopics() {
        return topicRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public TopicDTO getTopicById(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        return toDTO(topic);
    }
    
    @Transactional
    public TopicDTO createTopic(TopicDTO dto) {
        if (topicRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Topic with this name already exists");
        }
        
        Topic topic = new Topic();
        topic.setName(dto.getName());
        topic.setDescription(dto.getDescription());
        
        Topic saved = topicRepository.save(topic);
        return toDTO(saved);
    }
    
    @Transactional
    public TopicDTO updateTopic(Long id, TopicDTO dto) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        
        if (!topic.getName().equals(dto.getName()) && topicRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Topic with this name already exists");
        }
        
        topic.setName(dto.getName());
        topic.setDescription(dto.getDescription());
        
        Topic saved = topicRepository.save(topic);
        return toDTO(saved);
    }
    
    @Transactional
    public void deleteTopic(Long id) {
        if (!topicRepository.existsById(id)) {
            throw new RuntimeException("Topic not found");
        }
        topicRepository.deleteById(id);
    }
    
    private TopicDTO toDTO(Topic topic) {
        TopicDTO dto = new TopicDTO();
        dto.setId(topic.getId());
        dto.setName(topic.getName());
        dto.setDescription(topic.getDescription());
        dto.setCreatedAt(topic.getCreatedAt());
        dto.setUpdatedAt(topic.getUpdatedAt());
        dto.setQuestionCount(questionRepository.findByTopicId(topic.getId()).size());
        return dto;
    }
}

