package com.flashcard.profile.controller;

import com.flashcard.profile.dto.UserProfileDTO;
import com.flashcard.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProfileController {
    
    private final ProfileService profileService;
    
    @GetMapping("/me")
    public Mono<ResponseEntity<UserProfileDTO>> getMyProfile(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return profileService.getProfileByUserId(userId)
                .map(ResponseEntity::ok);
    }
    
    @GetMapping("/{username}")
    public Mono<ResponseEntity<UserProfileDTO>> getProfileByUsername(@PathVariable String username) {
        return profileService.getProfileByUsername(username)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/me")
    public Mono<ResponseEntity<UserProfileDTO>> updateMyProfile(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody UserProfileDTO dto) {
        String userId = jwt.getSubject();
        dto.setUserId(userId);
        return profileService.createOrUpdateProfile(dto)
                .map(ResponseEntity::ok);
    }
    
    @GetMapping("/leaderboard")
    public Flux<UserProfileDTO> getLeaderboard(@RequestParam(defaultValue = "10") int limit) {
        return profileService.getLeaderboard(limit);
    }
}

