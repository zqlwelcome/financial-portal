# 📚 我的学习门户

个人学习网站门户，包含两大核心模块。

## 🌟 功能特性

### 📰 新闻投资推送
- 每日财经简报展示
- 新闻分类管理（市场动态/政策解读/公司财报/国际财经）
- 三视角分析（邓普顿/巴菲特/芒格）
- 日期导航浏览
- 本地存储持久化

### 🤖 AI产品经理打卡
- 每日知识点推送
- 打卡签到系统
- 连续打卡统计
- 本月学习进度
- 知识库浏览

### 🎨 界面特性
- ✅ 移动端优先响应式设计
- ✅ 深色/浅色模式切换
- ✅ 流畅的动画效果
- ✅ 离线可用（PWA就绪）

## 🚀 在线访问

👉 **[点击访问](https://zqlwelcome.github.io/financial-portal/)**

## 📱 本地运行

```bash
# 克隆仓库
git clone https://github.com/zqlwelcome/financial-portal.git

# 进入目录
cd financial-portal

# 启动本地服务器 (Python)
python -m http.server 8000

# 或者使用 Node.js
npx serve .
```

然后在手机浏览器访问 `http://你的电脑IP:8000`

## 📂 项目结构

```
financial-portal/
├── index.html      # 主页面
├── style.css       # 样式文件
├── app.js          # 核心逻辑
└── README.md       # 项目说明
```

## 🔧 自定义配置

### 添加更多知识点

编辑 `app.js` 中的 `AI_PM_KNOWLEDGE` 数组：

```javascript
const AI_PM_KNOWLEDGE = [
    {
        id: 6,
        title: "新知识点标题",
        content: `<p>知识点内容...</p>`,
        category: "分类"
    },
    // ...
];
```

### 修改主题色

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --primary: #6366f1;      /* 主题色 */
    --primary-light: #818cf8; /* 主题色浅色 */
}
```

## 📋 待办事项

- [ ] 接入财经新闻API
- [ ] 实现云端数据同步
- [ ] 添加更多AI产品经理知识模块
- [ ] 支持知识收藏功能
- [ ] 添加学习提醒通知

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发者**: zqlwelcome  
**最后更新**: 2024年
