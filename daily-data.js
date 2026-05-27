/**
 * 智囊团页签 - 方案A
 * 仪表盘风格：渐变情绪卡片 + 进度条 + 圆形达人选择器 + 紧凑解读
 */

let _currentExpert = 'templeton';

// ===== 内嵌数据（替代 remote fetch，避免GitHub Pages缓存问题）=====
const _EMBEDDED_DATA = {
    "updateTime": "2026-05-27 14:30",
    "mood": {
        "mood": "震荡偏谨慎",
        "icon": "📉",
        "color": "#ff9500",
        "confidence": 5,
        "dimensions": [
            {"label": "📈 趋势", "value": "纳指+1.19%创新高·标普7519·A股午后翻绿跌超1%"},
            {"label": "💰 资金", "value": "小微盘领跌·茅台逆势涨3%·电力板块异动涨停"},
            {"label": "🌍 地缘", "value": "哈马斯新军事领导人被打死·伊朗大不里士机场恢复·王毅联合国会议"},
            {"label": "🏭 热点", "value": "科创50跌超3%·半导体设备重挫·算力股溃退·超级电容走强"},
            {"label": "😊 情绪", "value": "A股近4400只下跌·港股午后跌1%·韩国股市年内飙升100%"},
            {"label": "🏦 宏观", "value": "小米200亿回购·三星5万亿韩元基金·韩国Kospi从5000到8000"}
        ],
        "summary": "5月27日市场大幅分化：隔夜纳指+1.19%收26656点再创历史新高，标普500涨0.61%收7519点，但A股完全没跟——午后三大指数集体翻绿，沪指跌1.48%收4083点，深成指、创业板同步下挫，全市场近4400只个股下跌，仅电力、白酒、超级电容等少数板块逆势拉升。科创50暴跌超3%，拓荆科技跌超10%领跌半导体设备全线重挫；算力概念股溃退，浙大网新逼近跌停；白酒板块异动，贵州茅台涨超3%重返1314元，金徽酒、水井坊跟涨；电力板块粤电力A、华能蒙电封板；超级电容概念走强。港股方面，恒生指数午后跌1%收25361点，小米集团绩后跌超2%但官宣200亿港元回购计划，港股大模型概念逆市拉升（智谱涨超8%，MINIMAX涨超9%）。外围方面，韩国Kospi指数今年以来飙升100%，SK海力士和三星电子带动下从5000飙至8000创纪录；台湾加权涨1.7%收44256点。地缘方面，哈马斯新任军事领导人穆罕默德·奥达在以色列空袭中被击毙；伊朗大不里士机场经修复重新开放；王毅在纽约主持联合国安理会会议，密集会见多国外长。产业方面，三星设立5万亿韩元基金投资生态和人才；字节跳动内部传出豆包股认购消息；浙江印发海洋新材料产业方案（2030年产值目标1600亿）。晚间关注：哈马斯新领导人被击毙后中东局势走向、美股开盘反映。"
    },
    "experts": {
        "templeton": {
            "insight": "今天最大的预期差在哪里？第一，所有人都在说『美股创新高A股就该涨』——但A股午后翻绿了，沪指跌1.48%，近4400只个股下跌。这不是偶然的，这是结构性的。美股创新高靠的是AI算力的宏大叙事，但A股的算力概念今天跌得最狠——浙大网新逼近跌停，十余股跌超6%。同样叫『算力』，为什么一个涨一个跌？因为A股算力之前涨的是『美股映射』的情绪溢价，现在溢价退潮了。第二，恒生科技没怎么跌，但港股大模型概念股智谱涨超8%、MINIMAX涨超9%（午后拉升）——这是今天最有意思的信号。如果AI概念在港股的扩散效应真的来了，那恒生科技指数的『AI纳入』故事可能不仅仅是一个噱头。逆向思考：当市场主流预期认为『纳入AI股没用』的时候，可能恰恰是最该关注的时候。第三，哈马斯新任军事领导人被打死了——这是今天最被忽略的地缘事件。美伊谈判刚有缓和迹象，以色列就把哈马斯新领导人定点清除了。从逆向投资的角度看，中东紧张升温对军工、黄金是利好，但市场还没price in。",
            "action": "恒生科技指数不宜追空——今天港股大模型概念逆势拉升（智谱+8%、MINIMAX+9%），这可能是AI纳入行情的先兆。等MiniMax-W和智谱正式纳入公告出来后，观察被动资金是否在生效日前加速布局相关个股而非指数。A股科创50跌超3%是恐慌情绪的释放，但半导体设备（拓荆科技-10%）不要接——等缩量。黄金可持有，哈马斯新领导人被击杀可能推高地缘风险溢价。A股电力板块异动涨停（粤电力A、华能蒙电）值得关注：夏季用电攀升+算电协同政策，电力板块可能成为防御性资金的避风港。今天不看A股大盘整体，看结构——超级电容和电力这两个逆势走强的板块，可能藏着主线。"
        },
        "buffett": {
            "insight": "今天A股跌了近4400只，但贵州茅台涨了超3%到1314元。很多人觉得大盘跌了就该恐慌，但真正的好公司在大跌中反而被资金惦记着。茅台的分红率在提高，ROE依然超过30%，品牌护城河没有被AI时代削弱——反而当大家觉得『白酒不行了』的时候，资金回流的逻辑最扎实。另外，今天有件事值得关注：小米集团跌超2%但立刻宣布200亿港元回购计划。管理层敢在市场下跌时拿出200亿来回购，说明什么？说明他们觉得自己的股票被低估了。我不做小米（看不懂手机+汽车+AI三线作战的资本回报率），但回购本身传递的信号是清晰的——内部人认为公司价值远高于当前股价。还有一个被忽略的信号：三星设立了5万亿韩元的基金投资未来人才和生态。三星的半导体周期判断一向比市场准，敢于在行业低谷期砸钱培养人才，说明他们对存储和AI芯片的中长期前景极其乐观。我持有的苹果继续受益于纳指创新高的大环境，标普500到7519点安全垫在变薄，但好公司不需要择时。",
            "action": "维持腾讯持仓不动。今天港股大模型概念拉升（智谱+8%、MINIMAX+9%）对腾讯不是直接利好，但腾讯在AI领域的布局（混元大模型）属于『慢但稳』的类型，不需要追逐短期热点。茅台涨超3%至1314元——如果A股继续回调，茅台回到1200附近可以分批建仓，ROE和自由现金流是A股中最优秀的之一。标普7500点以上现金仓位保持50%不变。美股继续看好苹果，但PE约30倍不算便宜，不追高。电力板块今天集体涨停，从价值投资的角度我不追——但电力公用事业的现金流确实稳定，如果回调到合理估值，长江电力、华能水电这类高分红标的可以纳入收息组合。浙江海洋新材料方案（2030年1600亿目标）听起来远，但赛道方向明确——我不买主题，等龙头公司跑出来再看不晚。"
        },
        "munger": {
            "insight": "三层思维。第一层→隔夜纳指+1.19%创新高、标普7519，看起来一片欣欣向荣。第二层→今天A股全线溃退，沪指跌1.48%收4083，科创50跌超3%，算力概念股十几只跌超6%，近4400只个股下跌。中美股市严重背离。第三层→这里面的认知偏误值得拆解。偏误一：『纳指创新高，A股跟不跟？』——这是可得性启发（availability heuristic）。媒体铺天盖地讲美股涨，你会觉得『全世界都在涨』，但实际上A股在跌、港股在跌、恒生午盘跌1%。你所见的『涨』只是你最容易看到的部分。偏误二：『韩国股市年内涨了100%，从5000到8000，我们是不是落后了？』——这是社会比较偏误（social comparison bias）。韩国股市的暴涨是因为SK海力士和三星这两只巨头的AI芯片出口驱动，中国股市的结构完全不同，不能直接对比。偏误三：『科创50跌超3%了，该抄底了吧？』——如果你在跌了3%时买入，跌到6%时做了什么？这是损失厌恶（loss aversion）在作祟。半导体设备的调整逻辑很清晰：之前涨是因为『美光映射』的情绪炒作，现在美光+19%的盈利公告已经发布，情绪溢价消散，跌是必然的。除非你能判断拓荆科技的内在价值在哪，否则不要因为『跌多了』就买。好消息是，白酒和电力今天逆势走强，说明市场不是无差别的恐慌——资金正在从高估值成长股流向低估值消费和公用事业。",
            "action": "今天不操作。如果你一定要做点啥，检查一下持仓中有没有『美股创新高所以A股没问题』的思维惯性——这是错的。科创50和半导体设备今天暴跌（拓荆-10%），但别抄底，因为你看到的是3%的跌幅，但行业整体估值还在高位，调整空间可能更大。如果你想配置防御性资产，电力板块今天的涨停不是追的时机——等回调，华能水电、长江电力这类现金流稳定的公用事业公司，在SHIBOR利率下行的环境下，股息率优势会逐步凸显。今天最值得思考的问题是：韩国股市涨了100%，Kospi从5000到8000，这背后是AI芯片出口驱动。中国有没有类似的『国家驱动力』赛道？如果有，锁定它，等市场恐慌时再布局——现在还不是时候。晚间关注哈马斯新领导人被击毙后的中东局势——黄金和原油今晚可能异动。"
        },
        "duan": {
            "insight": "今天盘面挺有意思的。纳指涨了，A股跌了，科创50跌超3%，算力股全线溃退。我不看大盘做决定，我看公司。第一，小米今天跌超2%但官宣200亿回购。这个我看得懂——小米去年底有账上现金约1000亿，拿出200亿回购，相当于20%的现金储备。管理层觉得股价低估了才敢这么干。之前小米MiMo大模型永久降价的时候我就说过，这个公司做事的节奏我喜欢——先规模、再效率、再抢份额。现在跌了宣布回购，说明他们相信自己值更多。我不会在50港元以上买小米，但如果跌到40港元以下，我会认真考虑。第二，茅台涨了3%——这个我看不懂。茅台是好生意，毛利率93%，品牌力无与伦比，但1330块的茅台PE大概25倍，不算特别便宜。如果跌到1000以下我会买，现在不动。第三，今天最值得关注的是韩国股市年内涨了100%。SK海力士和三星电子涨疯了。三星设立5万亿韩元基金投未来人才，这个格局是长期主义的——跟我当年看小米投研发的节奏相似。我持有苹果，苹果虽然也在用三星和海力士的存储芯片，但苹果的利润率是硬件公司里最高的。纳指创新高对苹果是好事，但价格不便宜，继续等。第四，电力板块集体涨停——粤电力A、华能蒙电封板。我看不懂电力股，不碰。腾讯跌了1%左右，继续拿着，没变。",
            "action": "腾讯继续持有。今天跌1%左右，没什么好慌的。港股大模型概念智谱涨超8%、MINIMAX涨超9%，腾讯也有混元大模型，但腾讯不需要蹭AI热点来证明自己——微信生态、游戏、金融科技是基本盘。200亿小米回购计划——如果小米股价跌到40港元以下，我会考虑。苹果继续等回调——纳指创新高是长期利好，但短期价格不算便宜。今天有个值得关注的数据：韩国股市从5000到8000涨了100%，韩国的产业驱动力是存储芯片+AI出口。中国的产业驱动力是什么？浙江印发了海洋新材料方案到2030年1600亿，新能源、国产替代——这些赛道里一定有未来五年的Tenbagger，但现在不急着买，等到市场恐慌的时候再出手。现金仓位保持40%，不急。哈马斯新领导人被击毙——短期可能推高油价，但我不会因为这个就买石油股，看不懂的不碰。"
        }
    }
};

