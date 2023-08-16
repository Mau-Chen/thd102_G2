import photofall from './waterfall.js';

const app2 = Vue.createApp({
    data(){
        return {
            show: false,
            previewImage: null,
            items: [
                { 
                  image: '../images/pic/photoWall/photoWall01.png',
                  icon: '../images/pic/user1.png',
                },
                { 
                  image: '../images/pic/photoWall/photoWall02.png',
                  icon: '../images/pic/user2.png', 
                },
                { 
                  image: '../images/pic/photoWall/photoWall03.png',
                  icon: '../images/pic/user1.png',
                },
                { 
                  image: '../images/pic/photoWall/photoWall04.png',
                  icon: '../images/pic/user3.png',
                },
                { 
                  image: '../images/pic/photoWall/photoWall05.png',
                  icon: '../images/pic/user3.png', 
                },
                { 
                  image: '../images/pic/photoWall/photoWall06.png',
                  icon: '../images/pic/user4.png',
                },
                { 
                  image: '../images/pic/photoWall/photoWall07.png',
                  icon: '../images/pic/user5.png', 
                },
                { 
                  image: '../images/pic/photoWall/photoWall08.png',
                  icon: '../images/pic/user4.png', 
                },
                { 
                  image: '../images/pic/photoWall/photoWall09.png',
                  icon: '../images/pic/user3.png', 
                },
                { 
                  image: '../images/pic/photoWall/photoWall10.png',
                  icon: '../images/pic/user6.png', 
                }
              ]
        }
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