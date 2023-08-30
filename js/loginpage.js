function removeLogin123Class() {
    setTimeout(() => {
      const modalPage = document.getElementById("ModalPage");
      if (modalPage) {
        modalPage.classList.remove("login123");
      }
    }, 10);
  }
  removeLogin123Class();

  const ModalPage = Vue.createApp({
    data() {
      return {
        text: "Hello World!",
        returnStatus: "",
        index: 0,
        ispop: false,
        account: "",
        password: "",
        success: false,
      };
    },
    methods: {
      changePage(newIndex) {
        this.index = newIndex;
      },
      handleSubmit() {
        // 執行表單提交的處理
        fetch("/php/login.php", {
          method: "POST",
          mode: "cors",
          body: new URLSearchParams({
            account: this.account,
            password: this.password,
          }),
        })
          .then((response) => response.json()) // 解析 JSON 回應
          .then((data) => {
            if (data.status === "success") {
              // 如果回應為成功，執行頁面跳轉
              window.open("member.html", "_self");
            } else if (data.status === "error") {
              // 如果回應為錯誤，處理無效認證的情況
              console.log(data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
    },
  });

  const vm = ModalPage.mount("#ModalPage");