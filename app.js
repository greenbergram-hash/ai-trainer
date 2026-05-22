'use strict';

// ================================================
//  פדרו - מאמן אישי | app.js
// ================================================

// ===== נתוני תרגילים =====
const EXERCISES = {
  pushups: {
    name: 'שכיבות סמיכה', emoji: '💪',
    type: 'reps', reps: 15, sets: 3, rest: 30,
    pedro: [
      'שמור על גב ישר ובטן מכווצת! 🔥',
      '¡Vamos! כל חזרה מחזקת אותך!',
      'אתה חזק יותר ממה שחשבת אמיגו! 💪',
      '¡Fuego! עוד קצת!',
    ]
  },
  squats: {
    name: 'סקוואט', emoji: '🦵',
    type: 'reps', reps: 20, sets: 3, rest: 30,
    pedro: [
      'ירכיים מקבילות לרצפה - כמו כיסא! 🪑',
      '¡Vamos amigo! הרגליים נהיות פלדה! 🦾',
      'גב ישר, ברכיים לא בפנים!',
      'עוד 5 ואתה גיבור! ⚡',
    ]
  },
  crunches: {
    name: 'כפיפות בטן', emoji: '🔥',
    type: 'reps', reps: 20, sets: 3, rest: 30,
    pedro: [
      'הראש לא נוגע ברצפה בין חזרות!',
      '¡Fuego! אתה בונה בטן של שוקולד! 🍫',
      'בטן מכווצת כל הזמן אמיגו!',
      '¡Más! עוד קצת!',
    ]
  },
  plank: {
    name: 'פלאנק', emoji: '🏋️',
    type: 'time', seconds: 30, sets: 3, rest: 45,
    pedro: [
      'גב ישר! בטן קשה! ¡Aguanta! 💪',
      'אל תוריד את הירכיים אמיגו!',
      'כמו קרש! אתה מחזיק! 🌳',
      '¡Casi! כמעט סיימת!',
    ]
  },
  jjacks: {
    name: "ג'אמפינג ג'קס", emoji: '⚡',
    type: 'reps', reps: 30, sets: 3, rest: 30,
    pedro: [
      '¡Vamos! תנועות גדולות! ⚡',
      'כמו כוכב בשמיים! ⭐',
      'אתה מכניס אנרגיה לגוף! 🔋',
      'נשימות עמוקות! ¡Respira!',
    ]
  }
};

const WORKOUTS = {
  'pedro-basic': {
    id: 'pedro-basic',
    name: 'אימון של פדרו',
    exercises: ['pushups', 'squats', 'crunches', 'plank', 'jjacks']
  }
};

// ===== הודעות פדרו לפי מצב =====
const PEDRO_MSGS = {
  menu: [
    '¡Hola! מוכן לאימון של היום? 🔥',
    '¡Vamos amigo! לא נחכה! 💪',
    'הגוף שלך מחכה לך! ¡Arriba! ⚡',
    'היום עושים היסטוריה אמיגו! 🏆',
  ],
  rest: [
    'תנשום עמוק! ¡Respira! 💨',
    'אתה עושה מצוין אמיגו! 💪',
    'מנוחה קצרה ואז חוזרים חזק! 🔥',
    'שתה מים! ¡Agua amigo! 💧',
    'הגוף שלך עובד קשה - תן לו שניות! ⏳',
  ],
  complete: [
    '¡Excelente amigo! היית אגדה היום! 🌟',
    '¡Increíble! פדרו גאה בך! 🏆',
    'כל כאב הוא רווח! עד מחר! 💪🔥',
    'ראית? ידעתי שיש לך את זה! ¡Bravo! 🎉',
  ],
  welcome: [
    '¡Hola amigo! אני פדרו, המאמן שלך.<br>מוכן להזיע קצת? 💪',
    '¡Buenos días! ניצחון מתחיל כאן! 🔥',
    '¡Vamos! לא נחכה לפלאים! 💥',
    'אמיגו! חיכיתי לך! ¡Vamos a entrenar! 😤',
    'היום עושים היסטוריה! ¡Arriba! 🏆',
  ]
};

// ===== מצב האפליקציה =====
const state = {
  workout: null,
  exIdx: 0,
  setIdx: 0,
  timerInterval: null,
  timeLeft: 0,
  totalTime: 0,
  workoutStart: null,
  completedSets: 0,
};

// ================================================
//  צלילים (Web Audio API)
// ================================================
let _audio = null;
function getAudio() {
  if (!_audio) {
    _audio = new (window.AudioContext || window.webkitAudioContext)();
  }
  // resume if suspended (iOS requires user gesture)
  if (_audio.state === 'suspended') _audio.resume();
  return _audio;
}

function playTone(freq, dur, type = 'sine', vol = 0.28) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur + 0.05);
  } catch (_) { /* audio not available */ }
}

