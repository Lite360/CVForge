<template>
  <Transition name="slide-up">
    <div 
      v-if="showPrompt" 
      class="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 max-w-sm w-full bg-neutral-900 text-white border border-neutral-800 rounded-2xl p-4 shadow-2xl z-50 flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-extrabold shrink-0 shadow-md">
          CV
        </div>
        <div>
          <h4 class="text-xs font-bold text-white">Install CVForge App</h4>
          <p class="text-[11px] text-neutral-400">Add to Home Screen for fast, offline-first access.</p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button 
          @click="installPWA" 
          class="px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl transition shadow-sm"
        >
          Install
        </button>
        <button 
          @click="dismissPrompt" 
          class="p-1.5 text-neutral-400 hover:text-white text-xs rounded-lg hover:bg-neutral-800 transition"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X } from '@lucide/vue'

const showPrompt = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e
    // Show prompt if not previously dismissed
    if (!localStorage.getItem('cvforge_pwa_dismissed')) {
      showPrompt.value = true
    }
  })
})

async function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      showPrompt.value = false
    }
    deferredPrompt = null
  }
}

function dismissPrompt() {
  showPrompt.value = false
  localStorage.setItem('cvforge_pwa_dismissed', 'true')
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
