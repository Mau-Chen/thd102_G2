import photofall from './waterfall.js';

const app2 = Vue.createApp({
    data(){
        return {
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
    }
});
app2.component("PhotoFall", photofall);
app2.mount('#photofall');