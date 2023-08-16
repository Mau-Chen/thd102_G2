import list from "./list.js";

const app = Vue.createApp({
  data() {
    return {
      tasks: [
        {
          OrderId: "PT0004",
          OrderDate: "2023年8月4日",
          reduce: 30,
          OrderList: [
            {
              price: "300",
            },
            {
              price: "3300",
            },
            {
              price: "3300",
            },
          ],
        },
        // {
        //   OrderId: "PT0003",
        //   OrderDate: "2023年7月30日",
        //   reduce: 30,
        //   OrderList: [
        //     {
        //       price: "300",
        //     },
        //   ],
        // },
        // {
        //   OrderId: "PT0002",
        //   OrderDate: "2023年7月24日",
        //   reduce: 30,
        //   OrderList: [
        //     {
        //       price: "300",
        //     },
        //   ],
        // },
        // {
        //   OrderId: "PT0001",
        //   OrderDate: "2023年5月31日",
        //   reduce: 30,
        //   OrderList: [
        //     {
        //       price: "1200",
        //     },
        //   ],
        // },
      ],
    };
  },
});

app.component("list", list);

const vm = app.mount("#order");
