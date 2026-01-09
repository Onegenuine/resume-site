package com.flashcard.battle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BattleRequestDTO {
    private Long topicId;
    private Integer questionCount;
    private String opponentUsername; // Optional - for direct challenge
}

