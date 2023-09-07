window.vue_app = Vue.createApp({
  data() {
    return {
      year: new Date().getFullYear(),
      date: "",
      msg_start: "",
      msg_end: "",
      passenger_counter: 1,
      pet_counter: 1,
      car_menu: "轎車",
      car_menu_open: false,
      passenger_menu_open: false,
      passenger: "乘客",
      pet: "寵物",
      cars_data: {
        轎車: {
          limit: 3,
          cars_text: "乘客＋毛孩最多3位",
          cost: 40,
        },
        休旅車: {
          limit: 4,
          cars_text: "乘客＋毛孩最多4位",
          cost: 50,
        },
      },
    };
  },
  computed: {
    limit_passenger() {
      // console.log(this.cars_data[this.car_menu].limit);
      return (
        this.cars_data &&
        this.cars_data[this.car_menu] &&
        this.cars_data[this.car_menu].limit
      );
    },
    disabledDates() {
      let today = new Date();
      let disabledtoday = new Date(today);
      // console.log(today);
      disabledtoday.setHours(today.getHours() + 3);

      return disabledtoday;
    },
    show_passenger_quantity() {
      return `${this.passenger_counter} 位乘客，${this.pet_counter} 位毛孩`;
    },
  },
  methods: {
    format(startDate) {
      let year = startDate.getFullYear();
      let month = startDate.getMonth() + 1;
      let day = startDate.getDate();
      let hour = (startDate.getHours() < 10 ? "0" : "") + startDate.getHours();
      let minute =
        (startDate.getMinutes() < 10 ? "0" : "") + startDate.getMinutes();

      return `${month}月${day}日｜${hour}:${minute}`;
    },

    change() {
      let msg_start = this.msg_start;
      let msg_end = this.msg_end;
      this.msg_start = msg_end;
      this.msg_end = msg_start;
    },
    car_click() {
      // this.car_menu = x.cars_type;
      this.passenger_counter = 1;
      this.pet_counter = 1;
    },
    PlusOne(counter_name) {
      if (this.passenger_counter + this.pet_counter < this.limit_passenger) {
        this[counter_name]++;
      }
    },

    MinusOne(counter_name, e) {
      if (this[counter_name] !== 1) {
        this[counter_name]--;
      }
    },
    handleInternal() {
      // Do something
      // alert(`Current selection - ${date}`);
      let driver_second_Date = document.getElementById("driver_second_Date");
      if (driver_second_Date) {
        // console.log("aaa");
        // console.log(this.date);
        let driver_second_time = new Date(this.date);
        // console.log(driver_second_time);
        let driver_month = driver_second_time.getMonth() + 1;
        let driver_date = driver_second_time.getDate();
        let driver_hour =
          (driver_second_time.getHours() < 10 ? "0" : "") +
          driver_second_time.getHours();
        let driver_minutes =
          (driver_second_time.getMinutes() < 10 ? "0" : "") +
          driver_second_time.getMinutes();
        driver_second_Date.textContent = `${driver_month}月${driver_date}日｜${driver_hour}：${driver_minutes}`;
      }
    },
  },
  mounted() {
    // this.date = [startDate];

    // JavaScript 取得 Url 的 Query String
    // const path = window.location.pathname;
    // const hash = window.location.hash;
    let urlParams = new URLSearchParams(window.location.search);
    let start_place = urlParams.get("start_place");
    let end_place = urlParams.get("end_place");
    let date_picker = urlParams.get("date-picker");
    let car_type = urlParams.get("car-type");
    let passenger_input = urlParams.get("passenger");
    let pet_input = urlParams.get("pet");

    // urlParams.set("car-type", this.msg_start);
    // window.history.replaceState(
    //   {},
    //   "",
    //   `${path}?${urlParams.toString()}${hash}`
    // );

    if (start_place) {
      this.msg_start = start_place;
      // urlParams.delete("start_place");
    }

    if (end_place) {
      this.msg_end = end_place;
      // urlParams.delete("end_place");
    }

    if (date_picker) {
      let driver_date_picker = date_picker
        // .replace("年", "/")
        .replace("月", "/")
        .replace("日", "")
        .replace(" ", "")
        .replace("｜", " ");
      // console.log(driver_date_picker);

      // 23/09/01/｜20 ：46
      // console.log(date_picker);
      // 23年 08月 31日 ｜19 ：32
      // this.date = Date.parse("2023/08/31 19:09");
      driver_date_picker = this.year + "/" + driver_date_picker;
      console.log(driver_date_picker);
      this.date = Date.parse(driver_date_picker);
      // urlParams.delete("date-picker");
    } else {
      const startDate = new Date();
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      // this.date = [startDate, endDate];
      // console.log(startDate);
      this.date = new Date(startDate).setHours(startDate.getHours() + 2);
      // urlParams.delete("date-picker");
    }

    if (car_type) {
      this.car_menu = car_type;
      // urlParams.delete("car-type");
    }

    if (passenger_input) {
      this.passenger_counter = Number(passenger_input);
      // urlParams.delete("passenger");
    }

    if (pet_input) {
      this.pet_counter = Number(pet_input);
      // urlParams.delete("pet");
    }
    // history.replaceState(null, null, window.location.pathname);
    // let driver_result = urlParams.split("?")[0];
    // console.log(driver_result);
    // urlParams.delete("?");
    // console.log(urlParams);

    document.addEventListener(
      "click",
      (e) => {
        if (e.target.classList.contains("car_menu_input")) {
          return false;
        }
        if (this.car_menu_open === true) {
          this.car_menu_open = false;
        }

        if (
          e.target.classList.contains("passenger_menu_input") ||
          e.target.classList.contains("dirver_Subtotal_icon") ||
          e.target.classList.contains("pointer_none") ||
          e.target.classList.contains("driver_Subtotal_icon_wrapper")
        ) {
          return false;
        }
        if (this.passenger_menu_open === true) {
          this.passenger_menu_open = false;
        }
      },
      false
    );
  },
});
window.vue_app.component("Datepicker", VueDatePicker);
// app.component("DriverSelector", DriverSelector);
window.vue_app.mount("#driver_app");
