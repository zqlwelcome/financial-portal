/**
 * 投资人持仓情报 - 渲染逻辑
 * ==================================
 * 依赖: holdings-data.js（数据），以及 page styles
 * 嵌入方式: 在 index.html 中 <script src="holdings-render.js"></script>
 *           排在 app.js 之前（因为 app.js 的 initHoldings() 会调用这里）
 */

// ===== 渲染入口 =====
function renderHoldings() {
  const el = document.getElementById('holdingsContent');
  if (!el) return;

  // 使用 slide-selector 风格做投资人切换
  el.innerHTML = `
    <div class="hl-brief">
      <div class="hl-brief-kicker">看大佬，不抄作业</div>
      <div class="hl-brief-title">这里适合观察“聪明钱的偏好”，不是跟单按钮</div>
      <div class="hl-brief-copy">先看他们加了什么、减了什么，再问一句：这是长期判断，还是短期调仓？</div>
    </div>
    <div class="hl-selector">
      ${[['巴菲特','🤑','buffett'],['段永平','🧑‍💼','duan'],['木头姐','🦊','cathie'],['特朗普','🇺🇸','trump']].map(([name, icon, id], i) => {
        return `<button class="hl-opt ${i === 0 ? 'active' : ''}" data-hl="${id}" onclick="switchInvestor('${id}')">
          <span class="hl-opt-icon">${icon}</span>
          <span>${name}</span>
          ${INVESTOR_HOLDINGS[id]?.hasNewChanges ? '<span class="hl-dot"></span>' : ''}
        </button>`;
      }).join('')}
    </div>
    <div class="hl-body" id="hlBody"></div>
  `;

  // 默认显示巴菲特
  switchInvestor('buffett');
}

// ===== 切换投资人 =====
function switchInvestor(id) {
  const data = INVESTOR_HOLDINGS[id];
  if (!data) return;

  // 有红点：点进去后消除
  if (data.hasNewChanges) {
    data.hasNewChanges = false;
    // 移除按钮上的红点
    const dot = document.querySelector(`.hl-opt[data-hl="${id}"] .hl-dot`);
    if (dot) dot.remove();
  }

  // 更新按钮状态
  document.querySelectorAll('.hl-opt').forEach(b => b.classList.remove('active'));
  document.querySelector(`.hl-opt[data-hl="${id}"]`)?.classList.add('active');

  const body = document.getElementById('hlBody');
  if (!body) return;

  body.innerHTML = `
    <!-- 投资人头部卡片 -->
    <div class="hl-header" style="background:${data.color}">
      <div class="hl-h-icon">${data.icon}</div>
      <div>
        <div class="hl-h-name">${data.name}</div>
      <div class="hl-h-sub">总仓位 ${data.totalValue} · 先观察，不上头</div>
      </div>
    </div>

    <!-- 重大变动区块 -->
    <div class="hl-section">
      <div class="hl-section-title">本次重大变动</div>
      <div class="hl-changelist">
        ${renderChanges(data.changes)}
      </div>
    </div>

    <!-- 完整持仓列表 -->
    <div class="hl-section">
      <div class="hl-section-title" style="margin-top:4px;">
        完整持仓
        <span class="hl-count">${data.holdings.length} 只</span>
      </div>
      <div class="hl-holdlist" id="hlHoldList">
        ${data.holdings.map((h, i) => renderHoldingItem(h, i)).join('')}
      </div>
      <div class="hl-expand-wrap" id="hlExpandWrap" style="display:none">
        <button class="hl-expand-btn" onclick="toggleFullHoldings('${id}')">
          查看完整列表 <span class="hl-arrow">›</span>
        </button>
      </div>
    </div>
    <!-- 更新时间戳 -->
    <div style="text-align:center;font-size:11px;color:#aeaeb2;padding:12px 0 4px 0;">数据更新于 ${data.updateDate || '待更新'} · 投资有风险，脑子要在线</div>
  `;

  // 如果持仓超过8只，折叠后面的
  const list = document.getElementById('hlHoldList');
  if (list && data.holdings.length > 6) {
    const items = list.querySelectorAll('.hl-hold-item');
    items.forEach((item, i) => {
      if (i >= 6) item.classList.add('hl-folded');
    });
    // 显示展开按钮
    const wrap = document.getElementById('hlExpandWrap');
    if (wrap) {
      wrap.style.display = 'block';
      wrap.dataset.expanded = 'false';
      wrap.dataset.id = id;
    }
  }
}

