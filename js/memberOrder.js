import list from './list.js'

const app = Vue.createApp({
    data(){
        return {
            tasks: [{
                OrderId: 'PT0001',
                OrderDate: '2023年7月30日'
            },{
                OrderId: 'PT0002',
                OrderDate: '2023年7月31日'
            },{
                OrderId: 'PT0003',
                OrderDate: '2023年8月1日'
            },{
                OrderId: 'PT0004',
                OrderDate: '2023年8月2日'
            }]
        }
    }
});

app.component("list", list);

const vm = app.mount("#order");