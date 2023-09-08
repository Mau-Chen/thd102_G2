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

          Swal.fire({
            toast: true,
            position:'top',
            icon: 'success',
            title: '登入成功!',
            text: `${this.account} ,歡迎回到PetpaGo!`,
            showConfirmButton: false,
            timer: 3000,
            backdrop: `rgba(0,0,0,0)`,
            customClass:{
              container: 'swal2'
            }
          });
        } else {
          this.ispop = false;
          Swal.fire({
            icon: 'question',
            title: '查無此人?',
            text: '要不要試著註冊會員?',
            showConfirmButton: false,
            timer: 3000,
            backdrop: `rgba(0,0,0,0)`,
            customClass:{
              container: 'swal2'
            }
          })
        }
      })
    },

    createMember() {
      // 检查帐户长度不超过15个字符
      if (this.createNew.account.length === 0) {
        Swal.fire({
          toast: true,
          position:'top',
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
          text: '名稱不可為空!',
          backdrop: `rgba(0,0,0,0)`,
          customClass:{
            container: 'swal2'
          }
        });
        return;
      }else if(this.createNew.account.length > 20){
        Swal.fire({
          toast: true,
          position:'top',
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
          text: '名稱字數限制最高20字!',
          backdrop: `rgba(0,0,0,0)`,
          customClass:{
            container: 'swal2'
          }
        });
      }
    
      // 检查邮箱格式
      const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailPattern.test(this.createNew.email)) {
        Swal.fire({
          toast: true,
          position:'top',
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
          text: '請輸入正確的電子郵箱!',
          backdrop: `rgba(0,0,0,0)`,
          customClass:{
            container: 'swal2'
          }
        });
        return;
      }
    
      // 检查密码长度至少为8个字符
      if (this.createNew.password.length < 8) {
        Swal.fire({
          toast: true,
          position:'top',
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
          text: '密碼長度至少8位!',
          backdrop: `rgba(0,0,0,0)`,
          customClass:{
            container: 'swal2'
          }
        });
        return;
      }
    
      // 检查密码和确认密码是否一致
      if (this.createNew.password !== this.createNew.check) {
        Swal.fire({
          toast: true,
          position:'top',
          icon: 'error',
          title: 'Oops...',
          showConfirmButton: false,
          timer: 3000,
          text: '兩次密碼輸入不一致!',
          backdrop: `rgba(0,0,0,0)`,
          customClass:{
            container: 'swal2'
          }
        });
        return;
      }
    
      // 如果所有验证都通过，执行注册逻辑
      const res = {
        account: this.createNew.account,
        email: this.createNew.email,
        password: this.createNew.password
      };
    
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
    
      fetch("/thd102/g2/php/BackgroundLogin/insert.php", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(res)
      }).then((response) => response.json()).then((data) => {
        if (data.message === 'success') {
          this.changePage(0);
          Swal.fire({
            position: "top-end",
            title: '註冊成功!',
            text: '歡迎加入PetpaGo',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            backdrop: `rgba(0,0,0,0)`,
            customClass: {
              container: 'swal2'
            }
          });
        } else if (data.error) {
          alert(data.error);
        }
      });
    }
  },
});

const vm = ModalPage.mount("#ModalPage");