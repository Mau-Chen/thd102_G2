var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    // spaceBetween: 16,
    loop: true,
    // cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  const app2 = Vue.createApp({
    data() {
      return {
        P1: {
          spPrice: 800,
          BuyNum: 1,
        },
        P2: {
          spPrice: 800,
          BuyNum: 1,
        },
      };
    },
    methods: {
      updateSubtotal(product) {
        return product.spPrice * product.BuyNum;
      },
      updateAmount(product, change) {
        if (product.BuyNum < 9) {
          product.BuyNum = Math.max(0, product.BuyNum + change);
        } else if (product.BuyNum >= 9) {
          product.BuyNum = 8;
          product.BuyNum = Math.max(0, product.BuyNum + change);
        }
        this.updateSubtotal(product);
      },
      handleInput(product) {
        if ((product.BuyNum = 1)) {
          product.BuyNum = 1;
        } else if (product.BuyNum > 9) {
          product.BuyNum = 9;
        }
        this.updateSubtotal(product);
      },
    },
  });
  app2.mount("#htApp");
