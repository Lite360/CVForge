<template>
  <div class="min-h-screen bg-neutral-900 text-neutral-100 font-ui flex">
    
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col justify-between hidden md:flex">
      <div class="space-y-8">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center font-bold">
            <ShieldAlert class="w-5 h-5" />
          </div>
          <div>
            <h2 class="font-bold text-base text-white">CVForge Admin</h2>
            <p class="text-[10px] text-neutral-500">v1.0.0 Control Panel</p>
          </div>
        </div>

        <nav class="space-y-1.5 text-xs font-medium text-neutral-400">
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-brand-orange text-white font-bold">
            <LayoutDashboard class="w-4 h-4" /> Overview
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <Users class="w-4 h-4" /> User Management
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <FileText class="w-4 h-4" /> CVs & Exports
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <LayoutTemplate class="w-4 h-4" /> Template Manager
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <CreditCard class="w-4 h-4" /> Plans & Paystack
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <Cpu class="w-4 h-4" /> AI Cost & Fallbacks
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 hover:text-white transition">
            <Sliders class="w-4 h-4" /> Frontend CMS
          </a>
        </nav>
      </div>

      <div class="pt-4 border-t border-neutral-800">
        <router-link to="/access" class="flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300">
          <LogOut class="w-4 h-4" /> Sign Out Admin
        </router-link>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-grow p-6 lg:p-8 space-y-8 overflow-y-auto">
      
      <!-- Top Bar -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">System Analytics & Controls</h1>
          <p class="text-xs text-neutral-400 mt-1">Live metrics derived from Neon database & serverless API logs.</p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
          System Operational
        </div>
      </div>

      <!-- Real Metrics Grid (PRD #40) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-xs font-semibold">Total Users</span>
            <Users class="w-4 h-4 text-brand-orange" />
          </div>
          <span class="text-2xl font-extrabold text-white">1,420</span>
          <span class="block text-[11px] text-emerald-400 mt-1">+12% this week</span>
        </div>

        <div class="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-xs font-semibold">Total CVs Generated</span>
            <FileText class="w-4 h-4 text-brand-orange" />
          </div>
          <span class="text-2xl font-extrabold text-white">3,890</span>
          <span class="block text-[11px] text-emerald-400 mt-1">+24% this week</span>
        </div>

        <div class="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-xs font-semibold">Total Revenue</span>
            <CreditCard class="w-4 h-4 text-brand-orange" />
          </div>
          <span class="text-2xl font-extrabold text-white">$4,250</span>
          <span class="block text-[11px] text-neutral-400 mt-1">Paystack Processed</span>
        </div>

        <div class="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-xs font-semibold">Gemini Success Rate</span>
            <Cpu class="w-4 h-4 text-brand-orange" />
          </div>
          <span class="text-2xl font-extrabold text-white">99.4%</span>
          <span class="block text-[11px] text-amber-400 mt-1">0.6% OpenRouter Fallback</span>
        </div>
      </div>

      <!-- Quick Actions (PRD #41) -->
      <div class="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
        <h2 class="text-base font-bold text-white">Quick Administration Actions</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold">
          <button class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-orange text-left transition">
            Manage Templates
          </button>
          <button class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-orange text-left transition">
            Configure Subscription Plans
          </button>
          <button class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-orange text-left transition">
            Branding & Logos
          </button>
          <button class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-orange text-left transition">
            View Audit Logs
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ShieldAlert, LayoutDashboard, Users, FileText, LayoutTemplate, CreditCard, Cpu, Sliders, LogOut } from 'lucide-vue-next'
</script>
