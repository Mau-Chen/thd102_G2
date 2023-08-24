export default{props:["tasks"],template:`
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
                <p><img src="./images/icon/member-icon/black-points.svg" alt="points-icon">已獲得 Pet Points <span>50</span> 點</p>  
                <button v-if="index === 0" class="btn_4_border cancel-btn">取消預約</button>
            </div>
        </div>
    </div>
</li>  
    `,data(){return{isOpen:[!0].concat(new Array(this.tasks.length-1).fill(!1))}},methods:{open(i){this.isOpen[i]=!this.isOpen[i]},getTotalPrice(i){return i.map(i=>+i.price).reduce((i,e)=>i+e,0)},calculateTotal(i,e){return this.getTotalPrice(i)-e}}};