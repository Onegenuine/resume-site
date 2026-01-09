package com.flashcard.battle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("battles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Battle {
    @Id
    private Long id;
    private String player1Id;
    private String player2Id;
    private String player1Username;
    private String player2Username;
    private BattleStatus status;
    private Integer player1Score;
    private Integer player2Score;
    private Integer currentQuestionIndex;
    private Integer totalQuestions;
    private Long topicId;
    private String winnerId;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    private LocalDateTime createdAt;
}

enum BattleStatus {
    WAITING, IN_PROGRESS, FINISHED, CANCELLED
}

