<template>
  <div class="min-h-screen bg-black text-white py-14 px-4 relative">
    <div
      class="home-btn"
      @mouseover="hover = true"
      @mouseout="hover = false"
      @click="$router.push('/')"
      :class="{ hover: hover }"
    >
      <h1 class="font-inter font-medium text-2xl">Home</h1>
    </div>

    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 my-10">
      <div class="job-info-card">
        <h1 class="label">Job type</h1>
        <p class="value">Full Time</p>
        <h1 class="label">Location</h1>
        <p class="value">Remote</p>

        <button class="apply-btn" @click="showForm = true">
          Apply Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
      <!-- anketa -->
      <div v-if="showForm" class="overlay">
        <div class="apply-form">
          <button class="close-btn" @click="showForm = false">✕</button>
          <input class="input" type="text" placeholder="Name" v-model="name" />
          <input
            class="input"
            type="text"
            placeholder="Surname"
            v-model="surname"
          />
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="email"
          />

          <input type="file" @change="handleFile" />

          <label class="consent">
            <input type="checkbox" v-model="consent" />
            Я даю согласие на обработку персональных данных
          </label>
          <button class="submit-btn" :disabled="!consent" @click="submitForm">
            Отправить
          </button>
        </div>
      </div>

      <!-- other -->

      <div v-if="job">
        <h2 class="section-title">JOB DETAILS</h2>
        <h1 class="job-title">{{ job.title }}</h1>

        <h2 class="subheading">What we expect:</h2>
        <ul class="list" v-if="job && job.expect">
          <li v-for="(req, idx) in job.expect" :key="idx">{{ req }}</li>
        </ul>
        <h2 class="subheading">Your daily routine</h2>
        <ul class="list" v-if="job && job.routine">
          <li v-for="(req, idx) in job.routine" :key="idx">{{ req }}</li>
        </ul>

        <h2 class="subheading">Your values:</h2>
        <ul class="list-inline">
          <li v-for="(val, idx) in job.values" :key="idx">{{ val }}</li>
        </ul>

        <h2 class="subheading">Conditions:</h2>
        <ul class="list">
          <li v-for="(val, idx) in job.conditions" :key="idx">{{ val }}</li>
        </ul>

        <p class="note">{{ job.note }}</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-16">
      <div
        v-for="other in otherJobs"
        :key="other.id"
        class="other-job-card"
        @click="goToJob(other.id)"
      >
        <h3>{{ other.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { fetchJobs } from "../data/jobs";
const hover = ref(false);
const showForm = ref(false);
const consent = ref(false);
const name = ref("");
const surname = ref("");
const email = ref("");
const file = ref(null);

const jobs = ref([]);
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Загружаем вакансии из Google Sheets
onMounted(async () => {
  jobs.value = await fetchJobs();
});

const job = computed(() =>
  jobs.value.find((j) => j.id === Number(route.params.id))
);
const otherJobs = computed(() =>
  jobs.value.filter((j) => j.id !== Number(route.params.id))
);

function goToJob(id) {
  router.push(`/job/${id}`);
}

const handleFile = (e) => {
  file.value = e.target.files[0];
};

const submitForm = async () => {
  if (!consent.value) {
    toast.warning("⚠️ Вы должны согласиться на обработку данных!", {
      position: "top-right",
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("surname", surname.value);
    formData.append("email", email.value);

    if (file.value) {
      formData.append("file", file.value);
    }

    const res = await axios.post(
      "https://backend-0a1p.onrender.com/vacancy",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      toast.success(" Письмо успешно отправлено!", {
        position: "top-right",
        timeout: 3000,
      });

      showForm.value = false;
      name.value = "";
      surname.value = "";
      email.value = "";
      file.value = null;
      consent.value = false;
    } else {
      toast.error(" Ошибка: " + res.data.message, {
        position: "top-right",
        timeout: 4000,
      });
    }
  } catch (err) {
    console.error("Ошибка при отправке:", err);
    toast.error(" Ошибка при отправке!", {
      position: "top-right",
      timeout: 4000,
    });
  }
};
</script>

<style scoped>
.home-btn {
  width: fit-content;
  padding: 0.75rem 3.5rem;
  margin: 0 auto 3rem;
  border: 2px solid transparent;
  border-radius: 50px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.home-btn.hover {
  border-color: #780000;
  box-shadow: 0 0 10px rgba(120, 0, 0, 0.6);
}

.job-info-card {
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
}

.label {
  font-size: 1.2rem;
  color: #bbb;
  margin-top: 1rem;
}
.value {
  font-size: 1.6rem;
  font-weight: 500;
  color: white;
  margin-bottom: 1rem;
}

.apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 500;
  color: #780000;
  border: none;
  border-bottom: 2px solid #780000;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.apply-btn:hover {
  color: #a30000;
  border-color: #a30000;
  gap: 20px;
}
.icon {
  width: 20px;
  height: 20px;
}

.section-title {
  font-size: 1.4rem;
  color: #ccc;
}
.job-title {
  font-size: 3rem;
  font-weight: bold;
  color: #780000;
  margin-bottom: 2rem;
}
.subheading {
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #bcbaba;
  font-size: 1.6ren;
}
.list-inline {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  color: #e5e5e5;
}
.note {
  margin-top: 2rem;
  color: #bbb;
  font-size: 1.1rem;
}

.other-job-card {
  padding: 1.5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(120, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}
.other-job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(120, 0, 0, 0.5);
}
/* overlay с размытием заднего фона */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* затемнение */
  backdrop-filter: blur(6px); /* сам blur */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.apply-form {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  padding: 2rem;
  border-radius: 12px;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
}
.close-btn {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.input-file {
  border: none;
}
.consent {
  font-size: 14px;
  display: flex;
  gap: 6px;
  align-items: center;
}
.submit-btn {
  background: #780000;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.submit-btn:disabled {
  background: gray;
  cursor: not-allowed;
}
@media (max-width: 480px) {
  .overlay {
    position: absolute;
    bottom: -50%;
  }
}
</style>