// קו-קו ספירה לאחור
function sndBeep()     { playTone(880, 0.08, 'square', 0.22); }
// סיגנל "קדימה!"
function sndGo()       {
  playTone(880, 0.15, 'sine', 0.3);
  setTimeout(() => playTone(1320, 0.3, 'sine', 0.3), 160);
}
// תחילת מנוחה
function sndRest()     { playTone(440, 0.4, 'sine', 0.22); }
// סיום אימון - פנפרה
function sndComplete() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((n, i) => setTimeout(() => playTone(n, 0.35, 'sine', 0.28), i * 160));
}

// ===== רטט =====
function vibrate(ms) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

// ================================================
//  ניהול מסכים
// ================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ===== הצגת הודעת פדרו אקראית =====
function setPedroMsg(elId, msgs) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = msgs[Math.floor(Math.random() * msgs.length)];
}

// ================================================
//  localStorage
// ================================================
function getData() {
  try { return JSON.parse(localStorage.getItem('pedro_v1') || '{}'); }
  catch { return {}; }
}
function saveData(d) {
  try { localStorage.setItem('pedro_v1', JSON.stringify(d)); } catch {}
}

function getStreak() {
  const d = getData();
  if (!d.lastWorkout) return 0;
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (d.lastWorkout === today || d.lastWorkout === yesterday) return d.streak || 0;
  return 0; // רצף נשבר
}

function saveWorkoutDone() {
  const d = getData();
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = d.streak || 0;
  if      (d.lastWorkout === yesterday) streak += 1;
  else if (d.lastWorkout !== today)     streak  = 1;
  d.streak = streak;
  d.lastWorkout = today;
  d.history = d.history || [];
  d.history.push({ date: today, workout: state.workout?.id });
  saveData(d);
  return streak;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ================================================
//  מסך פתיחה
// ================================================
function initWelcome() {
  setPedroMsg('pedro-greeting', PEDRO_MSGS.welcome);
  document.getElementById('start-btn').onclick = () => {
    vibrate(30);
    sndGo();
    showScreen('menu-screen');
    initMenu();
  };
}

// ================================================
//  תפריט ראשי
// ================================================
function initMenu() {
  setPedroMsg('menu-msg', PEDRO_MSGS.menu);
  const streak = getStreak();
  document.getElementById('streak-text').textContent = `רצף: ${streak} ימים`;
  document.getElementById('btn-pedro-basic').onclick = () => {
    vibrate(30);
    startWorkout('pedro-basic');
  };
}

// ================================================
//  אימון - הפעלה
// ================================================
function startWorkout(workoutId) {
  const wk = WORKOUTS[workoutId];
  if (!wk) return;
  state.workout = wk;
  state.exIdx = 0;
  state.setIdx = 0;
  state.workoutStart = Date.now();
  state.completedSets = 0;
  showScreen('workout-screen');
  renderDots();
  loadExercise();
}

// ===== נקודות התקדמות =====
function renderDots() {
  const container = document.getElementById('prog-dots');
  if (!container) return;
  container.innerHTML = state.workout.exercises
    .map((_, i) => {
      const cls = i < state.exIdx ? 'done' : i === state.exIdx ? 'active' : '';
      return `<div class="prog-dot ${cls}"></div>`;
    }).join('');
}

// ===== טעינת תרגיל =====
function loadExercise() {
  const exId = state.workout.exercises[state.exIdx];
  const ex = EXERCISES[exId];
  if (!ex) return;

  document.getElementById('ex-emoji').textContent = ex.emoji;
  document.getElementById('ex-name').textContent  = ex.name;
  document.getElementById('ex-sets').textContent  = `סט ${state.setIdx + 1} מתוך ${ex.sets}`;
  setPedroMsg('wk-msg', ex.pedro);
  renderDots();

  if (ex.type === 'time') setupTimedEx(ex);
  else                    setupRepEx(ex);
}

// ===== תרגיל עם חזרות =====
function setupRepEx(ex) {
  stopTimer();
  resetRing();
  document.getElementById('ring-num').textContent = ex.reps;
  document.getElementById('ring-lbl').textContent = 'חזרות';

  const btn = document.getElementById('btn-action');
  btn.textContent = 'סיימתי סט! ✅';
  btn.onclick = onSetDone;

  vibrate(30);
  sndGo();
}

// ===== תרגיל עם טיימר =====
function setupTimedEx(ex) {
  stopTimer();
  state.timeLeft = ex.seconds;
  state.totalTime = ex.seconds;
  resetRing();
  updateTimerUI(ex.seconds);

  const btn = document.getElementById('btn-action');
  btn.textContent = '▶ התחל! ▶';
  btn.onclick = () => {
    btn.textContent = '⏱️ רץ...';
    btn.onclick = null;
    vibrate(30);
    sndGo();
    runTimer();
  };
}

function runTimer() {
  const CIRC = 326.73;
  const ring = document.getElementById('ring-fg');

  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerUI(state.timeLeft);

    // עדכון טבעת
    const offset = ((state.totalTime - state.timeLeft) / state.totalTime) * CIRC;
    ring.style.strokeDashoffset = offset;

    // 5 שניות אחרונות - אדום + ביפ
    if (state.timeLeft <= 5 && state.timeLeft > 0) {
      ring.classList.add('urgent');
      sndBeep();
      vibrate(40);
    }
    if (state.timeLeft <= 0) {
      stopTimer();
      vibrate([80, 40, 80]);
      sndGo();
      onSetDone();
    }
  }, 1000);
}

