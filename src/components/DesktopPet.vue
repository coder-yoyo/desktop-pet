<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePetStore } from '../stores/pet'

const pet = usePetStore()
const { petStyle, leftArmAngle, rightArmAngle, pawOffset, companionText, mode, energy, focusedKeys, keyboardPulse } =
  storeToRefs(pet)

const badgeClass = computed(() => `mode-${mode.value}`)
const dragStartOffset = ref({ x: 0, y: 0 })
const dragging = ref(false)

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

function startDrag(event: PointerEvent) {
  dragging.value = true
  dragStartOffset.value = {
    x: event.clientX - pet.x,
    y: event.clientY - pet.y
  }
  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', stopDrag)
}

function onDrag(event: PointerEvent) {
  if (!dragging.value) return
  pet.setPetPosition(event.clientX - dragStartOffset.value.x, event.clientY - dragStartOffset.value.y)
}

function stopDrag() {
  dragging.value = false
  window.removeEventListener('pointermove', onDrag)
  window.removeEventListener('pointerup', stopDrag)
}
</script>

<template>
  <div class="pet-wrapper" :style="petStyle" aria-live="polite">
    <button class="drag-handle" type="button" @pointerdown.prevent="startDrag">
      拖动我到桌面任意位置
    </button>

    <div class="pet-character" :class="mode">
      <div class="pet-head">
        <div class="ear ear-left" />
        <div class="ear ear-right" />
        <div class="eyes">
          <span class="eye" />
          <span class="eye" />
        </div>
        <div class="mouth" />
      </div>

      <div class="pet-body">
        <div class="arm left" :style="{ '--arm-angle': leftArmAngle, '--paw-offset': pawOffset }" />
        <div class="arm right" :style="{ '--arm-angle': rightArmAngle, '--paw-offset': pawOffset }" />
      </div>
    </div>

    <div class="virtual-keyboard" :class="{ pulse: keyboardPulse }">
      <div v-for="(row, rowIndex) in keyboardRows" :key="rowIndex" class="key-row">
        <span
          v-for="key in row"
          :key="key"
          class="key"
          :class="{ active: focusedKeys.includes(key) }"
        >
          {{ key }}
        </span>
      </div>
      <div class="space-key" :class="{ active: mode === 'typing' }">Space</div>
    </div>

    <div class="pet-bubble">
      <p>{{ companionText }}</p>
      <div class="meta-row">
        <span class="mode-badge" :class="badgeClass">{{ mode }}</span>
        <span class="energy">活力 {{ Math.round(energy) }}%</span>
      </div>
    </div>
  </div>
</template>
