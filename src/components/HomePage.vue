<template>
  <HeroSection />
  <AboutSection />
  <VacanciesSection />
  <Contact />
</template>

<script setup>
import HeroSection from "../components/HeroSection.vue";
import AboutSection from "../components/AboutSection.vue";
import VacanciesSection from "../components/VacanciesSection.vue";
import Contact from "../components/contact.vue";
</script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
