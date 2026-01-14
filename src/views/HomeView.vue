<script setup>
import HeroCarousel from "@/components/home/HeroCarousel.vue";
import SponsorsMarquee from "@/components/home/SponsorsMarquee.vue";
import DonationStats from "@/components/home/DonationStats.vue";
import ProgramsHighlight from "@/components/home/ProgramsHighlight.vue";
import TransparencySection from "@/components/home/TransparencySection.vue";
import AboutPreview from "@/components/home/AboutPreview.vue";
import ImpactStats from "@/components/home/ImpactStats.vue";
import DonateCallToAction from "@/components/home/DonateCallToAction.vue";
import ActivitiesSlider from "@/components/home/ActivitiesSlider.vue";
import VideoSection from "@/components/home/VideoSection.vue";
import TestimonialsSection from "@/components/home/TestimonialsSection.vue";
</script>

<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Sponsors Marquee -->
    <SponsorsMarquee />

    <!-- About Preview Section -->
    <AboutPreview />

    <!-- Video Section -->
    <VideoSection />

    <!-- Donation Stats (Tổng tiền + Auto-scroll donors) -->
    <DonationStats />

    <!-- Programs Highlight (3 chương trình chính) -->
    <ProgramsHighlight />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- Transparency Section -->
    <TransparencySection />

    <!-- Activities Slider -->
    <ActivitiesSlider />

    <!-- Impact Statistics -->
    <ImpactStats />

    <!-- Donate CTA -->
    <DonateCallToAction />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>

