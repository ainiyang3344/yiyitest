(function() {
  const question = {
    id: 'Q11',
    title: '第十一题：解决问题与多余干扰条件',
    generate() {
      // 4 Story templates
      const stories = [
        {
          type: 1,
          desc: '自行车运动员每天要骑车训练 [H] 小时，行 [D] 千米。某位运动员连续训练 [T] 天，一共行多少千米？',
          unit: '千米',
          distractorName: '每天训练的小时数',
          usefulName: '每天骑行的千米数',
          calcDesc: '每天骑行路程 × 训练天数'
        },
        {
          type: 2,
          desc: '小红每天读课外书 [H] 小时，读 [D] 页。她连续读了 [T] 天，一共读了多少页？',
          unit: '页',
          distractorName: '每天阅读的小时数',
          usefulName: '每天阅读的页数',
          calcDesc: '每天阅读页数 × 天数'
        },
        {
          type: 3,
          desc: '洒水车每分钟行驶 [D] 米，洒水宽度是 [H] 米。它连续行驶了 [T] 分钟，一共行驶了多少米？',
          unit: '米',
          distractorName: '洒水宽度',
          usefulName: '每分钟行驶的米数',
          calcDesc: '每分钟行驶距离 × 行驶时间'
        },
        {
          type: 4,
          desc: '某工厂每天生产零件 [D] 个，每个零件重 [H] 克。该工厂连续生产了 [T] 天，一共生产了多少个零件？',
          unit: '个',
          distractorName: '零件的单件重量',
          usefulName: '每天生产的个数',
          calcDesc: '每天生产个数 × 天数'
        }
      ];

      const selectedStory = stories[Math.floor(Math.random() * stories.length)];
      this.storyType = selectedStory.type;
      this.unit = selectedStory.unit;
      this.distractorName = selectedStory.distractorName;
      this.usefulName = selectedStory.usefulName;
      this.calcDesc = selectedStory.calcDesc;

      // Randomize values
      this.H = [2, 6, 8, 10][Math.floor(Math.random() * 4)];
      this.T = [15, 20, 25, 30][Math.floor(Math.random() * 4)];
      
      if (selectedStory.type === 1 || selectedStory.type === 4) {
        this.D = [200, 300, 400, 500][Math.floor(Math.random() * 4)];
      } else if (selectedStory.type === 2) {
        this.D = [25, 30, 45, 50][Math.floor(Math.random() * 4)];
      } else { // type 3
        this.D = [75, 80, 90, 100][Math.floor(Math.random() * 4)];
      }

      // Sentence replacement
      this.questionText = selectedStory.desc
        .replace('[H]', this.H)
        .replace('[D]', this.D)
        .replace('[T]', this.T);

      // Correct answer is always D * T
      this.correctAnswer = this.D * this.T;
    },
    render(container) {
      container.innerHTML = `
        <div class="question-text">
          ${this.questionText}
        </div>
        <div class="question-input-group">
          <div class="input-row">
            一共是 
            <input type="number" id="q11-ans" class="inline-input" placeholder="输入答案"> ${this.unit}。
          </div>
        </div>
      `;
    },
    validate() {
      const ansEl = document.getElementById('q11-ans');
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
      return `
        1. <strong>识别干扰信息</strong>：
           * 题目要求的是总的【${this.unit}】。
           * 题干中给出的 <strong>${this.H}</strong> 是【${this.distractorName}】，这是解决该问题时的**多余干扰条件**，不应参与计算。<br><br>
        2. <strong>理清数量关系</strong>：
           * 我们只需用到【${this.usefulName}】（即 <strong>${this.D}</strong>）和【总时间/天数】（即 <strong>${this.T}</strong>）。<br><br>
        3. <strong>列式计算</strong>：
           * 公式为：${this.calcDesc}。<br>
           * 算式：$$${this.D} \\times ${this.T} = <strong>${this.correctAnswer}</strong>\\text{ ${this.unit}}$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
