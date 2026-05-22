'use strict';
// ================================================
//  פדרו - מאמן אישי | app.js
// ================================================

// ===== ספריית כל התרגילים =====
const ALL_EXERCISES = {
  pushups:      { name: 'שכיבות סמיכה',    emoji: '💪', type: 'reps', baseReps: 15, baseSets: 3, baseRest: 30,
    pedro: ['שמור על גב ישר ובטן מכווצת! 🔥','¡Vamos! כל חזרה מחזקת אותך!','אתה חזק יותר ממה שחשבת! 💪'] },
  squats:       { name: 'סקוואט',           emoji: '🦵', type: 'reps', baseReps: 20, baseSets: 3, baseRest: 30,
    pedro: ['ירכיים מקבילות - כמו כיסא! 🪑','¡Vamos! הרגליים נהיות פלדה! 🦾','גב ישר, ברכיים לא בפנים!'] },
  crunches:     { name: 'כפיפות בטן',       emoji: '🔥', type: 'reps', baseReps: 20, baseSets: 3, baseRest: 30,
    pedro: ['הראש לא נוגע ברצפה!','¡Fuego! בטן של שוקולד! 🍫','בטן מכווצת כל הזמן!'] },
  plank:        { name: 'פלאנק',             emoji: '🏋️', type: 'time', baseSecs: 30, baseSets: 3, baseRest: 45,
    pedro: ['גב ישר! בטן קשה! ¡Aguanta! 💪','אל תוריד את הירכיים!','¡Casi! כמעט סיימת!'] },
  jjacks:       { name: "ג'אמפינג ג'קס",   emoji: '⚡', type: 'reps', baseReps: 30, baseSets: 3, baseRest: 30,
    pedro: ['¡Vamos! תנועות גדולות! ⚡','כמו כוכב! ⭐','¡Arriba! עוד!'] },
  lunges:       { name: 'לאנג\'ים',          emoji: '🚶', type: 'reps', baseReps: 12, baseSets: 3, baseRest: 30,
    pedro: ['ברך לא עוברת את הבוהן!','¡Equilibrio! שיווי משקל!','חלופי צדדים!'] },
  burpees:      { name: 'ברפי',              emoji: '🔄', type: 'reps', baseReps: 10, baseSets: 3, baseRest: 45,
    pedro: ['מלך התרגילים! 👑','¡Completo! גוף שלם!','אל תפסיק אמיגו!'] },
  mountainclimb:{ name: 'מטפסי הרים',        emoji: '⛰️', type: 'time', baseSecs: 30, baseSets: 3, baseRest: 45,
    pedro: ['מהיר! ¡Rápido! 🔥','בטן מכווצת תמיד!','כמו שריפה! 🔥'] },
  highknees:    { name: 'ברכיים גבוהות',     emoji: '🏃', type: 'time', baseSecs: 30, baseSets: 3, baseRest: 30,
    pedro: ['ברכיים עד הבטן! ¡Arriba!','ידיים בתנועה!','¡Más rápido! עוד!'] },
  legraises:    { name: 'הרמות רגליים',       emoji: '🦵', type: 'reps', baseReps: 15, baseSets: 3, baseRest: 30,
    pedro: ['גב שטוח ברצפה!','ירידה איטית!','¡Lento y controlado!'] },
  tripdips:     { name: 'מתח אחורי (ספסל)',  emoji: '🪑', type: 'reps', baseReps: 12, baseSets: 3, baseRest: 30,
    pedro: ['מרפקים אחורה!','ירידה עמוקה!','¡Fuerza! כוח!'] },
};

// ===== אייקונים לתרגיל מותאם אישית =====
const CUSTOM_EMOJIS = ['💪','🏃','🦵','🔥','⚡','🏋️','🤸','🧘','🚴','🥊','👊','🦾','🧗','🏊','🌟','🎯','⭐','🦶','🤾','🔄','🏅','🫀'];
let customExState = { emoji: '💪', type: 'reps' };

// ===== helper: שם ואייקון לכל תרגיל (ספרייה או מותאם) =====
function getExInfo(ex) {
  if (ex && (ex.custom || !ALL_EXERCISES[ex.exId])) {
    return { name: ex.name || ex.exId, emoji: ex.emoji || '💪', pedro: ['¡Vamos!', 'תמשיך! 💪', 'כמעט שם! 🔥'] };
  }
  return ALL_EXERCISES[ex?.exId] || { name: '?', emoji: '💪', pedro: ['¡Vamos!'] };
}

// ===== המלצות לפי מטרה =====
const GOAL_RECOMMENDATIONS = {
  'general':     ['pushups','squats','crunches','plank','jjacks'],
  'strength':    ['pushups','squats','lunges','tripdips','legraises'],
  'weight-loss': ['burpees','jjacks','highknees','mountainclimb','squats'],
  'agility':     ['jjacks','highknees','mountainclimb','lunges','burpees'],
};

// ===== מדליות =====
// ===== פלייליסטים של Spotify =====
const SPOTIFY_PLAYLISTS = [
  { id: '37i9dQZF1DX76Wlfdnj7AP', emoji: '💪', name: 'Beast Mode',       sub: 'עוצמה מקסימלית' },
  { id: '37i9dQZF1DX2hIZ8Xr2XCZ', emoji: '⚡', name: 'Power Workout',    sub: 'אנרגיה גבוהה' },
  { id: '37i9dQZF1DWSJHnPb1f0X3', emoji: '🔥', name: 'Cardio',           sub: 'קרדיו ושריפת קלוריות' },
  { id: '37i9dQZF1DX3oM43U2LDt0', emoji: '🎤', name: 'Hip-Hop Workout',  sub: "ביטים לאימון" },
  { id: '37i9dQZF1DX35oM5mTxgBR', emoji: '🎸', name: 'Rock Workout',     sub: 'רוק וכוח' },
  { id: '37i9dQZF1DX0tMmF6SnSQx', emoji: '🌊', name: 'Chill Workout',    sub: 'קצב נינוח ויציב' },
];

