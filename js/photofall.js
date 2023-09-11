import photofall from './waterfall.js';

const app2 = Vue.createApp({
  data() {
    return {
      ignoreList: [],
      show: false,
      previewImage: null,
      items: [],
      db_items: [
        {
          id: "a_1",
          image: './images/pic/photoWall/photoWall01.png',
          icon: './images/pic/user1.png',
        },
        {
          id: "a_2",
          image: './images/pic/photoWall/photoWall02.png',
          icon: './images/pic/user2.png',
        },
        {
          id: "a_3",
          image: './images/pic/photoWall/photoWall03.png',
          icon: './images/pic/user1.png',
        },
        {
          id: "a_4",
          image: './images/pic/photoWall/photoWall04.png',
          icon: './images/pic/user3.png',
        },
        {
          id: "a_5",
          image: './images/pic/photoWall/photoWall05.png',
          icon: './images/pic/user3.png',
        },
        {
          id: "a_6",
          image: './images/pic/photoWall/photoWall06.png',
          icon: './images/pic/user4.png',
        },
        {
          id: "a_7",
          image: './images/pic/photoWall/photoWall07.png',
          icon: './images/pic/user5.png',
        },
        {
          id: "a_8",
          image: './images/pic/photoWall/photoWall08.png',
          icon: './images/pic/user4.png',
        },
        {
          id: "a_9",
          image: './images/pic/photoWall/photoWall09.png',
          icon: './images/pic/user3.png',
        },
        {
          id: "a_10",
          image: './images/pic/photoWall/photoWall10.png',
          icon: './images/pic/user6.png',
        },
        {
          id: "a_11",
          image: './images/pic/photoWall/photoWall11.png',
          icon: './images/pic/user2.png',
        },
        {
          id: "a_12",
          image: './images/pic/photoWall/photoWall12.png',
          icon: './images/pic/user3.png',
        },
        {
          id: "a_13",
          image: './images/pic/photoWall/photoWall13.png',
          icon: './images/pic/user4.png',
        },
        {
          id: "a_14",
          image: './images/pic/photoWall/photoWall14.png',
          icon: './images/pic/user2.png',
        },
        {
          id: "a_15",
          image: './images/pic/photoWall/photoWall15.png',
          icon: './images/pic/user4.png',
        },
        {
          id: "a_16",
          image: './images/pic/photoWall/photoWall16.png',
          icon: './images/pic/user3.png',
        }
      ]
    }
  },
  mounted() {
    this.Initial();
    // let my_tasks = JSON.parse(localStorage.getItem("ignoreList"));
    // if (my_tasks) {
    //   this.ignoreList = my_tasks;
    // }
    // this.items = this.ignore(this.db_items, this.ignoreList);
  },
  methods: {
    async Initial() {
      try {
        const response = await fetch('/thd102/g2/php/Photowall/select.php');

        if (!response) {
          Swal.fire({
            toast: true,
            position: "top",
            icon: "question",
            // title: '查無此人?',
            text: "網路連接失敗，顯示預設圖片",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(0,0,0,0)`,
            customClass: {
              container: "swal2",
            },
          });
          Object.assign(this.items, this.db_items);
          return;
        }

        const res = await response.json();

        if (res.status === 'success') {

          const result = res.data.map((item) => ({
            id: item.ID,
            image: item.PIC,
            icon: './images/pic/user1.png',
          }))

          Object.assign(this.items, result);
          this.$refs.photoFall.updateColumns();

        } else {
          Object.assign(this.items, this.db_items);
          this.$refs.photoFall.updateColumns();
        }


      } catch (error) {
        Object.assign(this.items, this.db_items);
        this.$refs.photoFall.updateColumns();
      }
    },

    handleDrop(event) {
      event.preventDefault(); //用來防止圖片拖進瀏覽器的預設事件

      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        }
        reader.readAsDataURL(file);
      };
    },
    // ignore(input, ignore) {
    //   const output = input.filter(item => !ignore.includes(item.id));
    //   // console.log(output);
    //   return output;
    // },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async uploadImage() {

      let fileInput = this.$refs.fileInput;
      const memberData = localStorage.getItem("member");

      if (memberData === null) {
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          // title: '查無此人?',
          text: "您還未登入，三秒後將開啟登入頁面",
          showConfirmButton: false,
          timer: 3000,
          backdrop: `rgba(0,0,0,0)`,
          customClass: {
            container: "swal2",
          },
        });
        setTimeout(() => {
          vm.ispop = true;
        }, 3000);
        return
      };

      const memberObject = JSON.parse(memberData);

      const formData = new FormData();
      formData.append('profile', fileInput.files[0]);
      formData.append('name', memberObject.account);
      //todo
      try {
        const res = await fetch('/thd102/g2/php/Photowall/photowall.php', {
          method: "POST",
          body: formData
        });

        const response = await res.json();

        if(response.status === 'success'){
          Swal.fire({
            toast: true,
            position: "top",
            icon: "success",
            // title: '查無此人?',
            text: "圖片上傳成功",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(0,0,0,0)`,
            customClass: {
              container: "swal2",
            },
          });
        }else{
          Swal.fire({
            toast: true,
            position: "top",
            icon: "error",
            // title: '查無此人?',
            text: "圖片上傳失敗",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(0,0,0,0)`,
            customClass: {
              container: "swal2",
            },
          });
        }
      }
      catch(error){
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          // title: '查無此人?',
          text: "發生錯誤，請查看主控台信息",
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(0,0,0,0)`,
          customClass: {
            container: "swal2",
          },
        });
        console.log(error);
      }
      


    },

  }
});
app2.component("PhotoFall", photofall);
app2.mount('#photofall');