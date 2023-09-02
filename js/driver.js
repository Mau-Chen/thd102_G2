// import DriverSelector from "./js/components/DriverSelector.js";
// console.log(window.VueUse);
const app = Vue.createApp({
  data() {
    return {
      date: "",
      format: `Y年 MM月 dd日 ｜HH:mm`,
      // format: `yy年 MM月 dd日 ｜HH ：mm`,
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
        },
        休旅車: {
          limit: 4,
          cars_text: "乘客＋毛孩最多4位",
        },
      },
      // cars: [
      //   {
      //     id: "a",
      //     cars_type: "轎車",
      //     cars_text: "乘客＋毛孩最多3位",
      //   },
      //   {
      //     id: "b",
      //     cars_type: "休旅車",
      //     cars_text: "乘客＋毛孩最多4位",
      //   },
      // ],
    };
  },
  computed: {
    limit_passenger() {
      console.log(this.cars_data[this.car_menu].limit);
      return (
        this.cars_data &&
        this.cars_data[this.car_menu] &&
        this.cars_data[this.car_menu].limit
      );
    },
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
  watch: {
    date() {
      console.log(this.date);
      document.getElementById("");
    },
  },
  methods: {
    format_preview(date) {
      console.log(date);
      return date + "sssss";
    },
    change() {
      let msg_start = this.msg_start;
      let msg_end = this.msg_end;
      this.msg_start = msg_end;
      this.msg_end = msg_start;
    },
    car_click(x) {
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
  },
  mounted() {
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
      console.log(date_picker);
      date_picker = date_picker
        .replace("年 ", "/")
        .replace("月 ", "/")
        .replace("日 ", "")
        .replace(" ", "")
        .replace("｜", " ");

      // 23/09/01/｜20 ：46
      console.log(date_picker);
      // 23年 08月 31日 ｜19 ：32
      // this.date = Date.parse("2023/08/31 19:09");
      this.date = Date.parse(date_picker);
      // console.log(this.date);
    } else {
      const startDate = new Date();
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      // this.date = [startDate, endDate];
      console.log(startDate);
      this.date = startDate;
    }

    if (car_type) {
      this.car_menu = car_type;
    }

    if (passenger_input) {
      this.passenger_counter = Number(passenger_input);
    }

    if (pet_input) {
      this.pet_counter = Number(pet_input);
    }

    document.addEventListener(
      "click",
      (e) => {
        console.log(e);
        console.log(e.target);
        if (e.target.classList.contains("car_menu_input")) {
          return false;
        }
        if (this.car_menu_open === true) {
          this.car_menu_open = false;
        }

        if (
          e.target.classList.contains("passenger_menu_input") ||
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
app.component("Datepicker", VueDatePicker);
// app.component("DriverSelector", DriverSelector);
app.mount("#driver_app");
