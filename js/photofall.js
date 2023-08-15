import photofall from './waterfall.js';

const app = Vue.createApp({});
app.component("PhotoFall", photofall);
app.mount('#photofall');