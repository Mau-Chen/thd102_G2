const handleOnMounseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};
for (const card of document.querySelectorAll(".section_2")) {
  card.addEventListener("mousemove", (e) => handleOnMounseMove(e));
}

// ----------------------- 進場動畫 ----------------------------
console.clear();

gsap.set("#myHeading", {
  xPercent: -50,
  yPercent: -50,
  scaleY: 0,
  scaleX: 0.5,
  opacity: 1,
});

const tl = gsap.timeline({});
tl.to("#myHeading", {
  scaleY: 0.5,
  scaleX: 0.5,
});
tl.to("#myHeading", {
  scaleY: 1,
  scaleX: 1,
});

// 預設情況（視窗寬度大於等於1000px時）
if (window.innerWidth >= 1000) {
  tl.to("#myHeading", {
    xPercent: 0,
    yPercent: 0,
    left: 120,
    top: 24,
    ease: "power2.out",
    duration: 1,
    color: "#fff",
    delay: 0.1,
  });
}
// 當視窗寬度小於1000px且大於等於434px時
else if (window.innerWidth < 1000 && window.innerWidth >= 434) {
  tl.to("#myHeading", {
    scaleY: 0.93,
    scaleX: 0.93,
    left: "2.35em",
    top: 40,
    ease: "power2.out",
    duration: 1,
    color: "#fff",
    delay: 0.1,
  });
}
// 當視窗寬度小於434px時
else if (window.innerWidth < 434) {
  tl.to("#myHeading", {
    scaleY: 0.75,
    scaleX: 0.75,
    left: "1.8em",
    top: 35,
    ease: "power2.out",
    duration: 1,
    color: "#fff",
    delay: 0.1,
  });
}

// tl.fromTo(
//   "#myHeading",
//   // 起始狀態
//   {
//     xPercent: -50, // 開始位置
//     yPercent: -50, // 開始位置
//   },
//   // 結束狀態
//   {
//     xPercent: 0,
//     yPercent: 0,
//     left: "2.35em",
//     top: 22.5,
//     ease: "power1.out",
//     duration: 1,
//     color: "#fff",
//     delay: 0.1,
//   }
// );

tl.from(
  ".dot",
  {
    background: "#fff",
  },
  "<"
);

tl.to(
  ".dot",
  {
    duration: 0.8,
    background: "#6E60F6",
    scale: 100,
    display: "none",
    ease: "power2.easeOut",
  },
  "<"
);

// 在動畫完成後顯示 wrapper 內容
tl.to(".wrapper.index", {
  display: "block",
});
tl.to(
  "#index-box",
  {
    display: "none",
    // height: 0, // 取消高度
    duration: 0.1, // 縮短持續時間
    ease: "power4.easeOut",
  },
  "<"
);
// ----------------------- 進場動畫 ----------------------------
