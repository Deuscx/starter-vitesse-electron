<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive({
  electron: '31.0.2',
  chrome: '120.0.6099.128',
  node: '20.14.8',
})

</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
  </ul>
</template>
