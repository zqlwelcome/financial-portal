# 删除 GitHub Pages（可选）

如果你只想用 Cloudflare，可以执行这个命令删除 GitHub Pages：

```bash
gh api repos/zqlwelcome/learning-platform/pages -X DELETE
```

删除后，GitHub 仓库仍然是数据源，Cloudflare Pages 会自动从 main 分支部署。

# Cloudflare 自动部署原理

Cloudflare Pages 连接 GitHub 仓库后：
1. 你上传文件到 GitHub → 触发 commit
2. Cloudflare 检测到 main 分支变更 → 自动重新部署
3. 部署完成后 https://learningcenter.pages.dev 立即更新

不需要手动重建，也不需要 gh api pages 命令了。
