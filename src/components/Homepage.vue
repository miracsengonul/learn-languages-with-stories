<template>
  <div class="app">
    <Navbar />

    <section class="dark:bg-gray-200 px-2.5 md:px-6 py-5">
      <h1 class="text-2xl w-10/12 font-medium">Continue at Any Level 👏</h1>

      <div class="category-wrapper mt-8 mb-5">
        <div v-for="(category, index) in categories" :key="index">
          <span
            @click="setActiveBar(category, index)"
            :class="activeBar === category ? 'active' : ''"
            class="category select-none cursor-pointer"
          >
            {{ category }}
          </span>
        </div>
      </div>

      <!-- Card -->
      <hooper
        ref="carousel"
        @beforeSlide="disableLink"
        :autoPlay="true"
        :trimWhiteSpace="true"
        :itemsToShow="isMobile ? 1 : 3"
      >
        <slide v-for="(data, key) in activeData" :key="`card-${key}`">
          <div @click="goToDetail()" class="card cursor-pointer">
            <img
              src="https://travel-app-3.vercel.app/assets/mount.695e1d29.jpeg"
              class="space-x-4"
            />
            <div class="card-footer">
              <div class="flex flex-wrap w-full flex-col">
                <strong
                  class="text-lg mb-0 w-max"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: inherit;
                  "
                  >{{ data.title }} {{ key }}</strong
                >
                <p class="text-base text-gray-400">Malatya, Türkiye</p>
              </div>
            </div>
          </div>
        </slide>
      </hooper>

      <!-- Recomendation for you -->
      <div class="mt-10 mb-20">
        <div class="flex items-center text-gray-600 justify-between">
          <p>Recomendations</p>
        </div>
        <div v-for="list in 8" :key="list">
          <div
            @click="$router.push({ name: 'detail' })"
            class="list cursor-pointer select-none"
          >
            <div class="flex gap-3">
              <span>
                <img
                  class="rounded-xl"
                  src="https://travel-app-3.vercel.app/assets/mount-square.c20072e3.jpg"
                  width="60"
                />
              </span>
              <div>
                <strong class="text-lg mb-0 w-full">Mt. Rinjani</strong>
                <p class="text-xxxxs text-gray-400">Istanbul, Türkiye</p>
              </div>
            </div>
            <span class="text-xxxxs gap-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bookmark-star"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"
                />
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                />
              </svg>
              200
            </span>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";

import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import IsMobileDetect from "@/helpers/IsMobileDetect";

export default {
  mixins: [IsMobileDetect],
  components: {
    Navbar,
    Footer,
    Hooper,
    Slide,
  },
  data() {
    return {
      categories: ["A1", "A2", "B1", "B2", "C1"],
      activeBar: "A1",
      activeData: [],
      recommendations: [
        {
          id: 1,
          name: "Mt. Rinjani",
          location: "Lombok, Indonesia",
          imageUrl: "/assets/mount-square.c20072e3.jpg",
          rating: 4.6,
        },
        // Diğer öneriler
      ],
      isHeartClick: false,
      hooperActive: false,
    };
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_page=1")
      .then((response) => {
        this.activeData = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    setActiveBar(category, categoryIndex) {
      this.activeBar = category;
      const level = categoryIndex + 1;
      axios
        .get(`https://jsonplaceholder.typicode.com/photos?_page=${level}`)
        .then((response) => {
          this.activeData = response.data;
        })
        .catch((error) => console.log(error));
    },
    goToDetail() {
      if (this.hooperActive) {
        return;
      }

      this.$router.push({ name: "detail" });
    },
    disableLink() {
      this.hooperActive = true;
      setTimeout(() => {
        this.hooperActive = false;
      }, 250);
    },
  },
};
</script>
<style>
.hooper-indicator:not(.is-active) {
  background: #000 !important;
}
</style>
<style lang="postcss" scoped>
.hooper {
  height: auto;
}
.hooper-list {
  padding: 5px 0;
}
.hooper-slide:not(:first-child):not(:last-child) {
  margin: 0 10px;
}
.text-xxs {
  font-size: 0.75rem;
}
.text-xxxs {
  font-size: 0.55rem;
}
.category-wrapper,
.card-wrapper {
  @apply flex gap-3;
}
.category {
  @apply bg-gray-100 duration-300 px-3 py-1 rounded-xl text-black border border-2 border-black text-lg;
}
.category:not(.active):hover {
  @apply md:hover:bg-gray-600 md:hover:text-white md:hover:border-gray-700;
}
.active {
  @apply bg-black text-white;
}
.list {
  @apply mt-5 mb-8 flex justify-between;
}
.list .flex {
  @apply gap-3;
}
.list img {
  @apply rounded-xl;
}
.list strong {
  @apply mb-0 w-full;
}
.list p {
  @apply text-xxxxs text-gray-400;
}
.list .text-xxxxs {
  @apply gap-1 flex items-center;
}
.list .fa-star {
  @apply text-xxxxs text-yellow-400;
}
.card {
  min-width: 70%;
  animation: card 0.3s ease-in-out forwards;
  @apply rounded-xl relative overflow-hidden;
}
.card-footer {
  @apply absolute bottom-2 left-2 right-2 rounded-xl px-3 py-2 bg-gray-50 flex items-start gap-1 max-w-max select-none;
}

@keyframes card {
  from {
    transform: translateX(-150%) scale(0.75);
  }
  to {
    transform: translateX(0) scale(1);
  }
}
</style>