const MEDALS = [
  { id: 'first',    emoji: '🌱', name: 'הצעד הראשון',  desc: 'סיימת את האימון הראשון שלך!',   check: s => s.total >= 1  },
  { id: 'w3',       emoji: '💪', name: 'מתחיל רציני',  desc: '3 אימונים הושלמו',               check: s => s.total >= 3  },
  { id: 'w10',      emoji: '⭐', name: 'ספורטאי',      desc: '10 אימונים — אתה רציני!',        check: s => s.total >= 10 },
  { id: 'w25',      emoji: '🌟', name: 'כוכב',         desc: '25 אימונים מושלמים!',            check: s => s.total >= 25 },
  { id: 'w50',      emoji: '👑', name: 'מלך הכושר',    desc: '50 אימונים! אתה אגדה!',          check: s => s.total >= 50 },
  { id: 'streak3',  emoji: '🔥', name: 'בוער!',        desc: '3 ימים ברצף',                    check: s => s.bestStreak >= 3  },
  { id: 'streak7',  emoji: '⚡', name: 'שבוע שלם',     desc: '7 ימים ברצף — מדהים!',           check: s => s.bestStreak >= 7  },
  { id: 'streak14', emoji: '💫', name: 'שני שבועות',   desc: '14 ימים ברצף — סופרנובה!',       check: s => s.bestStreak >= 14 },
  { id: 'streak30', emoji: '🏆', name: 'אגדה חיה',     desc: 'חודש שלם! ¡Leyenda!',            check: s => s.bestStreak >= 30 },
  { id: 'sets50',   emoji: '🎯', name: 'חמישים סטים',  desc: '50 סטים הושלמו!',                check: s => s.sets >= 50  },
  { id: 'sets100',  emoji: '💯', name: 'מאה סטים!',    desc: '100 סטים — בלתי נפסק!',          check: s => s.sets >= 100 },
  { id: 'sets500',  emoji: '🚀', name: 'מכונה',        desc: '500 סטים! פדרו דומע מאושר 😭',   check: s => s.sets >= 500 },
];

// ===== הודעות פדרו =====
const PEDRO_MSGS = {
  welcome: [
    '¡Hola amigo! אני פדרו, המאמן שלך.<br>מוכן להזיע קצת? 💪',
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
    'אתה עושה מצוין! 💪',
    'מנוחה קצרה ואז חוזרים חזק! 🔥',
    'שתה מים! ¡Agua amigo! 💧',
  ],
  complete: [
    '¡Excelente amigo! היית אגדה היום! 🌟',
    '¡Increíble! פדרו גאה בך! 🏆',
    'כל כאב הוא רווח! עד מחר! 💪🔥',
    'ראית? ידעתי שיש לך את זה! ¡Bravo! 🎉',
  ],
};

const GOALS = {
  'general':     { label: 'כושר כללי',   emoji: '⭐' },
  'strength':    { label: 'להתחזק',      emoji: '💪' },
  'weight-loss': { label: 'לרדת במשקל', emoji: '🔥' },
  'agility':     { label: 'להיות זריז',  emoji: '⚡' },
};

// ===== מצב ריצת אימון =====
const state = {
  activeWorkout:  null,   // {name, exercises:[{exId,type,sets,reps/seconds,rest,pedro}]}
  exIdx:          0,
  setIdx:         0,
  timerInterval:  null,
  timeLeft:       0,
  totalTime:      0,
  workoutStart:   null,
  completedSets:  0,
};

// ===== מצב בונה האימון =====
const builder = {
  editingId: null,        // null = חדש, string = עריכה
  name:      '',
  exercises: [],          // [{exId, type, sets, reps/seconds, rest, editOpen}]
};

// ===== מצב האשף =====
const wizard = {
  step: 0, perfIdx: 0, perfVals: {},
  selectedGoal: 'general', selectedDays: 3,
};

// ================================================
//  אודיו + רטט
// ================================================
let _audio = null;
function getAudio() {
  if (!_audio) _audio = new (window.AudioContext || window.webkitAudioContext)();
  if (_audio.state === 'suspended') _audio.resume();
  return _audio;
}
function playTone(f, d, t = 'sine', v = 0.28) {
  try {
    const ctx = getAudio(), o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = f; o.type = t;
    g.gain.setValueAtTime(v, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + d + 0.05);
  } catch (_) {}
}
const sndBeep     = () => playTone(880, 0.08, 'square', 0.22);
const sndGo       = () => { playTone(880, 0.15); setTimeout(() => playTone(1320, 0.3), 160); };
const sndRest     = () => playTone(440, 0.4, 'sine', 0.22);
const sndComplete = () => [523,659,784,1047].forEach((n,i) => setTimeout(() => playTone(n,.35),i*160));
const vibrate     = ms => navigator.vibrate?.call(navigator, ms);

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
function getData()    { try { return JSON.parse(localStorage.getItem('pedro_v3') || '{}'); } catch { return {}; } }
function saveData(d)  { try { localStorage.setItem('pedro_v3', JSON.stringify(d)); } catch {} }

function getProfile()   { return getData().profile || null; }
function saveProfile(p) { const d = getData(); d.profile = p; saveData(d); }

function getSavedWorkouts() { return getData().savedWorkouts || []; }
function saveWorkouts(list) { const d = getData(); d.savedWorkouts = list; saveData(d); }

function saveWorkout(wk) {
  const list = getSavedWorkouts();
  const idx  = list.findIndex(w => w.id === wk.id);
  if (idx >= 0) list[idx] = wk; else list.push(wk);
  saveWorkouts(list);
}
function deleteWorkout(id) {
  saveWorkouts(getSavedWorkouts().filter(w => w.id !== id));
}

function getStreak() {
  const d = getData();
  if (!d.lastWorkout) return 0;
  const today = todayStr(), yday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  return (d.lastWorkout===today||d.lastWorkout===yday) ? (d.streak||0) : 0;
}
function saveWorkoutDone(workoutRecord) {
  const d = getData(), today = todayStr(), yday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  let streak = d.streak||0;
  if (d.lastWorkout===yday) streak++;
  else if (d.lastWorkout!==today) streak=1;
  d.streak=streak; d.lastWorkout=today;
  d.bestStreak = Math.max(d.bestStreak||0, streak);
  d.history = d.history||[];
  d.history.unshift(workoutRecord || { date: today });
  if (d.history.length > 100) d.history = d.history.slice(0, 100);
  saveData(d); return streak;
}

function calcStats(d) {
  const h = d.history||[];
  return {
    total:      h.length,
    sets:       h.reduce((s,r) => s+(r.sets||0), 0),
    time:       h.reduce((s,r) => s+(r.duration||0), 0),
    bestStreak: d.bestStreak || d.streak || 0,
  };
}

function checkNewMedals(d) {
  const earned = d.earnedMedals||[], stats = calcStats(d);
  return MEDALS.filter(m => !earned.includes(m.id) && m.check(stats));
}
function todayStr() { return new Date().toISOString().slice(0,10); }
function uid()      { return 'wk_' + Date.now(); }

