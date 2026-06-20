(function() {
  const question = {
    id: 'Q12',
    title: '第十二题：双端往返多次相遇问题',
    generate() {
      // Configuration list
      const configs = [
        { v1: 52, v2: 48, t: 6, meetNum: 2, divisor: 3, name: '第二次', bridge: 200 },
        { v1: 52, v2: 48, t: 10, meetNum: 3, divisor: 5, name: '第三次', bridge: 200 },
        { v1: 55, v2: 45, t: 9, meetNum: 2, divisor: 3, name: '第二次', bridge: 300 },
        { v1: 55, v2: 45, t: 15, meetNum: 3, divisor: 5, name: '第三次', bridge: 300 },
        { v1: 54, v2: 46, t: 12, meetNum: 2, divisor: 3, name: '第二次', bridge: 400 },
        { v1: 42, v2: 38, t: 6, meetNum: 2, divisor: 3, name: '第二次', bridge: 160 },
        { v1: 42, v2: 38, t: 10, meetNum: 3, divisor: 5, name: '第三次', bridge: 160 }
      ];

      const config = configs[Math.floor(Math.random() * configs.length)];
      this.v1 = config.v1;
      this.v2 = config.v2;
      this.t = config.t;
      this.meetNum = config.meetNum;
      this.divisor = config.divisor; // 2k - 1
      this.meetName = config.name;
      this.correctBridge = config.bridge;
      
      this.totalDistance = (this.v1 + this.v2) * this.t;
    },
    render(container) {
      const p1 = ['小军', '小强', '小明', '甲'][Math.floor(Math.random() * 4)];
      const p2 = ['小红', '小丽', '小华', '乙'][Math.floor(Math.random() * 4)];

      container.innerHTML = `
        <div class="question-text">
          ${p1}和${p2}分别从一座大桥的两端同时出发，在桥的两端之间往返跑步。
          ${p1}的速度是 <strong>${this.v1}</strong> 米/分，${p2}的速度是 <strong>${this.v2}</strong> 米/分。
          经过 <strong>${this.t}</strong> 分钟，两人<strong>${this.meetName}</strong>相遇。
          请问这座大桥的长度是多少米？
        </div>
        <div class="question-input-group">
          <div class="input-row">
            大桥长 
            <input type="number" id="q12-ans" class="inline-input" placeholder="输入大桥长"> 米。
          </div>
        </div>
      `;
    },
    validate() {
      const ansEl = document.getElementById('q12-ans');
      const ans = parseInt(ansEl.value);

      if (ans === this.correctBridge) {
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
      const k = this.meetNum;
      const formulaText = k === 2 ? '第二次相遇合走 3 倍路程' : '第三次相遇合走 5 倍路程';
      
      return `
        1. <strong>理解多次往返相遇规律</strong>：
           * 在两端出发的相遇问题中，当两人在桥上往返跑时：
             - <b>第一次相遇</b>：两人合走 $1$ 个桥长 ($S$)；<br>
             - <b>第二次相遇</b>：从第一次相遇到第二次，每多相遇一次，两人就多合走 $2$ 个桥长。因此第二次相遇时，两人合走了 $1 + 2 = 3$ 个桥长 ($3S$)；<br>
             - <b>第三次相遇</b>：两人共合走了 $1 + 2 + 2 = 5$ 个桥长 ($5S$)。<br>
             *(公式：第 $k$ 次相遇时，两人合走的总路程为 $(2k - 1) \\times S$)*。<br><br>
        2. <strong>计算两人合走的总路程</strong>：
           * 速度和 $\\times$ 时间：<br>
             $$(${this.v1} + ${this.v2}) \\times ${this.t} = 100 \\times ${this.t} = ${this.totalDistance}\\text{ 米}$$<br>
        3. <strong>计算大桥长度</strong>：
           * 根据“${this.meetName}”相遇（合走 $${this.divisor}$ 个桥长）：<br>
             $$\\text{桥长} = \\text{总路程} \\div ${this.divisor} = ${this.totalDistance} \\div ${this.divisor} = <strong>${this.correctBridge}</strong>\\text{ 米}$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
