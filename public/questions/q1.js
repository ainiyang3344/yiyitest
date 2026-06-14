(function() {
  const question = {
    id: 'Q1',
    title: '第一题：图形分类',
    generate() {
      // 3 Categories: 0 = 平行四边形, 1 = 梯形, 2 = 直角三角形
      // We generate exactly 6 shapes: 2 parallelograms, 2 trapezoids, 2 right triangles
      const pool = [
        { type: 0, name: '平行四边形', svgPath: 'M 10 70 L 40 30 L 90 30 L 60 70 Z' },
        { type: 0, name: '平行四边形', svgPath: 'M 15 65 L 50 35 L 85 35 L 50 65 Z' },
        { type: 1, name: '梯形', svgPath: 'M 15 70 L 35 30 L 75 30 L 85 70 Z' },
        { type: 1, name: '梯形', svgPath: 'M 20 70 L 20 30 L 60 30 L 80 70 Z' }, // Right trapezoid
        { type: 2, name: '直角三角形', svgPath: 'M 25 70 L 25 30 L 75 70 Z', hasRightAngle: true, raX: 25, raY: 70 },
        { type: 2, name: '直角三角形', svgPath: 'M 20 70 L 70 30 L 70 70 Z', hasRightAngle: true, raX: 70, raY: 70 }
      ];

      // Shuffle
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      
      this.shapes = shuffled.map((item, idx) => ({
        id: idx + 1,
        label: String.fromCharCode(9312 + idx), // ①, ②, ③, ④, ⑤, ⑥
        type: item.type,
        name: item.name,
        svgPath: item.svgPath,
        hasRightAngle: item.hasRightAngle,
        raX: item.raX,
        raY: item.raY
      }));
    },
    render(container) {
      let html = `
        <div class="question-text">下图中，请观察各个几何图形，并选择它们的正确分类：</div>
        <div class="q1-svg-container">
      `;
      
      this.shapes.forEach(shape => {
        html += `
          <div class="q1-shape-card" id="q1-card-${shape.id}">
            <div class="shape-badge">${shape.label}</div>
            <svg class="shape-svg" viewBox="0 0 100 100">
              <path d="${shape.svgPath}" fill="#e2e8f0" stroke="#3b82f6" stroke-width="3" />
              ${shape.hasRightAngle ? `<rect x="${shape.raX === 25 ? 25 : 62}" y="${shape.raY - 8}" width="8" height="8" fill="none" stroke="#ef4444" stroke-width="1.5" />` : ''}
            </svg>
            <div class="q1-classification-selects">
              <select class="q1-select" data-shape-id="${shape.id}">
                <option value="-1">-- 请选择分类 --</option>
                <option value="0">平行四边形</option>
                <option value="1">梯形</option>
                <option value="2">直角三角形</option>
              </select>
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    },
    validate() {
      let allCorrect = true;
      const selects = document.querySelectorAll('.q1-select');
      
      selects.forEach(select => {
        const shapeId = parseInt(select.getAttribute('data-shape-id'));
        const shape = this.shapes.find(s => s.id === shapeId);
        const val = parseInt(select.value);
        const card = document.getElementById(`q1-card-${shapeId}`);

        if (val === shape.type) {
          select.classList.remove('is-invalid');
          select.classList.add('is-valid');
          card.style.borderColor = 'var(--success-color)';
        } else {
          select.classList.remove('is-valid');
          select.classList.add('is-invalid');
          card.style.borderColor = 'var(--error-color)';
          allCorrect = false;
        }
      });
      return allCorrect;
    },
    getExplanation() {
      let pClass = [];
      let tClass = [];
      let rClass = [];
      
      this.shapes.forEach(s => {
        if (s.type === 0) pClass.push(s.label);
        else if (s.type === 1) tClass.push(s.label);
        else if (s.type === 2) rClass.push(s.label);
      });

      return `
        根据几何图形的特征：
        <ul>
          <li><strong>平行四边形</strong>（两组对边分别平行的四边形）是：<strong>${pClass.join('、')}</strong>。</li>
          <li><strong>梯形</strong>（只有一组对边平行的四边形）是：<strong>${tClass.join('、')}</strong>。</li>
          <li><strong>直角三角形</strong>（有一个角是直角 $90^\\circ$ 的三角形，带有直角标志 $\\llcorner$）是：<strong>${rClass.join('、')}</strong>。</li>
        </ul>
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
