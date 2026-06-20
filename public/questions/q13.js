(function() {
  const question = {
    id: 'Q13',
    title: '第十三题：简便计算（乘数倍数拆分）',
    generate() {
      // Configuration list of clean simplifications
      const configs = [
        { a: 25, b: 32, c: 9, splitB1: 4, splitB2: 8, correct: 7200, intermediate: 72, factor: 100 },
        { a: 25, b: 64, c: 3, splitB1: 4, splitB2: 16, correct: 4800, intermediate: 48, factor: 100 },
        { a: 125, b: 16, c: 9, splitB1: 8, splitB2: 2, correct: 18000, intermediate: 18, factor: 1000 },
        { a: 125, b: 32, c: 7, splitB1: 8, splitB2: 4, correct: 28000, intermediate: 28, factor: 1000 }
      ];

      const config = configs[Math.floor(Math.random() * configs.length)];
      this.a = config.a;
      this.b = config.b;
      this.c = config.c;
      this.splitB1 = config.splitB1; // e.g. 4 for 25, 8 for 125
      this.splitB2 = config.splitB2; // remaining part of b
      this.factor = config.factor;   // 100 or 1000
      this.intermediate = config.intermediate; // splitB2 * c
      this.correctAnswer = config.correct;
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          使用简便方法计算下面的算式，并写出最终计算得数：
          <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 16px 0; color: #1e3a8a;">
            ${this.a} &times; ${this.b} &times; ${this.c}
          </div>
        </div>
        <div class="question-input-group">
          <div class="input-row">
            计算得数 
            <input type="number" id="q13-ans" class="inline-input" placeholder="输入得数" style="width: 140px;">。
          </div>
        </div>
      `;
    },
    validate() {
      const ansEl = document.getElementById('q13-ans');
      const ans = parseInt(ansEl.value);

      if (ans === this.correctAnswer) {
        ansEl.classList.remove('is-invalid');
        ansEl.classList.add('is-valid');
        return true;
      } else {
        ansEl.classList.remove('is-valid');
        ansEl.classList.add('is-invalid');
        return false;
      }
    },
    getExplanation() {
      return `
        1. <strong>寻找“好朋友数”凑整</strong>：
           * 我们知道：$25 \\times 4 = 100$ 或者是 $125 \\times 8 = 1000$。<br>
           * 算式中有 <strong>${this.a}</strong>，我们需要把 <strong>${this.b}</strong> 拆分成包含 <strong>${this.splitB1}</strong> 的因数。<br><br>
        2. <strong>拆分乘数</strong>：
           * 将 $${this.b}$ 拆为：$${this.splitB1} \\times ${this.splitB2}$。<br>
           * 算式重写为：<br>
             $$${this.a} \\times (${this.splitB1} \\times ${this.splitB2}) \\times ${this.c}$$<br>
        3. <strong>运用乘法交换律与结合律</strong>：
             $$= (${this.a} \\times ${this.splitB1}) \\times (${this.splitB2} \\times ${this.c})$$
             $$= ${this.factor} \\times ${this.intermediate}$$
             $$= <strong>${this.correctAnswer}</strong>$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
