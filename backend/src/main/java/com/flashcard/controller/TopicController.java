package com.flashcard.controller;

import com.flashcard.dto.TopicDTO;
import com.flashcard.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TopicController {
    
    private final TopicService topicService;
    
    @GetMapping
    public ResponseEntity<List<TopicDTO>> getAllTopics() {
        return ResponseEntity.ok(topicService.getAllTopics());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TopicDTO> getTopicById(@PathVariable Long id) {
        return ResponseEntity.ok(topicService.getTopicById(id));
    }
    
    @PostMapping
    public ResponseEntity<TopicDTO> createTopic(@RequestBody TopicDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(topicService.createTopic(dto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TopicDTO> updateTopic(@PathVariable Long id, @RequestBody TopicDTO dto) {
        return ResponseEntity.ok(topicService.updateTopic(id, dto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }
}

