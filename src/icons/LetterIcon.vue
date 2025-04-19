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
      class="lucide lucide-mail-icon"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
