(function() {
  const question = {
    id: 'Q15',
    title: '第十五题：计算器坏键转换选择题',
    generate() {
      // Configuration list
      const configs = [
        {
          brokenKey: '4',
          equation: '34 × 120',
          options: [
            { text: '31 + 3 × 120', isCorrect: false, reason: '计算得数不相等（它等价于 31 + 360 = 391，而原式是 4080）。' },
            { text: '30 × 120 + 4 × 120', isCorrect: false, reason: '虽然数学上等价，但是算式中包含数字“4”，在“4”键坏了时无法输入。' },
            { text: '32 × 120 + 2 × 120', isCorrect: true, reason: '不仅数学上完全等价（(32+2) × 120 = 34 × 120），而且没有任何数字里包含“4”，可以直接输入。' },
            { text: '35 × 120 - 35', isCorrect: false, reason: '计算得数不相等（它等于 4165，而原式是 4080；除非写成 35 × 120 - 120 才是正确的）。' }
          ]
        },
        {
          brokenKey: '5',
          equation: '56 × 25',
          options: [
            { text: '50 × 25 + 6 × 25', isCorrect: false, reason: '虽然数学上等价，但“50”和“25”里都包含了数字“5”，在“5”键坏了时无法输入。' },
            { text: '60 × 25 - 4 × 25', isCorrect: false, reason: '虽然“60”和“4”不含5，但是“25”里依然含有数字“5”，所以无法输入。' },
            { text: '7 × 8 × 24', isCorrect: false, reason: '计算得数不相等（7×8=56，但后面乘数变为了24，不是25）。' },
            { text: '7 × 8 × (29 - 4)', isCorrect: true, reason: '数学上完全等价（7×8=56，29-4=25，整体为56×25），且所有数字均不包含“5”，可以直接输入！' }
          ]
        },
        {
          brokenKey: '8',
          equation: '82 × 15',
          options: [
            { text: '80 × 15 + 2 × 15', isCorrect: false, reason: '算式中包含“80”，含有坏掉的“8”键，无法输入。' },
            { text: '90 × 15 - 8 × 15', isCorrect: false, reason: '算式中包含“8”，无法输入。' },
            { text: '90 × 15 - 120', isCorrect: true, reason: '数学上等价（90 × 15 - 8 × 15 = 82 × 15，而 8 × 15 = 120），且所有数字（90, 15, 120）均不含“8”，可以直接输入！' },
            { text: '90 × 15 - 15', isCorrect: false, reason: '计算得数不相等（它等价于 89 × 15，而原式是 82 × 15）。' }
          ]
        },
        {
          brokenKey: '6',
          equation: '68 × 12',
          options: [
            { text: '70 × 12 - 2 × 12', isCorrect: true, reason: '数学上完全等价（(70-2) × 12 = 68 × 12），且所有数字中不包含数字“6”，可以直接输入。' },
            { text: '60 × 12 + 8 × 12', isCorrect: false, reason: '算式中含有“60”，包含坏掉的“6”键，无法输入。' },
            { text: '70 × 12 - 12', isCorrect: false, reason: '计算得数不相等（它等价于 69 × 12，而原式是 68 × 12）。' },
            { text: '68 × 10 + 68 × 2', isCorrect: false, reason: '虽然等价，但乘数“68”里包含数字“6”，无法输入。' }
          ]
        }
      ];

      const config = configs[Math.floor(Math.random() * configs.length)];
      this.brokenKey = config.brokenKey;
      this.equation = config.equation;
      
      // Shuffle options but keep track of correct one
      this.shuffledOptions = config.options.map((opt, idx) => ({ ...opt, originalIdx: idx }))
        .sort(() => Math.random() - 0.5);
      
      this.correctIdx = this.shuffledOptions.findIndex(o => o.isCorrect);
      this.selectedOptionIdx = null;
    },
    render(container) {
      this.selectedOptionIdx = null;
      let html = `
        <div class="question-text">
          计算器上的数字键 <strong>“${this.brokenKey}”</strong> 坏了，
          如果想用这个计算器计算 <strong>${this.equation}</strong> 的得数，可以将原来的算式转化成下面哪个算式？
        </div>
        <div class="statement-card-list">
      `;

      const labels = ['A', 'B', 'C', 'D'];
      this.shuffledOptions.forEach((opt, index) => {
        html += `
          <button class="statement-item" id="q15-opt-${index}" onclick="window.selectQ15Option(${index})" style="width:100%; text-align:left; cursor:pointer; background:#ffffff; border: 2px solid var(--border-color); margin-bottom:8px; display:block;">
            <strong style="color:var(--primary-color); margin-right: 8px;">${labels[index]}.</strong> ${opt.text}
          </button>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;

      window.selectQ15Option = (idx) => {
        this.selectOption(idx);
      };
    },
    selectOption(idx) {
      this.shuffledOptions.forEach((_, i) => {
        document.getElementById(`q15-opt-${i}`).style.borderColor = 'var(--border-color)';
        document.getElementById(`q15-opt-${i}`).style.background = '#ffffff';
      });
      this.selectedOptionIdx = idx;
      const selectedBtn = document.getElementById(`q15-opt-${idx}`);
      selectedBtn.style.borderColor = 'var(--primary-color)';
      selectedBtn.style.background = '#eff6ff';
    },
    validate() {
      if (this.selectedOptionIdx === null) {
        this.shuffledOptions.forEach((_, i) => {
          document.getElementById(`q15-opt-${i}`).style.borderColor = 'var(--error-color)';
        });
        return false;
      }

      const isCorrect = this.selectedOptionIdx === this.correctIdx;
      const selectedBtn = document.getElementById(`q15-opt-${this.selectedOptionIdx}`);
      
      selectedBtn.style.borderColor = isCorrect ? 'var(--success-color)' : 'var(--error-color)';
      selectedBtn.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';

      return isCorrect;
    },
    getExplanation() {
      let breakdown = '';
      const labels = ['A', 'B', 'C', 'D'];
      
      this.shuffledOptions.forEach((opt, index) => {
        const icon = opt.isCorrect ? '✅' : '❌';
        breakdown += `
          <p style="margin-top: 8px;">
            <strong>选项 ${labels[index]} (${opt.text}) ${icon}</strong>：<br>
            <span style="color: #92400e;">${opt.reason}</span>
          </p>
        `;
      });

      return `
        本题考查的是<b>计算器坏键下的算式合理拆分</b>：
        * <strong>核心要求</strong>：新算式不仅在数学上与原式相等，而且其用到的**所有数字中绝对不能包含坏掉的数字按键“${this.brokenKey}”**。
        ${breakdown}
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
