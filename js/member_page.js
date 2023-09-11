//刪除myPost
document.addEventListener("DOMContentLoaded", function () {
  let postDetail = document.querySelectorAll(".post-detail");

  postDetail.forEach(function (post_detail) {
    let postDelete = post_detail.querySelector(".post-delete");
    postDelete.addEventListener("click", function () {
      const isConfirmed = confirm("確定要刪除此貼文嗎？");
      // console.log("Hello, it's me");
      if (isConfirmed) {
        post_detail.style.display = "none";
      }
    });
  });
});

//切換tab
document.addEventListener("DOMContentLoaded", function () {
  const sideBarLinks = document.querySelectorAll("[data-target]");

  sideBarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // 防止默認事件（不導航）
      event.preventDefault();

      // 隱藏所有頁面
      const orders = document.querySelectorAll('[id^="order"]');
      orders.forEach((order) => {
        order.style.display = "none";
      });

      // 顯示被點擊的連結對應的頁面
      const targetId = event.currentTarget.getAttribute("data-target");
      const targetOrder = document.getElementById(targetId);
      if (targetOrder) {
        targetOrder.style.display = "block";
      }
    });
  });
});

//讓出生日期只能選今天以前
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("myDateInput").setAttribute("max", today);

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("order"); // 假設父元素的ID為 "order"
  const emptyMessage = document.getElementById("order5"); // 假設無訂單訊息的ID為 "order5"

  function checkIfEmpty() {
    if (container.children.length === 0) {
      emptyMessage.style.display = "block";
    }
  }

  // 初始檢查
  checkIfEmpty();

  if (container) {
    container.addEventListener("click", function (event) {
      if (event.target.classList.contains("cancel-btn")) {
        const isConfirmed = confirm("確定要取消此預約嗎？");
        if (isConfirmed) {
          const liElement = event.target.closest("li.accordion");
          if (liElement) {
            liElement.parentNode.removeChild(liElement);
          }
          // 再次檢查是否為空
          checkIfEmpty();
        }
      }
    });
  }
});