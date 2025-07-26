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
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

function createParticles() {
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1,
            angle: Math.random() * Math.PI * 2,
            rotation: Math.random() * 0.2 - 0.1,
            tilt: Math.random() * 10 - 5
        });
    }
}

function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed;
        p.angle += p.rotation;
        p.tilt = Math.sin(p.angle) * 15;
        
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.fill();
        
        ctx.restore();
    });
}

function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

// Запускаем все
createParticles();
animate();

// Ваш текущий код для формы остается без изменений
const phoneMask = IMask(document.getElementById('phone'), {
    mask: '+{7}(000)000-00-00'
});

document.getElementById('prizeForm').addEventListener('submit', function(e) {
    // Ваш текущий код обработки формы
});
