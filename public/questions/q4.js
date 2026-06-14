(function() {
  const question = {
    id: 'Q4',
    title: '第四题：最长周长三角形的小棒选择',
    generate() {
      const a2 = Math.floor(Math.random() * 4) + 4;
      const a3 = a2 + Math.floor(Math.random() * 2) + 1;
      const a4 = a2 + a3 - (Math.floor(Math.random() * 2) + 1);
      const a1 = a2 - (Math.floor(Math.random() * 2) + 1);
      const a5 = a3 + a4 + Math.floor(Math.random() * 3) + 1;
      
      this.sticks = [a1, a2, a3, a4, a5].sort((x, y) => x - y);
      this.sticks = [...new Set(this.sticks)];
      while (this.sticks.length < 5) {
        this.sticks.push(this.sticks[this.sticks.length - 1] + Math.floor(Math.random() * 3) + 2);
      }
      this.sticks.sort((x, y) => x - y);

      let maxSum = 0;
      let bestCombo = [];

      for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
          for (let k = j + 1; k < 5; k++) {
            const s1 = this.sticks[i];
            const s2 = this.sticks[j];
            const s3 = this.sticks[k];
            if (s1 + s2 > s3) {
              const sum = s1 + s2 + s3;
              if (sum > maxSum) {
                maxSum = sum;
                bestCombo = [s1, s2, s3];
              }
            }
          }
        }
      }

      this.correctSticks = bestCombo;
      this.selectedSticks = [];
    },
    render(container) {
      this.selectedSticks = [];
      let html = `
        <div class="question-text">
          现有五根不同长度的小棒（如下所示）。请从中**选择 3 根**，围成一个三角形。要使围成的**三角形周长最长**，应该选择哪三根？
        </div>
        <div class="subtitle">(点击下面小棒进行选择，必须正好选择 3 根)</div>
        <div class="sticks-list-container">
          <div class="sticks-row">
      `;

      this.sticks.forEach((stick, index) => {
        const width = 40 + stick * 8;
        const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
        const color = colors[index % colors.length];
        
        html += `
          <button class="stick-item-btn" data-value="${stick}" id="stick-btn-${index}" onclick="window.toggleQ4Stick(${index}, ${stick})">
            <span class="stick-visual" style="width: ${width}px; color: ${color};"></span>
            <strong>${stick} 厘米</strong>
          </button>
        `;
      });

      html += `
          </div>
        </div>
      `;
      container.innerHTML = html;

      // Register temporary global callback for button click
      window.toggleQ4Stick = (index, stick) => {
        this.toggleStick(index, stick);
      };
    },
    toggleStick(index, stick) {
      const btn = document.getElementById(`stick-btn-${index}`);
      if (this.selectedSticks.includes(stick)) {
        this.selectedSticks = this.selectedSticks.filter(s => s !== stick);
        btn.classList.remove('selected');
      } else {
        if (this.selectedSticks.length >= 3) return;
        this.selectedSticks.push(stick);
        btn.classList.add('selected');
      }
    },
    validate() {
      if (this.selectedSticks.length !== 3) {
        this.sticks.forEach((_, index) => {
          document.getElementById(`stick-btn-${index}`).classList.add('is-invalid');
        });
        return false;
      }

      const sortedSelected = [...this.selectedSticks].sort((x, y) => x - y);
      const sortedCorrect = [...this.correctSticks].sort((x, y) => x - y);

      let correct = true;
      for (let i = 0; i < 3; i++) {
        if (sortedSelected[i] !== sortedCorrect[i]) {
          correct = false;
          break;
        }
      }

      this.sticks.forEach((stick, index) => {
        const btn = document.getElementById(`stick-btn-${index}`);
        btn.classList.remove('is-invalid', 'is-valid');
        
        if (this.selectedSticks.includes(stick)) {
          if (this.correctSticks.includes(stick)) {
            btn.classList.add('is-valid');
          } else {
            btn.classList.add('is-invalid');
          }
        }
      });

      return correct;
    },
    getExplanation() {
      const maxStick = this.sticks[4];
      return `
        1. <strong>三角形三边关系定理</strong>：三角形中任意两边长度之和必须<strong>大于</strong>第三边。<br>
        2. <strong>排除无法围成的情况</strong>：
           * 这里最长的一根小棒是 <strong>${maxStick} 厘米</strong>，而剩下的四根中，最大的两根分别是 <strong>${this.sticks[2]} 厘米</strong> 和 <strong>${this.sticks[3]} 厘米</strong>。<br>
           * 因为 $${this.sticks[2]} + ${this.sticks[3]} = ${this.sticks[2] + this.sticks[3]}$ 厘米 ${this.sticks[2] + this.sticks[3] <= maxStick ? `$\\le$ <strong>${maxStick} 厘米</strong>` : `虽然大于，但是组合有误。`}，两边之和不大于最长边。所以无论如何，**都无法用包含 ${maxStick} 厘米的小棒围成三角形**，必须把它排除掉！<br>
        3. <strong>在剩下的四根小棒中选择最大的三根</strong>：
           * 排除 ${maxStick} 厘米后，剩下的四根是：${this.sticks.slice(0,4).join(' 厘米、')} 厘米。<br>
           * 为了让周长最大，选剩下里最长的三根：<strong>${this.correctSticks.join(' 厘米、')} 厘米</strong>。<br>
           * 验证三边关系：$${this.correctSticks[0]} + ${this.correctSticks[1]} = ${this.correctSticks[0] + this.correctSticks[1]} > ${this.correctSticks[2]}$ 厘米，满足定理。此时周长最大为 $${this.correctSticks.reduce((a,b)=>a+b, 0)}$ 厘米。
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
