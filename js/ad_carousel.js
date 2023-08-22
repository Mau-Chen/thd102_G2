const config = {
  type: "carousel",
  startAt: 0,
  focusAt: "center",
  perView: 3,
  gap: 32,
  autoplay: 5000,
  breakpoints: {
    1200: {
      perView: 3,
    },
    820: {
      perView: 2,
    },
    768: {
      perView: 2,
    },
    434: {
      perView: 1,
    },
  },
};

new Glide(".glide", config).mount();
