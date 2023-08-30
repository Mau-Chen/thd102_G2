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
          console.log("aaa");
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
  },
});
app.component("Datepicker", VueDatePicker);
// app.component("DriverSelector", DriverSelector);
const vm_1 = app.mount("#driver_app");

window.addEventListener("click", function (e) {
  console.log(e.target);
});
