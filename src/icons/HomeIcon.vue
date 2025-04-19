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
      class="lucide lucide-house-icon"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path
        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      />
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
