(function() {
  const question = {
    id: 'Q16',
    title: '第十六题：乘法分配律错算估算多与少',
    generate() {
      this.variant = Math.random() > 0.5 ? 1 : 2;
      
      if (this.variant === 1) {
        // A * 99 miscalculated as A * 100 - 1
        this.A = [45, 54, 63, 72, 81][Math.floor(Math.random() * 5)];
        this.correctExpr = `${this.A} × 99`;
        this.incorrectExpr = `${this.A} × 100 - 1`;
        this.correctResult = this.A * 99;
        this.incorrectResult = this.A * 100 - 1;
        
        // Incorrect is more by (A - 1)
        this.diff = this.A - 1;
        this.relation = 'more'; // 多
      } else {
        // A * 101 miscalculated as A * 100 + 1
        this.A = [36, 48, 56, 75, 84][Math.floor(Math.random() * 5)];
        this.correctExpr = `${this.A} × 101`;
        this.incorrectExpr = `${this.A} × 100 + 1`;
        this.correctResult = this.A * 101;
        this.incorrectResult = this.A * 100 + 1;
        
        // Incorrect is less by (A - 1)
        this.diff = this.A - 1;
        this.relation = 'less'; // 少
      }
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          小明在用简便方法计算 <strong>${this.correctExpr}</strong> 时，
          不小心算成了 <strong>${this.incorrectExpr}</strong>。
          请问他计算出来的错误结果比正确的结果是多了还是少了？相差多少？
        </div>
        <div class="question-input-group">
          <div class="input-row">
            错误结果比正确结果 
            <select id="q16-relation" class="inline-select">
              <option value="">请选择</option>
              <option value="more">多</option>
              <option value="less">少</option>
            </select> 了 
            <input type="number" id="q16-diff" class="inline-input" placeholder="输入差值">。
          </div>
        </div>
      `;
    },
    validate() {
      let correct = true;
      const relEl = document.getElementById('q16-relation');
      const diffEl = document.getElementById('q16-diff');

      if (relEl.value === this.relation) {
        relEl.classList.remove('is-invalid');
        relEl.classList.add('is-valid');
      } else {
        relEl.classList.remove('is-valid');
        relEl.classList.add('is-invalid');
        correct = false;
      }

      if (parseInt(diffEl.value) === this.diff) {
        diffEl.classList.remove('is-invalid');
        diffEl.classList.add('is-valid');
      } else {
        diffEl.classList.remove('is-valid');
        diffEl.classList.add('is-invalid');
        correct = false;
      }

      return correct;
    },
    getExplanation() {
      if (this.variant === 1) {
        return `
          1. <strong>正确计算过程</strong>：
             $$${this.A} \\times 99 = ${this.A} \\times (100 - 1) = ${this.A} \\times 100 - ${this.A} = ${this.A * 100} - ${this.A} = ${this.correctResult}$$<br>
          2. <strong>小明的错误计算</strong>：
             $$${this.incorrectExpr} = ${this.A * 100} - 1 = ${this.incorrectResult}$$<br>
          3. <strong>比对两者差异</strong>：
             * 正确算法中，减去了 $${this.A}$。<br>
             * 小明的错算中，只减去了 $1$。<br>
             * 因为减去的数变小了（只减了1，少减了），所以错误的结果会比正确的结果<strong>大（多）</strong>。<br>
             * 相差的数值为：少减的部分，即 $${this.A} - 1 = <strong>${this.diff}</strong>$。所以是“多 ${this.diff}”。
        `;
      } else {
        return `
          1. <strong>正确计算过程</strong>：
             $$${this.A} \\times 101 = ${this.A} \\times (100 + 1) = ${this.A} \\times 100 + ${this.A} = ${this.A * 100} + ${this.A} = ${this.correctResult}$$<br>
          2. <strong>小明的错误计算</strong>：
             $$${this.incorrectExpr} = ${this.A * 100} + 1 = ${this.incorrectResult}$$<br>
          3. <strong>比对两者差异</strong>：
             * 正确算法中，加上了 $${this.A}$。<br>
             * 小明的错算中，只加上了 $1$。<br>
             * 因为加上的数变小了（只加了1，少加了），所以错误的结果会比正确的结果<strong>小（少）</strong>。<br>
             * 相差的数值为：少加的部分，即 $${this.A} - 1 = <strong>${this.diff}</strong>$。所以是“少 ${this.diff}”。
        `;
      }
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
