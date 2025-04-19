<template>
  <div class="flex flex-col items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-users-round-icon"
    >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
    <div class="text-xs mt-1" :style="{ color: color }"><slot></slot></div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: [Number, String],
    default: 24,
  },
});
</script>
