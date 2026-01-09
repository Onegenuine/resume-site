CREATE TABLE IF NOT EXISTS battles (
    id BIGSERIAL PRIMARY KEY,
    player1_id VARCHAR(255) NOT NULL,
    player2_id VARCHAR(255),
    player1_username VARCHAR(255) NOT NULL,
    player2_username VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'WAITING',
    player1_score INTEGER DEFAULT 0,
    player2_score INTEGER DEFAULT 0,
    current_question_index INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 10,
    topic_id BIGINT,
    winner_id VARCHAR(255),
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS battle_questions (
    id BIGSERIAL PRIMARY KEY,
    battle_id BIGINT NOT NULL REFERENCES battles(id),
    question_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    player1_answer TEXT,
    player2_answer TEXT,
    player1_correct BOOLEAN,
    player2_correct BOOLEAN,
    question_order INTEGER NOT NULL,
    answered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_battles_player1 ON battles(player1_id);
CREATE INDEX IF NOT EXISTS idx_battles_player2 ON battles(player2_id);
CREATE INDEX IF NOT EXISTS idx_battles_status ON battles(status);
CREATE INDEX IF NOT EXISTS idx_battle_questions_battle ON battle_questions(battle_id);