function updateTimerUI(sec) {
  document.getElementById('ring-num').textContent = sec;
  document.getElementById('ring-lbl').textContent = 'שניות';
}

function resetRing() {
  const ring = document.getElementById('ring-fg');
  ring.style.strokeDashoffset = '0';
  ring.classList.remove('urgent');
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

// ===== סיום סט =====
function onSetDone() {
  stopTimer();
  state.completedSets++;
  vibrate([50, 30, 50]);

  const exId = state.workout.exercises[state.exIdx];
  const ex   = EXERCISES[exId];
  const lastSet = state.setIdx >= ex.sets - 1;
  const lastEx  = state.exIdx >= state.workout.exercises.length - 1;

  if (lastSet && lastEx) {
    // אימון הסתיים!
    finishWorkout();
  } else if (lastSet) {
    // מעבר לתרגיל הבא - מנוחה ארוכה יותר
    const nextEx = EXERCISES[state.workout.exercises[state.exIdx + 1]];
    goRest(ex.rest + 10, nextEx?.name, nextEx?.emoji, true);
  } else {
    // סט נוסף - מנוחה קצרה
    state.setIdx++;
    const exNow = EXERCISES[exId];
    goRest(ex.rest, exNow.name, exNow.emoji, false);
  }
}

// ================================================
//  מסך מנוחה
// ================================================
function goRest(seconds, nextName, nextEmoji, isNextEx) {
  showScreen('rest-screen');
  sndRest();
  setPedroMsg('rest-msg', PEDRO_MSGS.rest);
  document.getElementById('rest-num').textContent   = seconds;
  document.getElementById('next-name').textContent  = nextName  || '';
  document.getElementById('next-emoji').textContent = nextEmoji || '💪';

  let t = seconds;
  state.timerInterval = setInterval(() => {
    t--;
    document.getElementById('rest-num').textContent = t;
    if (t <= 3 && t > 0) sndBeep();
    if (t <= 0) {
      stopTimer();
      afterRest(isNextEx);
    }
  }, 1000);

  document.getElementById('btn-skip-rest').onclick = () => {
    stopTimer();
    afterRest(isNextEx);
  };
}

function afterRest(isNextEx) {
  if (isNextEx) {
    state.exIdx++;
    state.setIdx = 0;
  }
  showScreen('workout-screen');
  loadExercise();
}

// ================================================
//  מסך סיום
// ================================================
function finishWorkout() {
  const mins = Math.max(1, Math.round((Date.now() - state.workoutStart) / 60000));
  document.getElementById('s-ex').textContent   = state.workout.exercises.length;
  document.getElementById('s-sets').textContent = state.completedSets;
  document.getElementById('s-time').textContent = mins;

  setPedroMsg('complete-msg', PEDRO_MSGS.complete);
  const streak = saveWorkoutDone();

  showScreen('complete-screen');
  sndComplete();
  vibrate([100, 80, 100, 80, 200]);
  launchConfetti();

  document.getElementById('btn-home').onclick = () => {
    showScreen('menu-screen');
    initMenu();
  };

  // עדכן את הסטריק בתפריט (לכשנחזור)
  setTimeout(() => {
    const el = document.getElementById('streak-text');
    if (el) el.textContent = `רצף: ${streak} ימים`;
  }, 100);
}

// ================================================
//  קונפטי 🎉
// ================================================
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#ffd700','#ff6b1a','#ff1a1a','#ffcc1a','#ffffff','#ff9933','#ff4d4d'];
  const particles = Array.from({ length: 140 }, () => ({
    x:    Math.random() * canvas.width,
    y:   -10 - Math.random() * 120,
    w:    5 + Math.random() * 9,
    h:    3 + Math.random() * 6,
    vx:  (Math.random() - 0.5) * 3.5,
    vy:   1.8 + Math.random() * 4,
    col:  COLORS[Math.floor(Math.random() * COLORS.length)],
    rot:  Math.random() * 360,
    rotV: (Math.random() - 0.5) * 9,
  }));

  let frame = 0;
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.rotV;
      p.vy  += 0.06; // כוח משיכה
    });
    if (++frame < 220) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

// ================================================
//  אתחול
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initWelcome();

  // כפתור יציאה מאימון
  document.getElementById('btn-exit').onclick = () => {
    stopTimer();
    if (confirm('לצאת מהאימון? ¡No no no! 😤')) {
      showScreen('menu-screen');
      initMenu();
    }
  };

  // דלג על תרגיל
  document.getElementById('btn-skip-ex').onclick = () => {
    stopTimer();
    const isLast = state.exIdx >= (state.workout?.exercises.length || 0) - 1;
    if (isLast) {
      finishWorkout();
    } else {
      state.exIdx++;
      state.setIdx = 0;
      showScreen('workout-screen');
      loadExercise();
    }
  };
});
