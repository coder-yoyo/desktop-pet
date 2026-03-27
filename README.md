# Desktop Pet Companion (Vue 3 + TypeScript + Pinia)

一个“电脑桌面宠物陪伴”项目示例：宠物可以固定在桌面的任意位置，不再跟随鼠标本体移动；它的手臂会根据你的鼠标方向和键盘输入做动作，前方还有一个虚拟键盘联动反馈。

## 功能点

- **固定摆放**：拖动宠物顶部按钮，可把宠物放到桌面任意位置。
- **鼠标监听**：鼠标移动时，宠物手臂会朝向鼠标方向偏转。
- **键盘监听**：按键时进入 typing 动作，手臂出现敲击位移。
- **虚拟键盘**：宠物前方显示虚拟键盘，不同状态会有按键高亮与脉冲反馈。
- **状态管理**：使用 Pinia 管理模式、能量值、手臂角度、虚拟键盘反馈等状态。

## 技术栈

- Vue 3 (`<script setup>`)
- TypeScript
- Pinia
- Vite

## 启动方式

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
npm run preview
```

## 后续可扩展方向

1. 接入 Web Speech API 或本地模型，支持语音互动。
2. 增加多宠物皮肤系统（JSON 驱动动作参数）。
3. 通过 Electron/Tauri 打包成真正的桌面悬浮宠物应用。
