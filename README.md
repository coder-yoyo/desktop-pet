# Desktop Pet Companion (Vue 3 + TypeScript + Pinia)

一个“电脑桌面宠物陪伴”项目示例：宠物会监听你的键盘、鼠标移动和点击行为，并做出对应动作（敲键盘姿态、跟随鼠标、点击反馈）。

## 功能点

- **键盘监听**：按键时宠物进入 typing 动作，双手会跟着敲击。
- **鼠标监听**：指针移动时宠物会追踪到新位置。
- **点击与拖拽监听**：点击时宠物短暂切换 clicking 状态；按住拖动时变为 dragging。
- **状态管理**：使用 Pinia 管理宠物行为模式、能量值与提示语。

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
