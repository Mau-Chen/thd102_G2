// rwd nav button
function navigateTo(url) {
  window.location.href = url;
}

class Hambuger {
  constructor() {
    window.pc = true;

    let shapePhilosophy = new mojs.Shape({
      parent: document.getElementById("hambugerBg"),
      shape: "circle",
      radius: window.pc ? 20 : 20,
      // angle: 30,
      fill: "#6e60f6",
      opacity: 1,
      isShowStart: true,
    });

    let hambugerIcon = document.getElementsByClassName("hambuger__icon")[0];
    let lineTop = document.getElementsByClassName("line--top")[0];
    let lineBottom = document.getElementsByClassName("line--bottom")[0];
    let menuBody = document.getElementById("hambugerBody");
    let items = menuBody.querySelectorAll(".item");

    hambugerIcon.addEventListener("click", () => {
      hambugerIcon.classList.toggle("is-open");
      if (hambugerIcon.classList.contains("is-open")) {
        shapePhilosophy.then({
          scale: window.pc ? 80 : 40,
          duration: 600,
          // opacity: 1,
          easing: "expo.out",
        });
        menuBody.style.display = "block";
        TweenMax.staggerTo(
          items,
          0.3,
          {
            opacity: 1,
            y: 0,
            delay: 0.2,
            ease: Power2.easeOut,
          },
          0.075
        );
        TweenMax.to(lineTop, 0.4, {
          y: 2,
          ease: Power4.easeOut,
          onComplete: () => {
            TweenMax.to(lineTop, 0.4, {
              rotation: 45,
              transformOrigin: "center center",
              ease: Power4.easeOut,
            });
          },
        });
        TweenMax.to(lineBottom, 0.4, {
          y: -2,
          transformOrigin: "left top",
          ease: Power4.easeOut,
          onComplete: () => {
            TweenMax.to(lineBottom, 0.4, {
              rotation: -45,
              transformOrigin: "center center",
              ease: Power4.easeOut,
            });
          },
        });
        // 禁用捲軸
        document.body.style.overflow = "hidden";
      } else {
        shapePhilosophy.then({
          scale: 1,
          duration: 400,
          delay: 300,
          easing: "expo.out",
        });
        TweenMax.staggerTo(
          items,
          0.2,
          {
            opacity: 0,
            y: "20px",
            onComplete: () => {
              menuBody.style.display = "none";
            },
          },
          0.01
        );
        TweenMax.to(lineTop, 0.4, {
          rotation: 0,
          transformOrigin: "center center",
          ease: Power4.easeOut,
          onComplete: () => {
            TweenMax.to(lineTop, 0.4, {
              y: 0,
              ease: Power4.easeOut,
            });
          },
        });
        TweenMax.to(lineBottom, 0.4, {
          rotation: 0,
          transformOrigin: "center center",
          ease: Power4.easeOut,
          onComplete: () => {
            TweenMax.to(lineBottom, 0.4, {
              y: 0,
              transformOrigin: "left top",
              ease: Power4.easeOut,
            });
          },
        });
        // 啟用捲軸
        document.body.style.overflow = "auto";
      }
      shapePhilosophy.play();
    });
  }
}

new Hambuger();

//頁面停留字的變色
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname; // 獲取當前頁面的路徑
  console.log(currentPath);
  var hostelLink = document.getElementById("hostelLink");
  var driverLink = document.getElementById("driverLink");
  var photoLink = document.getElementById("photoLink");
  var shoppLink = document.getElementById("shoppLink");

  if (currentPath.includes("hostel.html")) {
    hostelLink.classList.add("active"); // 添加 .active 類別
  } else if (currentPath.includes("driver.html")) {
    driverLink.classList.add("active");
  } else if (currentPath.includes("photowall.html")) {
    photoLink.classList.add("active");
  } else if (currentPath.includes("shopping.html")) {
    shoppLink.classList.add("active");
  }
});

//滑鼠移到購物車上面的展示效果
document.addEventListener("DOMContentLoaded", () => {
  const shoopElement = document.querySelector(".shoop");
  const shoppingCartElement = document.querySelector(".shopping-cart");

  shoopElement.addEventListener("mouseenter", () => {
    shoppingCartElement.style.display = "block";
  });

  shoopElement.addEventListener("mouseleave", () => {
    shoppingCartElement.style.display = "none";
  });
});


//更新 .SPcartNum
function updateCartItemCount() {
  // localStorage取cartData轉陣列
  const storedCartData = localStorage.getItem("cartData");
  let cartData = [];
  if (storedCartData) {
    cartData = JSON.parse(storedCartData);
  }

  // 取購物車數
  const numberOfItems = cartData.length;
  // 購物車數放所有.SPcartNum上
  const SPcartNumElements = document.querySelectorAll(".SPcartNum");
  if (SPcartNumElements) {
    SPcartNumElements.forEach(function (element) {
      element.textContent = numberOfItems;
    });
  }
}

// 初始時更新購物車數
document.addEventListener("DOMContentLoaded", function () {
  updateCartItemCount();
});
