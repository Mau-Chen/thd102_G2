// import DriverSelector from "./js/components/DriverSelector.js";
// console.log(window.VueUse);
const app = Vue.createApp({
  data() {
    return {
      date: "",
      format: `MM月 dd日 ｜HH ：mm`,
      msg_start: "",
      msg_end: "",
      passenger_counter: 1,
      pet_counter: 1,
      car_menu: "轎車",
      car_menu_open: false,
      passenger_menu_open: false,
      passenger: "乘客",
      pet: "寵物",
      cars: [
        {
          id: "a",
          cars_type: "轎車",
          cars_text: "乘客＋毛孩最多3位",
        },
        {
          id: "b",
          cars_type: "休旅車",
          cars_text: "乘客＋毛孩最多4位",
        },
      ],
    };
  },
  computed: {
    disabledDates() {
      let today = new Date();
      let disabledtoday = new Date(today);
      disabledtoday.setHours(today.getHours() + 3);

      return disabledtoday;
    },
    show_passenger_quantity() {
      return `${this.passenger_counter} 位乘客，${this.pet_counter} 位毛孩`;
    },
  },
  methods: {
    change() {
      let msg_start = this.msg_start;
      let msg_end = this.msg_end;
      this.msg_start = msg_end;
      this.msg_end = msg_start;
    },
    car_click(x) {
      this.car_menu = x.cars_type;
      this.passenger_counter = 1;
      this.pet_counter = 1;
      this.$refs.dirver_Subtotal_icon_control.classList.remove("limit");
      this.$refs.pet_Subtotal_icon_control.classList.remove("limit");
    },
    PlusOne(counter_name) {
      let car_class = 0;
      // this.passenger_counter = 1;
      // this.pet_counter = 1;
      if (this.car_menu === "轎車") {
        car_class = 3;

        if (this.passenger_counter + this.pet_counter < 3) {
          this[counter_name]++;
        }
        // console.log(this.passenger_counter);
        // console.log(this.pet_counter);

        if (this.passenger_counter + this.pet_counter >= car_class) {
          this.$refs.dirver_Subtotal_icon_control.classList.add("limit");
          this.$refs.pet_Subtotal_icon_control.classList.add("limit");
        }

        if (this.passenger_counter + this.pet_counter >= 3) {
          let dirver_Subtotal_icon_control =
            this.$refs.dirver_Subtotal_icon_control;
          dirver_Subtotal_icon_control.classList.add("limit");
          let pet_control = this.$refs.pet_Subtotal_icon_control;
          pet_control.classList.add("limit");
        }
      }

      if (this.car_menu === "休旅車") {
        car_class = 4;

        if (this.passenger_counter + this.pet_counter < 4) {
          this[counter_name]++;
        }
        console.log(this.passenger_counter);
        console.log(this.pet_counter);
        if (this.passenger_counter + this.pet_counter == car_class) {
          // console.log("aaa");
          this.$refs.dirver_Subtotal_icon_control.classList.add("limit");
          this.$refs.pet_Subtotal_icon_control.classList.add("limit");
        }
      }
    },
    MinusOne(counter_name, e) {
      if (e.target.classList.contains("limit")) {
        // 灰色
      } else {
        // 黑色
        this[counter_name]--;
        if (this.car_menu === "轎車") {
          car_class_minus = 3;
          if (this.passenger_counter + this.pet_counter <= car_class_minus) {
            this.$refs.dirver_Subtotal_icon_control.classList.remove("limit");
            this.$refs.pet_Subtotal_icon_control.classList.remove("limit");
          }
        }
        if (this.car_menu === "休旅車") {
          car_class_minus = 4;
          if (this.passenger_counter + this.pet_counter <= car_class_minus) {
            this.$refs.dirver_Subtotal_icon_control.classList.remove("limit");
            this.$refs.pet_Subtotal_icon_control.classList.remove("limit");
          }
        }
      }
    },
  },
  mounted() {
    const startDate = new Date();
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    // this.date = [startDate, endDate];
    this.date = startDate;
    // this.date = [startDate];

    // JavaScript 取得 Url 的 Query String
    let urlParams = new URLSearchParams(window.location.search);
    let start_place = urlParams.get("start_place");
    let end_place = urlParams.get("end_place");
    let date_picker = urlParams.get("date-picker");
    let car_type = urlParams.get("car-type");
    let passenger_input = urlParams.get("passenger");
    let pet_input = urlParams.get("pet");

    if (start_place) {
      this.msg_start = start_place;
    }

    if (end_place) {
      this.msg_end = end_place;
    }

    if (date_picker) {
      this.format = date_picker;
    }

    if (car_type) {
      this.car_menu = car_type;
    }

    if (passenger_input) {
      this.passenger_counter = passenger_input;
    }

    if (pet_input) {
      this.pet_counter = pet_input;
    }

    // vm_2.show_passenger_quantity =
    //   passenger_input_el + "位乘客，" + pet_input_el + "位毛孩";
  },
});
app.component("Datepicker", VueDatePicker);
// app.component("DriverSelector", DriverSelector);
const vm_2 = app.mount("#driver_app");

//顯示已加入購物車
let addCart = document.querySelector(".addCart");
let popup = document.querySelector(".ol-contentShop");

addCart.addEventListener("click", function () {
  console.log(popup);
  popup.style.opacity = "1";

  setTimeout(function () {
    popup.style.opacity = "0";
  }, 3000);
});

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
  console.log(searchButton);
  searchButton.addEventListener("click", calculateDistance);

  // 網頁加載完畢後，立即進行地圖搜尋
  calculateDistance();
};

async function calculateDistance() {
  const originInput = document.getElementById("start_place_input").value;
  // console.log(originInput);
  const destinationInput = document.getElementById("end_place_input").value;
  // console.log(destinationInput);

  // 使用地點名稱來取得座標
  const geocoder = new google.maps.Geocoder();
  const originCoordinates = await getCoordinates(geocoder, originInput);
  const destinationCoordinates = await getCoordinates(
    geocoder,
    destinationInput
  );

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
        // document.getElementById(
        //   "distanceDisplay"
        // ).textContent = `Distance: ${distance}`;
        document.getElementById("durationDisplay").textContent = `${duration}`; // 顯示旅程所需時間
      } else {
        alert("Directions request failed due to " + status);
      }
    });
  } else {
    alert("請輸入有效的出發地和目的地");
  }
}
searchButton.addEventListener("click", calculateDistance);
originInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    calculateDistance();
  }
});

destinationInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    calculateDistance();
  }
});

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
