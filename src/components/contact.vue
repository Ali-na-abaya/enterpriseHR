<template>
  <div
    id="contact"
    class="relative flex items-center justify-center min-h-screen bg-black overflow-hidden"
  >
    <img
      class="absolute inset-0 w-full h-full object-cover blur-md"
      :src="back"
      alt="Background"
    />
    alt="Background" />

    <div
      class="absolute mobil top-0 left-0 md:w-1/3 w-full h-full z-20 flex flex-col justify-center px-6 md:px-10 py-12 bg-white/10 backdrop-blur-xl shadow-xl md:rounded-r-2xl overflow-hidden"
    >
      <h2
        class="text-white text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg animate-slide-down"
      >
        LET'S TALK
      </h2>

      <form
        class="flex flex-col gap-6 mas animate-slide-left"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label class="text-gray-200 text-sm mb-1 block">Name *</label>
          <input
            type="text"
            v-model="formData.name"
            placeholder="Who’s here"
            class="w-full px-3 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 backdrop-blur-sm"
          />
        </div>

        <div>
          <label class="text-gray-200 text-sm mb-1 block">Email *</label>
          <input
            type="email"
            v-model="formData.email"
            placeholder="youremail@domain.com"
            class="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 backdrop-blur-sm"
          />
        </div>

        <div>
          <label class="text-gray-200 text-sm mb-1 block">Company</label>
          <input
            type="text"
            v-model="formData.company"
            placeholder="company name"
            class="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 backdrop-blur-sm"
          />
        </div>

        <div>
          <label class="text-gray-200 text-sm mb-1 block">Message *</label>
          <textarea
            v-model="formData.message"
            rows="4"
            placeholder="Additional Information"
            class="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 backdrop-blur-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          class="text-black font-semibold py-2 rounded-lg mt-2 shadow-lg"
          style="background-color: #780000"
        >
          SUBMIT
        </button>
      </form>

      <div class="flex gap-6 mt-8 text-gray-200 text-sm animate-fade-in">
        <a
          href="https://t.me/EnterpriseHR
"
          class="hover:text-white transition"
          ><img :src="telega" class="w-6 h-6" alt=""
        /></a>
        <a
          href="https://wa.me/79060229477?text=Здравствуйте!%20Хочу%20узнать%20подробнее"
          target="_blank"
        >
          <img :src="watsap" class="w-6 h-6" alt="WhatsApp" />
        </a>

        <a
          href="https://www.linkedin.com/company/enterprisehr-agency/?viewAsMember=true"
          class="hover:text-white transition"
          ><img :src="link" class="w-6 h-6" alt=""
        /></a>
        <a
          href="https://career.habr.com/companies/enterprisehr"
          class="hover:text-white transition"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <rect width="24" height="24" rx="4" fill="#808080" />
            <text x="6" y="17" font-size="14" font-weight="bold" fill="white">
              H
            </text>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import back from "../assets/back.png";
import telega from "../assets/telega.png";
import watsap from "../assets/watsap.png";
import link from "../assets/link.png";

const toast = useToast();

const formData = ref({
  name: "",
  email: "",
  company: "",
  message: "",
});

const handleSubmit = async () => {
  try {
    const res = await axios.post(
      "https://backend-0a1p.onrender.com/contact",
      formData.value
    );

    if (res.data.success) {
      toast.success(" Сообщение отправлено!", {
        position: "top-right",
        timeout: 3000,
      });
      formData.value = { name: "", email: "", company: "", message: "" };
    } else {
      toast.error(" Ошибка: " + res.data.message, {
        position: "top-right",
        timeout: 4000,
      });
    }
  } catch (err) {
    console.error(" Axios Error:", err);
    toast.error("⚠️ Сервер недоступен", {
      position: "top-right",
      timeout: 4000,
    });
  }
};
</script>

<style scoped>
h2 {
  font-family: "Climate Crisis", sans-serif;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slideDown 1s ease-out forwards;
}

.animate-slide-left {
  animation: slideLeft 1.2s ease-out forwards;
  animation-delay: 0.3s;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
  animation-delay: 0.8s;
}

/* Mobile */
@media (max-width: 480px) {
  .mas {
    width: 100%;
  }
  h2 {
    font-size: 2rem;
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .mobil {
    width: 70% !important;
    height: auto;
    margin: auto;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 40rem;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
  }

  form {
    gap: 1.25rem;
  }
}
</style>
