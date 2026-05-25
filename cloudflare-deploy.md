# Cloudflare Pages 部署指南

## 一、注册 Cloudflare（如未注册）

1. 打开 https://dash.cloudflare.com/sign-up
2. 用邮箱注册
3. 免费版就够用

## 二、连接 GitHub 仓库部署（最简单，推荐）

1. 登录 Cloudflare Dashboard → **Workers & Pages**
2. 点击 **Create application** → **Pages**
3. 点击 **Connect to Git**
4. 授权 GitHub，选择仓库 `zqlwelcome/learning-platform`
5. 构建设置：
   - **Framework preset**: None
   - **Build command**: 留空（纯静态站点）
   - **Build output**: `/`（或留空）
6. 点击 **Save and Deploy**
7. 部署完成后 Cloudflare 会给你一个域名：`https://learning-platform.pages.dev`

## 三、绑定自定义域名（可选）

在 Pages 项目设置中 → **Custom domains** → 输入你的域名

## 四、自动更新

Cloudflare Pages 会自动监听 GitHub 仓库的 main 分支，每次 `gh api` 上传文件后自动触发重新部署，不需要手动重建。

## 五、更新 Cron Job

部署完成后，需要修改 cron job 中重建 GitHub Pages 的命令，改为触发 Cloudflare 部署。但更简单的方式是：
- 保持 GitHub Pages 作为数据源
- Cloudflare Pages 从同一个 GitHub 仓库部署
- 这样一次上传，两个 CDN 同时更新
