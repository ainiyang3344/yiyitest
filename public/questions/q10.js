(function() {
  const question = {
    id: 'Q10',
    title: '第十题：乘法分配律与错算差值',
    generate() {
      // Randomize values
      const factors = [12, 15, 18, 25, 30];
      this.x = factors[Math.floor(Math.random() * factors.length)];
      
      this.y = [25, 35, 45, 50, 55][Math.floor(Math.random() * 5)];
      this.z = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      
      // Ensure y != z
      while (this.y === this.z) {
        this.z = [5, 10, 15, 20][Math.floor(Math.random() * 4)];
      }

      this.op = Math.random() > 0.5 ? '+' : '-';
      
      // Math: Correct = x * (a ± y)
      // Incorrect = (a ± z) * x
      // Difference = x * |y - z|
      this.diff = this.x * Math.abs(this.y - this.z);
    },
    render(container) {
      const name = ['小明', '小红', '小军', '明明', '红红'][Math.floor(Math.random() * 5)];
      const symbolCorrect = this.op === '+' ? 'a + ' + this.y : 'a - ' + this.y;
      const symbolIncorrect = this.op === '+' ? 'a + ' + this.z : 'a - ' + this.z;

      container.innerHTML = `
        <div class="question-text">
          ${name}在用乘法分配律计算 <strong>${this.x} &times; a ${this.op} ${this.y} &times; ${this.x}</strong> 时，
          由于马虎算成了 <strong>(${symbolIncorrect}) &times; ${this.x}</strong>。
          请问他得到的结果与正确的结果相差多少？
        </div>
        <div class="question-input-group">
          <div class="input-row">
            相差 
            <input type="number" id="q10-diff" class="inline-input" placeholder="输入差值">。
          </div>
        </div>
      `;
    },
    validate() {
      const diffEl = document.getElementById('q10-diff');
      const ans = parseInt(diffEl.value);

      if (ans === this.diff) {
        diffEl.classList.remove('is-invalid');
        diffEl.classList.add('is-valid');
        return true;
      } else {
        diffEl.classList.remove('is-valid');
        diffEl.classList.add('is-invalid');
        return false;
      }
    },
    getExplanation() {
      const correctExpanded = `${this.x} \\times (a ${this.op} ${this.y})`;
      const incorrectExpanded = `${this.x} \\times (a ${this.op} ${this.z})`;
      const larger = Math.max(this.y, this.z);
      const smaller = Math.min(this.y, this.z);

      return `
        1. <strong>利用乘法分配律化简两式</strong>：
           * 正确算式：$${this.x} \\times a ${this.op} ${this.y} \\times ${this.x} = ${correctExpanded}$；<br>
           * 错误算式：$(a ${this.op} ${this.z}) \\times ${this.x} = ${incorrectExpanded}$。<br><br>
        2. <strong>比对两个算式的差异</strong>：
           * 观察可以发现，正确算式与错误算式里都包含 $${this.x} \\times a$。<br>
           * 两者的区别仅在于：一个是 ${this.op === '+' ? '加上' : '减去'} 了 $${this.x} \\times ${this.y}$，另一个是 ${this.op === '+' ? '加上' : '减去'} 了 $${this.x} \\times ${this.z}$。<br><br>
        3. <strong>计算相差的数值</strong>：
           * 它们的差值也就是这多出来的（或少去的）常数之差：<br>
             $$${this.x} \\times | ${this.y} - ${this.z} | = ${this.x} \\times ( ${larger} - ${smaller} ) = ${this.x} \\times ${Math.abs(this.y - this.z)} = <strong>${this.diff}</strong>$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
