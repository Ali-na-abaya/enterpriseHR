<template>
  <section id="career" class="jobs-section">
    <h1 class="jobs-title">EnterpriseHR is looking for</h1>

    <div class="jobs-container">
      <div
        v-for="(job, index) in jobs"
        :key="job.id"
        class="job-card"
        :class="{ visible: visibleCards.includes(index) }"
        @click="goToJob(job.id)"
        ref="jobCards"
      >
        <h2>{{ job.title }}</h2>
        <p>{{ job.shortDescription }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { loadJobs } from "../data/jobs";

const router = useRouter();
const jobCards = ref([]);
const visibleCards = ref([]);
const jobs = ref([]);

function goToJob(id) {
  router.push(`/job/${id}`);
}

onMounted(async () => {
  jobs.value = await loadJobs();

  await nextTick();
  jobCards.value = jobCards.value.flatMap((el) => (el ? [el] : []));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = jobCards.value.indexOf(entry.target);
          if (!visibleCards.value.includes(index)) {
            visibleCards.value.push(index);
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  jobCards.value.forEach((card) => observer.observe(card));
});
</script>

<style scoped>
.jobs-section {
  background: black;
  width: 100%;
  padding: 6rem 2rem;
  color: white;
}

.jobs-title {
  color: #780000;
  font-size: 2.2rem;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  margin-bottom: 3rem;
  text-align: left;
}

.jobs-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 1200px;
  margin: auto;
}

.job-card {
  position: relative;
  border-radius: 16px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(120, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  transition: all 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease;
}

.job-card h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.job-card p {
  font-size: 0.95rem;
  color: #faf4f0;
  line-height: 1.5;
}

.job-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.job-card:hover {
  border-color: #780000;
  box-shadow: 0 0 25px rgba(120, 0, 0, 0.6), 0 0 40px rgba(120, 0, 0, 0.3);
  transform: translateY(-5px) scale(1.02);
  animation: neonPulse 2s infinite alternate ease-in-out;
}

@keyframes neonPulse {
  from {
    box-shadow: 0 0 20px rgba(120, 0, 0, 0.5), 0 0 40px rgba(120, 0, 0, 0.3);
  }
  to {
    box-shadow: 0 0 30px rgba(120, 0, 0, 0.8), 0 0 60px rgba(120, 0, 0, 0.4);
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .jobs-section {
    padding: 5rem 1.5rem;
  }
  .jobs-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .jobs-container {
    gap: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .jobs-section {
    padding: 4rem 1rem;
  }
  .jobs-title {
    font-size: 1.7rem;
    margin-bottom: 1.8rem;
  }
  .jobs-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .job-card {
    padding: 1rem;
  }
  .job-card h2 {
    font-size: 1.2rem;
  }
  .job-card p {
    font-size: 0.9rem;
  }
}
</style>
