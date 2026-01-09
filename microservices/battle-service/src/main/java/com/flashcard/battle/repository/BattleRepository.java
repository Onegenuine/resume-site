package com.flashcard.battle.repository;

import com.flashcard.battle.model.Battle;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface BattleRepository extends R2dbcRepository<Battle, Long> {
    Flux<Battle> findByPlayer1IdOrPlayer2Id(String player1Id, String player2Id);
    Flux<Battle> findByStatus(String status);
    Mono<Battle> findByIdAndPlayer1IdOrPlayer2Id(Long id, String player1Id, String player2Id);
}

