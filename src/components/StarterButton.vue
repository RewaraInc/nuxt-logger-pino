<template>
  <button class="starter-button" @click="$emit('click')">
    <slot>Starter Button</slot>
  </button>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<style scoped>
.starter-button {
  padding: 8px 16px;
  background: #00dc82;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.starter-button:hover {
  background: #00c972;
  transform: translateY(-1px);
}
</style>
