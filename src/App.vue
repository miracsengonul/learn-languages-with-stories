<template>
  <div id="app" class="bg-whitesmoke dark:bg-gray-700">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  beforeCreate() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  },
};
</script>

<style>
#app {
  overflow-x: hidden;
  font-family: "PT Sans", sans-serif;
}
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.relative-sentence {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start !important;
}
</style>