// ================================================
//  חישוב פרמטרים לפי ביצועים
// ================================================
function calcExParams(exId, perf) {
  const base = ALL_EXERCISES[exId];
  const max  = perf?.[exId] ?? 0;
  if (!max) {
    return base.type==='reps'
      ? { sets: base.baseSets, reps: base.baseReps, rest: base.baseRest }
      : { sets: base.baseSets, seconds: base.baseSecs, rest: base.baseRest };
  }
  if (base.type==='reps') {
    return {
      sets: max<5?2:max>=25?4:3,
      reps: Math.max(3, Math.round(max*0.65)),
      rest: max<8?60:max<15?45:30,
    };
  } else {
    return {
      sets: max<15?2:max>=50?4:3,
      seconds: Math.max(10, Math.round(max*0.65)),
      rest: max<20?60:45,
    };
  }
}

// ================================================
//  יצירת המלצת פדרו
// ================================================
function generateRecommendation(profile) {
  const goal  = profile?.goal || 'general';
  const perf  = profile?.performance || {};
  const exIds = GOAL_RECOMMENDATIONS[goal] || GOAL_RECOMMENDATIONS.general;
  return exIds.map(exId => {
    const params = calcExParams(exId, perf);
    const base   = ALL_EXERCISES[exId];
    return { exId, type: base.type, ...params, editOpen: false };
  });
}

// ================================================
//  מסך פתיחה
// ================================================
function initWelcome() {
  setPedroMsg('pedro-greeting', PEDRO_MSGS.welcome);
  document.getElementById('start-btn').onclick = () => {
    vibrate(30); sndGo();
    if (!getProfile()) startSetup(false);
    else { showScreen('menu-screen'); initMenu(); }
  };
}

// ================================================
//  אשף פרופיל
// ================================================
function startSetup(editMode) {
  wizard.step = editMode ? 1 : 0;
  wizard.perfIdx = 0; wizard.perfVals = {};
  wizard.selectedGoal = 'general'; wizard.selectedDays = 3;
  if (editMode) {
    const p = getProfile();
    if (p) {
      wizard.selectedGoal = p.goal||'general';
      wizard.selectedDays = p.daysPerWeek||3;
      wizard.perfVals = {...(p.performance||{})};
      const set = (id, v) => { const el=document.getElementById(id); if(el&&v) el.value=v; };
      set('inp-name',p.name); set('inp-age',p.age); set('inp-weight',p.weight); set('inp-height',p.height);
    }
  }
  showScreen('setup-screen'); goToStep(wizard.step);
}

