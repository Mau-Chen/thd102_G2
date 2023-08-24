export default {
    template: `
        <button type="button">登入</button>
    `,
    methods: {
        async postData() {
          const url = "php_url"; //後端端口
          const data = {
            param1: "value1",
            param2: "value2"
          };
    
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application./json"
              },
              body: JSON.stringify(data)
            });
    
            const result = await response.json();
            // 在主控台顯示回傳成功訊息
            console.log(result);
          } catch (error) {
            // 在主控台顯示報錯訊息
            console.error(error);
          }
        }
      }
}