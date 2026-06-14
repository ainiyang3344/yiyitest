(function() {
  const question = {
    id: 'Q2',
    title: '第二题：几何特征与内角和',
    generate() {
      const types = ['parallelogram', 'trapezoid', 'triangle'];
      this.shapeType = types[Math.floor(Math.random() * types.length)];
      
      if (this.shapeType === 'parallelogram') {
        this.shapeName = '平行四边形';
        this.correctCount = '无数';
        this.correctRelation = '相等';
        this.correctSum = 360;
      } else if (this.shapeType === 'trapezoid') {
        this.shapeName = '等腰梯形';
        this.correctCount = '无数';
        this.correctRelation = '相等';
        this.correctSum = 360;
      } else {
        this.shapeName = '等边三角形';
        this.correctCount = '1';
        this.correctSum = 180;
      }
    },
    render(container) {
      let html = '';
      if (this.shapeType === 'triangle') {
        html = `
          <div class="question-text">根据几何概念，填补下面的空白：</div>
          <div class="question-input-group">
            <div class="input-row">
              以<strong>等边三角形</strong>的一条边为底，只能画 
              <select id="q2-count" class="inline-select">
                <option value="">请选择</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="无数">无数</option>
              </select> 条高。
            </div>
            <div class="input-row">
              该等边三角形的内角和是 
              <input type="number" id="q2-sum" class="inline-input" placeholder="度数"> °。
            </div>
          </div>
        `;
      } else {
        html = `
          <div class="question-text">根据几何概念，填补下面的空白：</div>
          <div class="question-input-group">
            <div class="input-row">
              以<strong>${this.shapeName}</strong>的一条边为底，能作出 
              <select id="q2-count" class="inline-select">
                <option value="">请选择</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="无数">无数</option>
              </select> 条高。
            </div>
            <div class="input-row">
              这些高都互相平行，它们的长度都 
              <select id="q2-relation" class="inline-select">
                <option value="">请选择</option>
                <option value="相等">相等</option>
                <option value="不相等">不相等</option>
                <option value="不确定">不确定</option>
              </select>。
            </div>
            <div class="input-row">
              该${this.shapeName}的内角和是 
              <input type="number" id="q2-sum" class="inline-input" placeholder="度数"> °。
            </div>
          </div>
        `;
      }
      container.innerHTML = html;
    },
    validate() {
      let correct = true;
      const countEl = document.getElementById('q2-count');
      const sumEl = document.getElementById('q2-sum');
      
      if (countEl.value === this.correctCount) {
        countEl.classList.remove('is-invalid');
        countEl.classList.add('is-valid');
      } else {
        countEl.classList.remove('is-valid');
        countEl.classList.add('is-invalid');
        correct = false;
      }

      if (this.shapeType !== 'triangle') {
        const relEl = document.getElementById('q2-relation');
        if (relEl.value === this.correctRelation) {
          relEl.classList.remove('is-invalid');
          relEl.classList.add('is-valid');
        } else {
          relEl.classList.remove('is-valid');
          relEl.classList.add('is-invalid');
          correct = false;
        }
      }

      if (parseInt(sumEl.value) === this.correctSum) {
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
      if (this.shapeType === 'triangle') {
        return `
          1. <strong>三角形的高</strong>：三角形有三个顶点，从任意一个顶点向它的对边作垂线，可以得到一条高。因此，以其中<b>一条特定边</b>为底，只能画出 <strong>1</strong> 条高。<br>
          2. <strong>三角形的内角和</strong>：任何三角形的内角和都是固定的 <strong>180°</strong>。
        `;
      } else {
        return `
          1. <strong>平行四边形和梯形的高</strong>：由于平行四边形和梯形拥有一组相互平行的对边，在一条边上任意取一点，都可以向对边画一条垂直线段。因为边上有无数个点，所以能作出 <strong>无数</strong> 条高。<br>
          2. <strong>高长度的关系</strong>：因为平行线之间的距离处处相等，所以这无数条高的长度都 <strong>相等</strong>。<br>
          3. <strong>四边形的内角和</strong>：平行四边形和梯形都是四边形，四边形可以分割成两个三角形，因此它们的内角和是 $180^\\circ \\times 2 =$ <strong>360°</strong>。
        `;
      }
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
