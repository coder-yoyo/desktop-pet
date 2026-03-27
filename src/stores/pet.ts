import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type PetMode = 'idle' | 'typing' | 'dragging' | 'clicking'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const usePetStore = defineStore('pet', () => {
  const x = ref(260)
  const y = ref(260)
  const mode = ref<PetMode>('idle')
  const energy = ref(90)
  const message = ref('我在陪你工作，随时待命！')

  let typingTimer: ReturnType<typeof setTimeout> | null = null
  let clickTimer: ReturnType<typeof setTimeout> | null = null

  const petStyle = computed(() => ({
    transform: `translate3d(${x.value}px, ${y.value}px, 0)`
  }))

  const leftArmAngle = computed(() => {
    switch (mode.value) {
      case 'typing':
        return '-22deg'
      case 'dragging':
        return '30deg'
      case 'clicking':
        return '8deg'
      default:
        return '-6deg'
    }
  })

  const rightArmAngle = computed(() => {
    switch (mode.value) {
      case 'typing':
        return '24deg'
      case 'dragging':
        return '-10deg'
      case 'clicking':
        return '-38deg'
      default:
        return '6deg'
    }
  })

  const tailWagSpeed = computed(() => {
    switch (mode.value) {
      case 'typing':
        return '0.42s'
      case 'dragging':
        return '0.5s'
      case 'clicking':
        return '0.35s'
      default:
        return '0.8s'
    }
  })

  const companionText = computed(() => {
    if (mode.value === 'typing') return '键盘节奏不错，我来打拍子！'
    if (mode.value === 'dragging') return '我跟上你的鼠标啦～'
    if (mode.value === 'clicking') return '收到点击，执行喵！'
    return message.value
  })

  function setMode(nextMode: PetMode) {
    mode.value = nextMode
  }

  function recoverIdle(delay = 500) {
    window.clearTimeout(typingTimer ?? undefined)
    typingTimer = window.setTimeout(() => {
      mode.value = 'idle'
      energy.value = clamp(energy.value + 2, 0, 100)
    }, delay)
  }

  function onKeyboardActivity() {
    mode.value = 'typing'
    energy.value = clamp(energy.value - 1, 0, 100)
    recoverIdle(520)
  }

  function onPointerMove(clientX: number, clientY: number, dragging: boolean) {
    x.value = clamp(clientX - 82, 10, window.innerWidth - 170)
    y.value = clamp(clientY - 140, 12, window.innerHeight - 190)
    mode.value = dragging ? 'dragging' : 'idle'
    energy.value = clamp(energy.value - (dragging ? 0.16 : 0.06), 0, 100)
  }

  function onPointerClick() {
    window.clearTimeout(clickTimer ?? undefined)
    mode.value = 'clicking'
    energy.value = clamp(energy.value - 0.8, 0, 100)
    clickTimer = window.setTimeout(() => {
      mode.value = 'idle'
    }, 280)
  }

  function setMessage(next: string) {
    message.value = next
  }

  return {
    x,
    y,
    mode,
    energy,
    message,
    petStyle,
    leftArmAngle,
    rightArmAngle,
    tailWagSpeed,
    companionText,
    setMode,
    onKeyboardActivity,
    onPointerMove,
    onPointerClick,
    setMessage
  }
})
