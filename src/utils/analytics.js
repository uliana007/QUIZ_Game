// src/utils/analytics.js

const COUNTER_ID = 102449935; // Замени на свой ID

export const trackGoal = (goalName) => {
  if (window.ym && typeof window.ym === 'function') {
    window.ym(COUNTER_ID, 'reachGoal', goalName);
    console.log(`Яндекс.Метрика: цель достигнута — ${goalName}`);
  }
};
