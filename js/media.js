//768選單
document.addEventListener("DOMContentLoaded", function () {
    const searchOut = document.querySelector(".d_search-out");
    const onDis768Elements = document.querySelectorAll(".onDis768");

    function handleMouseEnter() {
      onDis768Elements.forEach(function (element) {
        element.style.display = "block";
      });
    }

    function handleMouseLeave() {
      onDis768Elements.forEach(function (element) {
        element.style.display = "none";
      });
    }

    function checkWidth() {
      const windowSize = window.innerWidth;

      if (windowSize <= 768) {
        searchOut.addEventListener("mouseenter", handleMouseEnter);
        searchOut.addEventListener("mouseleave", handleMouseLeave);
      } else {
        onDis768Elements.forEach(function (element) {
          element.style.display = "";
        });
        searchOut.removeEventListener("mouseenter", handleMouseEnter);
        searchOut.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    //初始檢查
    checkWidth();
    // 當視窗大小改變時重新檢查
    window.addEventListener("resize", checkWidth);
  });