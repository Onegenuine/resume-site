package com.flashcard.battle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BattleDTO {
    private Long id;
    private String player1Id;
    private String player2Id;
    private String player1Username;
    private String player2Username;
    private String status;
    private Integer player1Score;
    private Integer player2Score;
    private Integer currentQuestionIndex;
    private Integer totalQuestions;
    private Long topicId;
    private String winnerId;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
}

