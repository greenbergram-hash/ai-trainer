'use strict';

// ================================================
//  פדרו - מאמן אישי | app.js
// ================================================

// ===== נתוני בסיס לתרגילים =====
const BASE_EXERCISES = {
  pushups:  { name: 'שכיבות סמיכה', emoji: '💪', type: 'reps',  baseReps: 15, baseSets: 3, baseRest: 30,
    pedro: ['שמור על גב ישר ובטן מכווצת! 🔥','¡Vamos! כל חזרה מחזקת אותך!','אתה חזק יותר ממה שחשבת! 💪','¡Fuego! עוד קצת!'] },
  squats:   { name: 'סקוואט',         emoji: '🦵', type: 'reps',  baseReps: 20, baseSets: 3, baseRest: 30,
    pedro: ['ירכיים מקבילות לרצפה - כמו כיסא! 🪑','¡Vamos! הרגליים נהיות פלדה! 🦾','גב ישר, ברכיים לא בפנים!','עוד 5 ואתה גיבור! ⚡'] },
  crunches: { name: 'כפיפות בטן',     emoji: '🔥', type: 'reps',  baseReps: 20, baseSets: 3, baseRest: 30,
    pedro: ['הראש לא נוגע ברצפה בין חזרות!','¡Fuego! בטן של שוקולד! 🍫','בטן מכווצת כל הזמן!','¡Más! עוד קצת!'] },
  plank:    { name: 'פלאנק',           emoji: '🏋️', type: 'time',  baseSecs: 30, baseSets: 3, baseRest: 45,
    pedro: ['גב ישר! בטן קשה! ¡Aguanta! 💪','אל תוריד את הירכיים!','כמו קרש! ¡Aguanta! 🌳','¡Casi! כמעט סיימת!'] },
  jjacks:   { name: "ג'אמפינג ג'קס",  emoji: '⚡', type: 'reps',  baseReps: 30, baseSets: 3, baseRest: 30,
    pedro: ['¡Vamos! תנועות גדולות! ⚡','כמו כוכב בשמיים! ⭐','אתה מכניס אנרגיה לגוף! 🔋','נשימות עמוקות! ¡Respira!'] },
};

// ===== סדר תרגילי בדיקת ביצועים =====
const PERF_TESTS = [
  { exId: 'pushups',  label: 'שכיבות סמיכה', emoji: '💪', unit: 'חזרות', min: 0, max: 50, def: 5  },
  { exId: 'squats',   label: 'סקוואט',        emoji: '🦵', unit: 'חזרות', min: 0, max: 60, def: 10 },
  { exId: 'crunches', label: 'כפיפות בטן',    emoji: '🔥', unit: 'חזרות', min: 0, max: 50, def: 8  },
  { exId: 'plank',    label: 'פלאנק',          emoji: '🏋️', unit: 'שניות', min: 0, max: 120, def: 15 },
  { exId: 'jjacks',   label: "ג'אמפינג ג'קס",emoji: '⚡', unit: 'חזרות', min: 0, max: 80, def: 20 },
];

// ===== הסדר הקבוע של האימון =====
const WORKOUT_EXERCISE_ORDER = ['pushups','squats','crunches','plank','jjacks'];

// ===== הודעות פדרו =====
const PEDRO_MSGS = {
  welcome: [
    '¡Hola amigo! אני פדרו, המאמן שלך.<br>מוכן להזיע קצת? 💪',
    '¡Buenos días! ניצחון מתחיל כאן! 🔥',
    '¡Vamos! לא נחכה לפלאים! 💥',
    'אמיגו! חיכיתי לך! ¡Vamos a entrenar! 😤',
    'היום עושים היסטוריה! ¡Arriba! 🏆',
  ],
  menu: [
    '¡Hola! מוכן לאימון של היום? 🔥',
    '¡Vamos amigo! לא נחכה! 💪',
    'הגוף שלך מחכה לך! ¡Arriba! ⚡',
    'היום עושים היסטוריה! 🏆',
  ],
  rest: [
    'תנשום עמוק! ¡Respira! 💨',
    'אתה עושה מצוין אמיגו! 💪',
    'מנוחה קצרה ואז חוזרים חזק! 🔥',
    'שתה מים! ¡Agua amigo! 💧',
    'הגוף שלך עובד קשה! ⏳',
  ],
  complete: [
    '¡Excelente amigo! היית אגדה היום! 🌟',
    '¡Increíble! פדרו גאה בך! 🏆',
    'כל כאב הוא רווח! עד מחר! 💪🔥',
    'ראית? ידעתי שיש לך את זה! ¡Bravo! 🎉',
  ],
};

