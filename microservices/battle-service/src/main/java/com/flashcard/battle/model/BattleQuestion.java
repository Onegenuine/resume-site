package com.flashcard.battle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("battle_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BattleQuestion {
    @Id
    private Long id;
    private Long battleId;
    private Long questionId;
    private String questionText;
    private String correctAnswer;
    private String player1Answer;
    private String player2Answer;
    private Boolean player1Correct;
    private Boolean player2Correct;
    private Integer questionOrder;
    private LocalDateTime answeredAt;
}

