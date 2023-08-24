export default {
  props: ["items"],
  template: `
  <div class="waterfall-container">
      <div v-for="(column, columnIndex) in columns" :key="column.id" class="waterfall-column">
        <div v-for="item in column" :key="item.id" class="waterfall-item" >
          <!-- 圖片本體 -->

          <img :src="item.image" @load="onImageLoad(item)" @click="toggleLightbox(item)" alt="Item Image">

          <!-- 圖片底部用戶頭像與功能區塊 -->

          <div class="fallBottom">
            <div class="postIcon">
              <img :src="item.icon">
            </div>
            <div class="function_btn_group">
              <div class="more">
                <img src=".../images/icon/photowall-icon/love-circle.svg">
              </div>
              <div class="more"  @click="toggleLightbox2(item)">
                <img src=".../images/icon/photowall-icon/bb-circle.svg">
              </div>
            </div>

            <!-- 功能區塊 -->
            <!-- 使用 item.lightboxOpen 屬性來控制每個項的 Lightbox 狀態 -->
            <!-- 燈箱 放大圖片 -->
            

            <div v-if="item.lightboxOpen === true" class="lightbox" @click="toggleLightbox(item)">
              <div class="loginpage_base" @click.stop>
                <div class="close fallTop">
                  <div class="icon" @click="toggleLightbox(item)">
                    <img src="../images/icon/components-icon/close-line.svg" alt="close" />
                  </div>
                </div>
                <div class="loginPage waterFallStyle fallBody">
                  <div>
                    <img :src="item.image" alt="Item Image">
                  </div>
                  <div class="fallBottom">
                    <div class="postIcon">
                      <img :src="item.icon">
                    </div>
                    <div class="function_btn_group">
                      <div class="more">
                        <img src=".../images/icon/photowall-icon/love-circle.svg">
                      </div>
                      <div class="more" @click="toggleLightbox2(item)">
                        <img src=".../images/icon/photowall-icon/bb-circle.svg">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <!-- 燈箱 檢舉貼文 -->

            <div v-if="item.lightboxReport === true" class="lightbox">
              <div class="loginpage_base">
                <div class="close">
                  <div class="icon" @click="toggleLightbox2(item)">
                    <img src="../images/icon/components-icon/close-line.svg" alt="close" />
                  </div>
                </div>
                <div class="loginPage">
                  <div class="pageIsideContainer">
                    <h5>檢舉貼文</h5>
                  </div>
                  <form action="#" class="pwReport">
                    <div class="pwCb_group">
                      <input type="checkbox" name="report1" id="report1">
                      <label for="report1">裸露、色情或性相關內容</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report2" id="report2">
                      <label for="report2">虐待動物</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report3" id="report3">
                      <label for="report3">自殘</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report4" id="report4">
                      <label for="report4">仇恨活動</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report5" id="report5">
                      <label for="report5">危險物品</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report6" id="report6">
                      <label for="report6">侵犯隱私</label>
                    </div>
                    <div class="pwCb_group">
                      <input type="checkbox" name="report7" id="report7">
                      <label for="report7">侵權</label>
                    </div>
                  </form>
                  <button class="btn_5" @click="ignore_list(item.id),toggleLightbox2(item)">送出</button>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    `,
  data() {
    return {
      // ignoreList: [],
      columns: [[], [], []],
    };
  },
  mounted() {
    this.updateColumns(); 
    setTimeout(() => {
      this.updateColumns();
  }, 150);
    
    //RWD監聽
    const self = this;
  
    window.addEventListener('resize', window._.debounce(() => {
      self.updateColumns()
    }, 150));
    // 滾動監聽
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async loadItems() {
      for (const item of this.items) {
        await this.loadImage(item);
        const shortestColumn = this.getShortestColumn();
        shortestColumn.push(item);
      }
    },
    // handleScroll() {
    //   const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
    //   if (distanceToBottom < 500) {
    //     this.loadItems();
    //   }
    // },
    updateColumns() {
      // Update columns based on screen width
      if (window.innerWidth < 700) {
        this.columns = [[], []];
      } else {
        this.columns = [[], [], []];
      }
      this.loadItems(); // Reload items into columns
    },
    async loadImage(item) {
      return new Promise(resolve => {
        const img = new Image();
        img.src = item.image;

        img.onload = () => {
          item.height = img.height; // 設置項目的高度
          resolve();
        };
      });
    },
    onImageLoad(item) {
      const img = event.target;
      item.height = img.height; // 設置項目的實際高度
    },
    getShortestColumn() {
      return this.columns.reduce((acc, column) => {
        return column.reduce((sum, currItem) => sum + currItem.height, 0) <
          acc.reduce((sum, currItem) => sum + currItem.height, 0) ? column : acc;
      }, this.columns[0]);
    },
    toggleLightbox(item) {
      // 在點擊時設定當前項目lightbox的狀態
      item.lightboxOpen = !item.lightboxOpen;
    },
    toggleLightbox2(item) {
      // 在點擊時設定當前項目lightboxReport的狀態
      item.lightboxReport = !item.lightboxReport;
    },
    ignore_list(item) {
      const storedIgnoreList = localStorage.getItem('ignoreList');

      this.ignoreList = storedIgnoreList ? JSON.parse(storedIgnoreList) : [];
      if (!this.ignoreList.includes(item)) {
        this.ignoreList.push(item);
        localStorage.setItem('ignoreList', JSON.stringify(this.ignoreList));
      }
    }
  },
};