// ===== הגדרות מטרה =====
const GOALS = {
  'general':     { label: 'כושר כללי',   emoji: '⭐' },
  'strength':    { label: 'להתחזק',      emoji: '💪' },
  'weight-loss': { label: 'לרדת במשקל', emoji: '🔥' },
  'agility':     { label: 'להיות זריז',  emoji: '⚡' },
};

// ===== מצב האפליקציה =====
const state = {
  workout:       null,
  personalExs:   {},   // תרגילים מחושבים לפי פרופיל
  exIdx:         0,
  setIdx:        0,
  timerInterval: null,
  timeLeft:      0,
  totalTime:     0,
  workoutStart:  null,
  completedSets: 0,
};

// ===== מצב אשף =====
const wizard = {
  step:     0,
  perfIdx:  0,
  perfVals: {}, // { pushups: 10, squats: 15, ... }
  selectedGoal: 'general',
  selectedDays: 3,
};

// ================================================
//  חישוב פרמטרי תרגיל לפי ביצועים
// ================================================
function calcExercise(exId, perf) {
  const base = BASE_EXERCISES[exId];
  const maxVal = perf?.[exId] ?? null;

  if (!maxVal || maxVal === 0) {
    // אין נתון - השתמש בברירת מחדל מינימלית
    if (base.type === 'reps') return { ...base, reps: base.baseReps, sets: base.baseSets, rest: base.baseRest };
    else                      return { ...base, seconds: base.baseSecs, sets: base.baseSets, rest: base.baseRest };
  }

  if (base.type === 'reps') {
    const reps = Math.max(3, Math.round(maxVal * 0.65));
    const sets = maxVal < 5 ? 2 : maxVal >= 25 ? 4 : 3;
    const rest = maxVal < 8 ? 50 : maxVal < 15 ? 35 : 25;
    return { ...base, reps, sets, rest };
  } else {
    // תרגיל זמן (פלאנק)
    const seconds = Math.max(10, Math.round(maxVal * 0.65));
    const sets = maxVal < 15 ? 2 : maxVal >= 50 ? 4 : 3;
    const rest = maxVal < 20 ? 55 : 40;
    return { ...base, seconds, sets, rest };
  }
}

function buildPersonalExercises(profile) {
  const perf = profile?.performance || {};
  const exs = {};
  WORKOUT_EXERCISE_ORDER.forEach(id => { exs[id] = calcExercise(id, perf); });
  return exs;
}

// ================================================
//  אודיו
// ================================================
let _audio = null;
function getAudio() {
  if (!_audio) _audio = new (window.AudioContext || window.webkitAudioContext)();
  if (_audio.state === 'suspended') _audio.resume();
  return _audio;
}
function playTone(freq, dur, type = 'sine', vol = 0.28) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = type;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur + 0.05);
  } catch (_) {}
}
function sndBeep()     { playTone(880, 0.08, 'square', 0.22); }
function sndGo()       { playTone(880, 0.15); setTimeout(() => playTone(1320, 0.3), 160); }
function sndRest()     { playTone(440, 0.4, 'sine', 0.22); }
function sndComplete() { [523,659,784,1047].forEach((n,i) => setTimeout(() => playTone(n,0.35), i*160)); }
function vibrate(ms)   { if (navigator.vibrate) navigator.vibrate(ms); }

// ================================================
//  ניהול מסכים
// ================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function setPedroMsg(elId, msgs) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = msgs[Math.floor(Math.random() * msgs.length)];
}

