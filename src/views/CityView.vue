<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <div class="flex items-center justify-center min-h-screen">
          <p class="text-lg text-gray-500">Loading city weather...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
