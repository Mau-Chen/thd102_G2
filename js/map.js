const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#686868",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: "-22",
      },
      {
        visibility: "on",
      },
      {
        color: "#b4b4b4",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        saturation: "-51",
      },
      {
        lightness: "11",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        saturation: "3",
      },
      {
        lightness: "-56",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: "-52",
      },
      {
        color: "#9094a0",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "6.13",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        weight: "1.24",
      },
      {
        saturation: "-100",
      },
      {
        lightness: "-10",
      },
      {
        gamma: "0.94",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b4b4b4",
      },
      {
        weight: "5.40",
      },
      {
        lightness: "7",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#231f1f",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#595151",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        lightness: "-16",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#d7d7d7",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text",
    stylers: [
      {
        color: "#282626",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: "-41",
      },
      {
        lightness: "-41",
      },
      {
        color: "#2a4592",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "1.10",
      },
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: "-16",
      },
      {
        weight: "0.72",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: "-37",
      },
      {
        color: "#2a4592",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#eeed6a",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#0a0808",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#b7e4f4",
      },
      {
        visibility: "on",
      },
    ],
  },
];

// google map route

// import DriverSelector from "./js/components/DriverSelector.js";
// console.log(window.VueUse);
// google map route
let map, directionsService, directionsRenderer;

async function calculateDistance() {
  try {
    // 移除先前的路線
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    const originInput = document.getElementById("start_place_input");
    const originInput_value = originInput.value;
    const destinationInput = document.getElementById("end_place_input");
    const destinationInput_value = destinationInput.value;

    const geocoder = new google.maps.Geocoder();
    const originCoordinates = await getCoordinates(geocoder, originInput_value);
    const destinationCoordinates = await getCoordinates(
      geocoder,
      destinationInput_value
    );

    if (originCoordinates && destinationCoordinates) {
      const request = {
        origin: originCoordinates,
        destination: destinationCoordinates,
        travelMode: "DRIVING",
      };

      directionsService.route(request, (response, status) => {
        if (status === "OK") {
          const vm = window.vue_app._instance.data;
          // 自訂路徑顏色
          directionsRenderer = new google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: "#66d5c0", // 自訂線條顏色
              strokeWeight: 10, // 路線的粗度，可以根據需要調整
              strokeOpacity: 0.9, // 自訂路線透明度
            },
          });
          directionsRenderer.setMap(map);
          directionsRenderer.setDirections(response);
          const distance = response.routes[0].legs[0].distance.text;
          let distance_value = response.routes[0].legs[0].distance.value / 1000;
          let roundedDistance = parseFloat(distance_value.toFixed(1));
          const car_menu_cost =
            roundedDistance * vm.cars_data[vm.car_menu].cost;
          const duration = response.routes[0].legs[0].duration.text;
          document.getElementById(
            "distanceDisplay"
          ).textContent = `${distance}`;
          document.getElementById(
            "durationDisplay"
          ).textContent = `${duration}`;
          document.getElementById(
            "costDisplay"
          ).textContent = `NT$ ${car_menu_cost}`;

          // 計算路線後，調整地圖的可視範圍
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(originCoordinates);
          bounds.extend(destinationCoordinates);
          map.fitBounds(bounds);
        } else {
          alert("Directions request failed due to " + status);
        }
      });
    } else {
      alert("請輸入有效的出發地和目的地");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getCoordinates(geocoder, location) {
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
    zoom: 12,
    styles: mapStyles, // 將自訂地圖樣式應用到地圖中
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const searchButton = document.getElementById("driverbtn");
  searchButton.addEventListener("click", calculateDistance);

  calculateDistance(); // 網頁加載完畢後，立即進行地圖搜尋
};

//將資料放在localStorage
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".btn_5_border.addCart");
  const msgStartInput = document.querySelector("#start_place_input");
  const msgEndInput = document.querySelector("#end_place_input");
  const datePickerInput = document.querySelector('input[name="date-picker"]');
  const carMenuInput = document.querySelector(".car_menu_input");
  const listDistanceSpan = document.querySelector("#distanceDisplay");
  // console.log(datePickerInput.value);

  // 存資料用
  let cartData = [];

  //改日期格式YYYY-MM-DD
  function changeYMD(dateString) {
    // 用正則式取年、月、日
    const match = dateString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const year = match[1];
      const month = match[2].padStart(2, "0");
      const day = match[3].padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return dateString;
  }

  function addToCart() {
    // 取msg_start和msg_end
    const msgStartValue = msgStartInput.value;
    const msgEndValue = msgEndInput.value;

    // 取日期
    const listDateValue = datePickerInput.value;
    console.log(listDateValue);

    // 分別取得日期和時間
    const dateParts = listDateValue.split("｜");
    const listDateD = changeYMD(dateParts[0]); // 日期
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
      type: "spDriver",
      spStepper: false,
      BuyNum: 1,
      pictureSrc_m: "./images/pic/shop/goShop01_m.png",
      pictureSrc: "./images/pic/shop/goShop01.png",
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
    // 更新購物車數量
    updateCartItemCount();
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
