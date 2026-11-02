function expandGratitudes(arr, target = 365) {
  const templates = [
    "Спасибо за то, что ты {verb}.",
    "Благодарю за твоё умение {verb}.",
    "Спасибо за {noun} — это твой подарок мне.",
    "Благодарю за то, что ты научила меня {verb}.",
    "Спасибо за твою {noun}, которая спасала меня не раз."
  ];
  const verbs = [
    "всегда находишь нужные слова",
    "умеешь слушать без осуждения",
    "веришь в меня больше, чем я сама",
    "готовишь самую вкусную еду",
    "никогда не сдаёшься",
    "умеешь создать уют из ничего",
    "поддерживаешь любые мои начинания",
    "прощаешь мои ошибки",
    "помнишь все важные даты",
    "заботишься о всех вокруг"
  ];
  const nouns = [
    "мудрость", "терпение", "доброта", "забота", "улыбка",
    "вера в меня", "любовь", "поддержка", "тепло", "сила"
  ];
  
  let result = [...arr];
  let i = 0;
  let attempts = 0; // Счётчик попыток
  const maxAttempts = 5000; // Ограничение, чтобы не зависнуть навсегда

  // Добавляем проверку attempts < maxAttempts
  while (result.length < target && attempts < maxAttempts) {
    const t = templates[i % templates.length];
    const phrase = t
      .replace("{verb}", verbs[Math.floor(Math.random() * verbs.length)])
      .replace("{noun}", nouns[Math.floor(Math.random() * nouns.length)]);
      
    if (!result.includes(phrase)) {
      result.push(phrase);
    }
    i++;
    attempts++;
  }
  
  return result.slice(0, target);
}

const ALL_GRATITUDES = expandGratitudes(GRATITUDES, 365);