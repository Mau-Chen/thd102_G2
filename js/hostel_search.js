// Datepicker & 寵物類型
const select_pet = Vue.createApp({
  data() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const endDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    return {
      isPop: false,
      numCat: 1,
      numDog: 1,
      date: [startDate, endDate],
      format: `MM月dd日`,
      start: false,
      location: "",
      searchEvents: false,
      searchTarget: {
        searchName: '',
        number:''
      },
      fakeHotelImage:[
        "./images/pic/hostel/hostel page2/hostel-pic1.png",
        "./images/pic/hostel/hostel page2/hostel-pic2.png",
        "./images/pic/hostel/hostel page2/hostel-pic3.png",
        "./images/pic/hostel/hostel page2/hostel-pic4.png",
        "./images/pic/hostel/hostel page2/hostel-pic5.png",
        "./images/pic/hostel/hostel page2/hostel-pic6.png",
        "./images/pic/hostel/hostel page2/hostel-pic7.png",
        "./images/pic/hostel/hostel page2/hostel-pic8.png",
        "./images/pic/hostel/hostel page2/hostel-pic9.png",
      ],
      cardItems: [
        {
          id: 1,
          name: "快樂寵物旅館",
        },
        {
          id: 2,
          name: "毛起來住",
        },
        {
          id: 3,
          name: "汪堡",
        }
      ],
      cities: [
        { name: "台北", accommodations: 30 },
        { name: "台中", accommodations: 20 },
        { name: "台南", accommodations: 8 },
        { name: "高雄", accommodations: 15 },
        { name: "新竹", accommodations: 8 },
        { name: "花蓮", accommodations: 10 },
        { name: "嘉義", accommodations: 6 },
        { name: "外島", accommodations: 3 },
      ],
    };
  },
  computed: {
    disabledDates() {
      let today = new Date();
      let disabledtoday = new Date(today);
      disabledtoday.setDate(disabledtoday.getDate() + 1);

      return disabledtoday;
    },
    hoursArray() {
      const arr = [];
      for (let i = 0; i < 24; i++) {
        arr.push({ text: i < 10 ? `0${i}` : i, value: i });
      }
      return arr;
    },
    minutesArray() {
      const arr = [];
      for (let i = 0; i < 60; i++) {
        arr.push({ text: i < 10 ? `0${i}` : i, value: i });
      }
      return arr;
    },
  },
  mounted() {
    this.initial();
    this.start = true;
    // 預設選擇日期
    // const today = new Date();
    // const startDate = today.setDate(today.getDate() + 1);
    // console.log(new Date(startDate))
    // const endDate = today.setDate(today.getDate() + 1);
    // console.log(new Date(endDate))
    // this.date = [new Date(startDate), new Date(endDate)];
    // console.log(this.date);
    // this.getLocalStorage();

    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("dropDownParent") ||
        e.target.classList.contains("pet_menu_open") ||
        e.target.classList.contains("dropDownItem")
      ) {
        return (this.isPop = !this.isPop);
      }
      if (
        e.target.classList.contains("minus") ||
        e.target.classList.contains("plus")
      ) {
        return (this.isPop = true);
      }
      if (this.isPop == true) {
        this.isPop = false;
      }
    this.isPop = false
    console.log(this.isPop);
    });
  },
  methods: {
    async initial() {
      try {
        const response = await fetch('/thd102/g2/php/hostel/selectone.php');

        if (!response.ok) {
          throw new Error('數據錯誤');
        }

        const res = await response.json();

        if (res) {
          Object.assign(this.cities, res);
        }
      } catch (error) {
        console.error('發生錯誤：', error);
      }
    }
    ,
    toChange(property, value) {
      if (
        (value > 0 && this[property] < 9) ||
        (value < 0 && this[property] > 0)
      ) {
        this[property] += value;
      }
    },
    //點擊卡片將地點帶入欄位
    updateLocation(value) {
      this.location = value.toString();
      this.saveToLocalstorage()
    },
    saveToLocalstorage() {
      const saveData = {
        location: this.location,
        date: this.date,
        petnum: [this.numCat, this.numDog],
      };
      // 地點欄位不可為空值
      // if (
      //   saveData.location !== "" &&
      //   (saveData.location !== saveData.date) !== ""
      // ) {
      localStorage.setItem("hoteldata", JSON.stringify(saveData));
      window.location.href = "hostel-booking.html";
      // }
    },
    getLocalStorage() {
      const saveData = JSON.parse(localStorage.getItem("hoteldata"));
      if (saveData) {
        this.location = saveData.location;
        this.date = saveData.date;
        this.numCat = saveData.petnum[0];
        this.numDog = saveData.petnum[1];
      }
      // console.log(saveData);

      // 清空localStorage資料
      // localStorage.removeItem("hoteldata");
    },
    search(name, value) {
      this.searchTarget.searchName = name;
      this.searchTarget.number = value;
      this.location = name;
      this.searchEvents = true;
    }
  },
});
select_pet.component("Datepicker", VueDatePicker);

const vm233 = select_pet.mount("#select_pet");
if (document.getElementById("searchButton")) {
  const searchButton_el = document.getElementById("searchButton");
  searchButton_el.addEventListener("click", function () {
    vm233.saveToLocalstorage();
  });
}

//   const vm233 = select_pet.mount("#select_pet");
