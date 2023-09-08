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
      createNew: {
        account: '',
        email: '',
        password: '',
        check: ''
      }
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
    },

    createMember() {
      if (
        this.createNew.account !== '' &&
        this.createNew.email !== '' &&
        this.createNew.password !== '' &&
        this.createNew.password === this.createNew.check
      ) {
        const res = {
          account: this.createNew.account,
          email: this.createNew.email,
          password: this.createNew.password
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        fetch("/thd102/g2/php/BackgroundLogin/insert.php", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(res)
        }).then((response) => response.json()).then((data) => {
          if (data.message === 'success') {
            this.changePage(0);
            this.ispop = false;
            Swal.fire({
              title: '註冊成功!',
              text: '歡迎加入PetpaGo',
              icon: 'success',
              customClass: {
                popup: 'my-custom-popup-class', // 自定义弹窗容器的类名
                backdrop: 'my-custom-backdrop-class' // 自定义背景遮罩的类名
              }
            });
          } else if (data.error) {
            alert(data.error);
          }
        })
      } else {
        this.ispop = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '請填寫所有必填欄位並確保密碼匹配!',
          customClass: {
            popup: 'my-custom-popup-class', // 自定义弹窗容器的类名
            backdrop: 'my-custom-backdrop-class' // 自定义背景遮罩的类名
          }
        })
      }
    }
  },
});

const vm = ModalPage.mount("#ModalPage");