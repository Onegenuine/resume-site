package com.flashcard.profile.repository;

import com.flashcard.profile.model.UserProfile;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserProfileRepository extends R2dbcRepository<UserProfile, Long> {
    Mono<UserProfile> findByUserId(String userId);
    Mono<UserProfile> findByUsername(String username);
    Mono<Boolean> existsByUserId(String userId);
    Mono<Boolean> existsByUsername(String username);
}

