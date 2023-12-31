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
};


// 初始化 cartData
let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

// 取localStorage的 hoteldata
// const hoteldata = vm233.date;

// 點加入購物車(狗)
document.getElementById('addDogToCart').addEventListener('click', function () {
  const dogSize = document.querySelector('input[name="dog"]:checked').value;
  const dogBuyNum = document.querySelector('#DogroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;

  // 日期格式改 年/月/日
  const [formattedStartDate, formattedEndDate] = vm233.date;

  const dogInfo = {
    dogSize,
    BuyNum: dogBuyNum,
    product,
    listDate_S: formattedStartDate.toISOString().slice(0, 10),
    listDate_E: formattedEndDate.toISOString().slice(0, 10),
    listType: "狗套房",
    spPrice: 800,
    type: "spHostel",
    spStepper: true,
    pictureSrc_m: "./images/pic/shop/goShop02_m.png",
    pictureSrc: "./images/pic/shop/goShop02.png",
  };

  // 更新 cartData 
  cartData.push(dogInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));

  // 更新購物車數量
  updateCartItemCount();
});

// 點立即預定(狗)
document.getElementById('reserveDog').addEventListener('click', function () {
  const dogSize = document.querySelector('input[name="dog"]:checked').value;
  const dogBuyNum = document.querySelector('#DogroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;
  const listType = '狗套房';
  const spPrice = 800;
  //todo
  const [formattedStartDate, formattedEndDate] = vm233.date;


  const dogInfo = {
    dogSize,
    BuyNum: dogBuyNum,
    product,
    listDate_S: formattedStartDate.toISOString().slice(0, 10),
    listDate_E: formattedEndDate.toISOString().slice(0, 10),
    listType: "狗套房",
    spPrice: 800,
    type: "spHostel",
    spStepper: true,
    pictureSrc_m: "./images/pic/shop/goShop02_m.png",
    pictureSrc: "./images/pic/shop/goShop02.png",
  };

  // 更新 cartData 
  cartData.push(dogInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));
  // 更新購物車數量
  updateCartItemCount();

  // 跳到 shopping.html
  window.location.href = 'shopping.html';
});

// 點加入購物車(貓）
document.getElementById('addCatToCart').addEventListener('click', function () {
  const catBuyNum = document.querySelector('#CatroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;

  const [formattedStartDate, formattedEndDate] = vm233.date;

  const catInfo = {
    BuyNum: catBuyNum,
    product,
    listDate_S: formattedStartDate.toISOString().slice(0, 10),
    listDate_E: formattedEndDate.toISOString().slice(0, 10),
    listType: "貓套房",
    spPrice: 800,
    type: "spHostel",
    spStepper: true,
    pictureSrc_m: "./images/pic/shop/goShop03_m.png",
    pictureSrc: "./images/pic/shop/goShop03.png",
  };

  // 更新 cartData 
  cartData.push(catInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));
  // 更新購物車數量
  updateCartItemCount();
});

// 點立即預定(貓)
document.getElementById('reserveCat').addEventListener('click', function () {
  const catBuyNum = document.querySelector('#CatroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;

  const [formattedStartDate, formattedEndDate] = vm233.date;

  const catInfo = {
    BuyNum: catBuyNum,
    product,
    listDate_S: formattedStartDate.toISOString().slice(0, 10),
    listDate_E: formattedEndDate.toISOString().slice(0, 10),
    listType: "貓套房",
    spPrice: 800,
    type: "spHostel",
    spStepper: true,
    pictureSrc_m: "./images/pic/shop/goShop03_m.png",
    pictureSrc: "./images/pic/shop/goShop03.png",
  };

  // 更新 cartData 
  cartData.push(catInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));
  // 更新購物車數量
  updateCartItemCount();

  // 跳到 shopping.html
  window.location.href = 'shopping.html';
});