// ================================================
//  localStorage
// ================================================
function getData()       { try { return JSON.parse(localStorage.getItem('pedro_v2') || '{}'); } catch { return {}; } }
function saveData(d)     { try { localStorage.setItem('pedro_v2', JSON.stringify(d)); } catch {} }
function getProfile()    { return getData().profile || null; }
function saveProfile(p)  { const d = getData(); d.profile = p; saveData(d); }
function getStreak()     {
  const d = getData();
  if (!d.lastWorkout) return 0;
  const today = todayStr(), yday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  return (d.lastWorkout === today || d.lastWorkout === yday) ? (d.streak||0) : 0;
}
function saveWorkoutDone() {
  const d = getData(), today = todayStr(), yday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  let streak = d.streak||0;
  if (d.lastWorkout === yday) streak++; else if (d.lastWorkout !== today) streak = 1;
  d.streak = streak; d.lastWorkout = today;
  d.history = d.history||[]; d.history.push({ date: today });
  saveData(d); return streak;
}
function todayStr() { return new Date().toISOString().slice(0,10); }

// ================================================
//  אשף הגדרה (Setup Wizard)
// ================================================

function startSetup(editMode = false) {
  wizard.step = editMode ? 1 : 0;
  wizard.perfIdx = 0;
  wizard.perfVals = {};
  wizard.selectedGoal = 'general';
  wizard.selectedDays = 3;

  // אם עריכה - מלא ערכים קיימים
  if (editMode) {
    const p = getProfile();
    if (p) {
      wizard.selectedGoal = p.goal || 'general';
      wizard.selectedDays = p.daysPerWeek || 3;
      wizard.perfVals = { ...(p.performance||{}) };
      if (p.name) { const el = document.getElementById('inp-name'); if(el) el.value = p.name; }
      if (p.age)  { const el = document.getElementById('inp-age');  if(el) el.value = p.age; }
      if (p.weight){ const el = document.getElementById('inp-weight'); if(el) el.value = p.weight; }
      if (p.height){ const el = document.getElementById('inp-height'); if(el) el.value = p.height; }
    }
  }

  showScreen('setup-screen');
  goToStep(wizard.step);
}

