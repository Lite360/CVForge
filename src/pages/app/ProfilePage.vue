<template>
  <AppLayout>
    <div class="max-w-3xl mx-auto space-y-8">

      <!-- Page Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">Profile Settings</h1>
        <p class="text-sm text-neutral-500 mt-1">Manage your account details and preferences</p>
      </div>

      <!-- Avatar & Basic Info Card -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          
          <!-- Avatar -->
          <div class="relative group">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-brand-orange/20">
              {{ authStore.initials }}
            </div>
            <button class="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Camera class="w-5 h-5 text-white" />
            </button>
          </div>

          <div class="text-center sm:text-left flex-1">
            <h2 class="text-xl font-extrabold text-neutral-900 dark:text-white">{{ authStore.user?.fullName }}</h2>
            <p class="text-sm text-neutral-500 mt-0.5">{{ authStore.user?.email }}</p>
            <div class="mt-3 inline-flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" 
                :class="authStore.user?.plan === 'premium' 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-dark-secondary dark:text-neutral-400'"
              >
                <Crown v-if="authStore.user?.plan === 'premium'" class="w-3 h-3 inline mr-1" />
                {{ authStore.user?.plan }} Plan
              </span>
              <span class="text-xs text-neutral-400">
                Member since {{ memberSinceFormatted }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8">
        <h3 class="font-bold text-lg text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
          <UserIcon class="w-5 h-5 text-brand-orange" />
          Personal Information
        </h3>
        
        <form @submit.prevent="handleSaveProfile" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label for="profile-name" class="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">Full Name</label>
              <input
                id="profile-name"
                v-model="editName"
                type="text"
                class="w-full px-4 py-3 bg-neutral-50 dark:bg-dark-secondary border border-neutral-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
            <div>
              <label for="profile-email" class="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">Email Address</label>
              <input
                id="profile-email"
                v-model="editEmail"
                type="email"
                class="w-full px-4 py-3 bg-neutral-50 dark:bg-dark-secondary border border-neutral-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <Transition name="fade">
              <span v-if="saveSuccess" class="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle class="w-4 h-4" /> Saved!
              </span>
            </Transition>
            <button 
              type="submit"
              class="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-[0.97]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- AI Usage Card -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8">
        <h3 class="font-bold text-lg text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap class="w-5 h-5 text-amber-500" />
          AI Usage
        </h3>

        <div class="space-y-4">
          <!-- Usage Bar -->
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span class="font-semibold text-neutral-700 dark:text-neutral-300">Monthly Credits</span>
              <span class="font-bold text-neutral-900 dark:text-white">{{ authStore.user?.aiCreditsUsed }} / {{ authStore.user?.aiCreditsTotal }}</span>
            </div>
            <div class="h-3 bg-neutral-100 dark:bg-dark-secondary rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-700 ease-out"
                :class="usagePercent > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-brand-orange to-amber-500'"
                :style="{ width: usagePercent + '%' }"
              ></div>
            </div>
            <p class="text-xs text-neutral-400 mt-1.5">Credits reset on the 1st of each month</p>
          </div>

          <!-- Upgrade CTA -->
          <div v-if="authStore.user?.plan === 'free'" class="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-5 rounded-xl flex items-center justify-between gap-4">
            <div>
              <p class="text-sm font-bold">Need more AI power?</p>
              <p class="text-xs text-neutral-400 mt-0.5">Upgrade to Premium for unlimited AI optimizations</p>
            </div>
            <router-link to="/#pricing" class="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-lg whitespace-nowrap transition">
              Upgrade
            </router-link>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-red-200 dark:border-red-500/20 p-6 sm:p-8">
        <h3 class="font-bold text-lg text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle class="w-5 h-5" />
          Danger Zone
        </h3>
        <p class="text-sm text-neutral-500 mb-5">These actions are permanent and cannot be undone.</p>

        <div class="flex flex-wrap gap-3">
          <button 
            @click="handleLogout"
            class="px-5 py-2.5 bg-neutral-100 dark:bg-dark-secondary text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-dark-border transition flex items-center gap-2"
          >
            <LogOut class="w-4 h-4" />
            Sign Out
          </button>
          <button class="px-5 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition flex items-center gap-2">
            <Trash2 class="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'
import { Camera, Crown, Zap, CheckCircle, AlertTriangle, LogOut, Trash2, User as UserIcon } from '@lucide/vue'

const router = useRouter()
const authStore = useAuthStore()

const editName = ref(authStore.user?.fullName || '')
const editEmail = ref(authStore.user?.email || '')
const saveSuccess = ref(false)

const memberSinceFormatted = computed(() => {
  if (!authStore.user?.createdAt) return 'N/A'
  return new Date(authStore.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const usagePercent = computed(() => {
  if (!authStore.user) return 0
  return Math.round((authStore.user.aiCreditsUsed / authStore.user.aiCreditsTotal) * 100)
})

function handleSaveProfile() {
  authStore.updateProfile({
    fullName: editName.value,
    email: editEmail.value
  })
  saveSuccess.value = true
  setTimeout(() => { saveSuccess.value = false }, 2500)
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.fade-enter-active { transition: opacity 0.3s ease; }
.fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
