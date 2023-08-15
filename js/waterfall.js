export default {
  template: `
    <div class="waterfall-container">
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="waterfall-column">
        <div v-for="item in column" :key="item.id" class="waterfall-item">
          <img :src="item.image" alt="Item Image">
          <div class="fallBottom">
            <p>{{ item.text }}</p>
          </div>
          
        </div>
      </div>
    </div>
    `,
  data() {
    return {
      items: [
        { id: 1, image: '../images/pic/photoWall/photoWall01.png', text: '項目 1' },
        { id: 2, image: '../images/pic/photoWall/photoWall02.png', text: '項目 2' },
        { id: 3, image: '../images/pic/photoWall/photoWall03.png', text: '項目 3' },
        { id: 4, image: '../images/pic/photoWall/photoWall04.png', text: '項目 4' },
        { id: 5, image: '../images/pic/photoWall/photoWall05.png', text: '項目 5' },
        { id: 6, image: '../images/pic/photoWall/photoWall06.png', text: '項目 6' },
        { id: 7, image: '../images/pic/photoWall/photoWall07.png', text: '項目 7' },
        { id: 8, image: '../images/pic/photoWall/photoWall08.png', text: '項目 8' },
        { id: 9, image: '../images/pic/photoWall/photoWall09.png', text: '項目 9' },
        { id: 10, image: '../images/pic/photoWall/photoWall10.png', text: '項目 10' },
        { id: 11, image: '../images/pic/photoWall/photoWall11.png', text: '項目 11' },
        { id: 12, image: '../images/pic/photoWall/photoWall12.png', text: '項目 12' },
        { id: 13, image: '../images/pic/photoWall/photoWall13.png', text: '項目 13' },
        { id: 14, image: '../images/pic/photoWall/photoWall14.png', text: '項目 14' },
        { id: 15, image: '../images/pic/photoWall/photoWall15.png', text: '項目 15' },
        { id: 16, image: '../images/pic/photoWall/photoWall16.png', text: '項目 16' }
      ],
      columns: [[], [], []]
    };
  },
  mounted() {
    this.loadItems();
    window.addEventListener('scroll', this.handleScroll);
    this.updateColumns();
    window.addEventListener('resize', this.updateColumns);
  },
  methods: {
    loadItems() {
      this.items.forEach(item => {
        const shortestColumn = this.columns.reduce((acc, column) => {
          return column.length < acc.length ? column : acc;
        }, this.columns[0]);
        shortestColumn.push(item);
      });
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
    }
  }
}