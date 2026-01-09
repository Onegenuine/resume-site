package com.flashcard.profile.service;

import com.flashcard.profile.dto.UserProfileDTO;
import com.flashcard.profile.model.UserProfile;
import com.flashcard.profile.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProfileService {
    
    private final UserProfileRepository profileRepository;
    
    public Mono<UserProfileDTO> getProfileByUserId(String userId) {
        return profileRepository.findByUserId(userId)
                .map(this::toDTO)
                .switchIfEmpty(createDefaultProfile(userId));
    }
    
    public Mono<UserProfileDTO> getProfileByUsername(String username) {
        return profileRepository.findByUsername(username)
                .map(this::toDTO);
    }
    
    public Mono<UserProfileDTO> createOrUpdateProfile(UserProfileDTO dto) {
        return profileRepository.findByUserId(dto.getUserId())
                .flatMap(existing -> {
                    updateProfile(existing, dto);
                    return profileRepository.save(existing);
                })
                .switchIfEmpty(
                        profileRepository.save(toEntity(dto))
                )
                .map(this::toDTO);
    }
    
    public Flux<UserProfileDTO> getLeaderboard(int limit) {
        return profileRepository.findAll()
                .sort((a, b) -> Integer.compare(
                        (b.getBattlesWon() != null ? b.getBattlesWon() : 0) + 
                        (b.getTotalReviews() != null ? b.getTotalReviews() : 0),
                        (a.getBattlesWon() != null ? a.getBattlesWon() : 0) + 
                        (a.getTotalReviews() != null ? a.getTotalReviews() : 0)
                ))
                .take(limit)
                .map(this::toDTO);
    }
    
    private Mono<UserProfileDTO> createDefaultProfile(String userId) {
        UserProfile profile = new UserProfile();
        profile.setUserId(userId);
        profile.setUsername("user_" + userId.substring(0, 8));
        profile.setTotalQuestions(0);
        profile.setTotalReviews(0);
        profile.setCorrectAnswers(0);
        profile.setBattlesWon(0);
        profile.setBattlesLost(0);
        profile.setCurrentStreak(0);
        profile.setBestStreak(0);
        profile.setLevel(1);
        profile.setExperience(0);
        profile.setCreatedAt(LocalDateTime.now());
        profile.setUpdatedAt(LocalDateTime.now());
        
        return profileRepository.save(profile)
                .map(this::toDTO);
    }
    
    private void updateProfile(UserProfile profile, UserProfileDTO dto) {
        if (dto.getUsername() != null) profile.setUsername(dto.getUsername());
        if (dto.getFirstName() != null) profile.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) profile.setLastName(dto.getLastName());
        if (dto.getBio() != null) profile.setBio(dto.getBio());
        if (dto.getAvatarUrl() != null) profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setUpdatedAt(LocalDateTime.now());
    }
    
    private UserProfileDTO toDTO(UserProfile profile) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUserId());
        dto.setUsername(profile.getUsername());
        dto.setEmail(profile.getEmail());
        dto.setFirstName(profile.getFirstName());
        dto.setLastName(profile.getLastName());
        dto.setAvatarUrl(profile.getAvatarUrl());
        dto.setBio(profile.getBio());
        dto.setTotalQuestions(profile.getTotalQuestions());
        dto.setTotalReviews(profile.getTotalReviews());
        dto.setCorrectAnswers(profile.getCorrectAnswers());
        dto.setBattlesWon(profile.getBattlesWon());
        dto.setBattlesLost(profile.getBattlesLost());
        dto.setCurrentStreak(profile.getCurrentStreak());
        dto.setBestStreak(profile.getBestStreak());
        dto.setLevel(profile.getLevel());
        dto.setExperience(profile.getExperience());
        dto.setCreatedAt(profile.getCreatedAt());
        dto.setUpdatedAt(profile.getUpdatedAt());
        
        // Calculate derived fields
        int totalBattles = (profile.getBattlesWon() != null ? profile.getBattlesWon() : 0) + 
                          (profile.getBattlesLost() != null ? profile.getBattlesLost() : 0);
        dto.setWinRate(totalBattles > 0 ? 
                (double) profile.getBattlesWon() / totalBattles * 100 : 0.0);
        
        int totalReviews = profile.getTotalReviews() != null ? profile.getTotalReviews() : 0;
        dto.setAccuracy(totalReviews > 0 ? 
                (double) profile.getCorrectAnswers() / totalReviews * 100 : 0.0);
        
        return dto;
    }
    
    private UserProfile toEntity(UserProfileDTO dto) {
        UserProfile profile = new UserProfile();
        profile.setUserId(dto.getUserId());
        profile.setUsername(dto.getUsername());
        profile.setEmail(dto.getEmail());
        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setBio(dto.getBio());
        profile.setTotalQuestions(dto.getTotalQuestions() != null ? dto.getTotalQuestions() : 0);
        profile.setTotalReviews(dto.getTotalReviews() != null ? dto.getTotalReviews() : 0);
        profile.setCorrectAnswers(dto.getCorrectAnswers() != null ? dto.getCorrectAnswers() : 0);
        profile.setBattlesWon(dto.getBattlesWon() != null ? dto.getBattlesWon() : 0);
        profile.setBattlesLost(dto.getBattlesLost() != null ? dto.getBattlesLost() : 0);
        profile.setCurrentStreak(dto.getCurrentStreak() != null ? dto.getCurrentStreak() : 0);
        profile.setBestStreak(dto.getBestStreak() != null ? dto.getBestStreak() : 0);
        profile.setLevel(dto.getLevel() != null ? dto.getLevel() : 1);
        profile.setExperience(dto.getExperience() != null ? dto.getExperience() : 0);
        profile.setCreatedAt(LocalDateTime.now());
        profile.setUpdatedAt(LocalDateTime.now());
        return profile;
    }
}