function goToStep(n) {
  wizard.step = n;
  document.querySelectorAll('.setup-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${n}`)?.classList.add('active');
  document.getElementById('setup-prog-fill').style.width = [0,20,45,70,100][n]+'%';
  if (n===2) refreshGoalUI();
  if (n===3) startPerfTest();
  if (n===4) buildSummary();
}

function refreshGoalUI() {
  document.querySelectorAll('.goal-card').forEach(b => b.classList.toggle('selected', b.dataset.goal===wizard.selectedGoal));
  document.querySelectorAll('.day-btn').forEach(b => b.classList.toggle('selected', +b.dataset.days===wizard.selectedDays));
}

const PERF_TESTS = [
  { exId:'pushups',  label:'שכיבות סמיכה', emoji:'💪', unit:'חזרות', min:0, max:50, def:5  },
  { exId:'squats',   label:'סקוואט',        emoji:'🦵', unit:'חזרות', min:0, max:60, def:10 },
  { exId:'crunches', label:'כפיפות בטן',    emoji:'🔥', unit:'חזרות', min:0, max:50, def:8  },
  { exId:'plank',    label:'פלאנק',          emoji:'🏋️', unit:'שניות', min:0, max:120,def:15 },
  { exId:'jjacks',   label:"ג'אמפינג ג'קס",emoji:'⚡', unit:'חזרות', min:0, max:80, def:20 },
];

function startPerfTest() {
  wizard.perfIdx = 0; renderPerfDots(); loadPerfEx();
}
function renderPerfDots() {
  const c = document.getElementById('perf-dots');
  if (!c) return;
  c.innerHTML = PERF_TESTS.map((_,i) =>
    `<div class="perf-dot ${i<wizard.perfIdx?'done':i===wizard.perfIdx?'active':''}"></div>`).join('');
}
function loadPerfEx() {
  const t = PERF_TESTS[wizard.perfIdx];
  document.getElementById('perf-ex-name').textContent  = t.label;
  document.getElementById('perf-ex-emoji').textContent = t.emoji;
  document.getElementById('perf-unit').textContent     = t.unit;
  const val = wizard.perfVals[t.exId] ?? t.def;
  wizard.perfVals[t.exId] = val;
  document.getElementById('perf-number').textContent = val;
  updatePerfComment(t, val);
  document.getElementById('btn-step3-next').textContent =
    wizard.perfIdx < PERF_TESTS.length-1 ? 'הבא ←' : 'סיים! 🏁';
  renderPerfDots();
}
function changePerfVal(d) {
  const t = PERF_TESTS[wizard.perfIdx];
  const v = Math.max(t.min, Math.min(t.max, (wizard.perfVals[t.exId]??t.def)+d));
  wizard.perfVals[t.exId] = v;
  document.getElementById('perf-number').textContent = v;
  updatePerfComment(t, v);
}
function updatePerfComment(t, v) {
  const el = document.getElementById('perf-pedro-msg'); if (!el) return;
  let m;
  if (t.unit==='שניות') {
    m = v===0?'אפס שניות?! לא נורא, נתחיל קטן! 💪':v<=15?'בסדר מתחיל! נחזק! 🔥':v<=30?'לא רע! פדרו מרוצה! 😄':v<=60?'¡Bien! גב חזק! 💪':'¡Campeón! דקה ויותר?! 🏆';
  } else {
    m = v===0?'0?! לא נורא, מתחיל מאפס זה גבורה! 💪':v<=5?'נשמע כמו מתחיל - אני אוהב! 😄':v<=10?'לא רע! יש לך בסיס! 🔥':v<=20?'יש לך כוח! ¡Muy bien! 💪':v<=35?'¡Increíble! ספורטאי! 🌟':'¡Dios mío! אתה מפחיד! 🏆';
  }
  el.textContent = m;
}
function buildSummary() {
  const inp  = getWizardInputs();
  const goal = GOALS[wizard.selectedGoal]||GOALS.general;
  const ex   = calcExParams('pushups', wizard.perfVals);
  const nameEl = document.getElementById('setup-name-greeting');
  if (nameEl) nameEl.textContent = inp.name ? `שלום ${inp.name}! האימון שלך מוכן 🔥` : 'האימון שלך מוכן! 🔥';
  const sumEl = document.getElementById('setup-summary');
  if (sumEl) sumEl.innerHTML = [
    {l:'מטרה',         v:`${goal.emoji} ${goal.label}`},
    {l:'ימי אימון',    v:`${wizard.selectedDays} ימים בשבוע`},
    {l:'שכיבות סמיכה', v:`${ex.reps} × ${ex.sets} סטים`},
    {l:'מנוחה',        v:`${ex.rest} שניות`},
  ].map(r=>`<div class="summary-row"><span class="summary-label">${r.l}</span><span class="summary-value">${r.v}</span></div>`).join('');
  const msgEl = document.getElementById('setup-pedro-done');
  if (msgEl) msgEl.textContent = ({
    'general':'בניתי לך אימון מאוזן! ¡Vamos! 💪',
    'strength':'אימון לבניית שריר! ¡Fuerza! 🦾',
    'weight-loss':'אימון לשריפת שומן! ¡Fuego! 🔥',
    'agility':'אימון לזריזות! ¡Rápido! ⚡',
  })[wizard.selectedGoal] || '¡Vamos amigo! 💪';
}
function getWizardInputs() {
  return {
    name:   (document.getElementById('inp-name')?.value||'').trim(),
    age:    parseInt(document.getElementById('inp-age')?.value)||null,
    weight: parseInt(document.getElementById('inp-weight')?.value)||null,
    height: parseInt(document.getElementById('inp-height')?.value)||null,
  };
}
function finishSetup() {
  const inp = getWizardInputs();
  const profile = {
    name: inp.name||'אמיגו', age: inp.age, weight: inp.weight, height: inp.height,
    goal: wizard.selectedGoal, daysPerWeek: wizard.selectedDays,
    performance: {...wizard.perfVals},
  };
  saveProfile(profile);

  // אם זו הגדרה ראשונה - צור אימון ברירת מחדל אוטומטית
  if (!getSavedWorkouts().length) {
    const goal = GOALS[profile.goal]||GOALS.general;
    const defaultWk = {
      id: uid(),
      name: `האימון של ${profile.name}`,
      createdAt: todayStr(),
      exercises: generateRecommendation(profile),
    };
    saveWorkout(defaultWk);
  }
  showScreen('menu-screen'); initMenu();
}

// ================================================
//  תפריט ראשי
// ================================================
function initMenu() {
  const profile = getProfile();
  setPedroMsg('menu-msg', PEDRO_MSGS.menu);
  const greet = document.getElementById('menu-greeting');
  if (greet) greet.textContent = profile?.name ? `¡Hola, ${profile.name}! 🔥` : '¡Hola! 🔥';
  document.getElementById('streak-text').textContent = `רצף: ${getStreak()} ימים`;
  renderSavedWorkouts();
}

function renderSavedWorkouts() {
  const list      = getSavedWorkouts();
  const container = document.getElementById('saved-workouts-list');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="workouts-empty">
        <div class="workouts-empty-icon">🏋️</div>
        <p>עדיין אין אימונים שמורים<br>פדרו מחכה לבנות איתך אחד!</p>
        <button class="btn-empty-add" onclick="openBuilder(null)">+ צור אימון ראשון ✨</button>
      </div>`;
    return;
  }

  container.innerHTML = list.map(wk => {
    const exCount = wk.exercises?.length || 0;
    const firstEx = wk.exercises?.[0];
    const icon    = firstEx ? (getExInfo(firstEx).emoji || '🔥') : '🔥';
    const setsSum = wk.exercises?.reduce((s,e)=>s+(e.sets||3),0)||0;
    return `
      <div class="saved-wk-card">
        <span class="swk-icon">${icon}</span>
        <div class="swk-info">
          <div class="swk-name">${escHtml(wk.name)}</div>
          <div class="swk-desc">${exCount} תרגילים • ${setsSum} סטים סה"כ</div>
        </div>
        <div class="swk-actions">
          <button class="swk-btn swk-btn-play"  onclick="startWorkout('${wk.id}')" title="התחל">▶</button>
          <button class="swk-btn swk-btn-edit"  onclick="openBuilder('${wk.id}')"  title="ערוך">✏️</button>
          <button class="swk-btn swk-btn-del"   onclick="confirmDeleteWorkout('${wk.id}')" title="מחק">🗑️</button>
        </div>
      </div>`;
  }).join('');
}

function confirmDeleteWorkout(id) {
  const wk = getSavedWorkouts().find(w=>w.id===id);
  if (!wk) return;
  if (confirm(`למחוק את "${wk.name}"?\n¡No no no! אבל אם אתה בטוח... 😔`)) {
    deleteWorkout(id);
    renderSavedWorkouts();
    vibrate(50);
  }
}

function escHtml(s) { return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ================================================
//  בונה האימון
// ================================================
function openBuilder(workoutId) {
  builder.editingId = workoutId;
  builder.exercises = [];

  if (workoutId) {
    const wk = getSavedWorkouts().find(w=>w.id===workoutId);
    if (wk) {
      builder.name = wk.name;
      builder.exercises = wk.exercises.map(e=>({...e, editOpen:false}));
    }
  } else {
    builder.name = '';
  }

  document.getElementById('builder-name').value = builder.name;
  const profile = getProfile();
  const goal    = GOALS[profile?.goal||'general']||GOALS.general;
  const sub     = document.getElementById('recommend-sub');
  if (sub) sub.textContent = `בהתאם למטרה שלך: ${goal.emoji} ${goal.label}`;

  showScreen('builder-screen');
  renderBuilderExercises();
}

function renderBuilderExercises() {
  const c = document.getElementById('builder-exercises');
  if (!c) return;

  if (!builder.exercises.length) {
    c.innerHTML = `<div class="builder-empty-ex">אין עדיין תרגילים 😴<br>לחץ "+ הוסף תרגיל" או בקש המלצה מפדרו ✨</div>`;
    return;
  }

  c.innerHTML = builder.exercises.map((ex, idx) => {
    const base = getExInfo(ex);
    const val  = ex.type==='reps' ? `${ex.reps} חזרות` : `${ex.seconds} שניות`;
    const detail = `${ex.sets} סטים × ${val} | מנוחה ${ex.rest}ש'`;
    return `
      <div class="builder-ex-card ${ex.editOpen?'edit-open':''}" id="ex-card-${idx}">
        <div class="builder-ex-row">
          <span class="ex-emoji-sm">${base.emoji}</span>
          <div class="ex-row-info">
            <span class="ex-row-name">${escHtml(base.name)}</span>
            <span class="ex-row-detail">${detail}</span>
          </div>
          <div class="ex-row-actions">
            <button class="ex-action-btn ex-btn-edit" onclick="toggleExEdit(${idx})" title="ערוך">✏️</button>
            <button class="ex-action-btn ex-btn-del"  onclick="removeEx(${idx})"     title="מחק">🗑️</button>
          </div>
        </div>
        ${ex.editOpen ? renderEditPanel(idx, ex) : ''}
      </div>`;
  }).join('');
}

