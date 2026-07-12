const steps = [
  {
    question: "С какой сложностью вы столкнулись?",
    answers: [
      ["Плохая кредитная история", "gauge"],
      ["Есть просрочки или долги", "calendar"],
      ["Банки уже отказывали", "bank"],
      ["Нужна крупная сумма", "coins"],
      ["Хочу рефинансирование", "refresh"]
    ]
  },
  {
    question: "На какую сумму вы рассчитываете?",
    answers: [
      ["До 300 000 ₽", "coins"],
      ["300 000–800 000 ₽", "coins"],
      ["800 000–1,5 млн ₽", "wallet"],
      ["Свыше 1,5 млн ₽", "briefcase"]
    ]
  },
  {
    question: "Есть ли у вас текущие задолженности?",
    answers: [
      ["Да, есть просрочки", "calendar"],
      ["Да, но без просрочек", "check"],
      ["Нет задолженностей", "document"],
      ["Сложно ответить", "question"]
    ]
  },
  {
    question: "Какой у вас источник дохода?",
    answers: [
      ["Официальная работа", "briefcase"],
      ["Самозанятость / ИП", "person"],
      ["Неофициальный доход", "wallet"],
      ["Пенсия", "document"],
      ["Другое", "question"]
    ]
  },
  {
    question: "Как удобно получить консультацию?",
    answers: [
      ["Телефонный звонок", "phone"],
      ["Telegram", "send"],
      ["WhatsApp", "chat"]
    ]
  }
];

const icons = {
  gauge: '<svg viewBox="0 0 24 24"><path d="M5 17a7 7 0 1 1 14 0"/><path d="m12 13 3-3"/><path d="M7 17h10"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 3v6M16 3v6M4 10h16"/></svg>',
  bank: '<svg viewBox="0 0 24 24"><path d="m3 9 9-5 9 5"/><path d="M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M4 18h16M3 21h18"/></svg>',
  coins: '<svg viewBox="0 0 24 24"><ellipse cx="9" cy="6" rx="5" ry="2.5"/><path d="M4 6v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V6"/><ellipse cx="15" cy="14" rx="5" ry="2.5"/><path d="M10 14v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M7 7a7 7 0 0 1 11 2M17 17a7 7 0 0 1-11-2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M4 7h15a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h12"/><path d="M15 11h6v4h-6z"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
  document: '<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6"/></svg>',
  question: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 4 1.8c-1.4.8-1.8 1.4-1.8 2.7M12 17h.01"/></svg>',
  person: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 21c.6-4.4 3.1-6.6 7-6.6s6.4 2.2 7 6.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6 3h4l1 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 1v4c0 1.7-1.3 3-3 3C9.7 21 3 14.3 3 6c0-1.7 1.3-3 3-3Z"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="m3 11 18-8-6 18-4-7-8-3Z"/><path d="m11 14 10-11"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 10h8"/></svg>'
};

let currentStep = 0;
const userAnswers = [];
const title = document.getElementById("quiz-title");
const answers = document.getElementById("answers");
const stepLabel = document.getElementById("step-label");
const backButton = document.getElementById("back-button");
const progressSegments = [...document.querySelectorAll(".progress-segment")];
const modal = document.getElementById("success-modal");

function renderStep() {
  const step = steps[currentStep];
  title.textContent = step.question;
  stepLabel.textContent = `Шаг ${currentStep + 1} из ${steps.length}`;
  progressSegments.forEach((segment, index) => segment.classList.toggle("active", index <= currentStep));
  backButton.hidden = currentStep === 0;
  answers.innerHTML = "";

  step.answers.forEach(([label, icon]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `
      <span class="answer-icon">${icons[icon] || icons.question}</span>
      <span class="answer-label">${label}</span>
      <span class="chevron">›</span>
    `;
    button.addEventListener("click", () => {
      userAnswers[currentStep] = label;
      if (currentStep < steps.length - 1) {
        currentStep += 1;
        renderStep();
      } else {
        modal.hidden = false;
        document.body.style.overflow = "hidden";
      }
    });
    answers.appendChild(button);
  });
}

backButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});

document.querySelectorAll("[data-scroll-quiz]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("quiz").scrollIntoView({behavior: "smooth", block: "center"});
  });
});

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  });
});

document.getElementById("lead-form").addEventListener("submit", event => {
  event.preventDefault();
  const card = event.target.closest(".modal-card");
  card.innerHTML = `
    <div class="final-state">
      <div class="success-icon">✓</div>
      <h2>Заявка сохранена</h2>
      <p>Контактные данные и ответы квиза готовы к передаче специалистам вашей команды.</p>
      <button class="primary-cta" type="button" id="finish-close">Закрыть</button>
    </div>
  `;
  document.getElementById("finish-close").addEventListener("click", () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  });
  console.log("Quiz answers:", userAnswers);
});

renderStep();