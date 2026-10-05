<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 font-ui flex">
    
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col justify-between hidden md:flex flex-shrink-0">
      <div class="space-y-8">
        <!-- Brand Header -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center font-bold shadow-lg shadow-brand-orange/20">
            <ShieldAlert class="w-5 h-5" />
          </div>
          <div>
            <h2 class="font-bold text-sm text-white tracking-wide">CVForge Admin</h2>
            <p class="text-[10px] text-neutral-400 font-medium">Control Center v1.2</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="space-y-1.5 text-xs font-semibold text-neutral-400">
          <button 
            @click="activeTab = 'overview'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'overview' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <LayoutDashboard class="w-4 h-4" /> Overview
          </button>
          
          <button 
            @click="activeTab = 'users'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'users' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <Users class="w-4 h-4" /> User Management
          </button>

          <button 
            @click="activeTab = 'cvs'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'cvs' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <FileText class="w-4 h-4" /> CVs & Exports
          </button>

          <button 
            @click="activeTab = 'templates'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'templates' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <LayoutTemplate class="w-4 h-4" /> Template Manager
          </button>

          <button 
            @click="activeTab = 'plans'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'plans' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <CreditCard class="w-4 h-4" /> Plans & Paystack
          </button>

          <button 
            @click="activeTab = 'ai'" 
            :class="['w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-left', activeTab === 'ai' ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20' : 'hover:bg-neutral-800 hover:text-white']"
          >
            <Cpu class="w-4 h-4" /> AI Costs & Provider
          </button>
        </nav>
      </div>

      <!-- Admin Sign Out -->
      <div class="pt-4 border-t border-neutral-800">
        <button @click="handleSignOut" class="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition">
          <LogOut class="w-4 h-4" /> Sign Out Admin
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-grow p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
      
      <!-- Top Bar / Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div class="flex items-center gap-2 text-xs text-neutral-400 mb-1">
            <span>Admin Portal</span>
            <span>/</span>
            <span class="text-brand-orange font-semibold capitalize">{{ activeTab }}</span>
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">
            {{ activeTab === 'overview' ? 'System Analytics & Overview' : 
               activeTab === 'users' ? 'User Management & Roles' :
               activeTab === 'cvs' ? 'Generated CVs & Exports' :
               activeTab === 'templates' ? 'CV Templates & Controls' :
               activeTab === 'plans' ? 'Subscription Plans & Paystack' : 'AI Services & Failovers' }}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <div class="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live & Healthy
          </div>
          <button @click="refreshData" class="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition" title="Refresh Mock Data">
            <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }" />
          </button>
        </div>
      </div>

      <!-- ─── TAB 1: OVERVIEW ─────────────────────────────────────────── -->
      <div v-if="activeTab === 'overview'" class="space-y-8">
        <!-- KPI Stat Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 relative overflow-hidden">
            <div class="flex items-center justify-between text-neutral-400 mb-2">
              <span class="text-xs font-semibold">Total Users</span>
              <Users class="w-4 h-4 text-brand-orange" />
            </div>
            <span class="text-2xl font-extrabold text-white">{{ stats.totalUsers }}</span>
            <span class="block text-[11px] text-emerald-400 mt-1.5 font-medium">+14% this month</span>
          </div>

          <div class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
            <div class="flex items-center justify-between text-neutral-400 mb-2">
              <span class="text-xs font-semibold">Total CVs Generated</span>
              <FileText class="w-4 h-4 text-brand-orange" />
            </div>
            <span class="text-2xl font-extrabold text-white">{{ stats.totalCVs }}</span>
            <span class="block text-[11px] text-emerald-400 mt-1.5 font-medium">+28% growth</span>
          </div>

          <div class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
            <div class="flex items-center justify-between text-neutral-400 mb-2">
              <span class="text-xs font-semibold">Total Revenue</span>
              <CreditCard class="w-4 h-4 text-brand-orange" />
            </div>
            <span class="text-2xl font-extrabold text-white">{{ stats.totalRevenue }}</span>
            <span class="block text-[11px] text-neutral-400 mt-1.5 font-medium">Paystack Webhooks Active</span>
          </div>

          <div class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
            <div class="flex items-center justify-between text-neutral-400 mb-2">
              <span class="text-xs font-semibold">AI Success Rate</span>
              <Cpu class="w-4 h-4 text-brand-orange" />
            </div>
            <span class="text-2xl font-extrabold text-white">{{ stats.aiSuccessRate }}</span>
            <span class="block text-[11px] text-emerald-400 mt-1.5 font-medium">Primary: Gemini Flash</span>
          </div>
        </div>

        <!-- Activity Log & Recent Registrations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Activity Log -->
          <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <h2 class="text-sm font-bold text-white flex items-center justify-between">
              <span>Live System Activity</span>
              <span class="text-xs text-neutral-500 font-normal">Real-time mock events</span>
            </h2>
            <div class="space-y-3">
              <div v-for="log in logs" :key="log.id" class="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-3 text-xs">
                <CheckCircle2 v-if="log.type === 'success'" class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <AlertCircle v-else class="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div class="flex-grow">
                  <p class="font-medium text-neutral-200">{{ log.event }}</p>
                  <span class="text-[11px] text-neutral-500">{{ log.user }} • {{ log.timestamp }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Administration Actions -->
          <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <h2 class="text-sm font-bold text-white">Quick Shortcuts</h2>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <button @click="activeTab = 'users'" class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-brand-orange text-left space-y-1 transition">
                <Users class="w-4 h-4 text-brand-orange mb-1" />
                <div class="font-bold text-white">Users List</div>
                <div class="text-[11px] text-neutral-500">Manage user status</div>
              </button>
              
              <button @click="activeTab = 'templates'" class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-brand-orange text-left space-y-1 transition">
                <LayoutTemplate class="w-4 h-4 text-brand-orange mb-1" />
                <div class="font-bold text-white">Templates</div>
                <div class="text-[11px] text-neutral-500">Enable / disable templates</div>
              </button>

              <button @click="activeTab = 'plans'" class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-brand-orange text-left space-y-1 transition">
                <CreditCard class="w-4 h-4 text-brand-orange mb-1" />
                <div class="font-bold text-white">Paystack Plans</div>
                <div class="text-[11px] text-neutral-500">View pricing tiers</div>
              </button>

              <button @click="activeTab = 'ai'" class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-brand-orange text-left space-y-1 transition">
                <Cpu class="w-4 h-4 text-brand-orange mb-1" />
                <div class="font-bold text-white">AI Fallbacks</div>
                <div class="text-[11px] text-neutral-500">Gemini vs OpenRouter</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── TAB 2: USER MANAGEMENT ───────────────────────────────────── -->
      <div v-else-if="activeTab === 'users'" class="space-y-6">
        <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <!-- Filter & Search Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="relative flex-grow max-w-md">
              <Search class="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
              <input 
                v-model="userSearchQuery" 
                type="text" 
                placeholder="Search users by name or email..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
            <span class="text-xs text-neutral-400 font-medium">Showing {{ filteredUsers.length }} Users</span>
          </div>

          <!-- Users Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-neutral-300 border-collapse">
              <thead>
                <tr class="border-b border-neutral-800 text-neutral-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th class="py-3 px-4">User Name & Email</th>
                  <th class="py-3 px-4">Role</th>
                  <th class="py-3 px-4">Plan</th>
                  <th class="py-3 px-4">CVs Created</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800/60">
                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-neutral-800/40 transition">
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-white">{{ user.name }}</div>
                    <div class="text-[11px] text-neutral-500">{{ user.email }}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span :class="['px-2 py-0.5 rounded-md text-[10px] font-bold uppercase', user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-neutral-800 text-neutral-400']">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 font-medium">{{ user.plan }}</td>
                  <td class="py-3.5 px-4 font-semibold text-white">{{ user.cvCount }}</td>
                  <td class="py-3.5 px-4">
                    <span :class="['px-2 py-0.5 rounded-full text-[10px] font-bold', user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20']">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button 
                      @click="toggleUserStatus(user.id)" 
                      :class="['px-3 py-1 rounded-lg text-xs font-semibold transition', user.status === 'Active' ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400']"
                    >
                      {{ user.status === 'Active' ? 'Suspend' : 'Activate' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ─── TAB 3: CVS & EXPORTS ─────────────────────────────────────── -->
      <div v-else-if="activeTab === 'cvs'" class="space-y-6">
        <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <h2 class="text-sm font-bold text-white">Generated Resumes & Export Log</h2>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-neutral-300 border-collapse">
              <thead>
                <tr class="border-b border-neutral-800 text-neutral-500 font-semibold uppercase text-[10px]">
                  <th class="py-3 px-4">CV Title</th>
                  <th class="py-3 px-4">Owner Email</th>
                  <th class="py-3 px-4">Template</th>
                  <th class="py-3 px-4">ATS Score</th>
                  <th class="py-3 px-4">Format</th>
                  <th class="py-3 px-4">Created Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-800/60">
                <tr v-for="cv in cvs" :key="cv.id" class="hover:bg-neutral-800/40 transition">
                  <td class="py-3.5 px-4 font-bold text-white">{{ cv.title }}</td>
                  <td class="py-3.5 px-4 text-neutral-400">{{ cv.userEmail }}</td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-medium">
                      {{ cv.template }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="font-bold text-emerald-400">{{ cv.atsScore }}/100</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange font-bold text-[10px]">
                      {{ cv.format }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-neutral-500 text-[11px]">{{ cv.createdAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ─── TAB 4: TEMPLATE MANAGER ──────────────────────────────────── -->
      <div v-else-if="activeTab === 'templates'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="tpl in templates" :key="tpl.id" class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-brand-orange uppercase tracking-wider">{{ tpl.category }}</span>
              <span :class="['px-2 py-0.5 rounded-full text-[10px] font-bold', tpl.isPremium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-neutral-800 text-neutral-400']">
                {{ tpl.isPremium ? 'PRO ONLY' : 'FREE' }}
              </span>
            </div>

            <div>
              <h3 class="text-base font-bold text-white">{{ tpl.name }}</h3>
              <p class="text-xs text-neutral-400 mt-1">{{ tpl.usageCount.toLocaleString() }} CVs created with this template</p>
            </div>

            <div class="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <button @click="toggleTemplateActive(tpl.id)" class="flex items-center gap-2 text-neutral-300 hover:text-white font-medium">
                <ToggleRight v-if="tpl.isActive" class="w-5 h-5 text-emerald-400" />
                <ToggleLeft v-else class="w-5 h-5 text-neutral-600" />
                <span>{{ tpl.isActive ? 'Active' : 'Disabled' }}</span>
              </button>

              <button @click="toggleTemplatePremium(tpl.id)" class="text-xs text-amber-400 hover:underline font-semibold">
                Set as {{ tpl.isPremium ? 'Free' : 'Pro' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── TAB 5: PLANS & PAYSTACK ──────────────────────────────────── -->
      <div v-else-if="activeTab === 'plans'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="plan in plans" :key="plan.id" class="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-sm">{{ plan.name }}</h3>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                {{ plan.status }}
              </span>
            </div>

            <div class="text-2xl font-extrabold text-white">{{ plan.price }}</div>
            <p class="text-xs text-neutral-400">{{ plan.activeSubscribers }} Active Subscribers</p>
            
            <div class="pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Paystack Code: {{ plan.paystackPlanCode }}
            </div>
          </div>
        </div>
      </div>

      <!-- ─── TAB 6: AI COST & PROVIDER ────────────────────────────────── -->
      <div v-else-if="activeTab === 'ai'" class="space-y-6">
        <div class="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-6">
          <h2 class="text-base font-bold text-white">AI Engine Configuration & Status</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Primary Provider -->
            <div class="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Primary Provider</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
              </div>
              <h3 class="text-lg font-bold text-white">Google Gemini 1.5 Flash</h3>
              <p class="text-xs text-neutral-400">High performance, lowest latency, zero rate limits.</p>
              <div class="text-xs text-neutral-500 pt-2 border-t border-neutral-800">
                Avg Latency: <strong class="text-white">620ms</strong>
              </div>
            </div>

            <!-- Fallback Provider -->
            <div class="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Secondary Fallback</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">STANDBY</span>
              </div>
              <h3 class="text-lg font-bold text-white">OpenRouter (Claude 3.5 Sonnet)</h3>
              <p class="text-xs text-neutral-400">Automatic failover when Gemini quota or timeout occurs.</p>
              <div class="text-xs text-neutral-500 pt-2 border-t border-neutral-800">
                Failover Trigger: <strong class="text-white">500 Server Error or Timeout</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ShieldAlert, LayoutDashboard, Users, FileText, LayoutTemplate, 
  CreditCard, Cpu, LogOut, Search, CheckCircle2, AlertCircle, 
  ToggleLeft, ToggleRight, RefreshCw 
} from '@lucide/vue'
import { adminMockService } from '@/services/admin/adminMockService'

const router = useRouter()
const activeTab = ref<'overview' | 'users' | 'cvs' | 'templates' | 'plans' | 'ai'>('overview')
const isRefreshing = ref(false)

const stats = ref(adminMockService.getStats())
const users = ref(adminMockService.getUsers())
const cvs = ref(adminMockService.getCVs())
const templates = ref(adminMockService.getTemplates())
const plans = ref(adminMockService.getPlans())
const logs = ref(adminMockService.getLogs())

const userSearchQuery = ref('')

const filteredUsers = computed(() => {
  if (!userSearchQuery.value) return users.value
  const query = userSearchQuery.value.toLowerCase()
  return users.value.filter(u => 
    u.name.toLowerCase().includes(query) || 
    u.email.toLowerCase().includes(query)
  )
})

const toggleUserStatus = (id: string) => {
  users.value = adminMockService.toggleUserStatus(id)
}

const toggleTemplateActive = (id: string) => {
  templates.value = adminMockService.toggleTemplateActive(id)
}

const toggleTemplatePremium = (id: string) => {
  templates.value = adminMockService.toggleTemplatePremium(id)
}

const refreshData = () => {
  isRefreshing.value = true
  setTimeout(() => {
    stats.value = adminMockService.getStats()
    users.value = adminMockService.getUsers()
    cvs.value = adminMockService.getCVs()
    templates.value = adminMockService.getTemplates()
    plans.value = adminMockService.getPlans()
    logs.value = adminMockService.getLogs()
    isRefreshing.value = false
  }, 400)
}

const handleSignOut = () => {
  localStorage.removeItem('cvforge_admin_token')
  localStorage.removeItem('cvforge_admin_user')
  router.push('/access')
}
</script>
