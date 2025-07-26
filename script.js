const phoneMask = IMask(document.getElementById('phone'), {
  mask: '+{7}(000)000-00-00'
  maxLength: 10  // Явное ограничение длины

});

document.getElementById('prizeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const phoneRaw = '+7' + (phoneMask.unmaskedValue || '').slice(1);
  const messageEl = document.getElementById('message');

  const numeric = phoneRaw.replace(/\D/g, '');

  if (numeric.length !== 11 || !numeric.startsWith('7')) {
    messageEl.textContent = 'Введите корректный номер в формате +7XXXXXXXXXX';
    messageEl.style.color = 'red';
    return;
  }

  fetch('https://repo-2-zffb.onrender.com/', {
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

// Конфетти
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  
  // Устанавливаем правильные размеры canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Инициализация при загрузке
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Создаем частицы конфетти
  let particles = [];
  const particleCount = 150; // Уменьшено для производительности
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 4 + 1,
      d: Math.random() * particleCount + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * 0.1,
      tiltAngleIncrement: Math.random() * 0.01 + 0.01
    });
  }

  // Функция отрисовки
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x + p.tilt + p.r/2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.r;
      ctx.stroke();
      
      // Обновляем позицию
      p.tiltAngle += p.tiltAngleIncrement;
      p.y += (Math.cos(p.d) + 1 + p.r/2) / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;
      
      // Если частица упала, создаем новую вверху
      if(p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(draw);
  }

  // Запускаем анимацию
  draw();
});
