(function() {
  const question = {
    id: 'Q14',
    title: '第十四题：去括号与变号简便计算',
    generate() {
      // Configuration list
      const configs = [
        { A: 258, B: 37, C: 58, D: 63, correct: 216 },
        { A: 246, B: 38, C: 54, D: 62, correct: 200 },
        { A: 354, B: 27, C: 46, D: 73, correct: 300 },
        { A: 175, B: 39, C: 25, D: 61, correct: 100 }
      ];

      const config = configs[Math.floor(Math.random() * configs.length)];
      this.A = config.A;
      this.B = config.B;
      this.C = config.C;
      this.D = config.D;
      this.correctAnswer = config.correct;
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          使用简便方法计算下面的算式，并写出最终计算得数：
          <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 16px 0; color: #1e3a8a;">
            ${this.A} - (${this.B} - ${this.C}) - ${this.D}
          </div>
        </div>
        <div class="question-input-group">
          <div class="input-row">
            计算得数 
            <input type="number" id="q14-ans" class="inline-input" placeholder="输入得数" style="width: 140px;">。
          </div>
        </div>
      `;
    },
    validate() {
      const ansEl = document.getElementById('q14-ans');
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
      const bPlusD = this.B + this.D;
      const aPlusC = this.A + this.C;

      return `
        1. <strong>去括号变号规则</strong>：
           * 当括号前面是减号时，去掉括号后，括号内部的所有运算符号需要改变（减号变加号，加号变减号）：<br>
             $$- (${this.B} - ${this.C}) = - ${this.B} + ${this.C}$$<br>
        2. <strong>展开原式</strong>：
           * 原式化为：<br>
             $$${this.A} - ${this.B} + ${this.C} - ${this.D}$$<br>
        3. <strong>加减法交换与结合律凑整</strong>：
           * 我们将加数和减数进行分别归类凑整：<br>
             $$= (${this.A} + ${this.C}) - (${this.B} + ${this.D})$$
             $$= ${aPlusC} - ${bPlusD}$$
             $$= <strong>${this.correctAnswer}</strong>$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