function renderSummaryContent() {
    const el = document.getElementById('summaryContent');
    if (!el) return;
    _currentExpert = 'templeton';
    // 直接使用内嵌数据
    const moodData = _EMBEDDED_DATA.mood;
    const expertsData = _EMBEDDED_DATA.experts;
    window._expertsData = expertsData;
    
    const conf = Math.min(10, Math.max(0, moodData.confidence || 5));
    const bars = Array.from({length: 10}, (_, i) => `<span class="a-bar${i < conf ? ' fill' : ''}"></span>`).join('');
    const dims = (moodData.dimensions || []).slice(0, 6);
    const chipHtml = dims.map(d => {
        // 兼容新旧格式
        if (d.label) return `<span class="a-chip"><span class="a-chip-label">${d.label}</span> ${d.value}</span>`;
        return `<span class="a-chip">${d.value}</span>`;
    }).join('');
    
    const meta = {
        templeton: { name: '邓普顿', icon: '🌍', color: '#5856d6' },
        buffett:   { name: '巴菲特', icon: '💰', color: '#ff9500' },
        munger:    { name: '芒格',   icon: '🧠', color: '#34c759' },
        duan:      { name: '段永平', icon: '🧑‍💼', color: '#0071e3' }
    };
    
    // 情绪卡片（可折叠）
    const moodHtml = `
        <div class="a-mood" id="aMood">
            <div class="a-top" onclick="toggleMoodDetail()" style="cursor:pointer;">
                <div>
                    <div class="a-label">市场情绪</div>
                    <div class="a-mood-status">
                        <span>${moodData.icon}</span>
                        <span>${moodData.mood}</span>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <div class="a-score">${conf}<small>/10</small></div>
                    <span class="a-mood-arrow" id="moodArrow">›</span>
                </div>
            </div>
            <div class="a-mood-detail" id="moodDetail" style="display:none;">
                <div class="a-bars">${bars}</div>
                <div class="a-chips">${chipHtml || '<span class="a-chip">暂无数据</span>'}</div>
            </div>
        </div>
    `;
    
    // 达人按钮（可折叠）
    const btnsHtml = Object.keys(meta).map(k => {
        const m = meta[k];
        const active = k === _currentExpert ? ' active' : '';
        return `
            <button class="a-btn${active}" onclick="switchExpert('${k}')" style="${active ? 'background:'+m.color+';color:#fff' : ''}">
                <span class="a-btn-icon" style="${active ? 'background:rgba(255,255,255,0.2)' : 'background:'+m.color+'20'}">${m.icon}</span>
                <span class="a-btn-name" style="${active ? 'color:#fff' : ''}">${m.name}</span>
            </button>
        `;
    }).join('');
    
    el.innerHTML = moodHtml + `
        <div class="a-braintrust">
            <div class="a-braintrust-header" onclick="toggleBrainTrust()">
                <span class="a-section">🧠 智囊团</span>
                <span class="a-braintrust-arrow" id="brainTrustArrow">›</span>
            </div>
            <div class="a-braintrust-content" id="brainTrustContent">
                <div class="a-btns">${btnsHtml}</div>
                <div id="expertContent"></div>
            </div>
        </div>
        
        <!-- 市场日历 -->
        <div class="a-calendar">
            <div class="a-calendar-header" onclick="toggleCalendar()">
                <span class="a-section">📅 市场日历</span>
                <span class="a-calendar-arrow" id="calendarArrow">›</span>
            </div>
            <div class="a-calendar-content" id="calendarContent">
                <div class="a-calendar-list">
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/28</span>
                        <span class="a-calendar-event">美联储会议纪要公布</span>
                        <span class="a-calendar-impact high">高</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/29</span>
                        <span class="a-calendar-event">美国Q1 GDP修正值</span>
                        <span class="a-calendar-impact high">高</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/30</span>
                        <span class="a-calendar-event">中国5月PMI数据</span>
                        <span class="a-calendar-impact high">高</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">05/31</span>
                        <span class="a-calendar-event">英伟达财报发布</span>
                        <span class="a-calendar-impact medium">中</span>
                    </div>
                    <div class="a-calendar-item">
                        <span class="a-calendar-date">06/01</span>
                        <span class="a-calendar-event">美国非农就业数据</span>
                        <span class="a-calendar-impact high">高</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 资金流向 -->
        <div class="a-flow">
            <div class="a-flow-header" onclick="toggleFlow()">
                <span class="a-section">💰 资金流向</span>
                <span class="a-flow-arrow" id="flowArrow">›</span>
            </div>
            <div class="a-flow-content" id="flowContent">
                <div class="a-flow-list">
                    <div class="a-flow-item">
                        <span class="a-flow-name">北向资金</span>
                        <span class="a-flow-value out">-52.3亿</span>
                        <span class="a-flow-bar"><span style="width:30%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">主力资金</span>
                        <span class="a-flow-value out">-128.6亿</span>
                        <span class="a-flow-bar"><span style="width:20%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">融资余额</span>
                        <span class="a-flow-value in">+15.2亿</span>
                        <span class="a-flow-bar"><span style="width:65%"></span></span>
                    </div>
                    <div class="a-flow-item">
                        <span class="a-flow-name">ETF净申购</span>
                        <span class="a-flow-value in">+42.8亿</span>
                        <span class="a-flow-bar"><span style="width:75%"></span></span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 板块轮动 -->
        <div class="a-sector">
            <div class="a-sector-header" onclick="toggleSector()">
                <span class="a-section">📈 板块轮动</span>
                <span class="a-sector-arrow" id="sectorArrow">›</span>
            </div>
            <div class="a-sector-content" id="sectorContent">
                <div class="a-sector-list">
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">1</span>
                        <span class="a-sector-name">电力板块</span>
                        <span class="a-sector-change">+3.2%</span>
                    </div>
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">2</span>
                        <span class="a-sector-name">白酒板块</span>
                        <span class="a-sector-change">+2.8%</span>
                    </div>
                    <div class="a-sector-item up">
                        <span class="a-sector-rank">3</span>
                        <span class="a-sector-name">超级电容</span>
                        <span class="a-sector-change">+2.1%</span>
                    </div>
                    <div class="a-sector-item down">
                        <span class="a-sector-rank">4</span>
                        <span class="a-sector-name">半导体设备</span>
                        <span class="a-sector-change">-4.5%</span>
                    </div>
                    <div class="a-sector-item down">
                        <span class="a-sector-rank">5</span>
                        <span class="a-sector-name">算力概念</span>
                        <span class="a-sector-change">-3.8%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 渲染当前达人内容
    renderExpertContent();
}

function switchExpert(key) {
    _currentExpert = key;
    // 更新按钮高亮状态
    document.querySelectorAll('.a-btn').forEach((btn, i) => {
        const keys = ['templeton', 'buffett', 'munger', 'duan'];
        const k = keys[i];
        const meta = { templeton: {color:'#5856d6'}, buffett: {color:'#ff9500'}, munger: {color:'#34c759'}, duan: {color:'#0071e3'} };
        const m = meta[k];
        const active = k === key;
        btn.className = 'a-btn' + (active ? ' active' : '');
        btn.style.background = active ? m.color : '';
        btn.style.color = active ? '#fff' : '';
        const icon = btn.querySelector('.a-btn-icon');
        if (icon) icon.style.background = active ? 'rgba(255,255,255,0.2)' : m.color + '20';
        const name = btn.querySelector('.a-btn-name');
        if (name) name.style.color = active ? '#fff' : '';
    });
    // 只更新内容区
    renderExpertContent();
}

function renderExpertContent() {
    const el = document.getElementById('expertContent');
    if (!el) return;
    
    const meta = {
        templeton: { name: '邓普顿', icon: '🌍', color: '#5856d6' },
        buffett:   { name: '巴菲特', icon: '💰', color: '#ff9500' },
        munger:    { name: '芒格',   icon: '🧠', color: '#34c759' },
        duan:      { name: '段永平', icon: '🧑‍💼', color: '#0071e3' }
    };
    const m = meta[_currentExpert];
    const expertsData = window._expertsData || {};
    const ex = expertsData[_currentExpert];
    
    if (ex && ex.insight) {
        el.innerHTML = `
            <div class="a-banner">
                <span class="a-bi">${m.icon}</span>
                <div class="a-bn">${m.name} · 解读</div>
            </div>
            <div class="a-card" style="border-left-color:${m.color}">
                <div class="a-card-body">${ex.insight.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="a-card a-action" style="border-left-color:${m.color}">
                <div class="a-card-body" style="font-weight:500;color:#664d03;">⚡ ${ex.action || '等待数据更新...'}</div>
            </div>
            <div class="a-feedback">
                <span class="a-fb-label">这个判断</span>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','like')">👍 有用</button>
                <button class="a-fb-btn" onclick="fbFeedback('${_currentExpert}','unlike')">👎 不准</button>
            </div>
        `;
    } else {
        el.innerHTML = '<div style="text-align:center;padding:24px 0;color:var(--text2);">等待数据更新...</div>';
    }
}

// ===== 用户反馈 =====
function fbFeedback(expert, type) {
    const key = 'fb_' + expert + '_' + type;
    const count = parseInt(localStorage.getItem(key) || '0') + 1;
    localStorage.setItem(key, count.toString());
    const btns = document.querySelectorAll('.a-fb-btn');
    btns.forEach(b => { b.disabled = true; b.style.opacity = '0.5'; });
    const label = document.querySelector('.a-fb-label');
    if (label) label.textContent = type === 'like' ? '✅ 已记录' : '📝 已记录';
    setTimeout(() => {
        btns.forEach(b => { b.disabled = false; b.style.opacity = '1'; });
        if (label) label.textContent = '这个判断';
    }, 2000);
}

// ===== 工具函数 =====
async function loadBriefingData() {
    try {
        const [n, a] = await Promise.all([xhrFetch('data/hot-news.json'), xhrFetch('data/alerts.json')]);
        return { hotNews: n?.news || [], alerts: a || null };
    } catch(e) { return { hotNews: [], alerts: null }; }
}

function xhrFetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?_=' + Date.now() + Math.random(), true);
        xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        xhr.timeout = 8000;
        xhr.onload = () => { if (xhr.status === 200) { try { resolve(JSON.parse(xhr.responseText)); } catch(e) { reject(e); } } else reject(); };
        xhr.onerror = () => reject();
        xhr.ontimeout = () => reject();
        xhr.send();
    });
}

function assessMood(hotNews) {
    if (!hotNews || hotNews.length === 0) return { mood: '待更新', icon: '⏳', color: '#0071e3', confidence: 5, dimensions: [] };
    const text = hotNews.map(n => n.title + (n.summary || '')).join('');
    const b = (text.match(/涨|升|新高|反弹|突破|利好/g) || []).length;
    const r = (text.match(/跌|降|新低|回落|利空|风险/g) || []).length;
    return {
        mood: b > r + 2 ? '偏乐观' : r > b + 2 ? '偏谨慎' : '震荡中性',
        icon: b > r + 2 ? '📈' : r > b + 2 ? '📉' : '➖',
        color: b > r + 2 ? '#34c759' : r > b + 2 ? '#ff3b30' : '#ff9500',
        confidence: Math.min(10, Math.max(1, 5 + Math.abs(b - r))),
        dimensions: [
            { label: '📈 趋势', value: b > r + 2 ? '温和上涨' : r > b + 2 ? '偏弱' : '震荡' },
            { label: '💰 资金', value: '中性' },
            { label: '🌍 地缘', value: '平稳' },
            { label: '🏭 热点', value: '分散' },
            { label: '😊 情绪', value: Math.abs(b - r) > 3 ? '偏乐观' : '中性' },
            { label: '🏦 宏观', value: '中性' }
        ]
    };
}

function genExperts(hotNews, alerts) {
    if (!hotNews || hotNews.length === 0) return {};
    const t = hotNews.map(h => h.title + (h.summary || '')).join('');
    const hasGeo = /地缘|中东|冲突|战争|协议/.test(t);
    const topTitle = hotNews[0]?.title || '';
    return {
        templeton: { insight: hasGeo ? '中东缓和的本质是风险溢价的释放。逆向视角：当所有人庆祝和平时，关注被错杀的新兴市场资产。' : '当市场没有明确方向时，关注被短期情绪压低估值的优质资产。', action: '关注港股和A股中被低估的消费和科技龙头。' },
        buffett: { insight: '好公司的标准不变：ROE>15%、负债率<50%、现金流>净利润。用这个标准筛选。', action: '关注沪深300和中证500指数基金，每月定投。' },
        munger: { insight: '三层思维：「' + topTitle + '」第一层：今天的新闻改变了什么？第二层：是否过度反应？第三层：最坏情况是什么？', action: '保持60%权益+40%现金/债券的均衡配置。' },
        duan: { insight: '好生意+好管理层+好价格。' + topTitle + '，看得懂的才重仓。', action: '关注苹果、腾讯、拼多多回调后的加仓机会。' }
    };
}

// ===== 折叠/展开市场情绪详情 =====
function toggleMoodDetail() {
    const detail = document.getElementById('moodDetail');
    const arrow = document.getElementById('moodArrow');
    if (!detail || !arrow) return;
    
    const isHidden = detail.style.display === 'none';
    detail.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}

// ===== 折叠/展开智囊团 =====
function toggleBrainTrust() {
    const content = document.getElementById('brainTrustContent');
    const arrow = document.getElementById('brainTrustArrow');
    if (!content || !arrow) return;
    
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}

// ===== 折叠/展开市场日历 =====
function toggleCalendar() {
    const content = document.getElementById('calendarContent');
    const arrow = document.getElementById('calendarArrow');
    if (!content || !arrow) return;
    
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}

// ===== 折叠/展开资金流向 =====
function toggleFlow() {
    const content = document.getElementById('flowContent');
    const arrow = document.getElementById('flowArrow');
    if (!content || !arrow) return;
    
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}

// ===== 折叠/展开板块轮动 =====
function toggleSector() {
    const content = document.getElementById('sectorContent');
    const arrow = document.getElementById('sectorArrow');
    if (!content || !arrow) return;
    
    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    arrow.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
    arrow.style.transition = 'transform 0.2s ease';
}
