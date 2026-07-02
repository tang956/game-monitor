#!/bin/bash
set -e

echo "=== 本地构建 Android APK ==="
echo ""

# 设置环境变量
export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin

echo "1. 预构建 - 生成 Android 原生项目"
npx expo prebuild --platform android --clean

echo ""
echo "2. 构建 APK"
cd android
./gradlew assembleRelease

echo ""
echo "3. 查找生成的 APK"
find . -name "*.apk" -type f

echo ""
echo "✓ 构建完成！"
