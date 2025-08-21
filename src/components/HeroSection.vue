<template>
  <body class="bg-black text-white">
    <section class="hero-section">
      <div class="logo-wrapper" v-if="showLogo">
        <img :src="project" alt="ENT Logo" class="rotating-logo" />
      </div>

      <nav class="nav-links text-white">
        <a href="#about">About</a>
        <a href="#career">Career</a>
        <a href="#contact">Contact</a>
      </nav>

      <h1 class="main-title">ENTERRISEHR agency</h1>
    </section>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import project from "../assets/project.png";
const showLogo = ref(false);

onMounted(() => {
  setTimeout(() => {
    showLogo.value = true;
  }, 300);
});
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  padding: 4rem;
  overflow: hidden;

  border-left: 40px solid black;
  border-right: 50px solid black;
  border-top: 40px solid black;
  border-bottom: 50px solid black;
  border-radius: 190px 0px 0px 0px;

  background: linear-gradient(to bottom, #000000 0%, #000000 50%, #780000 100%);
}

.logo-wrapper {
  position: absolute;
  top: 2rem;
  left: 2rem;
  animation: slideIn 1s ease-out forwards;
}

.rotating-logo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  animation: spin 12s linear infinite;
  filter: drop-shadow(0 0 15px #ff0000);
}

.nav-links {
  position: absolute;
  top: 2rem;
  right: 3rem;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  position: relative;
  color: #ff0000;
  font-weight: 400;
  text-decoration: none;
  font-family: Inter, sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  margin-top: 15px;
  margin-right: 30px;
  padding-bottom: 5px;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: rgb(130, 10, 10);
  transition: width 0.4s ease, left 0.4s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after {
  width: 100%;
  left: 50%;
}
.main-title {
  position: absolute;
  bottom: -30px;
  left: -11px;
  font-size: 81px;
  letter-spacing: 2px;
  font-family: "Climate Crisis", sans-serif;

  color: #ffffff;
  text-transform: uppercase;

  text-shadow: 0 0 10px #ff0000, 0 0 20px #ff1a1a, 0 0 40px #ff3333,
    0 0 80px #ff4d4d;

  transform: translateY(200px);
  opacity: 0;
  animation: slideUp 1.2s ease-out forwards;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(200px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem;
    border-left: 20px solid black;
    border-right: 20px solid black;
    border-top: 40px solid black;
    border-bottom: 100px solid black;
    border-radius: 165px 0px 0px 0px;
  }

  .logo-wrapper {
    position: absolute;
    top: 10px;
    left: 1px;
    transform: none;
    animation: slideIn 1s ease-out forwards;
  }

  .rotating-logo {
    width: 200px;
    height: 200px;
    animation: spin 8s linear infinite;
    border-radius: 50%;
  }

  .nav-links {
    position: absolute;
    top: 400px;
    left: 40%;
    transform: translateX(-50%);
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    font-size: 19px;
    margin: 0;
  }

  .main-title {
    bottom: -4px;
    left: 1px;
    font-size: clamp(20px, 5.5vw, 30px);

    transform: translate(-50%, 200px);

    letter-spacing: 0;
    text-align: center;
    white-space: nowrap;
    font-family: "Climate Crisis", sans-serif;
  }
}
@media (min-width: 560px) and (max-width: 1024px) {
  .hero-section {
    padding: 2.5rem;
    border-left: 50px solid black;
    border-right: 50px solid black;
    border-top: 40px solid black;
    border-bottom: 100px solid black;
    border-bottom-width: 35px;
    border-radius: 180px 0 0 0;
  }

  .rotating-logo {
    width: 220px;
    height: 220px;
  }

  .nav-links {
    position: absolute;
    top: 2.8rem;
    left: 65%;
    transform: translateX(-50%);
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    font-size: 18px;
    letter-spacing: 0.5px;
  }

  .main-title {
    font-size: clamp(80px, 6vw, 72px);
    bottom: -10px;

    transform: translateX(-50%) translateY(180px);
    white-space: nowrap;
    text-align: center;
    line-height: 1.1;
  }
}
@media (min-width: 1025px) and (max-width: 1200px) {
  .hero-section {
    padding: 2.5rem;
    border-left: 50px solid black;
    border-right: 50px solid black;
    border-top: 40px solid black;
    border-bottom: 100px solid black;
    border-bottom-width: 35px;
    border-radius: 180px 0 0 0;
  }

  .rotating-logo {
    width: 220px;
    height: 220px;
  }

  .nav-links {
    position: absolute;
    top: 2.8rem;
    left: 65%;
    transform: translateX(-50%);
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    font-size: 18px;
    letter-spacing: 0.5px;
  }

  .main-title {
    font-size: clamp(80px, 6vw, 72px);
    bottom: -10px;

    transform: translateX(-50%) translateY(180px);
    white-space: nowrap;
    text-align: center;
    line-height: 1.1;
  }
}
</style>
