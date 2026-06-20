(function() {
  const question = {
    id: 'Q9',
    title: '第九题：相遇路程差与位置判断',
    generate() {
      // Predefined valid configurations to guarantee clean integer values
      const configs = [
        { t: 4, S: 6, k: 1, v1: 120, v2: 123, pt: 'B', desc: 'B（中点偏左6米）' },
        { t: 4, S: 6, k: -1, v1: 123, v2: 120, pt: 'C', desc: 'C（中点偏右6米）' },
        { t: 4, S: 6, k: 2, v1: 120, v2: 126, pt: 'A', desc: 'A（中点偏左12米）' },
        { t: 4, S: 6, k: -2, v1: 126, v2: 120, pt: 'D', desc: 'D（中点偏右12米）' },
        { t: 5, S: 5, k: 1, v1: 100, v2: 102, pt: 'B', desc: 'B（中点偏左5米）' },
        { t: 5, S: 5, k: -1, v1: 102, v2: 100, pt: 'C', desc: 'C（中点偏右5米）' },
        { t: 3, S: 6, k: 1, v1: 110, v2: 114, pt: 'B', desc: 'B（中点偏左6米）' },
        { t: 3, S: 6, k: -1, v1: 114, v2: 110, pt: 'C', desc: 'C（中点偏右6米）' }
      ];

      const config = configs[Math.floor(Math.random() * configs.length)];
      this.t = config.t; // time in mins
      this.S = config.S; // step size in meters
      this.k = config.k; // position offset multiplier
      this.v1 = config.v1; // speed 1
      this.v2 = config.v2; // speed 2
      this.correctPt = config.pt;
      this.correctPtDesc = config.desc;
      
      this.diffDistance = Math.abs(this.v1 - this.v2) * this.t;
      this.totalDistance = (this.v1 + this.v2) * this.t;
      this.midpoint = this.totalDistance / 2;
      this.d1 = this.v1 * this.t;
      this.d2 = this.v2 * this.t;
    },
    render(container) {
      // Build dynamic SVG representation of the trail
      const svgW = 320;
      const svgH = 80;
      const y = 40;
      const xStart = 30;
      const xEnd = 290;
      const w = xEnd - xStart;
      
      // Node positions: A, B, Mid, C, D
      // Distances are symmetric around the center
      const xMid = xStart + w / 2;
      const stepPx = w / 16; // say each S is 2 step units
      const xA = xMid - 4 * stepPx;
      const xB = xMid - 2 * stepPx;
      const xC = xMid + 2 * stepPx;
      const xD = xMid + 4 * stepPx;

      const svgHtml = `
        <svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="max-width: 100%; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 12px;">
          <!-- Line of the trail -->
          <line x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" stroke="#64748b" stroke-width="4" />
          
          <!-- Start/End points -->
          <circle cx="${xStart}" cy="${y}" r="6" fill="#3b82f6" />
          <text x="${xStart}" y="${y - 12}" font-family="Outfit" font-size="12" fill="#3b82f6" font-weight="bold" text-anchor="middle">甲</text>
          
          <circle cx="${xEnd}" cy="${y}" r="6" fill="#10b981" />
          <text x="${xEnd}" y="${y - 12}" font-family="Outfit" font-size="12" fill="#10b981" font-weight="bold" text-anchor="middle">乙</text>

          <!-- Nodes A, B, Mid, C, D -->
          <circle cx="${xA}" cy="${y}" r="4" fill="#1e293b" />
          <text x="${xA}" y="${y + 16}" font-family="Outfit" font-size="11" fill="#1e293b" font-weight="bold" text-anchor="middle">A</text>
          
          <circle cx="${xB}" cy="${y}" r="4" fill="#1e293b" />
          <text x="${xB}" y="${y + 16}" font-family="Outfit" font-size="11" fill="#1e293b" font-weight="bold" text-anchor="middle">B</text>

          <circle cx="${xMid}" cy="${y}" r="5" fill="#f59e0b" />
          <text x="${xMid}" y="${y + 16}" font-family="Outfit" font-size="11" fill="#f59e0b" font-weight="bold" text-anchor="middle">中点</text>

          <circle cx="${xC}" cy="${y}" r="4" fill="#1e293b" />
          <text x="${xC}" y="${y + 16}" font-family="Outfit" font-size="11" fill="#1e293b" font-weight="bold" text-anchor="middle">C</text>

          <circle cx="${xD}" cy="${y}" r="4" fill="#1e293b" />
          <text x="${xD}" y="${y + 16}" font-family="Outfit" font-size="11" fill="#1e293b" font-weight="bold" text-anchor="middle">D</text>

          <!-- Distance markers -->
          <text x="${(xA+xB)/2}" y="${y - 6}" font-family="Outfit" font-size="9" fill="#64748b" text-anchor="middle">${this.S}米</text>
          <text x="${(xB+xMid)/2}" y="${y - 6}" font-family="Outfit" font-size="9" fill="#64748b" text-anchor="middle">${this.S}米</text>
          <text x="${(xMid+xC)/2}" y="${y - 6}" font-family="Outfit" font-size="9" fill="#64748b" text-anchor="middle">${this.S}米</text>
          <text x="${(xC+xD)/2}" y="${y - 6}" font-family="Outfit" font-size="9" fill="#64748b" text-anchor="middle">${this.S}米</text>
        </svg>
      `;

      container.innerHTML = `
        <div class="question-text">
          甲、乙两人在同一条运动步道跑步锻炼。
          甲的速度是 <strong>${this.v1}</strong> 米/分，乙的速度是 <strong>${this.v2}</strong> 米/分。
          两人分别从步道两端同时出发，相向而行，经过 <strong>${this.t}</strong> 分钟相遇。
          相遇时甲比乙少跑了多少米？相遇的位置在哪个点？
        </div>
        <div class="q8-diagram-box" style="margin-bottom: 16px;">
          ${svgHtml}
        </div>
        <div class="question-input-group">
          <div class="input-row">
            相遇时甲比乙少跑了 
            <input type="number" id="q9-diff" class="inline-input" placeholder="路程差"> 米。
          </div>
          <div class="input-row">
            相遇的位置在点 
            <select id="q9-point" class="inline-select">
              <option value="">请选择点</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select> 处。
          </div>
        </div>
      `;
    },
    validate() {
      let correct = true;
      const diffEl = document.getElementById('q9-diff');
      const pointEl = document.getElementById('q9-point');

      if (parseInt(diffEl.value) === this.diffDistance) {
        diffEl.classList.remove('is-invalid');
        diffEl.classList.add('is-valid');
      } else {
        diffEl.classList.remove('is-valid');
        diffEl.classList.add('is-invalid');
        correct = false;
      }

      if (pointEl.value === this.correctPt) {
        pointEl.classList.remove('is-invalid');
        pointEl.classList.add('is-valid');
      } else {
        pointEl.classList.remove('is-valid');
        pointEl.classList.add('is-invalid');
        correct = false;
      }

      return correct;
    },
    getExplanation() {
      return `
        1. <strong>计算路程差</strong>：
           甲跑的路程：$${this.v1} \\times ${this.t} = ${this.d1}$ 米；<br>
           乙跑的路程：$${this.v2} \\times ${this.t} = ${this.d2}$ 米；<br>
           路程差：$${Math.max(this.d1, this.d2)} - ${Math.min(this.d1, this.d2)} = <strong>${this.diffDistance}</strong>$ 米。<br>
           *(或者用速度差乘以时间：$|${this.v1} - ${this.v2}| \\times ${this.t} = ${Math.abs(this.v1 - this.v2)} \\times ${this.t} = ${this.diffDistance}$ 米)*。<br><br>
        2. <strong>判断相遇位置</strong>：
           * 总路程为：$${this.d1} + ${this.d2} = ${this.totalDistance}$ 米。因此中点位置距离两端起点是 $${this.totalDistance} \\div 2 = ${this.midpoint}$ 米。<br>
           * 甲从左端出发跑了 $${this.d1}$ 米。因为 $${this.d1} < ${this.midpoint}$，所以相遇点在中点的<strong>偏左</strong>侧，距离中点的偏差为：<br>
             $$${this.midpoint} - ${this.d1} = ${this.midpoint - this.d1}\\text{ 米}$$<br>
           * 观察线段图，中点往左数，每段是 $${this.S}$ 米。距离中点左边 $${this.midpoint - this.d1}$ 米的点正好是点 <strong>${this.correctPt}</strong>。
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
