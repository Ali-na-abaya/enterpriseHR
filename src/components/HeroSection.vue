<template>
  <body class="bg-black text-white">
    <section class="hero-section">
      <div class="logo-wrapper" v-if="showLogo">
        <img src="../assets/project.png" alt="ENT Logo" class="rotating-logo" />
      </div>

      <nav class="nav-links text-white">
        <a href="#about">About</a>
        <a href="#career">Career</a>
        <a href="#contact">Contact</a>
      </nav>

      <h1 class="main-title">ENTERPRISE</h1>
    </section>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
  background: #780000;
  background-image: url("/grain-texture.png");
  background-blend-mode: multiply;
  padding: 4rem;
  height: 100vh;
  overflow: hidden;
  border-left: 40px solid black;
  border-right: 50px solid black;
  border-top: 40px solid black;
  border-bottom: 50px solid black;
  border-radius: 190px 0px 0px 0px;
}

/* Лого */
.logo-wrapper {
  position: absolute;

  top: 0.1rem;
  left: 0.3rem;
  animation: slideIn 1s ease-out forwards;
  z-index: 100;
}

.rotating-logo {
  width: 250px;
  height: 250px;
  animation: spin 8s linear infinite;
}

/* Навигация */
.nav-links {
  position: absolute;
  top: 2rem;
  right: 3rem;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  position: relative;
  color: black;
  font-weight: 400;
  text-decoration: none;
  font-family: Inter;
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
  background-color: black;
  transition: width 0.4s ease, left 0.4s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after {
  width: 100%;
  left: 50%;
}

.main-title {
  position: absolute;
  bottom: -55px;
  left: -11px;
  font-size: 152px;
  letter-spacing: 1px;

  color: black;

  font-family: "Climate Crisis", sans-serif;
  transform: translateY(200px);
  opacity: 0;
  animation: slideUp 1s ease-out forwards;
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

  /* Навигация под лого */
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
    bottom: -16px;
    font-size: clamp(40px, 10.2vw, 50px);

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
