package com.flashcard.battle.controller;

import com.flashcard.battle.dto.BattleDTO;
import com.flashcard.battle.dto.BattleRequestDTO;
import com.flashcard.battle.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/battles")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BattleController {
    
    private final BattleService battleService;
    
    @PostMapping
    public Mono<ResponseEntity<BattleDTO>> createBattle(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody BattleRequestDTO request) {
        String userId = jwt.getSubject();
        String username = jwt.getClaimAsString("preferred_username");
        return battleService.createBattle(userId, username, request)
                .map(ResponseEntity::ok);
    }
    
    @PostMapping("/{battleId}/join")
    public Mono<ResponseEntity<BattleDTO>> joinBattle(
            @PathVariable Long battleId,
            @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        String username = jwt.getClaimAsString("preferred_username");
        return battleService.joinBattle(battleId, userId, username)
                .map(ResponseEntity::ok);
    }
    
    @GetMapping("/{battleId}")
    public Mono<ResponseEntity<BattleDTO>> getBattle(
            @PathVariable Long battleId,
            @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return battleService.getBattle(battleId, userId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/my")
    public Flux<BattleDTO> getMyBattles(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return battleService.getMyBattles(userId);
    }
    
    @GetMapping("/available")
    public Flux<BattleDTO> findAvailableBattles(@RequestParam(required = false) Long topicId) {
        return battleService.findAvailableBattles(topicId);
    }
}

