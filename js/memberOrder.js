import list from "./list.js";

const app = Vue.createApp({
  data() {
    return {
      index: 0,
      tasks: [],
      token: '如果你有成功，你應該看不到我',
      userData: {
        NAME: '',
        PHONE: '',
        ADDRESS: '',
        BRD: ''
      },
    }
  },
  mounted() {
    this.Initial();
  },
  methods: {
    Initial() {
      const MEMBER_ID = JSON.parse(localStorage.getItem('member'));
      const account = MEMBER_ID.account;

      if(!MEMBER_ID){
        return;
      }
      // fixme: path need fix
      axios.get(`/thd102/g2/php/Member/orderlist.php?MEMBER_ID=${account}`)
        .then(response => {
          const data = response.data;

          const result = data.map((item) => ({
            OrderId: item.OrderId,
            OrderDate: item.OrderDate,
            reduce: item.reduce,
            OrderList: item.OrderList.map((list) => ({
              name: list.display_hotelname,
              image: this.selectPicture(list.PRODUCTNAME),
              price: list.NOWPRICE,
              date: list.display_date,
              product: list.PRODUCTNAME
            }))
          }))
          this.tasks = result;
        })
        .catch(error => {
          console.error('An error occurred while fetching data:', error);
        })
    },
    Secondary() {
      const setdata = localStorage.getItem('member');

      if(!setdata){
        return;
      }

      if (setdata) {
        const parsedData = JSON.parse(setdata);
        this.token = parsedData['account'];

        this.nextStep(this.token);
      }
    },
    nextStep(value) {
      if (value) {
        axios.get(`/thd102/g2/php/Member/setting.php?account=${value}`)
          .then(res => {
            const data = res.data;

            const result = data.map((item) => ({
              NAME: item.NAME,
              PHONE: item.PHONE,
              ADDRESS: item.ADDRESS,
              BRD: item.BRD
            }))
            Object.assign(this.userData, ...result);
          })
      }
    },
    updateData() {
      const updateObj = {
        account: this.token,
        userData: this.userData
      };
      axios.post(`/thd102/g2/php/Member/settingUpdate.php`, updateObj)
        .then(res => {
          if (res.data.message === "更新成功") {
            alert("資料已更新");
          }
        })
        .catch(err => {
          console.error("更新失敗：", err);
        });
    },
    changePage(value) {
      this.index = value;
    },
    selectPicture(string) {
      switch (string) {
        case '小轎車':
          return './images/pic/shop/goShop01.png';
        case '休旅車':
          return './images/pic/shop/goShop01.png';
        case '狗套房':
          return './images/pic/shop/goShop02.png';
        case '貓套房':
          return './images/pic/shop/goShop03.png'
        default:
          return './images/pic/shop/goShop02.png';
      }
    },
    logout(){
      vm.logout();
    }
  }
});

app.component("list", list);

const orderlist = app.mount("#order");