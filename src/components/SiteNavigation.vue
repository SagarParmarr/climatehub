<template>
  <header>
    <nav
      :class="[
        'bg-weather-primary px-6 py-4 flex items-center justify-between shadow-lg',
        isDark ? 'text-cyan-100' : 'text-teal-900',
      ]"
    >
      <RouterLink :to="{ name: 'Home' }">
        <div class="flex items-center gap-2">
          <!-- Sun icon SVG -->
          <transition name="fade" mode="out-in">
            <component
              :is="isDark ? MoonIcon : SunIcon"
              :iconClass="[
                'h-7 w-7',
                isDark ? 'text-cyan-100' : 'text-yellow-400',
              ]"
              :color="isDark ? '#e0f7fa' : '#FFD600'"
              key="icon-mode"
            />
          </transition>
          <span class="font-Roboto text-2xl font-bold tracking-wide">
            ClimateHub
          </span>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import SunIcon from "./SunIcon.vue";
import MoonIcon from "./MoonIcon.vue";
import { RouterLink } from "vue-router";
import { inject } from "vue";
const isDark = inject("isDark", false);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
