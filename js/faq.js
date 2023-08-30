// banner
window.addEventListener("scroll", function () {
  const parallaxBg = document.querySelector(".parallax-bg");
  const scrollValue = window.scrollY;
  parallaxBg.style.transform = `translateY(${scrollValue * 0.7}px)`;
});

//頭部篩選
const faq = Vue.createApp({
  data() {
    return {
      faq_index: 1,
      qAnda: [
        {
          name: 11,
          answer: 11,
        },
      ],
    };
  },
  mounted() {
    this.setupAccordion();
  },
  methods: {
    faq_changePage(index) {
      this.faq_index = index;
    },
    setupAccordion() {
      const items = document.querySelectorAll(".accordion button");

      function toggleAccordion() {
        const itemToggle = this.getAttribute("aria-expanded");

        for (let i = 0; i < items.length; i++) {
          items[i].setAttribute("aria-expanded", "false");
        }

        if (itemToggle == "false") {
          this.setAttribute("aria-expanded", "true");
        }
      }

      items.forEach((item) => item.addEventListener("click", toggleAccordion));
    },
  },
});

//手風琴效果
const vm_faq = faq.mount("#faq");

const faqItems = document.querySelectorAll(".faq_list");

faqItems.forEach((item) => {
  item.addEventListener("click", function () {
    // 移除所有項目的 active 類
    faqItems.forEach((item) => {
      item.classList.remove("active");
    });
    // 將點擊的項目添加 active 類
    this.classList.add("active");
  });
});

// 預設開頁面執行一次

// 預設展開第一個手風琴區塊
const firstAccordionButton = document.querySelector(".accordion button");
firstAccordionButton.setAttribute("aria-expanded", "true");
