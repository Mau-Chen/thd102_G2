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
      const memberJSON = localStorage.getItem('member');
      if (memberJSON) {
        const member = JSON.parse(memberJSON);
        // console.log(member.account);
        fetch(`/thd102/g2/php/FrontendLogin/check.php?account=${member.account}`, {
          method: 'GET'
        }).then((response) => response.json()).then((data) => {
          if (data.login === "success") {
            this.success = true;
          }
        })
        
      }
    },
    logout() {
      const memberJSON = localStorage.getItem('member');
      if (memberJSON) {
        const member = JSON.parse(memberJSON);
        // console.log(member.account);
        fetch(`/thd102/g2/php/FrontendLogin/logout.php?account=${member.account}`, {
          method: 'GET'
        }).then((response) => response.json()).then((data) => {
          if (data.logout === "success") {
            this.success = false;
            window.location.href = 'index.html';
          }
        })
        
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
          // console.log("login!");
          const member = {
            account: this.account,
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