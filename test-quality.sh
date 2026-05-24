#!/bin/bash
# 代码质量检查脚本 v2
# 删除了 master-style.css/master-views.js/skill-modules.js/skill-style.css 的检查
# 新增: course-app.js, course-data.js 检查 + learn.html 页面检查
# 修改: 删除了对已删除文件的引用
# 使用方法: bash test-quality.sh

SITE_URL="https://zqlwelcome.github.io/learning-platform"
ERRORS=0

echo "=== 代码质量检查开始 === ($(date '+%H:%M:%S'))"
echo ""

# 1. 检查页面加载
echo "1. 检查页面加载..."
for page in "" "learn.html"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/$page")
    if [ "$status" = "200" ]; then
        echo "   ✅ $page: $status"
    else
        echo "   ❌ $page: $status"
        ERRORS=$((ERRORS + 1))
    fi
done

# 2. 检查JavaScript文件
echo ""
echo "2. 检查JavaScript文件..."
for file in app.js news-loader.js daily-data.js course-app.js course-data.js learn-app.js; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/$file")
    if [ "$status" = "200" ]; then
        if curl -s "$SITE_URL/$file" | node --check - 2>/dev/null; then
            echo "   ✅ $file: 语法正确"
        else
            echo "   ❌ $file: 语法错误"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "   ❌ $file: 无法访问 ($status)"
        ERRORS=$((ERRORS + 1))
    fi
done

# 3. 检查CSS文件
echo ""
echo "3. 检查CSS文件..."
for file in style.css alert-style.css learn-style.css; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/$file")
    if [ "$status" = "200" ]; then
        echo "   ✅ $file: 可访问"
    else
        echo "   ❌ $file: 无法访问 ($status)"
        ERRORS=$((ERRORS + 1))
    fi
done

# 4. 检查数据文件
echo ""
echo "4. 检查数据文件..."
for file in data/hot-news.json data/alerts.json; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/$file")
    if [ "$status" = "200" ]; then
        if curl -s "$SITE_URL/$file" | jq . > /dev/null 2>&1; then
            echo "   ✅ $file: 格式正确"
        else
            echo "   ❌ $file: JSON格式错误"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "   ❌ $file: 无法访问 ($status)"
        ERRORS=$((ERRORS + 1))
    fi
done

# 5. 检查关键函数
echo ""
echo "5. 检查关键函数..."
for func in toggleNews toggleAlert loadHotNews loadAlerts renderSummaryContent initSlideSelector renderCourseList openLesson completeLesson togglePushCard renderExpertView; do
    found=$(curl -s "$SITE_URL/app.js" "$SITE_URL/news-loader.js" "$SITE_URL/daily-data.js" "$SITE_URL/course-app.js" 2>/dev/null | grep -c "function $func")
    if [ "$found" -gt 0 ]; then
        echo "   ✅ $func: 已定义"
    else
        echo "   ❌ $func: 未定义"
        ERRORS=$((ERRORS + 1))
    fi
done

# 6. 检查变量冲突
echo ""
echo "6. 检查变量冲突..."
VARS=$(for file in app.js news-loader.js daily-data.js course-app.js; do
    curl -s "$SITE_URL/$file" 2>/dev/null | grep -E "^let |^const " | awk '{print $2}' | cut -d'=' -f1
done | sort | uniq -d)
if [ -z "$VARS" ]; then
    echo "   ✅ 无变量冲突"
else
    echo "   ❌ 发现重复变量: $VARS"
    ERRORS=$((ERRORS + 1))
fi

# 总结
echo ""
echo "=== 检查完成 ==="
if [ $ERRORS -eq 0 ]; then
    echo "✅ 全部通过，可以交付"
    exit 0
else
    echo "❌ 发现 $ERRORS 个问题，需要修复"
    exit 1
fi
