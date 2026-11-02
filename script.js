// script.js
document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:50px;'>Скрипт загрузился!</h1>";
window.addEventListener('error', function(e) {
  // Если произошла ошибка, покажем её на экране
  document.body.innerHTML = `
    <div style="color: red; padding: 20px; font-family: monospace; background: #fff; min-height: 100vh;">
      <h2>Ошибка на сайте:</h2>
      <p>${e.message}</p>
      <p>Файл: ${e.filename ? e.filename.split('/').pop() : 'неизвестно'}</p>
      <p style="color: #666;">Сделайте скриншот этого экрана и отправьте мне.</p>
    </div>
  `;
});

(function () {
  "use strict";

  try {
    // --- 1. Имя и подпись ---
    if (typeof CONFIG === 'undefined') throw new Error("Файл config.js не загружен или в нем ошибка!");
    if (typeof ALL_GRATITUDES === 'undefined') throw new Error("Файл data.js не загружен или в нем ошибка!");

    document.getElementById("momName").textContent = CONFIG.momName;
    document.getElementById("signature").textContent = CONFIG.signature;

    // --- 2. Звёзды на фоне ---
    const starsContainer = document.getElementById("stars");
    if (starsContainer) {
      for (let i = 0; i < 80; i++) {
        const s = document.createElement("div");
        s.className = "star";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.animationDelay = Math.random() * 3 + "s";
        starsContainer.appendChild(s);
      }
    }

    // --- 3. Обратный отсчёт ---
    const target = new Date(CONFIG.birthday + "T00:00:00").getTime();

    function updateCountdown() {
      const now = Date.now();
      let diff = target - now;

      if (diff < 0) {
        const next = new Date(CONFIG.birthday);
        next.setFullYear(next.getFullYear() + 1);
        diff = next.getTime() - now;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const daysEl = document.getElementById("days");
      if (daysEl) {
        daysEl.textContent = days;
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
      }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- 4. Благодарность дня ---
    const start = new Date(CONFIG.startDate + "T00:00:00").getTime();
    const dayIndex = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
    const phraseIndex = ((dayIndex % ALL_GRATITUDES.length) + ALL_GRATITUDES.length) % ALL_GRATITUDES.length;

    const gratitudeEl = document.getElementById("gratitude");
    const counterEl = document.getElementById("counter");

    if (gratitudeEl && counterEl) {
      gratitudeEl.textContent = ALL_GRATITUDES[phraseIndex];
      counterEl.textContent = `Благодарность ${phraseIndex + 1} из ${ALL_GRATITUDES.length}`;
      gratitudeEl.style.opacity = 0;
      setTimeout(() => { gratitudeEl.style.opacity = 1; }, 300);
    }

    // --- 5. Кнопка «Обнять» + конфетти ---
    const hugBtn = document.getElementById("hugBtn");
    const confettiContainer = document.getElementById("confetti");
    const colors = ["#ff8fab", "#ffc2d1", "#ffb3c6", "#ffe5ec", "#c9184a", "#ff4d6d"];

    function fireConfetti() {
      if (!confettiContainer) return;
      for (let i = 0; i < 60; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "%";
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = Math.random() * 0.5 + "s";
        c.style.width = c.style.height = (6 + Math.random() * 10) + "px";
        c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        confettiContainer.appendChild(c);
        setTimeout(() => c.remove(), 4000);
      }
    }

    if (hugBtn) {
      hugBtn.addEventListener("click", () => {
        fireConfetti();
        const original = hugBtn.textContent;
        hugBtn.textContent = "Обнимаю крепко-крепко! 🤗";
        hugBtn.disabled = true;
        setTimeout(() => {
          hugBtn.textContent = original;
          hugBtn.disabled = false;
        }, 2000);
      });
    }

  } catch (error) {
    // Ловим ошибки внутри блока и выводим на экран
    document.body.innerHTML = `
      <div style="color: red; padding: 20px; font-family: monospace; background: #fff; min-height: 100vh;">
        <h2>Ошибка выполнения:</h2>
        <p>${error.message}</p>
        <p style="color: #666;">Сделайте скриншот этого экрана.</p>
      </div>
    `;
  }
})();