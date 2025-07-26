const phoneMask = IMask(document.getElementById('phone'), {
  mask: '+{7}(000)000-00-00'
});

document.getElementById('prizeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const phoneRaw = '+7' + phoneMask.unmaskedValue.slice(1);
  const messageEl = document.getElementById('message');

  const numeric = phoneRaw.replace(/\D/g, '');

  if (numeric.length !== 11 || !numeric.startsWith('7')) {
    messageEl.textContent = 'Введите корректный номер в формате +7XXXXXXXXXX';
    messageEl.style.color = 'red';
    return;
  }

  fetch('https://proxylast.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone: phoneRaw })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        messageEl.textContent = 'Спасибо! Модератор свяжется с вами в ближайшее время!.';
        messageEl.style.color = 'green';
        this.reset();
      } else {
        messageEl.textContent = 'Ошибка: ' + (data.error || 'неизвестная ошибка');
        messageEl.style.color = 'red';
      }
    })
    .catch(() => {
      messageEl.textContent = 'Ошибка отправки. Попробуйте позже.';
      messageEl.style.color = 'red';
    });
});

// 🎉 Конфетти
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 4,
  d: Math.random() * 20 + 10,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  tilt: Math.random() * 10 - 10
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.d / 2);
    ctx.stroke();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(0.01);
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

drawConfetti();
