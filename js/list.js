export default {
  props: ["tasks"],
  template: `
  <li class="accordion"
  v-for="(task, index) in tasks"
  :key="index">
      <!-- first list box1 -->
      <div class="ol-header jcSb">
          <div class="ol-headText">
              <p>{{ task.OrderDate }}</p>
              <p>{{ task.OrderId }}</p>
          </div>
          <div class="ol-button">
              <div v-if="!isOpen[index]">
                  <span>NT$ {{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c).toLocaleString('en-US') }}</span>
              </div>
              <div class="arrowIcon" @click="open(index)" :class="{ active: isOpen[index] }">
                  <img src="./images/icon/components-icon/faqbt-circle.svg" alt="button">
              </div>
          </div>
      </div>
      <div v-if="isOpen[index]">
          <!-- 清單部分 -->
          <div class="ol-content"> <!-- ul -->
              <div v-for="(Order, index) in task.OrderList" class="listContent"><!-- li -->
                  <div class="ol-contentBox mb_24"> 
                      <img src="./images/pic/shop/goShop01.png" alt="driveDog"> 
                      <div class="ol-ContText">
                          <h6 class="mb_16">寵物接送</h6>
                          <p><span>8月17日 </span>｜<span> 16:00</span></p>
                          <div class="ol-info jcSb">
                              <p>轎車</p>    
                              <p>NT$<span>{{ Order.price.toLocaleString('en-US') }}</span></p>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- box2-2 -->
              <div class="ol-contentBox mb_24"> 
              <img src="./images/pic/shop/goShop02.png" alt="driveDog"> 
              <div class="ol-ContText">
                  <h6 class="mb_16">快樂寵物旅館</h6>
                  <p>8月17日-8月19日 (3晚)</p>
                  <div class="ol-info jcSb">
                      <p>狗套房X1 ｜ 小型犬</p>    
                      <p>NT$ 2,400</p>
                  </div>
              </div>
          </div>
              <!-- box2-3 -->
              <div class="ol-contentBox mb_24"> 
              <img src="./images/pic/shop/goShop03.png" alt="driveDog"> 
              <div class="ol-ContText">
                  <h6 class="mb_16">快樂寵物旅館</h6>
                  <p>8月17日-8月19日 (3晚)</p>
                  <div class="ol-info jcSb">
                      <p>貓套房X1 ｜ 貓咪</p>    
                      <p>NT$ 2,400</p>
                  </div>
              </div>
          </div>
          </div>
          <!-- 折扣部分 -->
          <div class="ol-money mb_24">
              <div class="ol-count mb_16 jcSb">
                  <p><span>3</span>件合計</p>
                  <p>NT$<span>{{ task.OrderList.map(o => +o.price).reduce((p, c) => p + c).toLocaleString('en-US') }}</span></p>
              </div>
              <div class="ol-count jcSb">
                  <p>Pet Points 折抵</p>
                  <p>-NT$ {{ task.reduce.toLocaleString('en-US') }}</p>
              </div>
          </div>
          <div class="ol-total">
              <div class="ol-count jcSb">
                  <p>總計</p>
                  <p>NT$ {{ (task.OrderList.map(o => +o.price).reduce((p, c) => p + c) - task.reduce).toLocaleString('en-US') }}</p>
              </div>
              <p><img src="/images/icon/member-icon/black-points.svg" alt="points-icon">已獲得 Pet Points <span>50</span> 點</p>  
              <button class="btn_4_border">取消預約</button>
          </div>
      </div>
  </li>
  <!-- 原本的 list 樣式 -->
  <li>
                    <!-- first list box1 -->
                    <div class="ol-header jcSb">
                        <div class="ol-headText">
                            <p>訂單日期：2023年8月4日</p>
                            <p>訂單編號：PT0004</p>
                        </div>
                        <div class="ol-button">
                            <img src="images/icon/components-icon/faqbt-circle.svg" alt="button">
                        </div>
                    </div>
                    <!-- first list box2 -->
                    <div class="ol-content">
                        <!-- box2-1 -->
                        <div class="ol-contentBox mb_24"> 
                            <img src="/images/pic/shop/goShop01.png" alt="driveDog"> 
                            <div class="ol-ContText">
                                <h6 class="mb_16">寵物接送</h6>
                                <p>8月17日 ｜ 16:00</p>
                                <div class="ol-info jcSb">
                                    <p>轎車</p>    
                                    <p>NT$ 300</p>
                                </div>
                            </div>
                        </div>
                        <!-- box2-2 -->
                        <div class="ol-contentBox mb_24"> 
                            <img src="/images/pic/shop/goShop02.png" alt="driveDog"> 
                            <div class="ol-ContText">
                                <h6 class="mb_16">快樂寵物旅館</h6>
                                <p>8月17日-8月19日 (3晚)</p>
                                <div class="ol-info jcSb">
                                    <p>狗套房X1 ｜ 小型犬</p>    
                                    <p>NT$ 2,400</p>
                                </div>
                            </div>
                        </div>
                        <!-- box2-3 -->
                        <div class="ol-contentBox mb_24"> 
                            <img src="/images/pic/shop/goShop03.png" alt="driveDog"> 
                            <div class="ol-ContText">
                                <h6 class="mb_16">快樂寵物旅館</h6>
                                <p>8月17日-8月19日 (3晚)</p>
                                <div class="ol-info jcSb">
                                    <p>貓套房X1 ｜ 貓咪</p>    
                                    <p>NT$ 2,400</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- first list box3 -->
                    <div class="ol-money mb_24">
                        <div class="ol-count mb_16 jcSb">
                            <p>3件合計</p>
                            <span>NT$ 5,100</span>
                        </div>
                        <div class="ol-count jcSb">
                            <p>Pet Points 折抵</p>
                            <span>-NT$ 30</span>
                        </div>
                    </div>
                    <!-- first list box4 -->
                    <div class="ol-total">
                        <div class="ol-count jcSb">
                            <p>總計</p>
                            <span>NT$ 5,070</span>
                        </div>
                         <p><img src="/images/icon/member-icon/black-points.svg" alt="points-icon">已獲得 Pet Points <span>50</span> 點</p>  
                        <button class="btn_4_border">取消預約</button>
                    </div>
                </li>
  <!-- second list -->
  <li>
      <div class="ol-header jcSb">
          <div class="ol-headText">
              <p>訂單日期：2023年7月30日</p>
              <p>訂單編號：PT0003</p>
          </div>
          <div class="ol-button">
              <span>NT$ 3,070</span>
              <img src="images/icon/components-icon/faqbt-circle.svg" alt="button">
          </div>
      </div>
  </li>
    `,
  data() {
    return {
      isOpen: [true].concat(new Array(this.tasks.length - 1).fill(false)),
    };
  },
  methods: {
    open(index) {
      this.isOpen[index] = !this.isOpen[index];
    },
  },
};
