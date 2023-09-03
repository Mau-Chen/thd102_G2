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
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const member = JSON.parse(localStorage.getItem('member'));
  
      if (member && member.login === true) {
        this.success = true;
      }
    },

    changePage(newIndex) {
      this.index = newIndex;
    },

    login() {

      const res = {
        account: this.account,
        password: this.password
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      fetch('/thd102/g2/php/FrontendLogin/login.php', {
        method: "POST",
        headers: headers,
        body: JSON.stringify(res)
      }).then((response) => response.json()).then((data) => {
        if (data.login === "success") {
          console.log("login!");
          const member = {
            account: this.account,
            login: true
          }
          localStorage.setItem('member', JSON.stringify(member));
          this.success = true;
          this.ispop = false;
        } else {
          console.log("poor!")
        }
      })


    }


  },
});

const vm = ModalPage.mount("#ModalPage");