function renderEditPanel(idx, ex) {
  const setsHtml = [1,2,3,4,5].map(n =>
    `<button class="set-n-btn ${ex.sets===n?'sel':''}" onclick="setExSets(${idx},${n})">${n}</button>`).join('');
  const val = ex.type==='reps' ? ex.reps : ex.seconds;
  const valLbl = ex.type==='reps' ? 'חזרות' : 'שניות';
  const restHtml = [15,30,45,60].map(r =>
    `<button class="rest-chip ${ex.rest===r?'sel':''}" onclick="setExRest(${idx},${r})">${r}ש'</button>`).join('');
  const typeHtml = ['reps','time'].map(t =>
    `<button class="type-chip ${ex.type===t?'sel':''}" onclick="setExType(${idx},'${t}')">${t==='reps'?'חזרות':'שניות'}</button>`).join('');
  return `
    <div class="ex-edit-panel" dir="rtl">
      <div class="edit-row"><span class="edit-lbl">סטים:</span><div class="sets-btns">${setsHtml}</div></div>
      <div class="edit-row">
        <span class="edit-lbl">${valLbl}:</span>
        <div class="val-ctrl" dir="ltr">
          <button class="val-ctrl-btn" onclick="changeExVal(${idx},-1)">−</button>
          <span class="val-ctrl-num">${val}</span>
          <button class="val-ctrl-btn" onclick="changeExVal(${idx},+1)">+</button>
        </div>
      </div>
      <div class="edit-row"><span class="edit-lbl">מנוחה:</span><div class="rest-chips">${restHtml}</div></div>
      <div class="edit-row"><span class="edit-lbl">סוג:</span><div class="type-chips">${typeHtml}</div></div>
    </div>`;
}

// --- פעולות בונה ---
function toggleExEdit(idx) {
  builder.exercises.forEach((e,i) => e.editOpen = i===idx ? !e.editOpen : false);
  renderBuilderExercises();
}
function removeEx(idx) {
  builder.exercises.splice(idx,1);
  renderBuilderExercises();
}
function setExSets(idx, n)    { builder.exercises[idx].sets = n;    renderBuilderExercises(); }
function setExRest(idx, r)    { builder.exercises[idx].rest = r;    renderBuilderExercises(); }
function setExType(idx, t)    {
  const ex = builder.exercises[idx]; ex.type = t;
  if (t==='reps'&&!ex.reps)    ex.reps    = ALL_EXERCISES[ex.exId]?.baseReps||10;
  if (t==='time'&&!ex.seconds) ex.seconds = ALL_EXERCISES[ex.exId]?.baseSecs||20;
  renderBuilderExercises();
}
function changeExVal(idx, d) {
  const ex = builder.exercises[idx];
  if (ex.type==='reps') ex.reps    = Math.max(1, Math.min(100, (ex.reps   ||10)+d));
  else                  ex.seconds = Math.max(5, Math.min(180, (ex.seconds||20)+d));
  renderBuilderExercises();
}

// --- המלצת פדרו בבונה ---
function applyPedroRecommendation() {
  const profile = getProfile();
  const rec     = generateRecommendation(profile);
  if (builder.exercises.length && !confirm('פדרו יחליף את התרגילים הקיימים.\n¡Vamos! להמשיך?')) return;
  builder.exercises = rec.map(e=>({...e, editOpen:false}));
  vibrate(30); sndGo();
  renderBuilderExercises();
  // הדלקת תגובה
  const sub = document.getElementById('recommend-sub');
  if (sub) { sub.textContent = '✅ הוספתי המלצה! תוכל לשנות כל תרגיל'; setTimeout(()=>{const p=getProfile();const g=GOALS[p?.goal||'general']||GOALS.general;sub.textContent=`בהתאם למטרה שלך: ${g.emoji} ${g.label}`;},3000); }
}

// --- שמירת האימון ---
function saveBuilderWorkout() {
  const name = (document.getElementById('builder-name')?.value||'').trim();
  if (!name)              { alert('צריך לתת שם לאימון! ¡Un nombre, amigo!'); document.getElementById('builder-name')?.focus(); return; }
  if (!builder.exercises.length) { alert('צריך להוסיף לפחות תרגיל אחד! 💪'); return; }
  const wk = {
    id:         builder.editingId || uid(),
    name,
    createdAt:  todayStr(),
    exercises:  builder.exercises.map(({editOpen:_, ...rest}) => rest),
  };
  saveWorkout(wk);
  vibrate([50,30,50]); sndGo();
  showScreen('menu-screen'); initMenu();
}

// ================================================
//  בוחר תרגיל
// ================================================
function openPicker() {
  showScreen('picker-screen');
  // אתחול טופס תרגיל מותאם
  customExState = { emoji: '💪', type: 'reps' };
  renderEmojiPickerRow();
  const nameInput = document.getElementById('custom-ex-name');
  if (nameInput) nameInput.value = '';
  document.querySelectorAll('#custom-type-chips .type-chip').forEach((btn, i) => {
    btn.classList.toggle('sel', i === 0);
  });
  // מילוי גריד תרגילי ספרייה
  const grid = document.getElementById('picker-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(ALL_EXERCISES).map(([id, ex]) => {
    const sub = ex.type==='reps' ? `${ex.baseReps} חזרות` : `${ex.baseSecs} שניות`;
    return `
      <button class="picker-card" onclick="pickExercise('${id}')">
        <span class="picker-icon">${ex.emoji}</span>
        <span class="picker-name">${ex.name}</span>
        <span class="picker-sub">${sub}</span>
      </button>`;
  }).join('');
}

function pickExercise(exId) {
  const base = ALL_EXERCISES[exId];
  const profile = getProfile();
  const params  = calcExParams(exId, profile?.performance||{});
  builder.exercises.push({ exId, type: base.type, ...params, editOpen: false });
  showScreen('builder-screen');
  renderBuilderExercises();
  vibrate(20);
}

