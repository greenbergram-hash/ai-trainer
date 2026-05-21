// =========================================
// פדרו - מאמן אישי
// app.js - הלוגיקה של האפליקציה
// =========================================

// ברכות אקראיות של פדרו
const greetings = [
  '¡Hola amigo! אני פדרו, המאמן שלך.<br>מוכן להזיע קצת? 💪',
  '¡Vamos! יום חדש, אימון חדש!<br>בוא נעשה את זה 🔥',
  'אמיגו! חיכיתי לך 😎<br>מוכן לפוצץ אימון?',
  '¡Excelente! חזרת!<br>היום הולכים לדחוף חזק 💥',
  'שלום אלוף! 🌟<br>בלי תירוצים - יוצאים לדרך!'
];

// בוחר ברכה אקראית
function setRandomGreeting() {
  const el = document.getElementById('pedro-greeting');
  if (!el) return;
  const random = greetings[Math.floor(Math.random() * greetings.length)];
  el.innerHTML = random;
}

// לחיצה על כפתור "בוא נתאמן"
function onStartClick() {
  // רטט קצר בטלפון (אם נתמך)
  if (navigator.vibrate) navigator.vibrate(30);

  // לעת עתה - הודעה זמנית. בשלב הבא נבנה את התפריט הראשי
  alert('¡Vamos! 🔥\nבשלב הבא נבנה את תפריט האימונים');
}

// הפעלה כשהדף נטען
document.addEventListener('DOMContentLoaded', () => {
  setRandomGreeting();

  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.addEventListener('click', onStartClick);
});
