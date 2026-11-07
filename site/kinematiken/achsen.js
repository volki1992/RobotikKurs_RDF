for (const button of document.querySelectorAll('.axis-replay')) {
  button.addEventListener('click', () => {
    const part = button.closest('figure').querySelector('.slide-axis, .rotate-axis');
    for (const animation of part.getAnimations()) animation.cancel();
    const transform = part.matches('.slide-axis') ? 'translate(73px, -18px)' : 'rotate(-42deg)';
    part.animate([{transform:'none'}, {transform}], {
      duration: 2400, iterations: 2, direction: 'alternate', easing:'ease-in-out'
    });
  });
}
