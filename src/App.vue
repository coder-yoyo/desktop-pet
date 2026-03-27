<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import DesktopPet from './components/DesktopPet.vue'
import { usePetStore } from './stores/pet'

const pet = usePetStore()
let keyboardCount = 0
let moveTick = 0

function onKeydown() {
  keyboardCount += 1
  pet.onKeyboardActivity()
}

function onMouseDown() {
  pet.onPointerClick()
}

function onPointerMove(e: PointerEvent) {
  moveTick += 1
  if (moveTick % 2 === 0) {
    pet.onPointerMove(e.clientX, e.clientY)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('pointermove', onPointerMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <main class="desktop-canvas">
    <section class="intro-panel">
      <h1>桌面宠物陪伴项目（固定位置版）</h1>
      <p>宠物可固定在桌面任意位置，不跟随鼠标位移，仅手部和前方虚拟键盘响应你的操作。</p>
      <ul>
        <li>拖动“拖动我到桌面任意位置”按钮来安放宠物。</li>
        <li>鼠标移动：宠物双手朝鼠标方向偏转。</li>
        <li>键盘输入：宠物手部敲击，前方虚拟键盘高亮。</li>
      </ul>
    </section>

    <DesktopPet />
  </main>
</template>
