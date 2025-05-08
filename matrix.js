// Matrix code waterfall background effect
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-bg';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Characters to use in the Matrix effect
  const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ';
  const fontSize = 18;
  const columns = Math.floor(width / fontSize);
  const drops = Array.from({ length: columns }, () => Math.random() * height / fontSize);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px "Noto Sans Mono", "Noto Sans JP", monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      // Draw the leading character in white
      ctx.fillStyle = '#fff';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      // Draw the trailing character in green just below
      ctx.fillStyle = '#00FF41';
      ctx.fillText(text, i * fontSize, (drops[i] - 1) * fontSize);
      if (Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }
  }

  setInterval(draw, 66);

  // Handle resizing
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // Style the canvas
  Object.assign(canvas.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    pointerEvents: 'none',
  });
});
