package com.flashcard.battle.service;

import com.flashcard.battle.dto.BattleDTO;
import com.flashcard.battle.dto.BattleRequestDTO;
import com.flashcard.battle.model.Battle;
import com.flashcard.battle.model.BattleStatus;
import com.flashcard.battle.repository.BattleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BattleService {
    
    private final BattleRepository battleRepository;
    
    public Mono<BattleDTO> createBattle(String playerId, String playerUsername, BattleRequestDTO request) {
        Battle battle = new Battle();
        battle.setPlayer1Id(playerId);
        battle.setPlayer1Username(playerUsername);
        battle.setPlayer2Id(null);
        battle.setPlayer2Username(null);
        battle.setStatus(BattleStatus.WAITING);
        battle.setPlayer1Score(0);
        battle.setPlayer2Score(0);
        battle.setCurrentQuestionIndex(0);
        battle.setTotalQuestions(request.getQuestionCount() != null ? request.getQuestionCount() : 10);
        battle.setTopicId(request.getTopicId());
        battle.setStartedAt(LocalDateTime.now());
        battle.setCreatedAt(LocalDateTime.now());
        
        return battleRepository.save(battle)
                .map(this::toDTO);
    }
    
    public Mono<BattleDTO> joinBattle(Long battleId, String playerId, String playerUsername) {
        return battleRepository.findById(battleId)
                .flatMap(battle -> {
                    if (battle.getPlayer2Id() == null && !battle.getPlayer1Id().equals(playerId)) {
                        battle.setPlayer2Id(playerId);
                        battle.setPlayer2Username(playerUsername);
                        battle.setStatus(BattleStatus.IN_PROGRESS);
                        return battleRepository.save(battle);
                    }
                    return Mono.just(battle);
                })
                .map(this::toDTO);
    }
    
    public Mono<BattleDTO> getBattle(Long battleId, String userId) {
        return battleRepository.findByIdAndPlayer1IdOrPlayer2Id(battleId, userId, userId)
                .map(this::toDTO);
    }
    
    public Flux<BattleDTO> getMyBattles(String userId) {
        return battleRepository.findByPlayer1IdOrPlayer2Id(userId, userId)
                .map(this::toDTO);
    }
    
    public Flux<BattleDTO> findAvailableBattles(Long topicId) {
        return battleRepository.findByStatus(BattleStatus.WAITING.name())
                .filter(battle -> topicId == null || battle.getTopicId() == null || battle.getTopicId().equals(topicId))
                .map(this::toDTO);
    }
    
    private BattleDTO toDTO(Battle battle) {
        BattleDTO dto = new BattleDTO();
        dto.setId(battle.getId());
        dto.setPlayer1Id(battle.getPlayer1Id());
        dto.setPlayer2Id(battle.getPlayer2Id());
        dto.setPlayer1Username(battle.getPlayer1Username());
        dto.setPlayer2Username(battle.getPlayer2Username());
        dto.setStatus(battle.getStatus() != null ? battle.getStatus().name() : "WAITING");
        dto.setPlayer1Score(battle.getPlayer1Score());
        dto.setPlayer2Score(battle.getPlayer2Score());
        dto.setCurrentQuestionIndex(battle.getCurrentQuestionIndex());
        dto.setTotalQuestions(battle.getTotalQuestions());
        dto.setTopicId(battle.getTopicId());
        dto.setWinnerId(battle.getWinnerId());
        dto.setStartedAt(battle.getStartedAt());
        dto.setFinishedAt(battle.getFinishedAt());
        return dto;
    }
}

