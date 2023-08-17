export default {
  props: ["items"],
  template: `
  <div class="waterfall-container">
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="waterfall-column">
        <div v-for="item in column" :key="item.id" class="waterfall-item">
          <img :src="item.image" @load="onImageLoad(item)" @click="toggleLightbox(item)" alt="Item Image">
          <div class="fallBottom">
            <div class="postIcon">
              <img :src="item.icon">
            </div>
            <div class="function_btn_group">
              <div class="more">
                <img src="../images/icon/photowall-icon/love-circle.svg">
              </div>
              <div class="more">
                <img src="../images/icon/photowall-icon/bb-circle.svg">
              </div>
            </div>
            
            <!-- 使用 item.lightboxOpen 屬性來控制每個項的 Lightbox 狀態 -->
            <div v-if="item.lightboxOpen === true" class="lightbox">
              <div class="loginpage_base">
                <div class="close">
                  <div class="icon" @click="toggleLightbox(item)">
                    <img src="./images/icon/components-icon/close-line.svg" alt="close" />
                  </div>
                </div>
                <div class="loginPage waterFallStyle">
                  <div>
                    <img :src="item.image" alt="Item Image">
                  </div>
                  <div class="fallBottom">
                    <div class="postIcon">
                      <img :src="item.icon">
                    </div>
                    <div class="function_btn_group">
                      <div class="more">
                        <img src="../images/icon/photowall-icon/love-circle.svg">
                      </div>
                      <div class="more">
                        <img src="../images/icon/photowall-icon/bb-circle.svg">
                      </div>
                    </div>
                  </div>
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
      columns: [[], [], []],
    };
  },
  mounted() {
    //RWD監聽
    window.addEventListener('resize', this.updateColumns);
    //滾動監聽
    // window.addEventListener('scroll', this.handleScroll);
    this.updateColumns();

  },
  methods: {
    async loadItems() {
      for (const item of this.items) {
        await this.loadImage(item);
        const shortestColumn = this.getShortestColumn();
        shortestColumn.push(item);
      }
    },
    handleScroll() {
      const distanceToBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
      if (distanceToBottom < 500) {
        this.loadItems();
      }
    },
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
  },
};