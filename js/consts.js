/**
 * Типы ответов на вопрос
 */
const Answer = {
  CORRECT: `CORRECT`,
  FAST_CORRECT: `FAST_CORRECT`,
  INCORRECT: `INCORRECT`,
};

/**
 * Шаблоны текста ответа
 */
const GameResult = {
  TIME_LOST: `Время вышло!
  Вы не успели отгадать все мелодии`,
  FAULTS_LOST: `У вас закончились все попытки.
  Ничего, повезёт в следующий раз!`
};

/**
 * Тип игрового вопроса
 */
const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

/**
 * Максимальное количество ошибок игрока
 */
const MAX_FAULTS_COUNT = 3;

/**
 * Время обновления таймера игры
 */
const TICK_TIME = 1000;

/**
 * Время для быстрого ответа
 */
const FAST_ANSWER_TIMEOUT = 30000;

export {Answer, GameResult, QuestionType, MAX_FAULTS_COUNT, TICK_TIME, FAST_ANSWER_TIMEOUT};
