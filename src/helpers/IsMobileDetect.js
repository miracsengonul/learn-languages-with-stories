export default {
  data() {
    return {
      screenSize: window.screen.width,
    };
  },
  computed: {
    isMobile() {
      // Ekran genişliğine göre mobil veya masaüstü olduğunu belirleme
      return this.screenSize <= 768;
    },
  },
  mounted() {
    // Ekran boyutu değiştiğinde event dinleyicisi ekleyin
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // Component kaldırıldığında event dinleyicisini kaldırın
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      console.log(window.screen.width);
      this.screenSize = window.screen.width;
    },
  },
};
