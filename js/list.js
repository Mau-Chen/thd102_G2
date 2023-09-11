export default {
  props: ["tasks"],
  template: `
<li class="accordion" v-for="(task, index) in tasks" :key="index">

      <!-- first list box1 -->
    <div class="ol-header jcSb">
        <div class="ol-headText">
            <p>訂單日期：{{ task.OrderDate }}</p>
            <p>訂單編號：{{ task.OrderId }}</p>
        </div>
        <div class="ol-button">
            <div v-if="!isOpen[index]">
              <span>NT$ {{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c).toLocaleString('en-US') }}</span>
            </div>
            <div class="arrowIcon" @click="open(index)" :class="{ active_arrow: isOpen[index] }">
              <img src="./images/icon/components-icon/faqbt-circle.svg" alt="button">
            </div>
        </div>
    </div>

    <div v-if="isOpen[index]">
          <!-- 清單部分 -->
        <div class="ol-content">
            <div v-for="(Order, index) in task.OrderList" class="listContent"><!-- li -->
                <div class="ol-contentBox mb_24"> 
                    <img :src="Order.image" alt="driveDog"> 
                    <div class="ol-ContText">
                        <h6 class="mb_16"> {{ Order.name }} </h6>
                        <p>{{ Order.date }}</p>
                        <div class="ol-info jcSb">
                            <p>{{ Order.product }}</p>    
                            <p>NT$ <span>{{ Order.price.toLocaleString('en-US') }}</span></p>
                        </div>
                    </div>
                </div>

                
            </div>

            <!-- 折扣部分 -->
            <div class="ol-money mb_24">
                <div class="ol-count mb_16 jcSb">
                    <p>{{ task.OrderList.length }}件合計</p>
                    <span>NT$ <span>{{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c).toLocaleString('en-US') }}</span></span>
                </div>
                <div class="ol-count jcSb">
                    <p>Pet Points 折抵</p>
                    <span>-NT$ {{ task.reduce.toLocaleString('en-US') }}</span>
                </div>
            </div>

            <div class="ol-total">
                <div class="ol-count jcSb">
                    <p>總計</p>
                    <span>NT$ {{ (task.OrderList.map(o => +o.price).reduce((p, c) => p + c) - task.reduce).toLocaleString('en-US') }}</span>
                </div>
                <p><img src="./images/icon/member-icon/black-points.svg" alt="points-icon">已獲得 Pet Points <span>{{ points(task) }}</span> 點</p>  
                <button v-if="canCancel(task.OrderDate)" class="btn_4_border cancel-btn">取消預約</button>
                
            </div>
        </div>
    </div>
</li>  
    `,
    data() {
      return {
        isOpen: [true].concat(new Array(this.tasks.length - 1).fill(false))
      };
    },
    methods: {
      open(index) {
        this.isOpen[index] = !this.isOpen[index];
      },
      getTotalPrice(orderList) {
        return orderList.map(o => +o.price).reduce((p, c) => p + c, 0);
      },
      calculateTotal(orderList, reduction) {
        return this.getTotalPrice(orderList) - reduction;
      },
      points(task) {
        const totalAmount = this.getTotalPrice(task.OrderList) - task.reduce;
        return Math.round(totalAmount * 0.1); 
      },
      canCancel(orderDateStr) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 將今天的時間設為 00:00:00  
        const [year, month, day] = orderDateStr.replace("年", "-").replace("月", "-").replace("日", "").split("-").map(Number);
        const orderDate = new Date(year, month - 1, day); // 注意：JavaScript 中月份是從 0 開始的，所以需要減 1
        orderDate.setHours(0, 0, 0, 0); // 將訂單日期的時間設為 00:00:00

        return orderDate > today; // 如果訂單日期在今天之後，返回 true
      },
    },
  };