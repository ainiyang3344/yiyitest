(function() {
  const question = {
    id: 'Q5',
    title: '第五题：多边形漏算或多算边数计算',
    generate() {
      this.actualSides = Math.floor(Math.random() * 5) + 7; // [7, 11]
      this.scenario = Math.random() > 0.5 ? 'under' : 'over';
      
      if (this.scenario === 'under') {
        this.mistakeSides = this.actualSides - 1;
        this.givenSum = (this.mistakeSides - 2) * 180;
        this.scenarioText = '少数了一条边';
      } else {
        this.mistakeSides = this.actualSides + 1;
        this.givenSum = (this.mistakeSides - 2) * 180;
        this.scenarioText = '多算了一条边';
      }
      this.correctActualSum = (this.actualSides - 2) * 180;
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          明明在计算一个多边形的内角和时，<strong>${this.scenarioText}</strong>，结果算出的内角和是 <strong>${this.givenSum}</strong>°。
        </div>
        <div class="question-input-group">
          <div class="input-row">
            这个多边形原来是 
            <select id="q5-sides" class="inline-select">
              <option value="">请选择</option>
              ${Array.from({length: 8}, (_, i) => i + 5).map(s => `<option value="${s}">${s}</option>`).join('')}
            </select> 边形。
          </div>
          <div class="input-row">
            它正确的内角和应该是 
            <input type="number" id="q5-correct-sum" class="inline-input" placeholder="度数"> °。
          </div>
        </div>
      `;
    },
    validate() {
      let correct = true;
      const sidesEl = document.getElementById('q5-sides');
      const sumEl = document.getElementById('q5-correct-sum');

      if (parseInt(sidesEl.value) === this.actualSides) {
        sidesEl.classList.remove('is-invalid');
        sidesEl.classList.add('is-valid');
      } else {
        sidesEl.classList.remove('is-valid');
        sidesEl.classList.add('is-invalid');
        correct = false;
      }

      if (parseInt(sumEl.value) === this.correctActualSum) {
        sumEl.classList.remove('is-invalid');
        sumEl.classList.add('is-valid');
      } else {
        sumEl.classList.remove('is-valid');
        sumEl.classList.add('is-invalid');
        correct = false;
      }

      return correct;
    },
    getExplanation() {
      return `
        1. <strong>公式解析</strong>：多边形的内角和公式为 $(n - 2) \\times 180^\\circ$。<br>
        2. <strong>逆推误算的边数</strong>：
           * 误算得到的内角和是 <strong>${this.givenSum}°</strong>。<br>
           * 那么误算的多边形边数（算出的边数）为：$${this.givenSum} \\div 180 + 2 = ${this.givenSum / 180 + 2}$，即 ${this.mistakeSides} 边形。<br>
        3. <strong>还原原本的边数</strong>：
           * 因为他是 <strong>${this.scenarioText}</strong>：
           * ${this.scenario === 'under' ? `原本的边数应该加上被漏掉的这 1 条边：$${this.mistakeSides} + 1 =$ <strong>${this.actualSides}</strong> 边形。` : `原本的边数应该减去多算的那 1 条边：$${this.mistakeSides} - 1 =$ <strong>${this.actualSides}</strong> 边形。`}<br>
        4. <strong>计算正确的内角和</strong>：
           * 正确的 ${this.actualSides} 边形内角和为：$( ${this.actualSides} - 2 ) \\times 180^\\circ = $ <strong>${this.correctActualSum}°</strong>。
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
