(function() {
  const question = {
    id: 'Q8',
    title: '第八题：直角梯形绿化地周长计算',
    generate() {
      const triples = [
        { d: 3, h: 4, s: 5, u: 1 },
        { d: 6, h: 8, s: 10, u: 2 },
        { d: 5, h: 12, s: 13, u: 7 },
        { d: 8, h: 15, s: 17, u: 7 },
        { d: 9, h: 12, s: 15, u: 3 }
      ];
      
      const selected = triples[Math.floor(Math.random() * triples.length)];
      this.d = selected.d;
      this.h = selected.h;
      this.s = selected.s;
      this.u = selected.u;
      
      this.lowerBase = this.u + this.d;
      this.correctPerimeter = this.u + this.lowerBase + this.h + this.s;
    },
    render(container) {
      const scale = 12;
      const svgW = 200;
      const svgH = 160;
      const offset = 20;
      
      const ptTopLeft = { x: offset, y: offset };
      const ptTopRight = { x: offset + this.u * scale, y: offset };
      const ptBottomLeft = { x: offset, y: offset + this.h * scale };
      const ptBottomRight = { x: offset + (this.u + this.d) * scale, y: offset + this.h * scale };
      const ptSquareTopRight = { x: offset + (this.u + this.d) * scale, y: offset };

      const svgHtml = `
        <svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="max-width: 100%;">
          <polygon points="${ptTopLeft.x},${ptTopLeft.y} ${ptTopRight.x},${ptTopRight.y} ${ptBottomRight.x},${ptBottomRight.y} ${ptBottomLeft.x},${ptBottomLeft.y}" fill="#dbeafe" stroke="#2563eb" stroke-width="2" />
          <line x1="${ptTopRight.x}" y1="${ptTopRight.y}" x2="${ptSquareTopRight.x}" y2="${ptSquareTopRight.y}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
          <line x1="${ptSquareTopRight.x}" y1="${ptSquareTopRight.y}" x2="${ptBottomRight.x}" y2="${ptBottomRight.y}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
          <rect x="${ptBottomLeft.x}" y="${ptBottomLeft.y - 8}" width="8" height="8" fill="none" stroke="#2563eb" stroke-width="1.5" />
          <rect x="${ptTopLeft.x}" y="${ptTopLeft.y}" width="8" height="8" fill="none" stroke="#2563eb" stroke-width="1.5" />
          <text x="${(ptTopLeft.x + ptTopRight.x)/2}" y="${ptTopLeft.y - 6}" font-family="Outfit" font-size="12" fill="#1e40af" font-weight="bold" text-anchor="middle">上底 ${this.u}m</text>
          <text x="${ptSquareTopRight.x + 8}" y="${(ptSquareTopRight.y + ptBottomRight.y)/2}" font-family="Outfit" font-size="12" fill="#b91c1c" font-weight="bold">高</text>
          <text x="${(ptBottomLeft.x + ptBottomRight.x)/2}" y="${ptBottomLeft.y + 16}" font-family="Outfit" font-size="12" fill="#1e40af" font-weight="bold" text-anchor="middle">下底</text>
          <text x="${(ptTopRight.x + ptBottomRight.x)/2 + 10}" y="${(ptTopRight.y + ptBottomRight.y)/2 - 4}" font-family="Outfit" font-size="12" fill="#1e40af" font-weight="bold" text-anchor="middle">斜边 ${this.s}m</text>
          <text x="${(ptTopRight.x + ptSquareTopRight.x)/2}" y="${ptTopRight.y - 6}" font-family="Outfit" font-size="12" fill="#b91c1c" font-weight="bold" text-anchor="middle">延长 ${this.d}m</text>
        </svg>
      `;

      container.innerHTML = `
        <div class="question-text">
          小区里有一块直角梯形的绿化地，上底长 <strong>${this.u}</strong> 米，其中一条斜着的边（斜边）长 <strong>${this.s}</strong> 米。
          如果把这块地的上底延长 <strong>${this.d}</strong> 米，它就正好变成一个正方形（如右图所示）。
          请你算一算，这块梯形绿化地的<strong>周长是多少米</strong>？
        </div>
        <div class="q8-diagram-box">
          ${svgHtml}
        </div>
        <div class="question-input-group" style="margin-top: 20px;">
          <div class="input-row">
            梯形绿化地的周长是 
            <input type="number" id="q8-perimeter" class="inline-input" placeholder="输入周长"> 米。
          </div>
        </div>
      `;
    },
    validate() {
      const pEl = document.getElementById('q8-perimeter');
      const ans = parseInt(pEl.value);

      if (ans === this.correctPerimeter) {
        pEl.classList.remove('is-invalid');
        pEl.classList.add('is-valid');
        return true;
      } else {
        pEl.classList.remove('is-valid');
        pEl.classList.add('is-invalid');
        return false;
      }
    },
    getExplanation() {
      return `
        1. <strong>理清变化</strong>：
           “上底延长 <strong>${this.d} 米</strong>后，正好变成一个正方形”。
           这说明正方形的边长即为梯形的下底，即：<br>
           $$\\text{下底} = \\text{上底} + \\text{延长长度} = ${this.u} + ${this.d} = <strong>${this.lowerBase} 米</strong>$$<br>
        2. <strong>获取直角高</strong>：
           因为延长后变成的是正方形，正方形的四条边都相等，即四边都是 ${this.lowerBase} 米。
           这也意味着直角梯形的高（即垂直的左侧腰）同样等于正方形的边长，也就是 <strong>${this.h} 米</strong>。<br>
        3. <strong>计算梯形周长</strong>：
           直角梯形由四条边组成：
           * 上底：$${this.u}$ 米
           * 下底：$${this.lowerBase}$ 米
           * 直角腰（高）：$${this.h}$ 米
           * 斜边：$${this.s}$ 米
           $$\\text{周长} = \\text{上底} + \\text{下底} + \\text{直角高} + \\text{斜边} = ${this.u} + ${this.lowerBase} + ${this.h} + ${this.s} = <strong>${this.correctPerimeter} 米</strong>$$
      `;
    }
  };

  if (!window.questionModules) window.questionModules = [];
  window.questionModules.push(question);
})();
