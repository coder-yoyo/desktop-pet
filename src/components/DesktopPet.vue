<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePetStore } from '../stores/pet'

const pet = usePetStore()
const { petStyle, leftArmAngle, rightArmAngle, tailWagSpeed, companionText, mode, energy } =
  storeToRefs(pet)

const badgeClass = computed(() => `mode-${mode.value}`)
</script>

<template>
  <div class="pet-wrapper" :style="petStyle" aria-live="polite">
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
        <div class="arm left" :style="{ '--arm-angle': leftArmAngle }" />
        <div class="arm right" :style="{ '--arm-angle': rightArmAngle }" />
        <div class="tail" :style="{ '--wag-speed': tailWagSpeed }" />
      </div>
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
