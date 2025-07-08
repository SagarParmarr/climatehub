<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="iconClass"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path :fill="color" d="M21 12.5A9 9 0 1111.5 3c0 5.25 4.25 9.5 9.5 9.5z" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  iconClass: {
    type: String,
    default: "h-7 w-7 text-cyan-100",
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>
