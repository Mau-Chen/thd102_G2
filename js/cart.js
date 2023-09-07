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
const hoteldata = JSON.parse(localStorage.getItem('hoteldata'));

// 點加入購物車(狗)
document.getElementById('addDogToCart').addEventListener('click', function () {
  const dogSize = document.querySelector('input[name="dog"]:checked').value;
  const dogBuyNum = document.querySelector('#DogroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;
  const listType = '狗套房';
  const spPrice = 800;

  // 日期格式改 年/月/日
  const [formattedStartDate, formattedEndDate] = hoteldata.date.map(date => date.split('T')[0]);

  const dogInfo = {
    dogSize,
    BuyNum: dogBuyNum,
    product,
    listType,
    listDate_S: formattedStartDate,
    listDate_E: formattedEndDate,
    spPrice,
  };

  // 更新 cartData 
  cartData.push(dogInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));
});

// 點立即預定(狗)
document.getElementById('reserveDog').addEventListener('click', function () {
  const dogSize = document.querySelector('input[name="dog"]:checked').value;
  const dogBuyNum = document.querySelector('#DogroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;
  const listType = '狗套房';
  const spPrice = 800;

  const [formattedStartDate, formattedEndDate] = hoteldata.date.map(date => date.split('T')[0]);

  const dogInfo = {
    dogSize,
    BuyNum: dogBuyNum,
    product,
    listType,
    listDate_S: formattedStartDate,
    listDate_E: formattedEndDate,
    spPrice,
  };

  // 更新 cartData 
  cartData.push(dogInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));

  // 跳到 shopping.html
  window.location.href = 'shopping.html';
});

// 點加入購物車(貓）
document.getElementById('addCatToCart').addEventListener('click', function () {
  const catBuyNum = document.querySelector('#CatroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;
  const listType = '貓套房';
  const spPrice = 800;

  const [formattedStartDate, formattedEndDate] = hoteldata.date.map(date => date.split('T')[0]);

  const catInfo = {
    BuyNum: catBuyNum,
    product,
    listType,
    listDate_S: formattedStartDate,
    listDate_E: formattedEndDate,
    spPrice,
  };

  // 更新 cartData 
  cartData.push(catInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));
});

// 點立即預定(貓)
document.getElementById('reserveCat').addEventListener('click', function () {
  const catBuyNum = document.querySelector('#CatroomNum').value;
  const product = document.querySelector('.hostel-info h3').textContent;
  const listType = '貓套房';
  const spPrice = 800;

  const [formattedStartDate, formattedEndDate] = hoteldata.date.map(date => date.split('T')[0]);

  const catInfo = {
    BuyNum: catBuyNum,
    product,
    listType,
    listDate_S: formattedStartDate,
    listDate_E: formattedEndDate,
    spPrice,
  };

  // 更新 cartData 
  cartData.push(catInfo);
  localStorage.setItem('cartData', JSON.stringify(cartData));

  // 跳到 shopping.html
  window.location.href = 'shopping.html';
});



