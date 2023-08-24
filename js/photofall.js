import photofall from './waterfall.js';

const app2 = Vue.createApp({
    data(){
        return {
            ignoreList:[],
            show: false,
            items:[],
            previewImage: null,
            db_items: [
                { 
                  id: "a_1",
                  image: '.../images/pic/photoWall/photoWall01.png',
                  icon: '.../images/pic/user1.png',
                },
                { 
                  id: "a_2",
                  image: '.../images/pic/photoWall/photoWall02.png',
                  icon: '.../images/pic/user2.png', 
                },
                { 
                  id: "a_3",
                  image: '.../images/pic/photoWall/photoWall03.png',
                  icon: '.../images/pic/user1.png',
                },
                { 
                  id: "a_4",
                  image: '.../images/pic/photoWall/photoWall04.png',
                  icon: '.../images/pic/user3.png',
                },
                { 
                  id: "a_5",
                  image: '.../images/pic/photoWall/photoWall05.png',
                  icon: '.../images/pic/user3.png', 
                },
                { 
                  id: "a_6",
                  image: '.../images/pic/photoWall/photoWall06.png',
                  icon: '.../images/pic/user4.png',
                },
                { 
                  id: "a_7",
                  image: '.../images/pic/photoWall/photoWall07.png',
                  icon: '.../images/pic/user5.png', 
                },
                { 
                  id: "a_8",
                  image: '.../images/pic/photoWall/photoWall08.png',
                  icon: '.../images/pic/user4.png', 
                },
                { 
                  id: "a_9",
                  image: '.../images/pic/photoWall/photoWall09.png',
                  icon: '.../images/pic/user3.png', 
                },
                { 
                  id: "a_10",
                  image: '.../images/pic/photoWall/photoWall10.png',
                  icon: '.../images/pic/user6.png', 
                },
                { 
                  id: "a_11",
                  image: '.../images/pic/photoWall/photoWall11.png',
                  icon: '.../images/pic/user2.png', 
                },
                { 
                  id: "a_12",
                  image: '.../images/pic/photoWall/photoWall12.png',
                  icon: '.../images/pic/user3.png', 
                },
                { 
                  id: "a_13",
                  image: '.../images/pic/photoWall/photoWall13.png',
                  icon: '.../images/pic/user4.png', 
                },
                { 
                  id: "a_14",
                  image: '.../images/pic/photoWall/photoWall14.png',
                  icon: '.../images/pic/user2.png', 
                },
                { 
                  id: "a_15",
                  image: '.../images/pic/photoWall/photoWall15.png',
                  icon: '.../images/pic/user4.png', 
                },
                { 
                  id: "a_16",
                  image: '.../images/pic/photoWall/photoWall16.png',
                  icon: '.../images/pic/user3.png', 
                }
              ]
        }
    },
    mounted(){
      let my_tasks = JSON.parse(localStorage.getItem("ignoreList"));
      if(my_tasks){
          this.ignoreList = my_tasks;
      }
      this.items = this.ignore(this.db_items,this.ignoreList);
    },
    methods: {
      handleDrop(event){
        event.preventDefault(); //用來防止圖片拖進瀏覽器的預設事件

        const file = event.dataTransfer.files[0];
        if(file && file.type.startsWith('image/')){
          const reader = new FileReader();
          reader.onload = () => {
            this.previewImage = reader.result;
          }
          reader.readAsDataURL(file);
        };
      },
      ignore(input,ignore){
        const output = input.filter(item => !ignore.includes(item.id));
        // console.log(output);
        return output;
      },
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
      uploadImage(){
        console.log("上傳圖片:",this.previewImage);
      }
    }
});
app2.component("PhotoFall", photofall);
app2.mount('#photofall');