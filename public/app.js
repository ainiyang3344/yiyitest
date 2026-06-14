// Confetti Animation Controller
class ConfettiManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    this.active = false;

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn(count = 100) {
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2
      });
    }
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.particles = [];
    this.spawn(120);
    this.animate();
    setTimeout(() => this.stop(), 3500);
  }

  stop() {
    this.active = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();

      if (p.y > this.canvas.height) {
        p.y = -20;
        p.x = Math.random() * this.canvas.width;
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Global App State
const state = {
  studentName: '杨俊一',
  challengeMode: 'all', // 'all' or 'smart'
  currentQuestionIndex: 0,
  score: 0,
  questions: [], // Active questions for the current session
  answersHistory: [], // Track correctness for current session
  userProgress: {}, // Leitner Box tracking object
};

const confetti = new ConfettiManager('confetti-canvas');

// Load dynamic question modules and setup app
window.addEventListener('DOMContentLoaded', async () => {
  // Load progress from localStorage
  loadProgressFromStorage();
  
  // Dynamically load all question scripts
  try {
    const response = await fetch('questions_list.json');
    const questionFiles = await response.json();
    window.questionModules = [];

    for (const file of questionFiles) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = file;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    
    // Initialize default progress for any newly added questions
    syncProgressSchema();
  } catch (error) {
    console.error('加载错题模版失败：', error);
    alert('加载题库失败，请检查网络或刷新页面！');
  }

  // Setup Event Listeners
  document.getElementById('start-btn').addEventListener('click', startQuiz);
  document.getElementById('submit-btn').addEventListener('click', checkAnswer);
  document.getElementById('explanation-btn').addEventListener('click', showExplanation);
  document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
  document.getElementById('restart-btn').addEventListener('click', restartQuiz);
});

// Load / Save Progress locally on user's device
function loadProgressFromStorage() {
  const saved = localStorage.getItem('yiyi_mistake_progress');
  if (saved) {
    try {
      state.userProgress = JSON.parse(saved);
    } catch (e) {
      state.userProgress = {};
    }
  } else {
    state.userProgress = {};
  }
}

function saveProgressToStorage() {
  localStorage.setItem('yiyi_mistake_progress', JSON.stringify(state.userProgress));
}

// Ensure every loaded question module has a progress record
function syncProgressSchema() {
  let updated = false;
  window.questionModules.forEach(q => {
    if (!state.userProgress[q.id]) {
      state.userProgress[q.id] = {
        box: 1, // 1 to 5
        lastPractice: null, // YYYY-MM-DD
        streak: 0
      };
      updated = true;
    }
  });
  if (updated) saveProgressToStorage();
}

// Start Quiz Session
function startQuiz() {
  const nameInput = document.getElementById('student-name');
  if (nameInput.value.trim()) {
    state.studentName = nameInput.value.trim();
  }
  document.getElementById('display-name').innerText = state.studentName;
  
  const modeSelect = document.getElementById('challenge-mode');
  state.challengeMode = modeSelect.value;

  // Transition screens
  document.getElementById('welcome-screen').classList.remove('active');
  document.getElementById('quiz-screen').classList.add('active');

  initQuiz();
}

// Build the active questions list for today's session
function initQuiz() {
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.answersHistory = [];
  
  const allModules = window.questionModules;
  
  if (state.challengeMode === 'all') {
    // Full challenge mode: Practice all loaded questions
    state.questions = allModules.map(q => {
      const instance = Object.create(q);
      instance.generate();
      return instance;
    });
  } else {
    // Smart review mode: Filter due questions based on Leitner System
    const todayStr = new Date().toISOString().split('T')[0];
    const dueModules = allModules.filter(q => {
      const prog = state.userProgress[q.id];
      if (!prog) return true;
      if (!prog.lastPractice) return true;

      const elapsedDays = Math.floor((new Date(todayStr) - new Date(prog.lastPractice)) / (1000 * 60 * 60 * 24));
      
      switch (prog.box) {
        case 1:
          return prog.lastPractice !== todayStr; // Box 1: daily
        case 2:
          return elapsedDays >= 2;  // Box 2: review every 2 days
        case 3:
          return elapsedDays >= 5;  // Box 3: review every 5 days
        case 4:
          return elapsedDays >= 9;  // Box 4: review every 9 days
        case 5:
        default:
          return false; // Box 5: Completed/Archived, not automatically due
      }
    });

    if (dueModules.length === 0) {
      // If nothing is due today, pick 3 lowest-box questions for review to keep practicing
      const reviewModules = [...allModules]
        .sort((a, b) => (state.userProgress[a.id]?.box || 1) - (state.userProgress[b.id]?.box || 1))
        .slice(0, 3);
        
      alert('🌟 太棒了！今天所有错题都在记忆保险箱里，暂无到期复习题目。系统已为您精选了 3 做为温习！');
      state.questions = reviewModules.map(q => {
        const instance = Object.create(q);
        instance.generate();
        return instance;
      });
    } else {
      state.questions = dueModules.map(q => {
        const instance = Object.create(q);
        instance.generate();
        return instance;
      });
    }
  }

  loadQuestion(0);
}

function loadQuestion(index) {
  state.currentQuestionIndex = index;
  const q = state.questions[index];

  // Update progress bar
  document.getElementById('current-question-num').innerText = index + 1;
  document.getElementById('total-questions-num').innerText = state.questions.length;
  
  const progressPercent = (index / state.questions.length) * 100;
  document.getElementById('progress-bar-fill').style.width = `${progressPercent}%`;

  // Clear workspace
  const cardContainer = document.getElementById('question-card');
  cardContainer.innerHTML = '';
  
  // Render
  q.render(cardContainer);

  // Reset controls
  document.getElementById('submit-btn').classList.remove('hide');
  document.getElementById('explanation-btn').classList.add('hide');
  document.getElementById('next-btn').classList.add('hide');
  document.getElementById('explanation-panel').classList.add('hide');
}

function checkAnswer() {
  const q = state.questions[state.currentQuestionIndex];
  const isCorrect = q.validate();
  
  const todayStr = new Date().toISOString().split('T')[0];
  const prog = state.userProgress[q.id];

  if (isCorrect) {
    confetti.start();
    state.score++;
    state.answersHistory.push({ id: q.id, title: q.title, correct: true });
    
    // Leitner Box Promotion
    if (prog) {
      prog.streak++;
      prog.box = Math.min(5, prog.box + 1); // Promote to next box
      prog.lastPractice = todayStr;
    }

    document.getElementById('submit-btn').classList.add('hide');
    document.getElementById('next-btn').classList.remove('hide');
  } else {
    state.answersHistory.push({ id: q.id, title: q.title, correct: false });
    
    // Leitner Box Demotion
    if (prog) {
      prog.streak = 0;
      prog.box = 1; // Demote all the way back to Box 1
      prog.lastPractice = todayStr;
    }

    document.getElementById('submit-btn').classList.add('hide');
    document.getElementById('explanation-btn').classList.remove('hide');
    document.getElementById('next-btn').classList.remove('hide');
  }

  // Persist updated progress
  saveProgressToStorage();
}

function showExplanation() {
  const q = state.questions[state.currentQuestionIndex];
  const panel = document.getElementById('explanation-panel');
  const content = document.getElementById('explanation-content');
  
  content.innerHTML = q.getExplanation();
  panel.classList.remove('hide');
  document.getElementById('explanation-btn').classList.add('hide');
}

function loadNextQuestion() {
  const nextIndex = state.currentQuestionIndex + 1;
  if (nextIndex < state.questions.length) {
    loadQuestion(nextIndex);
  } else {
    showSummary();
  }
}

function showSummary() {
  document.getElementById('progress-bar-fill').style.width = '100%';
  document.getElementById('quiz-screen').classList.remove('active');
  document.getElementById('summary-screen').classList.add('active');

  document.getElementById('correct-count').innerText = state.score;
  document.getElementById('summary-total-questions').innerText = state.questions.length;

  const starsContainer = document.getElementById('stars-container');
  starsContainer.innerHTML = '';
  
  let starsCount = 1;
  if (state.score === state.questions.length) {
    starsCount = 3;
    document.getElementById('summary-emoji').innerText = '🏆';
    document.getElementById('summary-title').innerText = '完美挑战！全对通关！';
    document.getElementById('summary-text').innerText = `太厉害了，${state.studentName}！这些错题都被你降服了！`;
  } else if (state.score >= state.questions.length * 0.7) {
    starsCount = 2;
    document.getElementById('summary-emoji').innerText = '⭐';
    document.getElementById('summary-title').innerText = '表现很不错！';
    document.getElementById('summary-text').innerText = `很棒的尝试，${state.studentName}！认真看看解析，下一次一定能拿满分！`;
  } else {
    starsCount = 1;
    document.getElementById('summary-emoji').innerText = '💪';
    document.getElementById('summary-title').innerText = '继续加油！';
    document.getElementById('summary-text').innerText = `${state.studentName}，错题是进步的阶梯，仔细查看底部的图形解析吧！`;
  }

  for (let i = 0; i < 3; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.innerHTML = '★';
    if (i < starsCount) {
      setTimeout(() => star.classList.add('gold'), i * 300);
    }
    starsContainer.appendChild(star);
  }

  const breakdownItems = document.getElementById('breakdown-items');
  breakdownItems.innerHTML = '';

  state.answersHistory.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'breakdown-item';
    
    const statusText = item.correct ? '答对' : '答错';
    const statusClass = item.correct ? 'status-correct' : 'status-incorrect';
    const currentBox = state.userProgress[item.id]?.box || 1;
    
    row.innerHTML = `
      <span class="breakdown-title">
        ${index + 1}. ${item.title} 
        <small style="color:var(--text-muted); margin-left: 6px;">(记忆盒 ${currentBox === 5 ? '🏆已掌握' : currentBox})</small>
      </span>
      <span class="breakdown-status ${statusClass}">${statusText}</span>
    `;
    breakdownItems.appendChild(row);
  });
}

function restartQuiz() {
  document.getElementById('summary-screen').classList.remove('active');
  document.getElementById('quiz-screen').classList.add('active');
  initQuiz();
}
