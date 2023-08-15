import list from './list.js'

const app = Vue.createApp({
});

app.component("list", list);

const vm = app.mount("#order");