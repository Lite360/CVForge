<template>
  <footer class="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-8">

        <!-- Brand Info -->
        <div class="col-span-2 space-y-4">
          <div class="flex items-center gap-2.5 font-bold text-xl text-white">
            <div class="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center">
              <FileText class="w-4 h-4" />
            </div>
            <span>CVForge</span>
          </div>
          <p class="text-sm text-neutral-400 max-w-sm">
            Create professional CVs, analyze ATS scores, and optimize content using advanced AI tailored for career success.
          </p>
        </div>

        <!-- Product Links -->
        <div>
          <h3 class="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">Product</h3>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/register" class="hover:text-white transition-colors">Create CV</router-link></li>
            <li><a href="#templates" class="hover:text-white transition-colors">Templates</a></li>
            <li><router-link to="/register" class="hover:text-white transition-colors">AI CV Optimizer</router-link></li>
            <li><a href="#ats" class="hover:text-white transition-colors">ATS Checker</a></li>
            <li><a href="#job-matching" class="hover:text-white transition-colors">Job Matching</a></li>
            <li><a href="#pricing" class="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">Resources</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#faq" class="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" class="hover:text-white transition-colors">CV Tips</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">Company</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">About</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
            <li><span class="text-neutral-500 text-xs">Developed by Elite Developers</span></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Refund Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Acceptable Use Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>&copy; 2026 CVForge. All rights reserved.</p>
        <p class="font-medium text-neutral-400">Developed by Elite Developers</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FileText } from '@lucide/vue'
</script>
