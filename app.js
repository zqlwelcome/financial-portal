     1|/**
     2| * 学习门户 - Apple Style
     3| */
     4|
     5|// ===== Config =====
     6|const CONFIG = {
     7|    DATA_URL: 'data/briefings/',  // GitHub Pages 路径
     8|    TYPES: ['morning', 'noon', 'evening', 'night'],
     9|    TYPE_LABELS: {
    10|        morning: '🌅 早间',
    11|        noon: '☀️ 午间',
    12|        evening: '🌆 晚间',
    13|        night: '🌙 深夜'
    14|    }
    15|};
    16|
    17|// ===== Storage =====
    18|const STORAGE = {
    19|    CHECKIN: 'portal_checkin',
    20|    CACHE: 'portal_briefings_cache'
    21|};
    22|
    23|// ===== AI PM Knowledge Base =====
    24|const KNOWLEDGE = [
    25|    {
    26|        title: "AI产品经理核心能力模型",
    27|        content: `
    28|            <p><strong>四大核心能力：</strong></p>
    29|            <ul>
    30|                <li>🎯 <strong>技术理解力</strong> — 理解ML/DL基础原理，能与工程师有效沟通</li>
    31|                <li>📊 <strong>数据思维</strong> — 数据驱动决策，理解数据质量对模型的影响</li>
    32|                <li>💡 <strong>产品设计力</strong> — 将AI能力转化为用户价值，设计人机协作流程</li>
    33|                <li>🤝 <strong>跨团队协作</strong> — 协调算法、工程、业务团队高效运转</li>
    34|            </ul>
    35|        `
    36|    },
    37|    {
    38|        title: "AI产品需求文档(PRD)要点",
    39|        content: `
    40|            <p><strong>AI产品PRD特殊之处：</strong></p>
    41|            <ul>
    42|                <li>📝 <strong>数据需求</strong> — 明确训练数据来源、标注规范、数据量要求</li>
    43|                <li>📈 <strong>效果指标</strong> — 定义模型评估指标（准确率、召回率、F1等）</li>
    44|                <li>⚡ <strong>性能要求</strong> — 响应时间、并发量、资源限制</li>
    45|                <li>🔄 <strong>迭代策略</strong> — 模型冷启动方案、AB测试计划</li>
    46|            </ul>
    47|        `
    48|    },
    49|    {
    50|        title: "机器学习项目全流程",
    51|        content: `
    52|            <p><strong>AI产品经理需了解的流程：</strong></p>
    53|            <ol>
    54|                <li>📋 <strong>问题定义</strong> — 这个问题适合用ML解决吗？</li>
    55|                <li>📊 <strong>数据准备</strong> — 数据采集、清洗、标注、划分</li>
    56|                <li>🧠 <strong>模型开发</strong> — 特征工程、模型选择、训练调参</li>
    57|                <li>✅ <strong>模型评估</strong> — 离线评估、在线AB测试</li>
    58|                <li>🚀 <strong>部署上线</strong> — 模型服务化、监控告警</li>
    59|            </ol>
    60|        `
    61|    },
    62|    {
    63|        title: "大模型产品设计原则",
    64|        content: `
    65|            <p><strong>LLM时代的产品思维：</strong></p>
    66|            <ul>
    67|                <li>🎯 <strong>Prompt Engineering</strong> — 设计优质的提示词模板</li>
    68|                <li>🛡️ <strong>安全边界</strong> — 内容过滤、幻觉检测、用户引导</li>
    69|                <li>💰 <strong>成本控制</strong> — Token优化、模型分级、缓存策略</li>
    70|                <li>📊 <strong>效果评估</strong> — 人工评估 + 自动评估结合</li>
    71|            </ul>
    72|        `
    73|    },
    74|    {
    75|        title: "AI产品指标体系搭建",
    76|        content: `
    77|            <p><strong>三层指标体系：</strong></p>
    78|            <ul>
    79|                <li>📊 <strong>业务指标</strong> — DAU、留存率、转化率、GMV</li>
    80|                <li>🤖 <strong>模型指标</strong> — 准确率、响应时间、调用量</li>
    81|                <li>💡 <strong>体验指标</strong> — 用户满意度、NPS、投诉率</li>
    82|            </ul>
    83|        `
    84|    }
    85|];
    86|
    87|// ===== State =====
    88|let checkedDays = JSON.parse(localStorage.getItem(STORAGE.CHECKIN) || '[]');
    89|let briefingsCache = JSON.parse(localStorage.getItem(STORAGE.CACHE) || '{}');
    90|let allBriefings = [];
    91|let selectedDate = null;
    92|let selectedInvestor = 'all';
    93|
    94|// ===== Init =====
    95|document.addEventListener('DOMContentLoaded', () => {
    96|    initScrollEffects();
    97|    initDatePicker();
    98|    initInvestorFilter();
    99|    loadBriefings();
   100|    renderDailyCard();
   101|    renderProgress();
   102|    initCheckin();
   103|    initModal();
   104|    updateStats();
   105|});
   106|
   107|// ===== Scroll Effects =====
   108|function initScrollEffects() {
   109|    const nav = document.querySelector('.nav');
   110|    window.addEventListener('scroll', () => {
   111|        nav.style.background = window.scrollY > 50 
   112|            ? 'rgba(251, 251, 253, 0.9)' 
   113|            : 'rgba(251, 251, 253, 0.72)';
   114|    });
   115|
   116|    document.querySelectorAll('.nav-link').forEach(link => {
   117|        link.addEventListener('click', (e) => {
   118|            e.preventDefault();
   119|            const target = document.querySelector(link.getAttribute('href'));
   120|            if (target) target.scrollIntoView({ behavior: 'smooth' });
   121|        });
   122|    });
   123|}
   124|
   125|// ===== Investor Filter =====
   126|function initInvestorFilter() {
   127|    document.querySelectorAll('.investor-btn').forEach(btn => {
   128|        btn.addEventListener('click', () => {
   129|            document.querySelectorAll('.investor-btn').forEach(b => b.classList.remove('active'));
   130|            btn.classList.add('active');
   131|            selectedInvestor = btn.dataset.investor;
   132|            
   133|            // 重新渲染当前选中日期的简报
   134|            if (selectedDate) {
   135|                const items = allBriefings.filter(b => b.date === selectedDate);
   136|                renderBriefingDetail(items);
   137|            }
   138|        });
   139|    });
   140|}
   141|
   142|function filterContentByInvestor(content, investor) {
   143|    if (investor === 'all') return content;
   144|    
   145|    const lines = content.split('\n');
   146|    const filtered = [];
   147|    let inTargetSection = false;
   148|    let sectionFound = false;
   149|    
   150|    const investorKeywords = {
   151|        templeton: ['邓普顿', 'templeton'],
   152|        buffett: ['巴菲特', 'buffett'],
   153|        munger: ['芒格', 'munger']
   154|    };
   155|    
   156|    const keywords = investorKeywords[investor] || [];
   157|    
   158|    for (const line of lines) {
   159|        const lowerLine = line.toLowerCase();
   160|        
   161|        // 检查是否是视角部分的标题
   162|        if (lowerLine.includes('三视角') || lowerLine.includes('速评')) {
   163|            filtered.push(line);
   164|            inTargetSection = true;
   165|            continue;
   166|        }
   167|        
   168|        // 在视角部分中
   169|        if (inTargetSection) {
   170|            const isTargetInvestor = keywords.some(kw => lowerLine.includes(kw));
   171|            if (isTargetInvestor) {
   172|                filtered.push(line);
   173|                sectionFound = true;
   174|            }
   175|            // 如果遇到新的部分标题，停止过滤
   176|            if (line.startsWith('⚡') || line.startsWith('🎯') || line.startsWith('📌')) {
   177|                inTargetSection = false;
   178|            }
   179|        } else {
   180|            // 非视角部分，保留标题和其他重要信息
   181|            if (line.startsWith('📊') || line.startsWith('🔥') || line.startsWith('📌') || 
   182|                line.startsWith('💡') || line.startsWith('⚡') || line.startsWith('🎯')) {
   183|                filtered.push(line);
   184|            } else if (!inTargetSection && filtered.length > 0 && keywords.length === 0) {
   185|                filtered.push(line);
   186|            }
   187|        }
   188|    }
   189|    
   190|    // 如果找到了目标投资人内容，返回过滤后的内容
   191|    if (sectionFound) {
   192|        // 添加投资人标签
   193|        const investorLabels = {
   194|            templeton: '🌍 邓普顿视角',
   195|            buffett: '💰 巴菲特视角',
   196|            munger: '🧠 芒格视角'
   197|        };
   198|        return `${investorLabels[investor]}\n\n${filtered.join('\n')}`;
   199|    }
   200|    
   201|    return content;
   202|}
   203|
   204|// ===== Load Briefings =====
   205|async function loadBriefings() {
   206|    allBriefings = [];
   207|    const today = new Date();
   208|    
   209|    // 尝试加载最近30天的简报
   210|    for (let i = 0; i < 30; i++) {
   211|        const date = new Date(today);
   212|        date.setDate(date.getDate() - i);
   213|        const dateStr = formatDateKey(date);
   214|        
   215|        for (const type of CONFIG.TYPES) {
   216|            const filename = `${dateStr}-${type}.json`;
   217|            const url = CONFIG.DATA_URL + filename;
   218|            
   219|            try {
   220|                const response = await fetch(url);
   221|                if (response.ok) {
   222|                    const data = await response.json();
   223|                    allBriefings.push({
   224|                        date: dateStr,
   225|                        type: type,
   226|                        time: data.time || getDefaultTime(type),
   227|                        content: data.content,
   228|                        label: CONFIG.TYPE_LABELS[type]
   229|                    });
   230|                }
   231|            } catch (e) {
   232|                // 文件不存在，跳过
   233|            }
   234|        }
   235|    }
   236|    
   237|    // 按日期和时间排序
   238|    allBriefings.sort((a, b) => {
   239|        if (a.date !== b.date) return b.date.localeCompare(a.date);
   240|        return a.time.localeCompare(b.time);
   241|    });
   242|    
   243|    // 缓存到本地
   244|    localStorage.setItem(STORAGE.CACHE, JSON.stringify(allBriefings));
   245|    
   246|    // 渲染日期列表
   247|    renderDateList();
   248|    
   249|    // 默认选中今天
   250|    const todayStr = formatDateKey(today);
   251|    selectDate(todayStr);
   252|}
   253|
   254|function getDefaultTime(type) {
   255|    const times = { morning: '08:00', noon: '12:00', evening: '19:00', night: '00:00' };
   256|    return times[type] || '00:00';
   257|}
   258|
   259|function formatDateKey(date) {
   260|    const year = date.getFullYear();
   261|    const month = String(date.getMonth() + 1).padStart(2, '0');
   262|    const day = String(date.getDate()).padStart(2, '0');
   263|    return `${year}-${month}-${day}`;
   264|}
   265|
   266|// ===== Date List =====
   267|function renderDateList() {
   268|    const container = document.getElementById('newsList');
   269|    
   270|    // 按日期分组
   271|    const grouped = {};
   272|    allBriefings.forEach(b => {
   273|        if (!grouped[b.date]) grouped[b.date] = [];
   274|        grouped[b.date].push(b);
   275|    });
   276|    
   277|    const dates = Object.keys(grouped).sort().reverse();
   278|    
   279|    if (dates.length === 0) {
   280|        container.innerHTML = `
   281|            <div class="empty-state">
   282|                <div class="empty-icon">📰</div>
   283|                <p>暂无简报</p>
   284|                <p class="empty-hint">每日 8:00 / 12:00 / 19:00 / 00:00 自动更新</p>
   285|            </div>
   286|        `;
   287|        return;
   288|    }
   289|    
   290|    container.innerHTML = dates.map(date => {
   291|        const items = grouped[date];
   292|        const displayDate = formatDateDisplay(date);
   293|        const isSelected = date === selectedDate;
   294|        
   295|        return `
   296|            <div class="date-group ${isSelected ? 'selected' : ''}" onclick="selectDate('${date}')">
   297|                <div class="date-header">
   298|                    <span class="date-day">${displayDate}</span>
   299|                    <span class="date-count">${items.length}条简报</span>
   300|                </div>
   301|                <div class="date-types">
   302|                    ${items.map(item => `<span class="type-badge">${item.label}</span>`).join('')}
   303|                </div>
   304|            </div>
   305|        `;
   306|    }).join('');
   307|}
   308|
   309|function formatDateDisplay(dateStr) {
   310|    const date = new Date(dateStr);
   311|    const today = new Date();
   312|    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
   313|    
   314|    if (diff === 0) return '今天';
   315|    if (diff === 1) return '昨天';
   316|    if (diff === 2) return '前天';
   317|    
   318|    return `${date.getMonth() + 1}月${date.getDate()}日`;
   319|}
   320|
   321|// ===== Select Date =====
   322|function selectDate(dateStr) {
   323|    selectedDate = dateStr;
   324|    
   325|    const items = allBriefings.filter(b => b.date === dateStr);
   326|    renderDateList();
   327|    renderBriefingDetail(items);
   328|}
   329|
   330|function renderBriefingDetail(items) {
   331|    const detailContainer = document.getElementById('briefingDetail');
   332|    
   333|    if (!items || items.length === 0) {
   334|        detailContainer.innerHTML = '';
   335|        detailContainer.classList.add('hidden');
   336|        return;
   337|    }
   338|    
   339|    detailContainer.classList.remove('hidden');
   340|    detailContainer.innerHTML = items.map(item => {
   341|        // 根据选中的投资人过滤内容
   342|        const displayContent = filterContentByInvestor(item.content, selectedInvestor);
   343|        
   344|        return `
   345|            <div class="briefing-card">
   346|                <div class="briefing-header">
   347|                    <span class="briefing-type">${item.label}</span>
   348|                    <span class="briefing-time">${item.time}</span>
   349|                </div>
   350|                <div class="briefing-content">${formatContent(displayContent)}</div>
   351|            </div>
   352|        `;
   353|    }).join('');
   354|}
   355|
   356|function formatContent(content) {
   357|    // 简单格式化：将换行转为 <br>，保留 emoji
   358|    return content
   359|        .replace(/\n/g, '<br>')
   360|        .replace(/•/g, '<span class="bullet">•</span>');
   361|}
   362|
   363|// ===== Date Picker =====
   364|function initDatePicker() {
   365|    document.getElementById('prevDay').addEventListener('click', () => {
   366|        const dates = [...new Set(allBriefings.map(b => b.date))].sort();
   367|        const currentIdx = dates.indexOf(selectedDate);
   368|        if (currentIdx < dates.length - 1) {
   369|            selectDate(dates[currentIdx + 1]);
   370|        }
   371|    });
   372|
   373|    document.getElementById('nextDay').addEventListener('click', () => {
   374|        const dates = [...new Set(allBriefings.map(b => b.date))].sort();
   375|        const currentIdx = dates.indexOf(selectedDate);
   376|        if (currentIdx > 0) {
   377|            selectDate(dates[currentIdx - 1]);
   378|        }
   379|    });
   380|}
   381|
   382|// ===== Daily Card =====
   383|function renderDailyCard() {
   384|    const today = new Date();
   385|    const dayIndex = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)) % KNOWLEDGE.length;
   386|    const knowledge = KNOWLEDGE[dayIndex];
   387|    
   388|    document.getElementById('pmTitle').textContent = knowledge.title;
   389|    document.getElementById('pmContent').innerHTML = knowledge.content;
   390|    
   391|    const todayStr = formatDateKey(today);
   392|    if (checkedDays.includes(todayStr)) {
   393|        showCheckedState();
   394|    }
   395|}
   396|
   397|// ===== Checkin =====
   398|function initCheckin() {
   399|    document.getElementById('checkinBtn').addEventListener('click', function() {
   400|        const today = formatDateKey(new Date());
   401|        
   402|        if (!checkedDays.includes(today)) {
   403|            checkedDays.push(today);
   404|            localStorage.setItem(STORAGE.CHECKIN, JSON.stringify(checkedDays));
   405|            
   406|            showCheckedState();
   407|            renderProgress();
   408|            updateStats();
   409|        }
   410|    });
   411|}
   412|
   413|function showCheckedState() {
   414|    document.getElementById('checkinBtn').classList.add('checked');
   415|    document.getElementById('checkinBtn').innerHTML = `
   416|        <span class="btn-content">
   417|            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
   418|                <path d="M20 6L9 17l-5-5"/>
   419|            </svg>
   420|            <span>已完成</span>
   421|        </span>
   422|    `;
   423|    document.getElementById('checkinStatus').classList.remove('hidden');
   424|}
   425|
   426|// ===== Progress =====
   427|function renderProgress() {
   428|    const today = new Date();
   429|    let completed = 0;
   430|    
   431|    for (let i = 1; i <= today.getDate(); i++) {
   432|        const date = new Date(today.getFullYear(), today.getMonth(), i);
   433|        const dateStr = formatDateKey(date);
   434|        if (checkedDays.includes(dateStr)) completed++;
   435|    }
   436|    
   437|    const rate = Math.round((completed / today.getDate()) * 100);
   438|    
   439|    document.getElementById('completedCount').textContent = completed;
   440|    document.getElementById('completionRate').textContent = rate + '%';
   441|    document.getElementById('progressFill').style.width = rate + '%';
   442|}
   443|
   444|// ===== Stats =====
   445|function updateStats() {
   446|    let streak = 0;
   447|    const today = new Date();
   448|    
   449|    for (let i = 0; i < 365; i++) {
   450|        const date = new Date(today);
   451|        date.setDate(date.getDate() - i);
   452|        const dateStr = formatDateKey(date);
   453|        
   454|        if (checkedDays.includes(dateStr)) {
   455|            streak++;
   456|        } else if (i > 0) {
   457|            break;
   458|        }
   459|    }
   460|    
   461|    const totalDays = checkedDays.length > 0 ? 
   462|        Math.floor((today - new Date(checkedDays[0])) / (1000 * 60 * 60 * 24)) + 1 : 0;
   463|    
   464|    document.getElementById('totalDays').textContent = totalDays;
   465|    document.getElementById('totalCheckins').textContent = checkedDays.length;
   466|    document.getElementById('streakDays').textContent = streak;
   467|    document.getElementById('streakCount').textContent = streak;
   468|}
   469|
   470|// ===== Modal =====
   471|function initModal() {
   472|    const modal = document.getElementById('addNewsModal');
   473|    
   474|    document.getElementById('addNews').addEventListener('click', () => {
   475|        modal.classList.remove('hidden');
   476|    });
   477|    
   478|    document.getElementById('modalClose').addEventListener('click', () => {
   479|        modal.classList.add('hidden');
   480|    });
   481|    
   482|    modal.addEventListener('click', (e) => {
   483|        if (e.target === modal) modal.classList.add('hidden');
   484|    });
   485|}
   486|