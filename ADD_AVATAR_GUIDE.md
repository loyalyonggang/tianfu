# 📸 添加测评师头像指南

## 需要添加的图片

### 图片1：测评师头像
- **文件名**: `consultant-avatar.jpg`
- **位置**: `images/consultant-avatar.jpg`
- **尺寸建议**: 400x400 像素或更大（正方形）
- **格式**: JPG 或 PNG
- **来源**: 使用你提供的图1（真实头像照片）

## 📝 操作步骤

### 方法1：手动添加（推荐）

1. **保存图片**
   - 右键点击图1（真实头像照片）
   - 选择"另存为"
   - 保存到桌面或临时文件夹

2. **重命名图片**
   - 将图片重命名为 `consultant-avatar.jpg`

3. **移动到项目**
   - 打开项目文件夹：`c:\Users\xzgg5577\Documents\WindsurfCode\talent-wealth-assessment\images\`
   - 将 `consultant-avatar.jpg` 复制到这个文件夹

4. **提交到Git**
   ```bash
   git add images/consultant-avatar.jpg
   git commit -m "Add consultant avatar photo"
   git push origin main
   ```

### 方法2：使用命令行

如果你已经保存了图片到某个位置，使用以下命令：

```powershell
# 假设图片在桌面
Copy-Item "$env:USERPROFILE\Desktop\头像.jpg" -Destination "images\consultant-avatar.jpg"

# 或者从下载文件夹
Copy-Item "$env:USERPROFILE\Downloads\头像.jpg" -Destination "images\consultant-avatar.jpg"
```

## ✅ 验证

添加完成后，访问以下页面验证：

1. **报告页面**
   - 访问：`http://localhost:3000/report-generated.html`
   - 或：`https://tianfu.095016.xyz/report-generated.html`
   - 滚动到底部，查看测评师介绍区域
   - 应该能看到真实的头像照片

## 🎨 图片要求

### 推荐规格
- **尺寸**: 400x400 px 或更大
- **比例**: 1:1（正方形）
- **格式**: JPG（推荐）或 PNG
- **大小**: < 500KB
- **质量**: 清晰、专业

### 图片处理建议
如果图片不是正方形，可以：
1. 使用在线工具裁剪：https://www.iloveimg.com/crop-image
2. 使用Photoshop或其他图片编辑软件
3. 保持人物居中，背景简洁

## 📱 显示效果

### 桌面端
- 头像大小：180x180 px
- 圆角：20px
- 位置：测评师介绍卡片左侧

### 移动端
- 头像大小：120-140 px
- 圆角：20px
- 位置：卡片顶部居中

## 🔄 如果图片不显示

### 检查清单
1. ✅ 文件名是否正确：`consultant-avatar.jpg`
2. ✅ 文件位置是否正确：`images/` 文件夹
3. ✅ 文件格式是否支持：JPG 或 PNG
4. ✅ 是否已提交到Git并推送
5. ✅ Vercel是否已重新部署

### 浏览器缓存
如果更新后看不到新图片：
1. 按 `Ctrl + F5` 强制刷新
2. 或清除浏览器缓存
3. 或使用无痕模式访问

## 🎯 当前状态

- ✅ HTML结构已更新
- ✅ CSS样式已添加
- ✅ 微信二维码已添加到首页
- ⏳ 等待添加测评师头像照片

## 📞 需要帮助？

如果遇到问题：
1. 检查文件路径是否正确
2. 确认图片格式是否支持
3. 查看浏览器控制台是否有错误
4. 确认Vercel部署是否成功

---

**完成后，测评师介绍区域将显示专业的真实头像！** 📸