// ===== 渲染变动列表 =====
function renderChanges(changes) {
  if (!changes || changes.length === 0) return '<div class="hl-empty">这位今天很安静，可能在喝可乐。</div>';

  return changes.map(c => {
    let badge, badgeCls, arrow;
    switch (c.action) {
      case 'add': badge = '↑'; badgeCls = 'badge-add'; arrow = 'green'; break;
      case 'reduce': badge = '↓'; badgeCls = 'badge-reduce'; arrow = 'red'; break;
      case 'new': badge = '🆕'; badgeCls = 'badge-new'; arrow = 'blue'; break;
      case 'exit': badge = '✕'; badgeCls = 'badge-exit'; arrow = 'gray'; break;
      default: badge = '·'; badgeCls = ''; arrow = '';
    }
    const pctText = c.pct ? `<span class="hl-cpct ${c.pct.startsWith('+') ? 'cpct-up' : 'cpct-down'}">${c.pct}</span>` : '';
    return `
      <div class="hl-change-item">
        <span class="hl-cbadge ${badgeCls}">${badge}</span>
        <div class="hl-cinfo">
          <div class="hl-ctop">
            <span class="hl-cticker">${c.ticker}</span>
            ${pctText}
          </div>
          <div class="hl-cname">${c.company}</div>
          <div class="hl-cdetail">${c.detail}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== 渲染单个持仓项 =====
function renderHoldingItem(h, index) {
  const pctChange = h.pctChange;
  let changeHtml = '';
  if (pctChange === null) {
    changeHtml = `<span class="hl-hchange hc-new">新建</span>`;
  } else if (pctChange > 0) {
    changeHtml = `<span class="hl-hchange hc-up">↑${pctChange.toFixed(1)}%</span>`;
  } else {
    changeHtml = `<span class="hl-hchange hc-down">↓${Math.abs(pctChange).toFixed(1)}%</span>`;
  }

  return `
    <div class="hl-hold-item" onclick="toggleHoldDetail(this)">
      <div class="hl-hleft">
        <div class="hl-hrank">${index + 1}</div>
        <div class="hl-hinfo">
          <div class="hl-hticker">${h.ticker} <span class="hl-hcompany">${h.company}</span></div>
          <div class="hl-hmeta">
            <span class="hl-hpct">${h.pct.toFixed(1)}%</span>
            ${changeHtml}
          </div>
        </div>
      </div>
      <div class="hl-hright">
        <span class="hl-hvalue">${h.value}</span>
        <span class="hl-harrow">›</span>
      </div>
      <div class="hl-hdetail">
        ${h.comment ? `<div class="hl-hd-comment">${h.comment}</div>` : ''}
        <div class="hl-hd-data">持仓 ${h.shares} 股 · 市值 ${h.value}</div>
      </div>
    </div>
  `;
}

// ===== 展开/收起持仓详情 =====
function toggleHoldDetail(el) {
  const wasExpanded = el.classList.contains('expanded');
  // 收起其他展开的
  document.querySelectorAll('.hl-hold-item.expanded').forEach(e => e.classList.remove('expanded'));
  if (!wasExpanded) el.classList.add('expanded');
}

// ===== 展开全部持仓 =====
function toggleFullHoldings(id) {
  const data = INVESTOR_HOLDINGS[id];
  if (!data) return;
  const wrap = document.getElementById('hlExpandWrap');
  const expanded = wrap?.dataset.expanded === 'true';
  const list = document.getElementById('hlHoldList');
  if (!list) return;

  const items = list.querySelectorAll('.hl-hold-item');
  if (expanded) {
    // 折叠
    items.forEach((item, i) => {
      if (i >= 6) item.classList.add('hl-folded');
    });
    if (wrap) {
      wrap.dataset.expanded = 'false';
      wrap.querySelector('.hl-expand-btn').innerHTML = '展开完整持仓 <span class="hl-arrow">›</span>';
    }
  } else {
    // 展开
    items.forEach(item => item.classList.remove('hl-folded'));
    if (wrap) {
      wrap.dataset.expanded = 'true';
      wrap.querySelector('.hl-expand-btn').innerHTML = '收起，信息量先到这 <span class="hl-arrow">‹</span>';
    }
  }
}
