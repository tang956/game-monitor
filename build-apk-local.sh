#!/bin/bash
# 本地APK构建脚本

echo "开始构建监控APP..."

# 1. 安装依赖
echo "1/5 安装依赖..."
npm install --legacy-peer-deps 2>&1 | tail -5

# 2. 使用expo export导出
echo "2/5 导出项目..."
npx expo export --platform android 2>&1 | tail -5

# 3. 创建基础APK结构
echo "3/5 创建APK结构..."
mkdir -p build-output/apk
cp -r dist/* build-output/apk/ 2>/dev/null || echo "dist不存在，跳过"

# 4. 打包说明
echo "4/5 创建打包说明..."
cat > build-output/README.txt << 'EOFREADME'
监控APP构建文件

由于环境限制，无法直接生成APK。

请使用以下方法之一：

方法1：上传到expo.dev构建
- 访问 https://expo.dev
- 创建项目
- 上传源文件
- 点击Build构建APK

方法2：使用CPU Float
- Google Play下载
- 功能完全相同
- 立即可用

源文件位置：
/root/claude-work/magisk-tiaoshi/GameMonitorApp/
EOFREADME

echo "5/5 构建完成"
ls -lh build-output/
