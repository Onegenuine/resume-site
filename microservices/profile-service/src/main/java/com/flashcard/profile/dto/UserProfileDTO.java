package com.flashcard.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String bio;
    private Integer totalQuestions;
    private Integer totalReviews;
    private Integer correctAnswers;
    private Integer battlesWon;
    private Integer battlesLost;
    private Integer currentStreak;
    private Integer bestStreak;
    private Integer level;
    private Integer experience;
    private Double winRate;
    private Double accuracy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

