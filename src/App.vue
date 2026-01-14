<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import ScrollToTop from "@/components/common/ScrollToTop.vue";
import ChatWidget from "@/components/common/ChatWidget.vue";
</script>

<template>
  <div id="app-wrapper" class="d-flex flex-column min-vh-100">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow-1">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Scroll to Top Button -->
    <ScrollToTop />

    <!-- AI Chatbot Widget -->
    <ChatWidget />
  </div>
</template>

<style>
/* App-specific styles */
#app-wrapper {
  min-height: 100vh;
}
</style>