// ===== תרגיל מותאם אישית =====
function renderEmojiPickerRow() {
  const row = document.getElementById('emoji-pick-row');
  if (!row) return;
  row.innerHTML = CUSTOM_EMOJIS.map(e =>
    `<button class="emoji-opt ${customExState.emoji===e?'sel':''}" onclick="selectCustomEmoji('${e}')">${e}</button>`
  ).join('');
}

function selectCustomEmoji(emoji) {
  customExState.emoji = emoji;
  renderEmojiPickerRow();
}

function setCustomType(type) {
  customExState.type = type;
  document.querySelectorAll('#custom-type-chips .type-chip').forEach((btn, i) => {
    btn.classList.toggle('sel', (i===0 && type==='reps') || (i===1 && type==='time'));
  });
}

function addCustomExercise() {
  const nameInput = document.getElementById('custom-ex-name');
  const name = (nameInput?.value || '').trim();
  if (!name) { nameInput?.focus(); return; }
  builder.exercises.push({
    exId:    'custom_' + Date.now(),
    custom:  true,
    name,
    emoji:   customExState.emoji,
    type:    customExState.type,
    sets:    3,
    reps:    customExState.type === 'reps' ? 10 : undefined,
    seconds: customExState.type === 'time' ? 30 : undefined,
    rest:    30,
    editOpen: false,
  });
  showScreen('builder-screen');
  renderBuilderExercises();
  vibrate(20);
}

// ================================================
//  הפעלת אימון
// ================================================
function startWorkout(workoutId) {
  const wk = getSavedWorkouts().find(w=>w.id===workoutId);
  if (!wk||!wk.exercises.length) { alert('האימון ריק! ¡No exercises!'); return; }
  state.activeWorkout  = wk;
  state.exIdx          = 0;
  state.setIdx         = 0;
  state.workoutStart   = Date.now();
  state.completedSets  = 0;
  showScreen('workout-screen');
  renderDots(); loadExercise();
}

function renderDots() {
  const c = document.getElementById('prog-dots'); if (!c) return;
  const exList = state.activeWorkout.exercises;
  c.innerHTML = exList.map((_,i) =>
    `<div class="prog-dot ${i<state.exIdx?'done':i===state.exIdx?'active':''}"></div>`).join('');
}

function loadExercise() {
  const exData = state.activeWorkout.exercises[state.exIdx];
  if (!exData) return;
  const base = getExInfo(exData);
  document.getElementById('ex-emoji').textContent = base.emoji;
  document.getElementById('ex-name').textContent  = base.name;
  document.getElementById('ex-sets').textContent  = `סט ${state.setIdx+1} מתוך ${exData.sets}`;
  setPedroMsg('wk-msg', base.pedro);
  renderDots();
  if (exData.type==='time') setupTimedEx(exData);
  else                      setupRepEx(exData);
}

function setupRepEx(ex) {
  stopTimer(); resetRing();
  document.getElementById('ring-num').textContent = ex.reps;
  document.getElementById('ring-lbl').textContent = 'חזרות';
  const btn = document.getElementById('btn-action');
  btn.textContent = 'סיימתי סט! ✅'; btn.onclick = onSetDone;
  vibrate(30); sndGo();
}

function setupTimedEx(ex) {
  stopTimer(); resetRing();
  state.timeLeft = ex.seconds; state.totalTime = ex.seconds;
  updateTimerUI(ex.seconds);
  const btn = document.getElementById('btn-action');
  btn.textContent = '▶ התחל! ▶';
  btn.onclick = () => { btn.textContent='⏱️ רץ...'; btn.onclick=null; vibrate(30); sndGo(); runTimer(); };
}

function runTimer() {
  const CIRC = 326.73, ring = document.getElementById('ring-fg');
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerUI(state.timeLeft);
    ring.style.strokeDashoffset = ((state.totalTime-state.timeLeft)/state.totalTime)*CIRC;
    if (state.timeLeft<=5&&state.timeLeft>0) { ring.classList.add('urgent'); sndBeep(); vibrate(40); }
    if (state.timeLeft<=0) { stopTimer(); vibrate([80,40,80]); sndGo(); onSetDone(); }
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
  const exData  = state.activeWorkout.exercises[state.exIdx];
  const lastSet = state.setIdx >= exData.sets-1;
  const lastEx  = state.exIdx  >= state.activeWorkout.exercises.length-1;

  if (lastSet&&lastEx) { finishWorkout(); return; }
  if (lastSet) {
    const next     = state.activeWorkout.exercises[state.exIdx+1];
    const nextBase = getExInfo(next);
    goRest(exData.rest+10, nextBase.name, nextBase.emoji, true);
  } else {
    state.setIdx++;
    const curBase = getExInfo(exData);
    goRest(exData.rest, curBase.name, curBase.emoji, false);
  }
}

// ================================================
//  מנוחה
// ================================================
function goRest(sec, nextName, nextEmoji, isNextEx) {
  showScreen('rest-screen'); sndRest();
  setPedroMsg('rest-msg', PEDRO_MSGS.rest);
  document.getElementById('rest-num').textContent   = sec;
  document.getElementById('next-name').textContent  = nextName||'';
  document.getElementById('next-emoji').textContent = nextEmoji||'💪';
  let t = sec;
  state.timerInterval = setInterval(()=>{
    t--; document.getElementById('rest-num').textContent=t;
    if(t<=3&&t>0) sndBeep();
    if(t<=0) { stopTimer(); afterRest(isNextEx); }
  },1000);
  document.getElementById('btn-skip-rest').onclick = ()=>{ stopTimer(); afterRest(isNextEx); };
}
function afterRest(isNextEx) {
  if (isNextEx) { state.exIdx++; state.setIdx=0; }
  showScreen('workout-screen'); loadExercise();
}

// ================================================
//  סיום אימון
// ================================================
function finishWorkout() {
  stopTimer();
  const mins = Math.max(1, Math.round((Date.now()-state.workoutStart)/60000));
  const wk   = state.activeWorkout;
  const p    = getProfile();

  // בנה רשומת היסטוריה מלאה כולל פירוט תרגילים
  const record = {
    date:        todayStr(),
    workoutName: wk.name || 'אימון',
    workoutId:   wk.id,
    duration:    mins,
    sets:        state.completedSets,
    exercises:   wk.exercises.length,
    emoji:       getExInfo(wk.exercises[0]).emoji || '💪',
    exerciseDetails: wk.exercises.map(ex => {
      const info = getExInfo(ex);
      return { exId: ex.exId, name: info.name, emoji: info.emoji,
               type: ex.type, sets: ex.sets, reps: ex.reps, seconds: ex.seconds };
    }),
  };
  const streak = saveWorkoutDone(record);

  // עדכן UI - מסך סיום
  document.getElementById('s-ex').textContent   = wk.exercises.length;
  document.getElementById('s-sets').textContent = state.completedSets;
  document.getElementById('s-time').textContent = mins;
  const sub = document.getElementById('complete-sub');
  if (sub) sub.textContent = p?.name ? `כל הכבוד ${p.name}! 🔥` : 'סיימת את האימון!';
  setPedroMsg('complete-msg', PEDRO_MSGS.complete);

  showScreen('complete-screen');
  sndComplete(); vibrate([100,80,100,80,200]); launchConfetti();
  document.getElementById('btn-home').onclick = ()=>{ showScreen('menu-screen'); initMenu(); };
  setTimeout(()=>{ const el=document.getElementById('streak-text'); if(el) el.textContent=`רצף: ${streak} ימים`; },100);
}

