// google map route

// import DriverSelector from "./js/components/DriverSelector.js";
// console.log(window.VueUse);
let map, directionsService, directionsRenderer;
async function calculateDistance() {
  const originInput = document.getElementById("start_place_input");
  const originInput_value = originInput.value;
  // console.log(originInput_value);
  // console.log(originInput);
  const destinationInput = document.getElementById("end_place_input");
  const destinationInput_value = destinationInput.value;

  // 使用地點名稱來取得座標
  const geocoder = new google.maps.Geocoder();
  const originCoordinates = await getCoordinates(geocoder, originInput_value);
  const destinationCoordinates = await getCoordinates(
    geocoder,
    destinationInput_value
  );

  // originInput.addEventListener("keyup", function (event) {
  //   if (event.key === "Enter") {
  //     calculateDistance();
  //   }
  // });
  // destinationInput.addEventListener("keyup", function (event) {
  //   if (event.key === "Enter") {
  //     calculateDistance();
  //   }
  // });

  if (originCoordinates && destinationCoordinates) {
    const request = {
      origin: originCoordinates,
      destination: destinationCoordinates,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        // console.log(window.vue_app);

        const vm = window.vue_app._instance.data;
        // console.log(vm.car_menu);
        // console.log(vm.cars_data[vm.car_menu].cost);
        directionsRenderer.setDirections(response);
        const distance = response.routes[0].legs[0].distance.text;
        // console.log(response.routes[0].legs[0].distance);
        // console.log(response.routes[0].legs[0].distance.value);
        let distance_value = response.routes[0].legs[0].distance.value / 1000;
        let roundedDistance = parseFloat(distance_value.toFixed(1));
        // console.log(roundedDistance);
        const car_menu_cost = roundedDistance * vm.cars_data[vm.car_menu].cost;
        // console.log(car_menu_cost);
        const duration = response.routes[0].legs[0].duration.text; // 取得旅程所需時間
        document.getElementById("distanceDisplay").textContent = `${distance}`;
        document.getElementById("durationDisplay").textContent = `${duration}`; // 顯示旅程所需時間
        document.getElementById(
          "costDisplay"
        ).textContent = `NT$ ${car_menu_cost}`;

        // console.log(costDisplay);
      } else {
        alert("Directions request failed due to " + status);
      }
    });
  } else {
    alert("請輸入有效的出發地和目的地");
  }
}

async function getCoordinates(geocoder, location) {
  // await geocoder.geocode({ address: location }, (results, status) => {
  //   console.log("rr");
  //   console.log(results);
  //   if (status === "OK") {
  //     return results[0].geometry.location;
  //     //resolve(results[0].geometry.location);
  //   } else {
  //     //reject(null);
  //     return null;
  //   }
  // });
  // console.log("tt");

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        resolve(results[0].geometry.location);
      } else {
        reject(null);
      }
    });
  });
}

window.onload = async function () {
  await google.maps.importLibrary("places", "geometry");

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.05214, lng: 121.54325 },
    zoom: 15,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const searchButton = document.getElementById("driverbtn");
  // console.log(searchButton);
  searchButton.addEventListener("click", calculateDistance);

  // 網頁加載完畢後，立即進行地圖搜尋
  let a = calculateDistance();
};

//將資料放在localStorage
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".btn_5_border.addCart");
  const msgStartInput = document.querySelector("#start_place_input");
  const msgEndInput = document.querySelector("#end_place_input");
  const datePickerInput = document.querySelector('input[name="date-picker"]');
  const carMenuInput = document.querySelector(".car_menu_input");
  const listDistanceSpan = document.querySelector("#distanceDisplay");

  // 存資料用
  let cartData = [];

  function addToCart() {
    // 取msg_start和msg_end
    const msgStartValue = msgStartInput.value;
    const msgEndValue = msgEndInput.value;

    // 取日期
    const listDateValue = datePickerInput.value;

    // 分別取得日期和時間
    const dateParts = listDateValue.split("｜");
    const listDateD = dateParts[0]; // 日期
    const listDateT = dateParts[1]; // 時間

    // 取車種
    const listTypeValue = carMenuInput.value;

    // 取距離數字(含小數)
    const listDistanceText = listDistanceSpan.textContent;
    const listDistanceValue = parseFloat(listDistanceText.match(/\d+\.\d+/)[0]);

    // 創物件拿來放資料組
    const data = {
      startadd: msgStartValue,
      endadd: msgEndValue,
      listDate_S: listDateD, // 存日期
      listDate_E: listDateD,
      listDate_T: listDateT, // 存時間
      listType: listTypeValue,
      listDistance: listDistanceValue,
      product: "寵物接送",
    };

    // 根據 listTypeValue 設置 spPrice
    if (listTypeValue === "轎車") {
      data.spPrice = 40;
    } else if (listTypeValue === "休旅車") {
      data.spPrice = 50;
    }

    cartData.push(data);

    // 更新 localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // 綁按鈕點擊
  addToCartButton.addEventListener("click", addToCart);

  const goSPButton = document.querySelector(".btn_5.col-6");
  goSPButton.addEventListener("click", function () {
    addToCart();
    window.location.href = "shopping.html";
  });

  // 在初始化時，從 localStorage 中讀取 cartData 並轉換為陣列
  const storedCartData = localStorage.getItem("cartData");
  if (storedCartData) {
    cartData = JSON.parse(storedCartData);
  }
});

//顯示已加入購物車

let addCart = document.querySelector(".addCart");
let popup = document.querySelector(".ol-contentShop");

addCart.addEventListener("click", function () {
  // console.log(popup);
  popup.style.opacity = "1";

  setTimeout(function () {
    popup.style.opacity = "0";
  }, 3000);
});
