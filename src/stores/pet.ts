import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type PetMode = 'idle' | 'typing' | 'mouse'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const usePetStore = defineStore('pet', () => {
  const x = ref(36)
  const y = ref(340)
  const mode = ref<PetMode>('idle')
  const energy = ref(92)
  const message = ref('我固定在这里陪你，手会跟着你的操作动起来。')

  const pointerX = ref(window.innerWidth / 2)
  const pointerY = ref(window.innerHeight / 2)
  const keyboardPulse = ref(false)

  let typingTimer: ReturnType<typeof setTimeout> | null = null
  let pulseTimer: ReturnType<typeof setTimeout> | null = null

  const petStyle = computed(() => ({
    transform: `translate3d(${x.value}px, ${y.value}px, 0)`
  }))

  const pointerInfluence = computed(() => {
    const centerX = x.value + 120
    const centerY = y.value + 86
    const dx = clamp((pointerX.value - centerX) / 160, -1, 1)
    const dy = clamp((pointerY.value - centerY) / 140, -1, 1)
    return { dx, dy }
  })

  const leftArmAngle = computed(() => {
    const { dx, dy } = pointerInfluence.value
    const base = -12 + dx * 20 + dy * 8
    return `${base.toFixed(1)}deg`
  })

  const rightArmAngle = computed(() => {
    const { dx, dy } = pointerInfluence.value
    const base = 12 + dx * 18 - dy * 7
    return `${base.toFixed(1)}deg`
  })

  const pawOffset = computed(() => {
    if (mode.value === 'typing') return '-3px'
    return `${(pointerInfluence.value.dy * 2).toFixed(1)}px`
  })

  const companionText = computed(() => {
    if (mode.value === 'typing') return '键盘在前面，我跟你一起敲～'
    if (mode.value === 'mouse') return '我盯着你的鼠标，手也在调整方向。'
    return message.value
  })

  const focusedKeys = computed(() => {
    if (mode.value === 'typing') return ['Q', 'W', 'E', 'A', 'S', 'D']
    if (mode.value === 'mouse') return ['J', 'K', 'L']
    return ['F', 'G', 'H']
  })

  function setPetPosition(nextX: number, nextY: number) {
    x.value = clamp(nextX, 8, window.innerWidth - 300)
    y.value = clamp(nextY, 12, window.innerHeight - 290)
  }

  function triggerKeyboardPulse() {
    window.clearTimeout(pulseTimer ?? undefined)
    keyboardPulse.value = true
    pulseTimer = window.setTimeout(() => {
      keyboardPulse.value = false
    }, 130)
  }

  function onKeyboardActivity() {
    mode.value = 'typing'
    energy.value = clamp(energy.value - 0.7, 0, 100)
    triggerKeyboardPulse()
    window.clearTimeout(typingTimer ?? undefined)
    typingTimer = window.setTimeout(() => {
      mode.value = 'idle'
      energy.value = clamp(energy.value + 1.4, 0, 100)
    }, 420)
  }

  function onPointerMove(clientX: number, clientY: number) {
    pointerX.value = clientX
    pointerY.value = clientY
    if (mode.value !== 'typing') {
      mode.value = 'mouse'
    }
    energy.value = clamp(energy.value - 0.05, 0, 100)
  }

  function onPointerClick() {
    triggerKeyboardPulse()
    if (mode.value !== 'typing') {
      mode.value = 'mouse'
    }
    energy.value = clamp(energy.value - 0.3, 0, 100)
  }

  return {
    x,
    y,
    mode,
    energy,
    message,
    keyboardPulse,
    focusedKeys,
    petStyle,
    leftArmAngle,
    rightArmAngle,
    pawOffset,
    companionText,
    setPetPosition,
    onKeyboardActivity,
    onPointerMove,
    onPointerClick
  }
})
