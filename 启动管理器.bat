@echo off
chcp 65001 >nul
title Firefly Content Manager 一键启动器

echo ==========================================
echo   🍀 Firefly Content Manager 一键启动器
echo ==========================================
echo.

REM 检查 Python 是否存在
where python >nul 2>nul
if %errorlevel% equ 0 (
    set PY=python
) else (
    where py >nul 2>nul
    if %errorlevel% equ 0 (
        set PY=py
    ) else (
        echo ❌ 未检测到 Python，请先安装 Python 3.10+
        echo 下载地址: https://www.python.org/downloads/
        pause
        exit /b
    )
)

REM 检查依赖是否已安装
%PY% -c "import gradio, yaml" >nul 2>nul
if %errorlevel% neq 0 (
    echo 🔧 正在安装依赖，请稍候...
    %PY% -m pip install -r requirements.txt
)

REM 启动应用
echo.
echo ✅ 正在启动 Firefly Content Manager...
echo    🖥️  浏览器将自动打开 http://127.0.0.1:7860
echo    ❌ 关闭此窗口即可停止服务
echo.
start http://127.0.0.1:7860
%PY% app.py
pause