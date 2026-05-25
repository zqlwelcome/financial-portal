# Umami 部署指南

## 方式一：Railway 一键部署（推荐，免费）

1. 打开这个链接：
   https://railway.app/template/5p0ad4

2. 点击 "Deploy Now"
3. 用 GitHub 账号登录 Railway
4. 等待 2-3 分钟部署完成
5. 部署成功后 Railway 会给你一个 URL（如 umami-production-xxx.up.railway.app）
6. 访问这个 URL，默认账号: admin，密码: umami
7. 进去后拿到跟踪代码，我帮你加到网站

## 方式二：Vercel + Supabase 部署

1. 注册 Supabase (supabase.com) — 免费 Postgres 数据库
2. 注册 Vercel (vercel.com) — 免费部署
3. Fork umami 项目: https://github.com/umami-software/umami
4. 在 Vercel 中导入，连接 Supabase 数据库
5. 部署完成

## 方式三：umami.cloud 付费版

https://umami.is/pricing
免费版有 100k 事件/月，够你用了。注册即用最简单。
