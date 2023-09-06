 // Datepicker & 寵物類型
 const select_pet = Vue.createApp({
    data() {
      return {
        isPop: false,
        numCat: 1,
        numDog: 1,
        date: "",
        format: `MM月dd日`,
        start: false,
        location: "",
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
      // console.log("sss");
      this.start = true;
      // 預設選擇日期
      const today = new Date()
      const startDate = today.setDate(today.getDate()+ 1)
      const endDate = today.setDate(today.getDate()+1)
      this.date = [startDate, endDate]
      this.getLocalStorage();
    },
    methods: {
      toChange(property, value) {
        if (
          (value > 0 && this[property] < 9) ||
          (value < 0 && this[property] > 0)
        ) {
          this[property] += value;
        }
      },
      getLocalStorage(){
        const saveData = JSON.parse(localStorage.getItem("hoteldata"));
        if(saveData){
        this.location = saveData.location;
        this.date = saveData.date;
        this.numCat = saveData.petnum[0];
        this.numDog = saveData.petnum[1];
        }
        // console.log(saveData);
  

        // 清空localStorage資料
        // localStorage.removeItem("hoteldata");
        },
    },
  });
  select_pet.component("Datepicker", VueDatePicker);

  const vm233 = select_pet.mount("#select_pet");
//   if(document.getElementById('searchButton')){
//     const searchButton_el = document.getElementById('searchButton');
//   searchButton_el.addEventListener("click",function(){
//     vm233.saveToLocalstorage();
//   })
//   }

//   const vm233 = select_pet.mount("#select_pet");