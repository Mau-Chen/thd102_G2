
const app = Vue.createApp({
    data() {
        return {
            currentStep: 0,
            steps: ["查看購物車", "填寫資料", "完成付款"],
            checked: false,
            checkedNames: [],

            member_data: {
                name: "王緯育",
                email: "service@tibame.com",
                phone: "0912345678",
            },

            spOrderName: "",
            spOrderEmail: "",
            spOrderPhone: "",
            sameMemberChecked: false,
            havePoints: 100,
            usePoints: 0,
            usePointsCheck: true,

            nowDate: null,
            orderID: "PT0004",

            spReadyName: "",
            spReadyEmail: "",
            spReadyPhone: "",

            cardNumber: ["", "", "", ""],
            cardDate: ["", ""],
            cardCVC: "",
            isStepTwoValid: false,
            validationErrors: [],
            shoppingItems: [
                {
                    id: "Car",
                    type: "spDriver",
                    pictureSrc_m: "./images/pic/shop/goShop01_m.png",
                    pictureSrc: "./images/pic/shop/goShop01.png",
                    product: "寵物接送",
                    listType: "轎車",
                    spStepper: false,
                    spPrice: 300,
                    BuyNum: 1,
                    listDate_S: "2023/8/17",
                    listDate_E: "2023/8/17",
                    listDate_T: "16:00",
                },
                {
                    id: "Hostel1",
                    type: "spHostel",
                    pictureSrc_m: "./images/pic/shop/goShop02_m.png",
                    pictureSrc: "./images/pic/shop/goShop02.png",
                    product: "快樂寵物旅館",
                    listType: "狗套房",
                    dogSize: "小型犬",
                    spStepper: true,
                    spPrice: 800,
                    BuyNum: 1,
                    listDate_S: "2023/8/17",
                    listDate_E: "2023/8/20",
                    listDate_T: "16:00",
                },
                {
                    id: "Hostel2",
                    type: "spHostel",
                    pictureSrc_m: "./images/pic/shop/goShop03_m.png",
                    pictureSrc: "./images/pic/shop/goShop03.png",
                    product: "快樂寵物旅館",
                    listType: "貓套房",
                    spStepper: true,
                    spPrice: 800,
                    BuyNum: 1,
                    listDate_S: "2023/8/17",
                    listDate_E: "2023/8/20",
                    listDate_T: "16:00",
                },
            ],
        };
    },
    // 預設全選。
    mounted() {
        this.checked = true;
        this.checkedNames = this.shoppingItems.map((item) => item.id);

        let nextButton = document.getElementById("Go_index");
        nextButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        const options = { year: "numeric", month: "long", day: "numeric" };
        this.nowDate = new Date().toLocaleDateString("zh-TW", options);
    },
    methods: {
        sameMember() {
            if (this.sameMemberChecked === true) {
                this.spOrderName = this.member_data.name;
                this.spOrderEmail = this.member_data.email;
                this.spOrderPhone = this.member_data.phone;
            }
        },
        caculate_point() {
            if (this.havePoints < this.totalPrice * 0.2) {
                this.usePoints = this.havePoints;
            } else {
                this.usePoints = this.totalPrice * 0.2;
            }
        },
        setCurrentStep(index) {
            this.currentStep = index;
        },
        // 切換全選狀態。如果checked為true，則將checkedNames設置為所有購物項目的ID，否則將其清空。
        allChecked() {
            if (this.checked) {
                this.checkedNames = this.shoppingItems.map((item) => item.id);
            } else {
                this.checkedNames = [];
            }
        },
        // 格式化日期資訊，顯示成特定的格式
        useDate(item) {
            if (item.spStepper) {
                item.listDate_D = Math.round(
                    (new Date(item.listDate_E) - new Date(item.listDate_S)) /
                    (1000 * 60 * 60 * 24)
                );
                const formattedStartDate = this.formatDate(item.listDate_S);
                const formattedEndDate = this.formatDate(item.listDate_E);
                return `${formattedStartDate} - ${formattedEndDate} (${item.listDate_D}晚)`;
            } else {
                const formattedDate = this.formatDate(item.listDate_S);
                return `${formattedDate} ｜ ${item.listDate_T}`;
            }
        },
        updateSubtotal(item) {
            if (item.spStepper) {
                item.listDate_D = Math.round(
                    (new Date(item.listDate_E) - new Date(item.listDate_S)) /
                    (1000 * 60 * 60 * 24)
                );
                item.spSubtotal = item.spPrice * item.BuyNum * item.listDate_D;
            } else {
                item.listDate_D = 1;
                item.spSubtotal = item.spPrice * item.BuyNum * item.listDate_D;
            }
        },
        // 計算小計(單價、數量和天數)
        countSubtotal(item) {
            console.log(item);
            // const listDate_E = item.listDate_E
            // const listDate_S = item.listDate_S
            // const listDate_E = '2023/08/20'
            // const listDate_S = '2023/08/17'
            if (item.spStepper) {

                item.listDate_D = Math.round(
                    (new Date(item.listDate_E) - new Date(item.listDate_S)) /
                    (1000 * 60 * 60 * 24)
                );


                return item.spPrice * item.BuyNum * item.listDate_D;
            } else {
                item.listDate_D = 1;
                return item.spPrice * item.BuyNum * item.listDate_D;
            }
        },
        // 更新數量，更新小計。
        updateAmount(item, change) {
            if (item.BuyNum < 9) {
                item.BuyNum = Math.max(1, item.BuyNum + change);
            } else if (item.BuyNum >= 9) {
                item.BuyNum = 8;
                item.BuyNum = Math.max(1, item.BuyNum + change);
            }
            this.updateSubtotal(item);
        },
        // 限制輸入在1～9之間
        handleInput(item) {
            if (item.BuyNum < 1) {
                item.BuyNum = 1;
            } else if (item.BuyNum > 9) {
                item.BuyNum = 9;
            }
            this.updateSubtotal(item);
        },
        // 格式化日期
        formatDate(dateStr) {
            const [month, day] = dateStr.split("/");
            return `${Number(month)}月${Number(day)}日`;
        },
        // 確認是否移除
        confirmDelete(index) {
            const isConfirmed = confirm("確認移除嗎？");
            if (isConfirmed) {
                // 點擊後刪除當前.spCard
                this.shoppingItems.splice(index, 1);
                // 引用整理索引
                this.updateIndex();
            }
        },
        // 重新整理索引值
        updateIndex() {
            this.shoppingItems.forEach((item, index) => {
                item.index = index;
            });
        },
        goToIndex() {
            window.location.href = "index.html";
        },
        //信用卡焦點改變
        handleCC(index, lengthToCheck) {
            const inputElement = this.$refs[`input${index}`];
            const inputValue = inputElement.value;

            const pattern = /^[0-9]*$/;
            if (!pattern.test(inputValue)) {
                inputElement.value = "";
                return;
            }

            if (inputValue.length === lengthToCheck && index < 7) {
                this.$refs[`input${index + 1}`].focus();
            } else if (inputValue.length === 0 && index > 1) {
                this.$refs[`input${index - 1}`].focus();
            }
        },
        // checkform() {
        //     this.validationErrors = [];
        //     if (this.spOrderName.trim() === "") {
        //         alert("姓名欄位不可為空值");
        //     } else if (!this.validateEmail(this.spOrderEmail)) {
        //         alert("請輸入正確的E-mail格式，例:XXX@XXX.XXX");
        //     } else if (!this.validatePhoneNumber(this.spOrderPhone)) {
        //         alert("請輸入正確的行動電話格式，例:09XXXXXXXX");
        //     } else if (this.cardNumber[0].trim() === "") {
        //         alert("信用卡欄位不可為空值");
        //     } else {
        //         this.currentStep++;
        //     }
        // },
        checkform() {
            this.validationErrors = [];
            if (this.spOrderName.trim() === "") {
                alert("姓名欄位不可為空值");
            } else if (!this.validateEmail(this.spOrderEmail)) {
                alert("請輸入正確的E-mail格式，例:XXX@XXX.XXX");
            } else if (!this.validatePhoneNumber(this.spOrderPhone)) {
                alert("請輸入正確的行動電話格式，例:09XXXXXXXX");
            } else if (this.cardNumber[0].trim() === "") {
                alert("信用卡欄位不可為空值");
            } else {
                this.currentStep++;
            }
        },
        validateEmail(email) {
            const emailRegex =
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            return emailRegex.test(email);
        },
        validatePhoneNumber(phone) {
            const phoneRegex = /^09\d{8}$/;
            return phoneRegex.test(phone);
        },
        resetSameMemberChecked() {
            this.sameMemberChecked = false;
        },
    },
    computed: {
        // 計算總價格。
        totalPrice() {
            return this.shoppingItems.reduce((total, item) => {
                if (this.checkedNames.includes(item.id)) {
                    return total + this.countSubtotal(item);
                }
                return total;
            }, 0);
        },
        canUsePoints() {
            const max = this.countSubtotal(this.shoppingItems[0]) * 0.2;
            return this.havePoints <= max ? this.havePoints : max;
        },
        payPrice() {
            return this.totalPrice - this.usePoints;
        },
        // 過濾勾選商品
        selectedItems() {
            return this.shoppingItems.filter((item) =>
                this.checkedNames.includes(item.id)
            );
        },
    },
    watch: {
        // 監視checkedNames的變化。若所有都被選，checked為true，否為false。
        checkedNames(val) {
            this.checked = val.length === this.shoppingItems.length;
        },
    },
});

app.mount("#spApp");
