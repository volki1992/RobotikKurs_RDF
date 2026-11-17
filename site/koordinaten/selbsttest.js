"use strict";
const test = document.getElementById("aufgabe");
  for (const question of test.querySelectorAll('.test-question')) {
    const solution = question.querySelector('details');
    const options = question.querySelectorAll('input[type="radio"]');

    function markAnswers() {
      for (const option of options) {
        const label = option.closest('label');
        const badge = label.querySelector('.answer-mark');
        const visible = solution.open || option.checked;
        const correct = option.hasAttribute('data-correct');
        label.classList.toggle('answer-correct', visible && correct);
        label.classList.toggle('answer-wrong', visible && !correct);
        badge.hidden = !visible;
        badge.textContent = correct ? '✓ Richtig' : '✗ Falsch';
      }
    }

    question.addEventListener('change', event => {
      const option = event.target;
      if (!option.matches('input[type="radio"]')) return;
      const prefix = option.hasAttribute('data-correct') ? '' : 'Falsch. ';
      question.querySelector('[role="status"]').textContent = prefix + option.dataset.hint;
      markAnswers();
    });
    solution.addEventListener('toggle', markAnswers);
    markAnswers();
  }
