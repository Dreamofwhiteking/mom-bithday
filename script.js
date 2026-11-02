// script.js
(function () {
  "use strict";

  // --- 1. Имя и подпись ---
  document.getElementById("momName").textContent = CONFIG.momName;
  document.getElementById("signature").textContent = CONFIG.signature;

  // --- 2. Звёзды на фоне ---
  const starsContainer = document.getElementById("stars");
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 3 + "s";
    starsContainer.appendChild(s);
  }

  // --- 3. Обратный отсчёт ---
  const target = new Date(CONFIG.birthday + "T00:00:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    let diff = target - now;

    // Если день рождения прошёл — считаем до следующего года
    if (diff < 0) {
      const next = new Date(CONFIG.birthday);
      next.setFullYear(next.getFullYear() + 1);
      diff = next.getTime() - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    // Особый режим в сам день рождения
    if (days === 0 && hours === 0 && minutes === 0) {
      document.querySelector(".label").textContent = "С ДНЁМ РОЖДЕНИЯ! 🎉";
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 4. Благодарность дня ---
  // Выбираем фразу по номеру дня с момента старта — стабильно в течение дня
  const start = new Date(CONFIG.startDate + "T00:00:00").getTime();
  const dayIndex = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
  const phraseIndex = ((dayIndex % ALL_GRATITUDES.length) + ALL_GRATITUDES.length) % ALL_GRATITUDES.length;

  const gratitudeEl = document.getElementById("gratitude");
  const counterEl = document.getElementById("counter");

  gratitudeEl.textContent = ALL_GRATITUDES[phraseIndex];
  counterEl.textContent = `Благодарность ${phraseIndex + 1} из ${ALL_GRATITUDES.length}`;

  // Плавное появление
  gratitudeEl.style.opacity = 0;
  setTimeout(() => { gratitudeEl.style.opacity = 1; }, 300);

  // --- 5. Кнопка «Обнять» + конфетти ---
  const hugBtn = document.getElementById("hugBtn");
  const confettiContainer = document.getElementById("confetti");
  const colors = ["#ff8fab", "#ffc2d1", "#ffb3c6", "#ffe5ec", "#c9184a", "#ff4d6d"];

  function fireConfetti() {
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "%";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = Math.random() * 0.5 + "s";
      c.style.width = c.style.height = 6 + Math.random() * 10 + "px";
      c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      confettiContainer.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }

  hugBtn.addEventListener("click", () => {
    fireConfetti();
    // Временная надпись на кнопке
    const original = hugBtn.textContent;
    hugBtn.textContent = "Обнимаю крепко-крепко! 🤗";
    hugBtn.disabled = true;
    setTimeout(() => {
      hugBtn.textContent = original;
      hugBtn.disabled = false;
    }, 2000);
  });
})();