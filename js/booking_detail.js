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
        // 旅宿資訊
        hostelName: '快樂寵物旅館',
        hostelAddress: '台北市中山區南京東路三段219號5樓',
        hostelDescription: '入住完美住宿，是給每個外出毛寶貝的必備要素。採用「單一放風」制度，讓每個毛小孩都能安全、盡興地玩耍，開開心心地回家。',
        // 重點設施
        facilities: [
          {
            iconSrc: './images/icon/hostel-icon/room-clean.svg',
            iconAlt: 'room-clean',
            name: '優良衛生'
          },
          {
            iconSrc: './images/icon/hostel-icon/room-air.svg',
            iconAlt: 'room-air',
            name: '全室空調'
          },
          {
            iconSrc: './images/icon/hostel-icon/room-video.svg',
            iconAlt: 'room-video',
            name: '互動攝影機'
          },
          {
            iconSrc: './images/icon/hostel-icon/room-wet.svg',
            iconAlt: 'room-wet',
            name: '溼度控制'
          },
          {
            iconSrc: './images/icon/hostel-icon/room-3m.svg',
            iconAlt: 'room-3m',
            name: '3M濾水器'
          }
        ],
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
