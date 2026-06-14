(function() {
  const question = {
    id: 'Q7',
    title: '第七题：等腰三角形可能的围法',
    generate() {
      this.perimeter = [16, 18, 20, 22, 24, 26, 28, 30][Math.floor(Math.random() * 8)];
      
      this.validCombos = [];
      const minW = Math.floor(this.perimeter / 4) + 1;
      const maxW = Math.floor((this.perimeter - 1) / 2);
      
      for (let w = minW; w <= maxW; w++) {
        const b = this.perimeter - 2 * w;
        this.validCombos.push({ base: b, waist: w });
      }
      this.validCombos.sort((x, y) => x.base - y.base);
    },
    render(container) {
      let html = `
        <div class="question-text">
          小明想用一根 <strong>${this.perimeter}</strong> 厘米长的细铁丝，围成一个等腰三角形。如果每条边的长度都是整厘米数，请你在表格里写出**所有可能的围法**：
        </div>
        <div class="q7-table-container">
          <table class="q7-combos-table" id="q7-table">
            <thead>
              <tr>
                <th>底边长度 (厘米)</th>
                <th>腰的长度 (厘米)</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="q7-table-body">
              <tr class="q7-input-row">
                <td><input type="number" class="q7-input-base inline-input" placeholder="输入底"></td>
                <td><input type="number" class="q7-input-waist inline-input" placeholder="输入腰"></td>
                <td><button class="table-row-delete-btn" onclick="this.closest('tr').remove()">🗑️</button></td>
              </tr>
            </tbody>
          </table>
          <div class="q7-actions">
            <button class="btn-add-row" onclick="window.addQ7Row()">➕ 添加一组新围法</button>
          </div>
        </div>
      `;
      container.innerHTML = html;

      window.addQ7Row = () => {
        this.addRow();
      };
    },
    addRow() {
      const tbody = document.getElementById('q7-table-body');
      const tr = document.createElement('tr');
      tr.className = 'q7-input-row';
      tr.innerHTML = `
        <td><input type="number" class="q7-input-base inline-input" placeholder="输入底"></td>
        <td><input type="number" class="q7-input-waist inline-input" placeholder="输入腰"></td>
        <td><button class="table-row-delete-btn" onclick="this.closest('tr').remove()">🗑️</button></td>
      `;
      tbody.appendChild(tr);
    },
    validate() {
      const rows = document.querySelectorAll('.q7-input-row');
      const studentCombos = [];
      let inputComplete = true;

      rows.forEach(row => {
        const baseEl = row.querySelector('.q7-input-base');
        const waistEl = row.querySelector('.q7-input-waist');
        const base = parseInt(baseEl.value);
        const waist = parseInt(waistEl.value);

        if (isNaN(base) || isNaN(waist)) {
          baseEl.classList.add('is-invalid');
          waistEl.classList.add('is-invalid');
          inputComplete = false;
        } else {
          studentCombos.push({ base, waist, baseEl, waistEl });
        }
      });

      if (!inputComplete || studentCombos.length === 0) return false;

      const uniqueStudent = [];
      studentCombos.forEach(item => {
        const dup = uniqueStudent.find(x => x.base === item.base && x.waist === item.waist);
        if (!dup) {
          uniqueStudent.push(item);
        }
      });

      studentCombos.forEach(item => {
        item.baseEl.classList.remove('is-valid', 'is-invalid');
        item.waistEl.classList.remove('is-valid', 'is-invalid');
      });

      let allCorrect = true;

      studentCombos.forEach(item => {
        const match = this.validCombos.find(c => c.base === item.base && c.waist === item.waist);
        if (match) {
          item.baseEl.classList.add('is-valid');
          item.waistEl.classList.add('is-valid');
        } else {
          item.baseEl.classList.add('is-invalid');
          item.waistEl.classList.add('is-invalid');
          allCorrect = false;
        }
      });

      let matchedCount = 0;
      this.validCombos.forEach(combo => {
        const hasMatch = uniqueStudent.some(x => x.base === combo.base && x.waist === combo.waist);
        if (hasMatch) matchedCount++;
      });

      if (matchedCount !== this.validCombos.length) {
        allCorrect = false;
        alert(`提示：还没有找全所有可能的围法哦，你找出了 ${matchedCount} 种，总共有 ${this.validCombos.length} 种。再想想！`);
      }

      return allCorrect;
    },
    getExplanation() {
      let solutionsHtml = this.validCombos.map((c, i) => {
        return `<b>方案 ${i+1}</b>：底是 <strong>${c.base} 厘米</strong>，腰是 <strong>${c.waist} 厘米</strong>（三边为：${c.base}, ${c.waist}, ${c.waist}，符合 $${c.waist} + ${c.waist} = ${c.waist*2} > ${c.base}$）。`;
      }).join('<br>');

      return `
        等腰三角形有两条相等边（腰）和一条底边，周长是 <strong>${this.perimeter} 厘米</strong>。<br>
        设底为 $b$，腰为 $w$，因为周长是 $L$，所以公式为：$b + 2w = ${this.perimeter}$。<br>
        同时必须满足三角形定理：两边之和大于第三边，即腰+腰 $>$ 底：<br>
        $$w + w > b \\implies 2w > ${this.perimeter} - 2w \\implies 4w > ${this.perimeter} \\implies w > ${this.perimeter / 4}$$
        且底边必须大于 0，即：<br>
        $$b > 0 \\implies ${this.perimeter} - 2w > 0 \\implies w < ${this.perimeter / 2}$$
        所以，腰的取值范围为整厘米数：$${Math.floor(this.perimeter/4) + 0.5} < w < ${this.perimeter/2}$。<br><br>
        在本题中，周长是 <strong>${this.perimeter} 厘米</strong>，符合条件的取值有：<br>
        ${solutionsHtml}
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
