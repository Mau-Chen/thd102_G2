export default{
    template : `
    <li class="accordion">
                        <div>
                            <div class="listHead">
                                <div>
                                    <p>訂單日期：<span>2023年7月30日</span></p>
                                    <p>訂單編號：<span>PT0003</span></p>
                                </div>
                                <div class="listHead2">
                                    <div v-if="isOpen == false">
                                        <p>NT$<span>3700</span></p>
                                    </div>
                                    <div class="arrowIcon" @click="open" :class="{ active: isOpen }">
                                        <img src="images/icon/components-icon/faqbt-circle.svg" alt="">
                                    </div>
                                </div>
                            </div>
                            <div v-if="isOpen">
                                <!-- 清單部分 -->
                                <ul>
                                    <li class="listContent">
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
                                                <p>NT$<span>300</span></p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <!-- 折扣部分 -->
                                <div class="count">
                                    <p><span>3</span>件合計</p>
                                    <p>NT$<span>5,100</span></p>
                                </div>
                                <div class="count">
                                    <p>Pet Points 折抵</p>
                                    <p>-NT$ <span>30</span></p>
                                </div>
                                <br>
                                <div class="count">
                                    <p>總計</p>
                                    <p>NT$ <span>5,070</span></p>
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
            isOpen: false
        }
    },
    methods : {
        open(){
            this.isOpen = !this.isOpen;
        }
    }
}