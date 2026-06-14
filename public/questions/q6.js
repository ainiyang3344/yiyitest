(function() {
  const question = {
    id: 'Q6',
    title: '第六题：几何概念判断与纠错',
    generate() {
      const pool = [
        { text: '有一个角是 60° 的等腰三角形一定是等边三角形。', isCorrect: true },
        { text: '有一个角是 60° 的锐角三角形一定是等边三角形。', isCorrect: false, desc: '错在：锐角三角形三个角只要小于90°即可，如 50°、60°、70°，不一定是等边。' },
        { text: '等边三角形是特殊的等腰三角形。', isCorrect: true },
        { text: '两个周长相等的三角形可以拼成一个平行四边形。', isCorrect: false, desc: '错在：周长相等并不代表形状大小完全相同（全等）。只有完全一样的三角形才能拼成平行四边形。' },
        { text: '两个完全一样的三角形一定可以拼成一个平行四边形。', isCorrect: true },
        { text: '可以画出一个三角形，其中最小的内角是 61°。', isCorrect: false, desc: '错在：如果最小角是 61°，那么三个内角都 $\\ge 61^\\circ$，内角和将 $\\ge 183^\\circ$，超过了三角形的 $180^\\circ$。' },
        { text: '任意一个平行四边形都可以分成两个完全一样的梯形。', isCorrect: true },
        { text: '平行四边形有无数条高，而梯形只有两条高。', isCorrect: false, desc: '错在：梯形也有无数条高，因为可以在对边之间画出无数条垂直的高。' },
        { text: '等腰三角形的两个底角一定相等。', isCorrect: true },
        { text: '直角三角形中可能包含有钝角。', isCorrect: false, desc: '错在：直角三角形已经有一个 90° 角，剩下两角之和为 90°，必然都为锐角，不可能有大于 90° 的钝角。' },
        { text: '三角形任意两边之和大于第三边。', isCorrect: true },
        { text: '等边三角形的每一个内角都是 60°。', isCorrect: true }
      ];

      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      this.selectedStatements = shuffled.slice(0, 4);
      this.correctCount = this.selectedStatements.filter(s => !s.isCorrect).length;
      this.selectedOption = null;
    },
    render(container) {
      this.selectedOption = null;
      let html = `
        <div class="question-text">仔细阅读下面四个几何说法，数一数其中**错误**的说法有几个？</div>
        <div class="statement-card-list">
      `;

      this.selectedStatements.forEach((stmt, index) => {
        html += `
          <div class="statement-item">
            <span class="statement-num">${index + 1}</span>
            <div class="statement-txt">${stmt.text}</div>
          </div>
        `;
      });

      html += `
        </div>
        <div class="mc-options-container">
      `;

      for (let i = 0; i <= 4; i++) {
        html += `
          <button class="mc-option-btn" id="q6-opt-${i}" onclick="window.selectQ6Option(${i})">
            ${i} 个
          </button>
        `;
      }

      html += `</div>`;
      container.innerHTML = html;

      window.selectQ6Option = (num) => {
        this.selectOption(num);
      };
    },
    selectOption(num) {
      for (let i = 0; i <= 4; i++) {
        document.getElementById(`q6-opt-${i}`).classList.remove('selected');
      }
      this.selectedOption = num;
      document.getElementById(`q6-opt-${num}`).classList.add('selected');
    },
    validate() {
      if (this.selectedOption === null) {
        for (let i = 0; i <= 4; i++) {
          document.getElementById(`q6-opt-${i}`).classList.add('is-invalid');
        }
        return false;
      }

      const isCorrect = this.selectedOption === this.correctCount;
      
      for (let i = 0; i <= 4; i++) {
        const btn = document.getElementById(`q6-opt-${i}`);
        btn.classList.remove('is-invalid', 'is-valid');
        if (i === this.selectedOption) {
          btn.classList.add(isCorrect ? 'is-valid' : 'is-invalid');
        }
      }

      return isCorrect;
    },
    getExplanation() {
      let breakdownHtml = '';
      this.selectedStatements.forEach((s, idx) => {
        const icon = s.isCorrect ? '✅ 正确' : '❌ 错误';
        const explain = s.isCorrect ? '符合几何公理。' : s.desc;
        breakdownHtml += `
          <p style="margin-top: 8px;">
            <strong>说法 ${idx+1} (${icon})</strong>：${s.text}<br>
            <span style="color: #92400e;">解析：${explain}</span>
          </p>
        `;
      });

      return `
        本题要求找出所有<b>错误</b>的说法数量。四个说法的对错情况如下：
        ${breakdownHtml}
        <br>
        因此，这 4 个说法里一共有 <strong>${this.correctCount}</strong> 个是错误的。
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
