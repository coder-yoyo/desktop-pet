<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DesktopPet from './components/DesktopPet.vue'
import { usePetStore } from './stores/pet'

const pet = usePetStore()
const isPointerDown = ref(false)
let keyboardCount = 0
let moveTick = 0

function onKeydown() {
  keyboardCount += 1
  pet.onKeyboardActivity()
  if (keyboardCount % 18 === 0) {
    pet.setMessage('你已经敲了好多下键盘，记得伸个懒腰～')
  }
}

function onMouseDown() {
  isPointerDown.value = true
  pet.onPointerClick()
}

function onMouseUp() {
  isPointerDown.value = false
  pet.setMode('idle')
}

function onPointerMove(e: PointerEvent) {
  moveTick += 1
  if (moveTick % 2 === 0) {
    pet.onPointerMove(e.clientX, e.clientY, isPointerDown.value)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('pointermove', onPointerMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <main class="desktop-canvas">
    <section class="intro-panel">
      <h1>桌面宠物陪伴项目</h1>
      <p>监听键盘、鼠标与拖拽动作，宠物会同步做出跟随和敲击反应。</p>
      <ul>
        <li>键盘输入：宠物双手进入敲击节奏。</li>
        <li>鼠标移动：宠物会追随指针移动。</li>
        <li>按住并拖拽：宠物切换成“拉拽跟随”姿态。</li>
      </ul>
    </section>

    <DesktopPet />
  </main>
</template>
