'use strict';
(() => {
  const test = document.getElementById('selbsttest');
  if (!test) return;
  const matches = [...test.querySelectorAll('.norm-match')];
  const choices = [...test.querySelectorAll('.quiz-choice')];
  function feedback(container, correct, explanation) {
    container.dataset.result = correct ? 'correct' : 'wrong';
    container.querySelector('.quiz-feedback').textContent = (correct ? '✓ Richtig. ' : '✗ Noch nicht richtig. ') + explanation;
  }
  for (const row of matches) {
    const select = row.querySelector('select');
    function update() {
      if (!select.value) {
        delete row.dataset.result;
        row.querySelector('.quiz-feedback').textContent = '';
        return;
      }
      const correct = select.value === row.dataset.answer;
      feedback(row, correct, correct ? row.dataset.right : row.dataset.wrong);
    }
    select.addEventListener('change', update);
    update();
  }
  for (const question of choices) {
    function update() {
      const options = [...question.querySelectorAll('input[type="radio"]')];
      const selected = options.find(input => input.checked);
      for (const input of options) {
        const label = input.closest('label');
        const badge = label.querySelector('.answer-mark');
        const correct = input.hasAttribute('data-correct');
        label.classList.toggle('answer-correct', input.checked && correct);
        label.classList.toggle('answer-wrong', input.checked && !correct);
        badge.hidden = !input.checked;
        badge.textContent = input.checked ? (correct ? '✓ Richtig' : '✗ Falsch') : '';
      }
      if (selected) feedback(question, selected.hasAttribute('data-correct'), selected.dataset.feedback);
    }
    question.addEventListener('change', update);
    update();
  }
  document.getElementById('quiz-reset').addEventListener('click', () => {
    for (const select of test.querySelectorAll('select')) select.value = '';
    for (const input of test.querySelectorAll('input[type="radio"]')) input.checked = false;
    for (const element of test.querySelectorAll('[data-result]')) delete element.dataset.result;
    for (const element of test.querySelectorAll('.answer-correct,.answer-wrong')) element.classList.remove('answer-correct', 'answer-wrong');
    for (const badge of test.querySelectorAll('.answer-mark')) { badge.hidden = true; badge.textContent = ''; }
    for (const status of test.querySelectorAll('.quiz-feedback')) status.textContent = '';
    for (const solution of test.querySelectorAll('details')) solution.open = false;
    test.querySelector('.quiz-reset-status').textContent = 'Auswahlantworten zurückgesetzt und Lösungen geschlossen. Du kannst neu beginnen.';
  });
  test.addEventListener('change', () => { test.querySelector('.quiz-reset-status').textContent = ''; });
})();
