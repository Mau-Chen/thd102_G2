const memberForm = Vue.createApp({
    data(){
      return{
        token: '如果你有成功，你應該看不到我',
        userData:{
          NAME: '',
          PHONE: '',
          ADDRESS: '',
          BRD:''
        }
      }
    },
    mounted(){
      this.initial()
    },
    methods:{
      initial(){
        const setdata = localStorage.getItem('member');
        if (setdata) {
            const parsedData = JSON.parse(setdata);
            this.token = parsedData['account'];

            this.nextStep(this.token);
        }
      },
      nextStep(value){
        if(value){
          axios.get(`/thd102/g2/php/Member/setting.php?account=${value}`)
          .then(res => {
            const data = res.data;

            const result = data.map((item)=>({
              NAME: item.NAME,
              PHONE: item.PHONE,
              ADDRESS: item.ADDRESS,
              BRD: item.BRD
            }))

            Object.assign(this.userData, ...result);
          })
        }
      },
      updateData(){
      const updateObj = {
        account: this.token,
        userData: this.userData
      };
      axios.post(`/thd102/g2/php/Member/settingUpdate.php`, updateObj)
      .then(res => {
        if(res.data.message === "更新成功"){
          alert("資料已更新");
        }
      })
      .catch(err => {
        console.error("更新失敗：", err);
      });
    }
    }
  });

  memberForm.mount('#memberForm');
