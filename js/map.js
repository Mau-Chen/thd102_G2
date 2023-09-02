// google map route
let map, directionsService, directionsRenderer;

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
  calculateDistance();
};

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
        directionsRenderer.setDirections(response);
        const distance = response.routes[0].legs[0].distance.text;
        const duration = response.routes[0].legs[0].duration.text; // 取得旅程所需時間
        document.getElementById("distanceDisplay").textContent = `${distance}`;
        document.getElementById("durationDisplay").textContent = `${duration}`; // 顯示旅程所需時間
      } else {
        alert("Directions request failed due to " + status);
      }
    });
  } else {
    alert("請輸入有效的出發地和目的地");
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
