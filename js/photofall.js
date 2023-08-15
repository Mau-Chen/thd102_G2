import photofall from './waterfall.js';

const app2 = Vue.createApp({
    data(){
        return {
            items: [
                { 
                  image: '../images/pic/photoWall/photoWall01.png', 
                  text: '項目 1' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall02.png', 
                  text: '項目 2' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall03.png', 
                  text: '項目 3' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall04.png', 
                  text: '項目 4' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall05.png', 
                  text: '項目 5' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall06.png', 
                  text: '項目 6' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall07.png', 
                  text: '項目 7' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall08.png', 
                  text: '項目 8' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall09.png', 
                  text: '項目 9' 
                },
                { 
                  image: '../images/pic/photoWall/photoWall10.png', 
                  text: '項目 10' 
                }
              ]
        }
    }
});
app2.component("PhotoFall", photofall);
app2.mount('#photofall');