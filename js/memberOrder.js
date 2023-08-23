import list from "./list.js";

const app = Vue.createApp({
  data() {
    return {
      tasks: [
        {
          OrderId: "PT0003",
          OrderDate: "2023年8月4日",
          reduce: 30,
          OrderList: [
            {
              name: "寵物接送",
              image: "./images/pic/shop/goShop01.png",
              price: 300,
              date: "8月17日 | 16:00",
              product: "轎車"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop02.png",
              price: 2400,
              date: "8月17日-8月19日(3晚)",
              product: "狗套房X1 | 小型犬"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop03.png",
              price: 2400,
              date: "8月17日-8月19日(3晚)",
              product: "貓套房X1 | 貓咪"
            },
          ],
        },
        {
          OrderId: "PT0004",
          OrderDate: "2023年7月30日",
          reduce: 30,
          OrderList: [
            {
              name: "寵物接送",
              image: "./images/pic/shop/goShop01.png",
              price: 150,
              date: "8月1日 | 16:00",
              product: "轎車"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop02.png",
              price: 3200,
              date: "8月1日-8月4日(4晚)",
              product: "狗套房X1 | 小型犬"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop03.png",
              price: 3200,
              date: "8月1日-8月4日(4晚)",
              product: "貓套房X1 | 貓咪"
            },
          ],
        },
        {
          OrderId: "PT0005",
          OrderDate: "2023年7月29日",
          reduce: 30,
          OrderList: [
            {
              name: "寵物接送",
              image: "./images/pic/shop/goShop01.png",
              price: 600,
              date: "8月5日 | 15:00",
              product: "轎車"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop02.png",
              price: 4000,
              date: "8月5日-8月10日(5晚)",
              product: "狗套房X1 | 小型犬"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop03.png",
              price: 4000,
              date: "8月5日-8月10日(5晚)",
              product: "貓套房X1 | 貓咪"
            },
          ],
        },
        {
          OrderId: "PT0006",
          OrderDate: "2023年7月26日",
          reduce: 30,
          OrderList: [
            {
              name: "寵物接送",
              image: "./images/pic/shop/goShop01.png",
              price: 300,
              date: "8月2日 | 14:00",
              product: "轎車"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop02.png",
              price: 3200,
              date: "8月2日-8月4日(2晚)",
              product: "狗套房X2 | 小型犬"
            },
            {
              name: "快樂寵物旅館",
              image: "./images/pic/shop/goShop03.png",
              price: 1600,
              date: "8月2日-8月4日(2晚)",
              product: "貓套房X1 | 貓咪"
            },
          ],
        },

      ],
    };
  },
});

app.component("list", list);

const vm = app.mount("#order");
