 //顯示已加入購物車
 let addCart = document.querySelectorAll(".addCart");
 let popup = document.querySelector(".ol-contentShop");

 for (let index = 0; index < addCart.length; index++) {
   const element = addCart[index];

   element.addEventListener("click", function () {
     popup.style.opacity = "1";

     setTimeout(function () {
       popup.style.opacity = "0";
     }, 3000);
   });
 }