// ================================================
//  קונפטי
// ================================================
function launchConfetti() {
  const cv = document.getElementById('confetti-canvas'); if(!cv) return;
  const ctx = cv.getContext('2d');
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const C=['#ffd700','#ff6b1a','#ff1a1a','#ffcc1a','#fff','#ff9933','#ff4d4d'];
  const p = Array.from({length:140},()=>({x:Math.random()*cv.width,y:-10-Math.random()*120,w:5+Math.random()*9,h:3+Math.random()*6,vx:(Math.random()-.5)*3.5,vy:1.8+Math.random()*4,col:C[~~(Math.random()*C.length)],rot:Math.random()*360,rotV:(Math.random()-.5)*9}));
  let f=0;
  (function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    p.forEach(q=>{ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot*Math.PI/180);ctx.fillStyle=q.col;ctx.fillRect(-q.w/2,-q.h/2,q.w,q.h);ctx.restore();q.x+=q.vx;q.y+=q.vy;q.rot+=q.rotV;q.vy+=0.06;});
    if(++f<220) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}

// ================================================
//  אתחול
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  // נעילת כיוון אנכי (עובד ב-PWA / Android Chrome)
  if (screen.orientation?.lock) {
    screen.orientation.lock('portrait').catch(() => {});
  }

  initWelcome();

  // אשף שלב 0
  document.getElementById('btn-step0-next').onclick = () => goToStep(1);
  // אשף שלב 1
  document.getElementById('btn-step1-back').onclick = () => goToStep(0);
  document.getElementById('btn-step1-next').onclick = () => {
    if (!(document.getElementById('inp-name')?.value||'').trim()) { document.getElementById('inp-name')?.focus(); return; }
    goToStep(2);
  };
  // אשף שלב 2
  document.getElementById('btn-step2-back').onclick = () => goToStep(1);
  document.getElementById('btn-step2-next').onclick = () => goToStep(3);
  document.querySelectorAll('.goal-card').forEach(b => b.onclick = () => { wizard.selectedGoal=b.dataset.goal; document.querySelectorAll('.goal-card').forEach(x=>x.classList.toggle('selected',x===b)); });
  document.querySelectorAll('.day-btn').forEach(b => b.onclick = () => { wizard.selectedDays=+b.dataset.days; document.querySelectorAll('.day-btn').forEach(x=>x.classList.toggle('selected',x===b)); });
  document.querySelector('.goal-card[data-goal="general"]')?.classList.add('selected');
  document.querySelector('.day-btn[data-days="3"]')?.classList.add('selected');
  // אשף שלב 3
  document.getElementById('btn-step3-back').onclick = () => { if(wizard.perfIdx===0) goToStep(2); else {wizard.perfIdx--;loadPerfEx();} };
  document.getElementById('btn-step3-next').onclick = () => { if(wizard.perfIdx<PERF_TESTS.length-1){wizard.perfIdx++;loadPerfEx();}else goToStep(4); };
  document.getElementById('perf-minus').onclick = () => changePerfVal(-1);
  document.getElementById('perf-plus').onclick  = () => changePerfVal(+1);
  // לחיצה ממושכת
  let holdIv=null;
  const startH=(d)=>{holdIv=setInterval(()=>changePerfVal(d),120);}; const endH=()=>{clearInterval(holdIv);holdIv=null;};
  ['perf-minus','perf-plus'].forEach((id,i)=>{
    const el=document.getElementById(id); const d=i===0?-1:1;
    el.addEventListener('mousedown',()=>startH(d)); el.addEventListener('touchstart',()=>startH(d),{passive:true});
    ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev=>el.addEventListener(ev,endH));
  });
  // אשף שלב 4
  document.getElementById('btn-setup-finish').onclick = finishSetup;

  // תפריט
  document.getElementById('btn-settings').onclick  = () => startSetup(true);
  document.getElementById('btn-progress').onclick   = openProgressScreen;
  document.getElementById('btn-new-workout').onclick = () => openBuilder(null);

  // בונה
  document.getElementById('btn-builder-cancel').onclick = () => { showScreen('menu-screen'); initMenu(); };
  document.getElementById('btn-builder-save').onclick   = saveBuilderWorkout;
  document.getElementById('btn-add-ex').onclick         = openPicker;
  document.getElementById('btn-recommend').onclick      = applyPedroRecommendation;

  // בוחר תרגיל
  document.getElementById('btn-picker-back').onclick = () => showScreen('builder-screen');
  document.getElementById('btn-custom-add').onclick  = addCustomExercise;
  document.getElementById('custom-ex-name').addEventListener('keydown', e => { if (e.key==='Enter') addCustomExercise(); });

  // אימון
  document.getElementById('btn-exit').onclick = () => {
    stopTimer();
    if(confirm('לצאת מהאימון? ¡No no no! 😤')) { showScreen('menu-screen'); initMenu(); }
  };
  document.getElementById('btn-skip-ex').onclick = () => {
    stopTimer();
    const isLast = state.exIdx >= state.activeWorkout.exercises.length-1;
    if(isLast) finishWorkout(); else { state.exIdx++; state.setIdx=0; showScreen('workout-screen'); loadExercise(); }
  };

  // מוזיקה
  document.getElementById('btn-music').onclick       = openMusicPanel;
  document.getElementById('btn-music-close').onclick = closeMusicPanel;
  document.getElementById('music-overlay').onclick   = e => { if (e.target === e.currentTarget) closeMusicPanel(); };

  // מסך התקדמות
  document.getElementById('btn-prog-back').onclick  = () => { showScreen('menu-screen'); initMenu(); };
  document.getElementById('btn-detail-close').onclick = closeHistoryDetail;
  document.getElementById('detail-overlay').onclick = e => { if (e.target===e.currentTarget) closeHistoryDetail(); };
});

