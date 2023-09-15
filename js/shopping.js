
const app = Vue.createApp({
    data() {
        return {
            //步驟數據
            currentStep: 0,
            steps: ["查看購物車", "填寫資料", "完成付款"],

            //步驟1:全選
            checked: false,
            checkedNames: [],

            //步驟一：LocalStorage抓下來的訂單資訊
            shoppingItems: [],

            //步驟2:同會員資料
            member_data: {},

            //步驟2:訂購資訊
            spOrderName: "",
            spOrderEmail: "",
            spOrderPhone: "",
            sameMemberChecked: false,
            usePoints: 0,
            usePointsCheck: true,
            USEpoint: "",

            nowDate: null,
            // orderID: "PT0004",
            orderID: "",

            spReadyName: "",
            spReadyEmail: "",
            spReadyPhone: "",

            cardNumber: ["", "", "", ""],
            cardDate: ["", ""],
            cardCVC: "",
            isStepTwoValid: false,
            validationErrors: [],

            nowDate: null,


        };
    },
    created() {
        //從localStorage取新項目
        const newItemsFromLocalStorage = JSON.parse(localStorage.getItem('newItems'));

        //更新購物車
        if (Array.isArray(newItemsFromLocalStorage)) {
            // 更新 this.shoppingItems
            this.shoppingItems = newItemsFromLocalStorage.map((item, index) => ({
                ...item,
                id: index + 1,
            }));

            // 重新設定 this.checkedNames 為所有項目的 id
            this.checkedNames = this.shoppingItems.map((item) => item.id);
            // this.checked = true;
        }

        // 獲取最大可使用的點數
        const maxUsePoints = this.caculate_point();

        // 將 usePoints 初始化為最大可使用的點數
        this.usePoints = maxUsePoints;
    },

    // 預設全選。
    mounted() {
        if (this.shoppingItems.length > 0) {
            this.checkedNames = this.shoppingItems.map((item) => item.id);
            this.checked = true;
        } else {
            this.checked = false;
        }

        let nextButton = document.getElementById("Go_index");
        nextButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        const options = { year: "numeric", month: "long", day: "numeric" };
        this.nowDate = new Date().toLocaleDateString("zh-TW", options);

        //從localStorage抓cartData
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        // 檢查 cartData 是否存在並且是一個陣列
        if (Array.isArray(cartData)) {
            // 更新 shoppingItems，設 id
            this.shoppingItems = cartData.map((item, index) => ({
                ...item,
                id: (index + 1).toString(),
            }));
            // 重新設定 this.checkedNames 為所有項目的 id
            this.checkedNames = this.shoppingItems.map((item) => item.id);
            this.checked = true;
        };
    },
    methods: {

        nextStepUpdate() {
            if (this.shoppingItems.length === 0) {
                // swal("購物車中沒有商品", "", "warning", {button: "去逛逛！"});
                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "warning",
                    // title: '查無此人?',
                    text: "購物車中沒有商品",
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        container: "swal2",
                    },
                });
                // swal("購物車中沒有商品", "warning");
            } else {
                // 檢查 localStorage 是否包含 member 的值
                const memberData = JSON.parse(localStorage.getItem('member'));

                if (!memberData) {
                    vm.ispop = true;
                } else {
                    const { account } = memberData; // 取帳號
                    fetch(`/thd102/g2/php/FrontendLogin/check.php?account=${account}`, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.login === "success") {
                                // 登入成功，取會員資料
                                this.fetchMemberData(account);
                            } else {
                                // 登入失敗，進行適當處理
                                // swal("發生錯誤", "請聯繫管理員", "info");
                                Swal.fire({
                                    toast: true,
                                    position: "top",
                                    icon: "warning",
                                    title: '發生錯誤',
                                    text: "請聯繫管理員",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    customClass: {
                                        container: "swal2",
                                    },
                                });
                            }
                        })
                        .catch((error1) => {
                            console.error('從伺服器取數據出錯：', error1);
                        });
                }
            }
        },

        fetchMemberData(account) {
            // 發送 GET 請求以檢索會員數據
            fetch(`/thd102/g2/php/shopping/spMember.php?account=${account}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.login === "success") {
                        // 更新 Vue 組件中的 member_data
                        this.member_data = {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            // phone: data.phone,
                            havePoints: data.havePoints,
                            status: data.status
                        };

                        // 更新 usePoints 和 currentStep
                        this.usePoints = this.caculate_point();
                        this.currentStep++;
                    }
                })
                .catch((error2) => {
                    console.error('從伺服器獲取會員數據時出錯：', error2);
                });
        },



        // 更新localStorage的資料
        updateLocalStorage() {
            const updatedCartData = this.shoppingItems.map((item, index) => ({
                ...item,
                id: index + 1,
            }));
            localStorage.setItem('cartData', JSON.stringify(updatedCartData));

            // 更新購物車
            updateCartItemCount();
            // 更新購物車數量
            const numberOfItems = updatedCartData.length;
            const SPcartNumElements = document.querySelectorAll(".SPcartNum");
            if (SPcartNumElements) {
                SPcartNumElements.forEach(function (element) {
                    element.textContent = numberOfItems;
                });
            }
        },

        //同會員料
        sameMember() {
            if (this.sameMemberChecked === true) {
                this.spOrderName = this.member_data.name;
                this.spOrderEmail = this.member_data.email;
                this.spOrderPhone = this.member_data.phone;
            }
        },
        caculate_point() {
            return this.member_data.havePoints < Math.floor(this.totalPrice * 0.2) ? this.member_data.havePoints : Math.floor(this.totalPrice * 0.2);
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
                item.spSubtotal = item.spPrice * item.BuyNum * item.listDate_D * item.listDistance;
            }
        },
        // 計算小計(單價、數量和天數)
        countSubtotal(item) {
            // console.log(item);
            if (item.spStepper) {
                item.listDate_D = Math.round(
                    (new Date(item.listDate_E) - new Date(item.listDate_S)) /
                    (1000 * 60 * 60 * 24)
                );
                return item.spPrice * item.BuyNum * item.listDate_D;
            } else {
                item.listDate_D = 1;
                return item.spPrice * item.BuyNum * item.listDate_D * item.listDistance;
            }
        },
        // 更新數量，更新小計。
        updateAmount(item, change) {
            item.BuyNum = parseInt(item.BuyNum);
            if (item.BuyNum < 9) {
                item.BuyNum = Math.max(1, item.BuyNum + change);
            } else if (item.BuyNum >= 9) {
                item.BuyNum = 8;
                item.BuyNum = Math.max(1, item.BuyNum + change);
            }
            this.updateSubtotal(item);
            this.updateLocalStorage();
        },
        // 限制輸入在1～9之間
        handleInput(item) {
            item.BuyNum = parseInt(item.BuyNum);
            if (item.BuyNum < 1) {
                item.BuyNum = 1;
            } else if (item.BuyNum > 9) {
                item.BuyNum = 9;
            }
            this.updateSubtotal(item);
            this.updateLocalStorage();
        },
        // 格式化日期
        formatDate(dateStr) {
            const [year, month, day] = dateStr.split("-");
            return `${Number(month)}月${Number(day)}日`;
        },
        confirmDelete(index) {
            const isConfirmed = confirm("確認移除嗎？");
            if (isConfirmed) {
                // 從 shoppingItems 中删除项目
                this.shoppingItems.splice(index, 1);
                // 更新索引
                this.updateIndex();
                // console.log("shoppingItems:", this.shoppingItems);
                this.checkedNames = this.shoppingItems.map(item => item.id.toString());
                this.updateLocalStorage();
                // console.log("checkedNames:", this.checkedNames);
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
        handleCC(index, maxLength) {
            // 信用卡號、有效期限、CVC/CVV 輸入處理函數
            if (this.$refs["input" + index].value.length === maxLength) {
                // 如果當前輸入框已達到最大長度
                if (index < 7) {
                    // 如果不是最後一個輸入框
                    this.$refs["input" + (index + 1)].focus(); // 將焦點移至下一個輸入框
                }
            } else if (this.$refs["input" + index].value.length === 0 && index > 1) {
                // 如果當前輸入框的文字長度為0，並且不是第一個輸入框
                this.$refs["input" + (index - 1)].focus(); // 將焦點移至前一個輸入框
            }
            //只能輸入數字或刪除鍵
            const inputValue = this.$refs["input" + index].value;
            if (!/^\d*$/.test(inputValue)) {
                this.$refs["input" + index].value = inputValue.replace(/\D/g, ''); // 删除非数字字符
            }
        },
        checkform() {
            let isValid = true;
            const errorText = [];
            const setTime = new Date();

            // 驗證購物項目
            for (const item of this.shoppingItems) {
                if (this.checkedNames.includes(item.id)) {
                    const listDateT = item.listDate_T ? item.listDate_T : '00:00';
                    const itemDateTime = new Date(`${item.listDate_S} ${listDateT}`);
                    const timeDifference = itemDateTime - setTime;
                    const hoursDifference = timeDifference / (1000 * 60 * 60);

                    // if (item.spStepper === false && hoursDifference <= 3) {
                    if (item.spStepper === false && hoursDifference <= 2.5) {
                        isValid = false;
                        errorText.push(`${item.product} 需要在3小時前下單`);
                        // } else if (item.spStepper === true && hoursDifference <= 24) {
                    }
                    else if (item.spStepper === true && hoursDifference <= 0) {
                        isValid = false;
                        errorText.push(`${item.product} 需要在一天前下單`);
                    }
                }
            }

            // console.log("Debugging this.cardNumber:", this.cardNumber);
            // console.log("Debugging validateCreditCard result:", this.validateCreditCard(this.cardNumber));

            // 如果通過購物項目驗證，繼續驗證其他表單欄位
            if (isValid) {
                if (this.spOrderName.trim() === "") {
                    isValid = false;
                    errorText.push("姓名");
                }
                if (!this.validateEmail(this.spOrderEmail)) {
                    isValid = false;
                    errorText.push("E-mail");
                }
                if (!this.validatePhone(this.spOrderPhone)) {
                    isValid = false;
                    errorText.push("行動電話");
                }
                // 信用卡號的每一個部分是否填寫錯誤以及驗證信用卡號是否合法
                if (this.cardNumber.some(part => part.trim() === "")) {
                    isValid = false;
                    errorText.push("信用卡卡號");
                } else {
                    for (let i = 0; i < this.cardNumber.length; i++) {
                        if (this.cardNumber[i].trim() === "" || this.cardNumber[i].length !== 4 || !this.validateCreditCard(this.cardNumber)) {
                            isValid = false;
                            errorText.push("信用卡卡號");
                            break;
                        }
                    }
                }
                if (!this.validateCardDate()) {
                    isValid = false;
                    errorText.push("信用卡有效期限");
                }
                if (this.cardCVC.length !== 3) {
                    isValid = false;
                    errorText.push("CVC/CVV");
                }
            }

            // 如果通過所有驗證，執行下一步操作，否則顯示錯誤消息
            if (isValid) {
                // console.log("startstep");
                this.saveFormDataToDatabase();
                // this.currentStep++;
            } else {
                // alert("請確認以下項目是否正確:\n", errorText.join("\n"));
                // swal("請確認以下項目是否正確:\n", errorText.join("\n"), "warning");
                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "warning",
                    title: '請確認以下是否正確:',
                    text: errorText.join("、"),
                    showConfirmButton: false,
                    timer: 5000,
                    customClass: {
                        container: "swal2",
                    },
                });


            }
        },


        //驗證信箱格式
        validateEmail(email) {
            const emailRegex =
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            return emailRegex.test(email);
        },
        //驗證手機格式
        validatePhone(phone) {
            const phoneRegex = /^09\d{8}$/;
            return phoneRegex.test(phone);
        },
        // 使用 Luhn 算法檢查信用卡號是否有效
        validateCreditCard(cardNumberArray) {
            // 將陣列轉換為單個字串，並清除空格和破折號
            const cleanedCardNumber = cardNumberArray.join('').replace(/[-\s]/g, '');
            let sum = 0;
            let doubleUp = false;

            for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
                let digit = parseInt(cleanedCardNumber.charAt(i), 10);
                if (doubleUp) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                sum += digit;
                doubleUp = !doubleUp;
            }
            return sum % 10 === 0;
        },
        //驗證卡片效期與格式
        validateCardDate() {
            // 取現在年份new Date().getFullYear()的後兩位數toString().slice(-2)
            const thisYear = new Date().getFullYear().toString().slice(-2);
            const thisMonth = new Date().getMonth() + 1;

            // 第一個input是否為01、02、03、04、05、06、07、08、09、10、11、12
            const monthInput = this.cardDate[0];
            if (!/^(0[1-9]|1[0-2])$/.test(monthInput)) {
                return false;
            }
            // 第二個input是否>=今年的後兩碼，且!<當前月份
            const yearInput = this.cardDate[1];
            if (
                !/^\d{2}$/.test(yearInput) ||
                (parseInt(yearInput) < parseInt(thisYear) ||
                    (parseInt(yearInput) === parseInt(thisYear) && parseInt(monthInput) < thisMonth))
            ) {
                return false;
            }
            return true;
        },

        //同會員資料
        resetSameMemberChecked() {
            this.sameMemberChecked = false;
        },
        //限制輸入的使用點數
        handlePoints(event) {
            const maxUsePoints = this.caculate_point();
            let inputValue = event.target.value;

            // 檢查輸入是否為數字或刪除鍵
            const InputRegex = /^[0-9\b]+$/;

            if (InputRegex.test(inputValue)) {
                const usePointsValue = parseInt(inputValue);
                if (usePointsValue > maxUsePoints) {
                    this.usePoints = maxUsePoints.toString();
                } else {
                    this.usePoints = inputValue;
                }
            } else {
                this.usePoints = "";
            }

            this.USEpoint = this.usePoints;
        },

        async saveFormDataToDatabase() {
            // console.log("ttt");
            // 取當前日期時間
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            const nowDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const usePoints = this.USEpoint;

            // console.log(usePoints);
            // 創建一個新陣列，用於存儲選中的購物項數據
            const selectedShoppingItems = [];
            this.shoppingItems.forEach((item) => {
                // 檢查購物項的 id 是否在 checkedNames 陣列中
                if (this.checkedNames.includes(item.id)) {
                    switch (item.listType) {
                        case "轎車":
                            item.listTypeValue = 1;
                            item.dogSizeValue = null;
                            break;
                        case "休旅車":
                            item.listTypeValue = 2;
                            item.dogSizeValue = null;
                            break;
                        case "貓套房":
                            item.listTypeValue = 3;
                            item.dogSizeValue = null;
                            item.startadd = null;
                            item.endadd = null;
                            break;
                        case "狗套房":
                            item.listTypeValue = 4;
                            item.startadd = null;
                            item.endadd = null;
                            if (item.dogSize === "小型犬") {
                                item.dogSizeValue = "小";
                            } else if (item.dogSize === "中型犬") {
                                item.dogSizeValue = "中";
                            } else if (item.dogSize === "大型犬") {
                                item.dogSizeValue = "大";
                            } else {
                                item.dogSizeValue = null;
                            }
                            break;
                        default:
                            item.listTypeValue = null;
                            item.dogSizeValue = null;
                    }
                    // 將選中的購物項添加到新陣列中
                    selectedShoppingItems.push(item);
                }
            });

            // 準備要傳遞的資料
            const dataToSend = {
                orderDate: nowDateTime,
                // usePoints: UsePoints,
                usePoints: usePoints,
                memberId: this.member_data.id,
                totalPrice: this.totalPrice,
                payPoints: this.payPoints,
                // shoppingItems: this.shoppingItems
                shoppingItems: selectedShoppingItems // 使用新陣列中的數據
            };

            // console.log(JSON.stringify(dataToSend));
            // console.log('要傳送的資料:', dataToSend);
            const jsonData = JSON.stringify(dataToSend);


            try {
                // 使用 Axios 發送 POST 請求到您的 PHP 檔案
                const response = await axios.post('/thd102/g2/php/shopping/shopping.php', jsonData);



                // 輸出完整的響應資料以進行調試
                // console.log('完整的響應資料:', response);
                const responseData = response.data;
                // console.log('響應數據結構:', responseData);
                // const successMessage = responseData.message;

                // 在此處處理 AJAX 響應
                // if (response.data.success) {
                if (responseData.success) {
                    // 處理成功的情況
                    localStorage.removeItem('hoteldata');
                    localStorage.removeItem('cartData');
                    // console.log('成功消息:', successMessage);
                    this.currentStep++;
                    console.log('資料已成功插入資料庫');
                    // 將後端傳來的ORDER ID存儲在data中
                    this.orderID = responseData.order_id; // 請確保您的Vue實例有名為orderID的數據屬性
                    // console.log('取得的ORDER ID:', this.orderID);

                    // console.log('currentStep 的值:', this.currentStep);
                } else {
                    // 處理失敗的情況
                    console.error('資料插入資料庫時出錯');
                    // console.error('後端錯誤消息:', responseData.error);
                }
            } catch (error) {
                // 處理錯誤
                console.error('發送 AJAX 請求時出錯：', error);

                if (error.response && error.response.data && error.response.data.error) {
                    const errorMessage = error.response.data.error;
                    console.error('後端錯誤消息:', errorMessage);
                } else {
                    console.error('未知錯誤:', error);
                }
            }
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
        payPrice() {
            return this.totalPrice - this.usePoints;
        },
        // 過濾勾選商品
        selectedItems() {
            return this.shoppingItems.filter((item) =>
                this.checkedNames.includes(item.id)
            );
        },
        payPoints() {
            return Math.floor((this.payPrice) / 100);
        },
    },
    watch: {
        // 監視checkedNames的變化。若所有都被選，checked為true，否為false。
        checkedNames(val) {
            // this.checked = val.length === this.shoppingItems.length;
            const storedCartData = localStorage.getItem("cartData");
            let cartData = [];
            if (storedCartData) {
                cartData = JSON.parse(storedCartData);
            }
            this.checked = val.length === cartData.length && val.length > 0;
        },
        currentStep(newStep) {
            const spCartNumElements = document.querySelectorAll(".SPcartNum");

            spCartNumElements.forEach((element) => {
                // 如果當前步驟是步驟三，將元素的display屬性設置為"none"，否則設置為"block"
                element.style.display = newStep === 2 ? "none" : "block";
            });
        },
    },
});

app.mount("#spApp");
