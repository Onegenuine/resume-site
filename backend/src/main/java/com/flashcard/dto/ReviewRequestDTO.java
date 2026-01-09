package com.flashcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDTO {
    private Long questionId;
    private Integer quality; // 0-5 for SM-2 algorithm
    private Boolean isCorrect;
}

