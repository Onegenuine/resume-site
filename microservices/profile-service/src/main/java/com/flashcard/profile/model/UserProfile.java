package com.flashcard.profile.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    @Id
    private Long id;
    private String userId; // Keycloak user ID
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

