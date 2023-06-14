<template>
  <section v-if="isMobile" class="nav-wrapper">
    <div class="navbar items-center">
      <div v-for="(menu, index) in menus" :key="index">
        <div @click="activeMenu = menu.name">
          <i
            v-if="activeMenu !== menu.name"
            :class="menu.icon"
            class="duration-300 text-gray-500 text-xl"
          ></i>
          <span
            class="duration-300 flex justify-center duration-300 flex-wrap"
            v-else
          >
            <p class="text-xxs text-green-400 w-full text-center">
              {{ menu.name }}
            </p>
            <i class="text-green-400 fa fa-circle"></i>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IsMobileDetect from "@/helpers/IsMobileDetect";

export default {
  mixins: [IsMobileDetect],
  data() {
    return {
      menus: [
        {
          name: "Home",
          icon: "fa fa-home",
        },
        {
          name: "Search",
          icon: "fa fa-search",
        },
        {
          name: "Bookmark",
          icon: "far fa-bookmark",
        },
        {
          name: "Profile",
          icon: "far fa-user",
        },
      ],
      activeMenu: "Home",
    };
  },
};
</script>

<style lang="postcss" scoped>
.nav-wrapper {
  @apply fixed left-0 right-0 bottom-0;
  box-shadow: -3px 3px 12px whitesmoke;
}

.navbar {
  @apply duration-300 w-full md:max-w-xl lg:max-w-lg xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 py-4 bg-white flex justify-between;
}
</style>
