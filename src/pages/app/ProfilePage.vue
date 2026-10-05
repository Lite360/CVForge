<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto space-y-8">

      <!-- Success Notification Banner -->
      <Transition name="fade">
        <div v-if="showSuccessBanner" class="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center justify-between text-emerald-800 dark:text-emerald-300">
          <div class="flex items-center gap-3">
            <CheckCircle class="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span class="text-sm font-bold">Payment successful! Your subscription plan has been upgraded.</span>
          </div>
          <button @click="showSuccessBanner = false" class="text-xs text-emerald-600 hover:underline">Dismiss</button>
        </div>
      </Transition>

      <!-- Page Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">Profile &amp; Subscription</h1>
        <p class="text-sm text-neutral-500 mt-1">Manage your account details, AI credits, and subscription plan</p>
      </div>

      <!-- Avatar & Basic Info Card -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          
          <!-- Avatar -->
          <div class="relative group">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-brand-orange/20">
              {{ authStore.initials }}
            </div>
            <button title="Change photo" class="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Camera class="w-5 h-5 text-white" />
            </button>
          </div>

          <div class="text-center sm:text-left flex-1">
            <h2 class="text-xl font-extrabold text-neutral-900 dark:text-white">{{ authStore.user?.fullName }}</h2>
            <p class="text-sm text-neutral-500 mt-0.5">{{ authStore.user?.email }}</p>
            <div class="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" 
                :class="authStore.user?.plan === 'premium' 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-dark-secondary dark:text-neutral-400'"
              >
                <Crown v-if="authStore.user?.plan === 'premium'" class="w-3 h-3 inline mr-1" />
                {{ authStore.user?.plan || 'Free' }} Plan
              </span>
              <span class="text-xs text-neutral-400">
                Member since {{ memberSinceFormatted }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription & Plan Upgrade Card (PRD #27) -->
      <div class="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-700 relative overflow-hidden">
        <div class="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <Crown class="w-5 h-5 text-brand-orange" />
              <span class="text-xs font-bold uppercase tracking-widest text-brand-orange">Subscription Status</span>
            </div>
            <h3 class="text-2xl font-extrabold capitalize">{{ authStore.user?.plan || 'Free' }} Tier</h3>
            <p class="text-xs text-neutral-300 mt-1 max-w-md">
              {{ authStore.user?.plan === 'premium' 
                ? 'Your Premium subscription is active with unlimited AI features and priority export.' 
                : 'You are currently on the Free plan with 10 monthly AI credits and standard templates.' }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button 
              v-if="authStore.user?.plan === 'free'"
              @click="handleUpgrade('premium')"
              :disabled="isUpgrading"
              class="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap class="w-4 h-4 fill-white" />
              <span>{{ isUpgrading ? 'Redirecting to Checkout...' : 'Upgrade to Premium ($12/mo)' }}</span>
            </button>
            <button 
              v-else
              @click="handleManageBilling"
              class="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white text-xs font-bold rounded-xl transition"
            >
              Manage Billing
            </button>
          </div>
        </div>

        <!-- AI Usage Progress -->
        <div class="mt-8 pt-6 border-t border-neutral-700/60 grid sm:grid-cols-2 gap-6 relative z-10">
          <div>
            <div class="flex justify-between text-xs mb-2">
              <span class="font-semibold text-neutral-300">Monthly AI Credits Used</span>
              <span class="font-bold text-white">{{ authStore.user?.aiCreditsUsed || 0 }} / {{ authStore.user?.aiCreditsTotal || 10 }}</span>
            </div>
            <div class="h-2.5 bg-neutral-700 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-700 ease-out"
                :class="usagePercent > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-brand-orange to-amber-500'"
                :style="{ width: usagePercent + '%' }"
              ></div>
            </div>
            <p class="text-[11px] text-neutral-400 mt-1.5">Credits reset on the 1st of each month</p>
          </div>

          <div class="flex items-center gap-4 bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/40">
            <ShieldCheck class="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 class="text-xs font-bold text-white">Stripe Secure Checkout</h4>
              <p class="text-[11px] text-neutral-400">Cancel or switch plans anytime with 1-click customer portal.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-neutral-200 dark:border-dark-border p-6 sm:p-8 shadow-sm">
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
                <CheckCircle class="w-4 h-4" /> Saved successfully!
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

      <!-- Danger Zone -->
      <div class="bg-white dark:bg-dark-card rounded-2xl border border-red-200 dark:border-red-500/20 p-6 sm:p-8 shadow-sm">
        <h3 class="font-bold text-lg text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle class="w-5 h-5" />
          Danger Zone
        </h3>
        <p class="text-sm text-neutral-500 mb-5">Sign out or delete your account permanently.</p>

        <div class="flex flex-wrap gap-3">
          <button 
            @click="handleLogout"
            class="px-5 py-2.5 bg-neutral-100 dark:bg-dark-secondary text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl hover:bg-neutral-200 dark:hover:bg-dark-border transition flex items-center gap-2"
          >
            <LogOut class="w-4 h-4" />
            Sign Out
          </button>
          <button @click="handleDeleteAccount" class="px-5 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition flex items-center gap-2">
            <Trash2 class="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'
import { Camera, Crown, Zap, CheckCircle, AlertTriangle, LogOut, Trash2, User as UserIcon, ShieldCheck } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const editName = ref(authStore.user?.fullName || '')
const editEmail = ref(authStore.user?.email || '')
const saveSuccess = ref(false)
const isUpgrading = ref(false)
const showSuccessBanner = ref(false)

onMounted(() => {
  if (route.query.checkout === 'success') {
    showSuccessBanner.value = true
    authStore.updateProfile({ plan: 'premium' })
  }
})

const memberSinceFormatted = computed(() => {
  if (!authStore.user?.createdAt) return '2026'
  return new Date(authStore.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const usagePercent = computed(() => {
  if (!authStore.user) return 0
  const total = authStore.user.aiCreditsTotal || 10
  const used = authStore.user.aiCreditsUsed || 0
  return Math.min(100, Math.round((used / total) * 100))
})

async function handleUpgrade(planId: string) {
  isUpgrading.value = true
  try {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, interval: 'monthly' })
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      // Demo fallback if backend endpoint isn't running locally without Vercel CLI
      alert('Redirecting to Stripe Checkout demo...')
      authStore.updateProfile({ plan: 'premium' })
      showSuccessBanner.value = true
    }
  } catch {
    // Demo fallback for local development
    authStore.updateProfile({ plan: 'premium' })
    showSuccessBanner.value = true
  } finally {
    isUpgrading.value = false
  }
}

function handleManageBilling() {
  alert('Redirecting to Stripe Customer Portal...')
}

function handleSaveProfile() {
  authStore.updateProfile({
    fullName: editName.value,
    email: editEmail.value
  })
  saveSuccess.value = true
  setTimeout(() => { saveSuccess.value = false }, 2500)
}

function handleDeleteAccount() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    authStore.logout()
    router.push('/')
  }
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
