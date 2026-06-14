(function() {
  const question = {
    id: 'Q3',
    title: '第三题：图形边长与内角计算',
    generate() {
      const types = ['triangle', 'square'];
      this.polygonType = types[Math.floor(Math.random() * types.length)];
      
      if (this.polygonType === 'triangle') {
        this.perimeter = [18, 24, 30, 36, 45, 60, 72, 90][Math.floor(Math.random() * 8)];
        this.correctSide = this.perimeter / 3;
        this.correctAngle = 60;
        this.polygonName = '等边三角形';
        this.sidesCount = 3;
      } else {
        this.perimeter = [16, 20, 24, 28, 36, 40, 48, 60, 80, 100][Math.floor(Math.random() * 10)];
        this.correctSide = this.perimeter / 4;
        this.correctAngle = 90;
        this.polygonName = '正方形';
        this.sidesCount = 4;
      }
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          一根 <strong>${this.perimeter}</strong> 厘米长的绳子，正好围成了一个<strong>${this.polygonName}</strong>。
        </div>
        <div class="question-input-group">
          <div class="input-row">
            这个${this.polygonName}的边长是 
            <input type="number" id="q3-side" class="inline-input" placeholder="边长"> 厘米。
          </div>
          <div class="input-row">
            它的一个内角是 
            <input type="number" id="q3-angle" class="inline-input" placeholder="角度"> °。
          </div>
        </div>
      `;
    },
    validate() {
      let correct = true;
      const sideEl = document.getElementById('q3-side');
      const angleEl = document.getElementById('q3-angle');

      if (parseInt(sideEl.value) === this.correctSide) {
        sideEl.classList.remove('is-invalid');
        sideEl.classList.add('is-valid');
      } else {
        sideEl.classList.remove('is-valid');
        sideEl.classList.add('is-invalid');
        correct = false;
      }

      if (parseInt(angleEl.value) === this.correctAngle) {
        angleEl.classList.remove('is-invalid');
        angleEl.classList.add('is-valid');
      } else {
        angleEl.classList.remove('is-valid');
        angleEl.classList.add('is-invalid');
        correct = false;
      }

      return correct;
    },
    getExplanation() {
      return `
        1. <strong>求边长</strong>：
           因为是<strong>${this.polygonName}</strong>，它的 <strong>${this.sidesCount}</strong> 条边都相等。
           周长为绳长 ${this.perimeter} 厘米，所以边长为 $${this.perimeter} \\div ${this.sidesCount} =$ <strong>${this.correctSide}</strong> 厘米。<br>
        2. <strong>求内角</strong>：
           * ${this.polygonName === '等边三角形' ? '等边三角形的三个内角都相等，且内角和是 $180^\\circ$，所以每个内角是 $180^\\circ \\div 3 =$ <strong>60°</strong>。' : '正方形的四个角都是直角，所以每个内角都是 <strong>90°</strong>。'}
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
