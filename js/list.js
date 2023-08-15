export default{
    props: ["tasks"] ,
    template : `
    <li 
        class="accordion"
        v-for="(task, index) in tasks"
        :key="index">
                        <div>
                            <div class="listHead ol-header mb_24 jcSb">
                                <div class="ol-headText">
                                    <p>訂單日期：{{ task.OrderDate }}</p>
                                    <p>訂單編號：{{ task.OrderId }}</p>
                                </div>
                                <div class="listHead2">
                                    <div v-if="!isOpen[index]">
                                        <p>NT$ {{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c) }}</p>
                                    </div>
                                    <div class="arrowIcon" @click="open(index)" :class="{ active: isOpen[index] }">
                                        <img src="images/icon/components-icon/faqbt-circle.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div v-if="isOpen[index]">
                                <!-- 清單部分 -->
                                <ul>
                                    <li 
                                        v-for="(Order, index) in task.OrderList"
                                        class="listContent">
                                        <div class="col-2">
                                            <img src="./images/pic/shop/goShop01.png" alt="">
                                        </div>
                                        <div class="col-10">
                                            <div>
                                                <h6 class="mb_16">寵物接送</h6>
                                                <p><span>8月17日</span>|<span>16:00</span></p>
                                            </div>
                                            <div class="listBottom">
                                                <p>轎車</p>
                                                <p>NT$<span>{{ Order.price }}</span></p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <!-- 折扣部分 -->
                                <div class="count">
                                    <p><span>3</span>件合計</p>
                                    <p>NT$<span>{{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c) }}</span></p>
                                </div>
                                <div class="count">
                                    <p>Pet Points 折抵</p>
                                    <p>-NT$ {{ task.reduce }}</p>
                                </div>
                                <br>
                                <div class="count">
                                    <p>總計</p>
                                    <p>NT$ {{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c) - task.reduce }}</p>
                                </div>
                                <div class="count2">
                                    <img src="images/icon/member-icon/black-points.svg" alt="">
                                    <p>已獲得 Pet Points<span>50</span>點</p>
                                </div>
                                <div class="count2">
                                    <button class="btn_4_border">取消預約</button>
                                </div>

                            </div>
                        </div>
                    </li>
    `,
    data(){
        return {
            isOpen: new Array(this.tasks.length).fill(false)
        }
    },
    methods : {
        open(index) {
            this.isOpen[index] = !this.isOpen[index];
        }
    }
}