function goToStep(n) {
  wizard.step = n;
  document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${n}`)?.classList.add('active');

  // Progress bar: 5 steps (0-4), 0→0%, 1→20%, 2→45%, 3→70%, 4→100%
  const pct = [0, 20, 45, 70, 100][n] ?? 0;
  document.getElementById('setup-prog-fill').style.width = pct + '%';

  if (n === 2) refreshGoalUI();
  if (n === 3) startPerfTest();
  if (n === 4) buildSummary();
}

/* --- שלב 2: מטרה + ימים --- */
function refreshGoalUI() {
  document.querySelectorAll('.goal-card').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.goal === wizard.selectedGoal);
  });
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.days) === wizard.selectedDays);
  });
}

/* --- שלב 3: בדיקת ביצועים --- */
function startPerfTest() {
  wizard.perfIdx = 0;
  renderPerfDots();
  loadPerfExercise();
}

function renderPerfDots() {
  const c = document.getElementById('perf-dots');
  if (!c) return;
  c.innerHTML = PERF_TESTS.map((_, i) => {
    const cls = i < wizard.perfIdx ? 'done' : i === wizard.perfIdx ? 'active' : '';
    return `<div class="perf-dot ${cls}"></div>`;
  }).join('');
}

function loadPerfExercise() {
  const test = PERF_TESTS[wizard.perfIdx];
  if (!test) return;

  document.getElementById('perf-ex-name').textContent  = test.label;
  document.getElementById('perf-ex-emoji').textContent = test.emoji;
  document.getElementById('perf-unit').textContent     = test.unit;

  // ערך קיים (עריכה) או ברירת מחדל
  const existing = wizard.perfVals[test.exId];
  const val = (existing !== undefined) ? existing : test.def;
  wizard.perfVals[test.exId] = val;
  document.getElementById('perf-number').textContent = val;
  updatePerfComment(test, val);

  // כפתור "הבא" - אם תרגיל אחרון → "סיים"
  const nextBtn = document.getElementById('btn-step3-next');
  if (nextBtn) nextBtn.textContent = wizard.perfIdx < PERF_TESTS.length - 1 ? 'הבא ←' : 'סיים! 🏁';
  renderPerfDots();
}

function changePerfVal(delta) {
  const test = PERF_TESTS[wizard.perfIdx];
  let val = (wizard.perfVals[test.exId] ?? test.def) + delta;
  val = Math.max(test.min, Math.min(test.max, val));
  wizard.perfVals[test.exId] = val;
  document.getElementById('perf-number').textContent = val;
  updatePerfComment(test, val);
}

function updatePerfComment(test, val) {
  const el = document.getElementById('perf-pedro-msg');
  if (!el) return;
  let msg;
  if (test.unit === 'שניות') {
    if (val === 0)  msg = 'אפס שניות?! לא נורא, נתחיל קטן! 💪';
    else if (val<=15) msg = 'בסדר מתחיל! נחזק אותך! 🔥';
    else if (val<=30) msg = 'לא רע! פדרו מרוצה! 😄';
    else if (val<=60) msg = '¡Bien! גב חזק = גוף חזק! 💪';
    else msg = '¡Campeón! דקה ויותר?! 🏆';
  } else {
    if (val === 0)  msg = '0?! לא נורא, מתחיל מאפס זה גבורה! 💪';
    else if (val<=5)  msg = 'נשמע כמו מתחיל - בדיוק מה שאני אוהב! 😄';
    else if (val<=10) msg = 'לא רע אמיגו! יש לך בסיס! 🔥';
    else if (val<=20) msg = 'כבר יש לך כוח! ¡Muy bien! 💪';
    else if (val<=35) msg = '¡Increíble! אתה כבר ספורטאי! 🌟';
    else msg = '¡Dios mío! אתה מפחיד אמיגו! 🏆';
  }
  el.textContent = msg;
}

/* --- שלב 4: סיכום --- */
function buildSummary() {
  const inp  = getWizardInputs();
  const goal = GOALS[wizard.selectedGoal] || GOALS.general;
  const perf = wizard.perfVals;

  // ברכה אישית
  const nameEl = document.getElementById('setup-name-greeting');
  if (nameEl) nameEl.textContent = inp.name ? `שלום ${inp.name}! האימון שלך מוכן 🔥` : 'האימון שלך מוכן! 🔥';

  // בנה סיכום פרמטרים
  const ex = buildPersonalExercises({ performance: perf });
  const sample = ex['pushups'];
  const summaryEl = document.getElementById('setup-summary');
  if (!summaryEl) return;

  const rows = [
    { label: 'מטרה',       value: `${goal.emoji} ${goal.label}` },
    { label: 'ימי אימון',  value: `${wizard.selectedDays} ימים בשבוע` },
    { label: 'שכיבות סמיכה', value: `${sample.reps} × ${sample.sets} סטים` },
    { label: 'מנוחה בין סטים', value: `${sample.rest} שניות` },
  ];
  summaryEl.innerHTML = rows.map(r =>
    `<div class="summary-row"><span class="summary-label">${r.label}</span><span class="summary-value">${r.value}</span></div>`
  ).join('');

  // הודעת פדרו מותאמת למטרה
  const msgs = {
    'general':     'בניתי לך אימון מאוזן! ¡Vamos! 💪',
    'strength':    'אימון לבניית שריר! ¡Fuerza! 🦾',
    'weight-loss': 'אימון לשריפת שומן! ¡Fuego! 🔥',
    'agility':     'אימון לזריזות ומהירות! ¡Rápido! ⚡',
  };
  const msgEl = document.getElementById('setup-pedro-done');
  if (msgEl) msgEl.textContent = msgs[wizard.selectedGoal] || msgs.general;
}

function getWizardInputs() {
  return {
    name:   (document.getElementById('inp-name')?.value || '').trim(),
    age:    parseInt(document.getElementById('inp-age')?.value) || null,
    weight: parseInt(document.getElementById('inp-weight')?.value) || null,
    height: parseInt(document.getElementById('inp-height')?.value) || null,
  };
}

function finishSetup() {
  const inp = getWizardInputs();
  const profile = {
    name:       inp.name || 'אמיגו',
    age:        inp.age,
    weight:     inp.weight,
    height:     inp.height,
    goal:       wizard.selectedGoal,
    daysPerWeek: wizard.selectedDays,
    performance: { ...wizard.perfVals },
  };
  saveProfile(profile);
  showScreen('menu-screen');
  initMenu();
}

// ================================================
//  מסך פתיחה
// ================================================
function initWelcome() {
  setPedroMsg('pedro-greeting', PEDRO_MSGS.welcome);
  document.getElementById('start-btn').onclick = () => {
    vibrate(30); sndGo();
    // אם אין פרופיל → אשף, אחרת → תפריט
    if (!getProfile()) startSetup(false);
    else { showScreen('menu-screen'); initMenu(); }
  };
}

// ================================================
//  תפריט ראשי
// ================================================
function initMenu() {
  const profile = getProfile();
  setPedroMsg('menu-msg', PEDRO_MSGS.menu);

  // ברכה אישית
  const greetEl = document.getElementById('menu-greeting');
  if (greetEl) greetEl.textContent = profile?.name ? `¡Hola, ${profile.name}! 🔥` : '¡Hola! 🔥';

  // רצף
  const streak = getStreak();
  document.getElementById('streak-text').textContent = `רצף: ${streak} ימים`;

  // כרטיס אימון מותאם
  const ex = buildPersonalExercises(profile);
  const sample = ex['pushups'];
  const nameEl = document.getElementById('wk-card-name');
  const descEl = document.getElementById('wk-card-desc');
  if (nameEl) nameEl.textContent = profile?.name ? `האימון של ${profile.name}` : 'אימון של פדרו';
  if (descEl) descEl.textContent = `5 תרגילים • ${sample.reps}×${sample.sets} שכיבות`;

  document.getElementById('btn-pedro-basic').onclick = () => { vibrate(30); startWorkout(); };
  document.getElementById('btn-settings').onclick    = () => startSetup(true);
}

// ================================================
//  אימון
// ================================================
function startWorkout() {
  const profile = getProfile();
  state.personalExs   = buildPersonalExercises(profile);
  state.exIdx         = 0;
  state.setIdx        = 0;
  state.workoutStart  = Date.now();
  state.completedSets = 0;
  state.workout       = { exercises: WORKOUT_EXERCISE_ORDER };
  showScreen('workout-screen');
  renderDots();
  loadExercise();
}

function renderDots() {
  const c = document.getElementById('prog-dots');
  if (!c) return;
  c.innerHTML = WORKOUT_EXERCISE_ORDER.map((_, i) => {
    const cls = i < state.exIdx ? 'done' : i === state.exIdx ? 'active' : '';
    return `<div class="prog-dot ${cls}"></div>`;
  }).join('');
}

function loadExercise() {
  const exId = state.workout.exercises[state.exIdx];
  const ex   = state.personalExs[exId];
  if (!ex) return;

  document.getElementById('ex-emoji').textContent = ex.emoji;
  document.getElementById('ex-name').textContent  = ex.name;
  document.getElementById('ex-sets').textContent  = `סט ${state.setIdx + 1} מתוך ${ex.sets}`;
  setPedroMsg('wk-msg', ex.pedro);
  renderDots();

  if (ex.type === 'time') setupTimedEx(ex);
  else                    setupRepEx(ex);
}

function setupRepEx(ex) {
  stopTimer(); resetRing();
  document.getElementById('ring-num').textContent = ex.reps;
  document.getElementById('ring-lbl').textContent = 'חזרות';
  const btn = document.getElementById('btn-action');
  btn.textContent = 'סיימתי סט! ✅';
  btn.onclick = onSetDone;
  vibrate(30); sndGo();
}

function setupTimedEx(ex) {
  stopTimer(); resetRing();
  state.timeLeft = ex.seconds; state.totalTime = ex.seconds;
  updateTimerUI(ex.seconds);
  const btn = document.getElementById('btn-action');
  btn.textContent = '▶ התחל! ▶';
  btn.onclick = () => { btn.textContent = '⏱️ רץ...'; btn.onclick = null; vibrate(30); sndGo(); runTimer(); };
}

function runTimer() {
  const CIRC = 326.73;
  const ring = document.getElementById('ring-fg');
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerUI(state.timeLeft);
    const offset = ((state.totalTime - state.timeLeft) / state.totalTime) * CIRC;
    ring.style.strokeDashoffset = offset;
    if (state.timeLeft <= 5 && state.timeLeft > 0) { ring.classList.add('urgent'); sndBeep(); vibrate(40); }
    if (state.timeLeft <= 0) { stopTimer(); vibrate([80,40,80]); sndGo(); onSetDone(); }
  }, 1000);
}

function updateTimerUI(sec) {
  document.getElementById('ring-num').textContent = sec;
  document.getElementById('ring-lbl').textContent = 'שניות';
}
function resetRing() {
  const r = document.getElementById('ring-fg');
  r.style.strokeDashoffset = '0'; r.classList.remove('urgent');
}
function stopTimer() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
}

function onSetDone() {
  stopTimer(); state.completedSets++; vibrate([50,30,50]);
  const exId  = state.workout.exercises[state.exIdx];
  const ex    = state.personalExs[exId];
  const lastSet = state.setIdx >= ex.sets - 1;
  const lastEx  = state.exIdx  >= state.workout.exercises.length - 1;

  if (lastSet && lastEx) {
    finishWorkout();
  } else if (lastSet) {
    const nextEx = state.personalExs[state.workout.exercises[state.exIdx + 1]];
    goRest(ex.rest + 10, nextEx?.name, nextEx?.emoji, true);
  } else {
    state.setIdx++;
    goRest(ex.rest, ex.name, ex.emoji, false);
  }
}

// ================================================
//  מנוחה
// ================================================
function goRest(seconds, nextName, nextEmoji, isNextEx) {
  showScreen('rest-screen'); sndRest();
  setPedroMsg('rest-msg', PEDRO_MSGS.rest);
  document.getElementById('rest-num').textContent   = seconds;
  document.getElementById('next-name').textContent  = nextName  || '';
  document.getElementById('next-emoji').textContent = nextEmoji || '💪';
  let t = seconds;
  state.timerInterval = setInterval(() => {
    t--;
    document.getElementById('rest-num').textContent = t;
    if (t <= 3 && t > 0) sndBeep();
    if (t <= 0) { stopTimer(); afterRest(isNextEx); }
  }, 1000);
  document.getElementById('btn-skip-rest').onclick = () => { stopTimer(); afterRest(isNextEx); };
}

function afterRest(isNextEx) {
  if (isNextEx) { state.exIdx++; state.setIdx = 0; }
  showScreen('workout-screen'); loadExercise();
}

// ================================================
//  סיום אימון
// ================================================
function finishWorkout() {
  const mins = Math.max(1, Math.round((Date.now() - state.workoutStart) / 60000));
  document.getElementById('s-ex').textContent   = state.workout.exercises.length;
  document.getElementById('s-sets').textContent = state.completedSets;
  document.getElementById('s-time').textContent = mins;
  const profile = getProfile();
  const subEl = document.getElementById('complete-sub');
  if (subEl && profile?.name) subEl.textContent = `כל הכבוד ${profile.name}! 🔥`;
  setPedroMsg('complete-msg', PEDRO_MSGS.complete);
  const streak = saveWorkoutDone();
  showScreen('complete-screen');
  sndComplete(); vibrate([100,80,100,80,200]); launchConfetti();
  document.getElementById('btn-home').onclick = () => { showScreen('menu-screen'); initMenu(); };
  setTimeout(() => { const el = document.getElementById('streak-text'); if(el) el.textContent = `רצף: ${streak} ימים`; }, 100);
}

// ================================================
//  קונפטי
// ================================================
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const COLORS = ['#ffd700','#ff6b1a','#ff1a1a','#ffcc1a','#ffffff','#ff9933','#ff4d4d'];
  const p = Array.from({length:140}, () => ({
    x: Math.random()*canvas.width, y: -10-Math.random()*120,
    w: 5+Math.random()*9, h: 3+Math.random()*6,
    vx: (Math.random()-.5)*3.5, vy: 1.8+Math.random()*4,
    col: COLORS[~~(Math.random()*COLORS.length)],
    rot: Math.random()*360, rotV: (Math.random()-.5)*9,
  }));
  let frame = 0;
  (function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    p.forEach(q => {
      ctx.save(); ctx.translate(q.x,q.y); ctx.rotate(q.rot*Math.PI/180);
      ctx.fillStyle = q.col; ctx.fillRect(-q.w/2,-q.h/2,q.w,q.h); ctx.restore();
      q.x+=q.vx; q.y+=q.vy; q.rot+=q.rotV; q.vy+=0.06;
    });
    if(++frame<220) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  })();
}

// ================================================
//  אתחול - DOMContentLoaded
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initWelcome();

  /* ===== אשף - step 0 ===== */
  document.getElementById('btn-step0-next').onclick = () => goToStep(1);

  /* ===== אשף - step 1 ===== */
  document.getElementById('btn-step1-back').onclick = () => goToStep(0);
  document.getElementById('btn-step1-next').onclick = () => {
    const name = (document.getElementById('inp-name')?.value || '').trim();
    if (!name) { document.getElementById('inp-name').focus(); return; }
    goToStep(2);
  };

  /* ===== אשף - step 2: מטרה + ימים ===== */
  document.getElementById('btn-step2-back').onclick = () => goToStep(1);
  document.getElementById('btn-step2-next').onclick = () => goToStep(3);

  document.querySelectorAll('.goal-card').forEach(btn => {
    btn.onclick = () => {
      wizard.selectedGoal = btn.dataset.goal;
      document.querySelectorAll('.goal-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
  });
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.onclick = () => {
      wizard.selectedDays = parseInt(btn.dataset.days);
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
  });
  // ברירת מחדל
  document.querySelector('.goal-card[data-goal="general"]')?.classList.add('selected');
  document.querySelector('.day-btn[data-days="3"]')?.classList.add('selected');

  /* ===== אשף - step 3: ביצועים ===== */
  document.getElementById('btn-step3-back').onclick = () => {
    if (wizard.perfIdx === 0) goToStep(2);
    else { wizard.perfIdx--; loadPerfExercise(); }
  };
  document.getElementById('btn-step3-next').onclick = () => {
    if (wizard.perfIdx < PERF_TESTS.length - 1) { wizard.perfIdx++; loadPerfExercise(); }
    else goToStep(4);
  };
  document.getElementById('perf-minus').onclick = () => changePerfVal(-1);
  document.getElementById('perf-plus').onclick  = () => changePerfVal(+1);

  // לחיצה ממושכת על − / + → שינוי מהיר
  let holdInterval = null;
  const startHold = (delta) => { holdInterval = setInterval(() => changePerfVal(delta), 120); };
  const endHold   = ()       => { clearInterval(holdInterval); holdInterval = null; };
  document.getElementById('perf-minus').addEventListener('mousedown',  () => startHold(-1));
  document.getElementById('perf-plus').addEventListener('mousedown',   () => startHold(+1));
  document.getElementById('perf-minus').addEventListener('touchstart', () => startHold(-1), {passive:true});
  document.getElementById('perf-plus').addEventListener('touchstart',  () => startHold(+1), {passive:true});
  ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev => {
    document.getElementById('perf-minus').addEventListener(ev, endHold);
    document.getElementById('perf-plus').addEventListener(ev, endHold);
  });

  /* ===== אשף - step 4: סיום ===== */
  document.getElementById('btn-setup-finish').onclick = finishSetup;

  /* ===== אימון: יציאה + דילוג ===== */
  document.getElementById('btn-exit').onclick = () => {
    stopTimer();
    if (confirm('לצאת מהאימון? ¡No no no! 😤')) { showScreen('menu-screen'); initMenu(); }
  };
  document.getElementById('btn-skip-ex').onclick = () => {
    stopTimer();
    const isLast = state.exIdx >= state.workout.exercises.length - 1;
    if (isLast) finishWorkout();
    else { state.exIdx++; state.setIdx = 0; showScreen('workout-screen'); loadExercise(); }
  };
});
