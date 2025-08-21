<template>
  <section
    id="about"
    ref="aboutSection"
    :class="{ 'is-visible': aboutVisible }"
    class="about bg-black mx-auto px-5 py-12"
  >
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <!-- Left Column -->
      <div>
        <h2 class="text-3xl md:text-3xl font-bold leading-tight">
          <span class="text-white text-5xl"
            >With the EnterpriseHR approach. </span
          ><br />
        </h2>
        <h2 class="pt-10 text-3xl font-semibold leading-tight">
          <span class="text-2xl text-white mt-5"
            >We are
            <span style="color: #780000"
              >smart, beautiful, rich, EFFECTIVE.</span
            >
          </span>
        </h2>
      </div>

      <!-- Right Column -->
      <div class="space-y-4 text-gray-300 text-xl">
        <p class="text-2xl">
          EnterpriseHR — where global recruiting meets digital <br />
          power.
        </p>
        <p class="text-2xl pt-2">
          We’re a fearless crew of IT, Gamedev, iGaming & ML experts.
        </p>
        <p class="text-2xl pt-4">
          From talent to results — we don’t just close positions, we close
          deals.
        </p>
      </div>
    </div>

    <!-- Company Profile -->
    <div class="mt-10">
      <h3 class="font-bold text-4xl mb-10 font-[Inter]" style="color: #780000">
        COMPANY PROFILE
      </h3>
      <hr class="w-[40%] mx-auto border-t-2 border-gray-300" />

      <ul class="space-y-4 comp" style="color: #780000">
        <li
          class="flex items-center border-b border-gray-700 pb-4 pt-6 w-[80%] mx-auto"
        >
          <span
            class="mr-3 text-4xl font-inter text-[#780000]"
            style="color: #780000"
            >01</span
          >

          <span class="text-white text-xl pl-3"
            >EnterpriseHR — also successfully works in the digital format:
            perfomance (traffic), web design SEO.</span
          >
        </li>

        <li class="flex items-center border-b border-gray-700 pb-4 pt-6">
          <span class="mr-3 text-4xl font-inter">02</span>
          <span class="text-white text-2xl pl-3">
            Digital technologies are everywhere now, and we know where the best
            specialists in this field are</span
          >
        </li>
        <li class="flex items-center border-b border-gray-700 pb-4 pt-6">
          <span class="mr-3 text-4xl font-inter">03</span>
          <span class="text-white text-2xl pl-3"
            >Frankly, the notebook is very big
          </span>
        </li>
        <li class="flex items-center border-b border-gray-700 pb-4 pt-6">
          <span class="mr-3 text-4xl font-inter">04</span>
          <span class="text-white text-2xl bl-"
            >We do NOT JUST select personnel, we solve your problem, and we are
            about numbers and funnels, FOR RESULTS!</span
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const aboutVisible = ref(false);
const aboutSection = ref(null);
let observer = null;

const items = [
  {
    num: "01",
    text: "EnterpriseHR — also successfully works in the digital format: performance (traffic), web design, SEO.",
  },
  {
    num: "02",
    text: "Digital technologies are everywhere now, and we know where the best specialists in this field are.",
  },
  { num: "03", text: "Frankly, the notebook is very big." },
  {
    num: "04",
    text: "We do NOT JUST select personnel, we solve your problem, and we are about numbers and funnels, FOR RESULTS!",
  },
];

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.01 }
  );
  if (aboutSection.value) observer.observe(aboutSection.value);

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".comp li").forEach((item, i) => {
    gsap.fromTo(
      item,
      { y: 50, opacity: 1 },
      {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style>
.about {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.about.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.comp li {
  position: relative;
  top: 20px;
}
@media (max-width: 480px) {
  .comp li {
    font-size: 16px;
  }
}
</style>