// ================================================
//  מסך התקדמות
// ================================================
let metricPeriod = 'month';

function openProgressScreen() {
  showScreen('progress-screen');
  const d = getData();
  renderProgressStats(d);
  renderMetrics(d);
  renderHistory(d);
}

function renderProgressStats(d) {
  const s = calcStats(d);
  document.getElementById('ps-n-workouts').textContent = s.total;
  document.getElementById('ps-n-sets').textContent     = s.sets;
  document.getElementById('ps-n-streak').textContent   = s.bestStreak;
  document.getElementById('ps-n-time').textContent     = s.time;
}

// ===== מדדים לפי תקופה =====
function setMetricPeriod(period) {
  metricPeriod = period;
  const labels = ['week','month','half','year'];
  document.querySelectorAll('.period-chip').forEach((btn, i) =>
    btn.classList.toggle('sel', labels[i] === period));
  renderMetrics(getData());
}

function getPeriodStart(period) {
  const days = { week:7, month:30, half:182, year:365 }[period]||30;
  return new Date(Date.now() - days*86400000).toISOString().slice(0,10);
}

function renderMetrics(d) {
  const cutoff  = getPeriodStart(metricPeriod);
  const history = (d.history||[]).filter(h => h.date >= cutoff);
  const el = document.getElementById('metrics-list');
  if (!el) return;

  // צבור לפי תרגיל
  const agg = {};
  history.forEach(h => {
    (h.exerciseDetails||[]).forEach(ex => {
      const key = ex.exId || ex.name;
      if (!agg[key]) agg[key] = { name: ex.name, emoji: ex.emoji||'💪', reps:0, seconds:0, type: ex.type };
      if (ex.type==='reps') agg[key].reps    += (ex.sets||1) * (ex.reps||0);
      else                  agg[key].seconds += (ex.sets||1) * (ex.seconds||0);
    });
  });

  const items = Object.values(agg).sort((a,b) =>
    (b.type==='reps'?b.reps:b.seconds) - (a.type==='reps'?a.reps:a.seconds));

  if (!items.length) {
    el.innerHTML = '<p class="metrics-empty">אין נתונים לתקופה הזו עדיין 🏋️<br>סיים אימון ותראה את הנתונים שלך כאן!</p>';
    return;
  }

  const maxVal = Math.max(...items.map(i => i.type==='reps'?i.reps:i.seconds), 1);
  el.innerHTML = items.map(item => {
    const val  = item.type==='reps' ? item.reps : item.seconds;
    const lbl  = item.type==='reps' ? 'חזרות' : 'שניות';
    const pct  = Math.round(val / maxVal * 100);
    return `
      <div class="metric-row">
        <span class="metric-icon">${item.emoji}</span>
        <div class="metric-bar-wrap">
          <div class="metric-name">${escHtml(item.name)}</div>
          <div class="metric-bar-bg"><div class="metric-bar-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="metric-val">${val.toLocaleString()} ${lbl}</span>
      </div>`;
  }).join('');
}

// ===== היסטוריה =====
function renderHistory(d) {
  const history = d.history||[];
  const el = document.getElementById('history-list');
  if (!el) return;
  if (!history.length) {
    el.innerHTML = '<p class="history-empty">עוד לא סיימת אימון — יאללה! 🔥</p>';
    return;
  }
  el.innerHTML = history.slice(0,30).map((h,idx) => `
    <div class="history-row" onclick="showHistoryDetail(${idx})" style="cursor:pointer">
      <span class="history-icon">${h.emoji||'💪'}</span>
      <div class="history-info">
        <div class="history-name">${escHtml(h.workoutName||'אימון')}</div>
        <div class="history-detail">${h.exercises||0} תרגילים · ${h.sets||0} סטים · ${h.duration||0} דק'</div>
      </div>
      <span class="history-date">${fmtDate(h.date)} ›</span>
    </div>`).join('');
}

// ===== פירוט אימון =====
function showHistoryDetail(idx) {
  const h = (getData().history||[])[idx];
  if (!h) return;
  document.getElementById('detail-title').textContent = h.workoutName || 'אימון';
  document.getElementById('detail-meta').textContent  =
    `${fmtDate(h.date)} · ${h.duration||0} דקות · ${h.sets||0} סטים`;
  const exEl = document.getElementById('detail-exercises');
  if (!h.exerciseDetails?.length) {
    exEl.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:16px 0">אין פירוט זמין לאימון זה</p>';
  } else {
    exEl.innerHTML = h.exerciseDetails.map(ex => {
      const val = ex.type==='reps' ? `${ex.reps} חזרות` : `${ex.seconds} שניות`;
      const total = ex.type==='reps'
        ? `<span style="color:var(--text-dim);font-size:11px"> (${(ex.sets||1)*(ex.reps||0)} סה"כ)</span>`
        : '';
      return `
        <div class="detail-ex-row">
          <span class="detail-ex-icon">${ex.emoji||'💪'}</span>
          <span class="detail-ex-name">${escHtml(ex.name||'?')}</span>
          <span class="detail-ex-val">${ex.sets}×${val}${total}</span>
        </div>`;
    }).join('');
  }
  document.getElementById('detail-overlay').classList.add('open');
}

function closeHistoryDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
}

// ================================================
//  מוזיקה — Spotify
// ================================================
function openMusicPanel() {
  const list = document.getElementById('music-playlists');
  list.innerHTML = SPOTIFY_PLAYLISTS.map(p => `
    <button class="music-playlist-card" onclick="openSpotifyPlaylist('${p.id}')">
      <span class="mp-emoji">${p.emoji}</span>
      <div class="mp-info">
        <span class="mp-name">${p.name}</span>
        <span class="mp-sub">${p.sub}</span>
      </div>
      <span class="mp-spotify">
        <svg class="mp-spotify-logo" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        פתח
      </span>
    </button>`).join('');
  document.getElementById('music-overlay').classList.add('open');
}

function closeMusicPanel() {
  document.getElementById('music-overlay').classList.remove('open');
}

function openSpotifyPlaylist(id) {
  // https://open.spotify.com — iOS/Android פותחים את האפליקציה אוטומטית
  window.open(`https://open.spotify.com/playlist/${id}`, '_blank');
  closeMusicPanel();
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const today = todayStr();
  const yday  = new Date(Date.now()-86400000).toISOString().slice(0,10);
  if (dateStr === today) return 'היום';
  if (dateStr === yday)  return 'אתמול';
  const [,m,d] = dateStr.split('-');
  return `${d}/${m}`;
}
