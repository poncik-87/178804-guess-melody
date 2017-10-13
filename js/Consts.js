const ANSWER = {
  CORRECT: `CORRECT`,
  FAST_CORRECT: `FAST_CORRECT`,
  INCORRECT: `INCORRECT`,
};

const GAME_RESULT = {
  TIME_LOST: `Время вышло! Вы не успели отгадать все мелодии`,
  LIVES_LOST: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  win: (place, gamersCount, rating) =>
    `Вы заняли ${place}-ое место из ${gamersCount} игроков. Это лучше чем у ${rating}% игроков`
};

export {ANSWER, GAME_RESULT};
