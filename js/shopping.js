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
            // member_data: {
            //     // id: 1,
            //     // name: "王緯育",
            //     // email: "service@tibame.com",
            //     // phone: "0912345678",
            //     // havePoints: 100,
            //     // status: "正常",
            // },
            // member_data: {
            //     id: '',
            //     name: '',
            //     email: '',
            //     phone: '',
            //     havePoints: '',
            //     status: '',
            // },
            member_data: {},
            // member_data: [

            // ],

            // havePoints: 100,
            //步驟2:訂購資訊
            spOrderName: "",
            spOrderEmail: "",
            spOrderPhone: "",
            sameMemberChecked: false,
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
        // // this.checked = true;
        // this.checkedNames = this.shoppingItems.map((item) => item.id);

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
                            swal("發生錯誤", "請聯繫管理員", "info");
                        }
                    })
                    .catch((error1) => {
                        console.error('從伺服器取數據出錯：', error1);
                    });
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
                            phone: data.phone,
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
        },

        //同會員料
        sameMember() {
            if (this.sameMemberChecked === true) {
                this.spOrderName = this.member_data.name;
                this.spOrderEmail = this.member_data.email;
                this.spOrderPhone = this.member_data.phone;
            }
        },
        // 在你的Vue组件中
        // sameMember() {
        //     if (this.sameMemberChecked === true) {
        //         // 向 spMember.php 发送请求
        //         fetch('/path/to/spMember.php', {
        //             method: 'GET', // 或其他请求方法，根据你的需要
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 // 在这里处理从数据库返回的数据
        //                 if (data.success) {
        //                     // 更新Vue组件中的数据
        //                     this.spOrderName = data.name;
        //                     this.spOrderEmail = data.email;
        //                     this.spOrderPhone = data.phone;
        //                 } else {
        //                     // 数据库中未找到匹配的数据，进行适当的处理
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.error('Error fetching data from server:', error);
        //             });
        //     }
        // },
        // sameMember() {
        //     if (this.sameMemberChecked === true) {
        //         // 向 spMember.php 發送請求
        //         fetch('/thd102/g2/php/shopping/spMember.php', {
        //             method: 'GET', // 或其他請求方法，根據你的需要
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //             .then((response) => {
        //                 if (!response.ok) {
        //                     throw new Error('網絡響應不正確');
        //                 }
        //                 return response.json();
        //             })
        //             .then((data) => {
        //                 // 在這裡處理從資料庫返回的數據
        //                 if (data.login === "success") {
        //                     // 更新 Vue 組件中的 member_data
        //                     this.member_data = {
        //                         id: data.id,
        //                         name: data.name,
        //                         email: data.email,
        //                         phone: data.phone,
        //                         havePoints: data.havePoints,
        //                         status: data.status
        //                     };

        //                     // 其他需要的數據處理
        //                     // ...
        //                 } else {
        //                     // 資料庫中未找到匹配的數據，進行適當的處理
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.error('從伺服器獲取數據時出錯：', error);
        //             });
        //     }
        // },


        caculate_point() {
            return this.member_data.havePoints < Math.floor(this.totalPrice * 0.2) ? this.member_data.havePoints : Math.floor(this.totalPrice * 0.2);
            // if (this.member_data.havePoints) {
            //     return this.member_data.havePoints < Math.floor(this.totalPrice * 0.2) ? this.member_data.havePoints : Math.floor(this.totalPrice * 0.2);
            // }else{
            //     return this.member_data.havePoints = 0;
            // } 
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
        // 確認是否移除
        // confirmDelete(index) {
        //     const isConfirmed = confirm("確認移除嗎？");
        //     if (isConfirmed) {
        //         // 點擊後刪除當前.spCard
        //         this.shoppingItems.splice(index, 1);
        //         // 引用整理索引
        //         this.updateIndex();
        //         this.updateLocalStorage();

        //         // 更新 checkedNames，移除對應的項目 ID
        //         this.checkedNames = this.checkedNames.filter(id => id !== (index + 1).toString());

        //         // 输出调试信息
        //         console.log("shoppingItems:", this.shoppingItems);
        //         console.log("checkedNames:", this.checkedNames);

        //         // 更新全選状态
        //         this.checked = this.checkedNames.length === this.shoppingItems.length;
        //     }
        // },
        confirmDelete(index) {
            const isConfirmed = confirm("確認移除嗎？");
            if (isConfirmed) {
                // 获取要删除的项目的 ID
                const itemIdToDelete = (index + 1).toString();

                // 从 shoppingItems 中删除项目
                this.shoppingItems.splice(index, 1);
                // 更新索引
                this.updateIndex();

                // 更新 checkedNames，移除对应的项 ID
                this.checkedNames = this.checkedNames.filter(id => id !== itemIdToDelete);

                // 更新本地存储
                this.updateLocalStorage();
                // 更新全选状态
                // this.checked = this.checkedNames.length > 0;
                //         // 输出调试信息
                console.log("shoppingItems:", this.shoppingItems);
                console.log("checkedNames:", this.checkedNames);

                // 更新全选状态
                // this.checked = this.checkedNames.length === this.shoppingItems.length;
                // 强制更新全选状态
                // this.$forceUpdate();
                this.$nextTick(() => {
                    this.checked = this.checkedNames.length === this.shoppingItems.length;
                });
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
        // checkform() {
        //     let isValid = true;
        //     let cardFieldErrorShown = false;

        //     // 驗證姓名
        //     if (this.spOrderName.trim() === "") {
        //         isValid = false;
        //         alert("請確認姓名欄位是否正確");
        //     }

        //     // 驗證 Email
        //     if (!this.validateEmail(this.spOrderEmail)) {
        //         isValid = false;
        //         alert("請輸入正確的E-mail格式，例:XXX@XXX.XXX");
        //     }

        //     // 驗證行動電話
        //     if (!this.validatePhone(this.spOrderPhone)) {
        //         isValid = false;
        //         alert("請輸入正確的行動電話格式，例:09XXXXXXXX");
        //     }

        //     // 驗證信用卡號的每一個部分是否填寫錯誤
        //     for (let i = 0; i < this.cardNumber.length; i++) {
        //         if (this.cardNumber[i].trim() === "" || this.cardNumber[i].length !== 4) {
        //             isValid = false;
        //             if (!cardFieldErrorShown) {
        //                 alert("請確認信用卡『欄位填寫』是否正確");
        //                 cardFieldErrorShown = true; // 標記為已經顯示警告
        //             }
        //         }
        //     }

        //     // 驗證有效期限
        //     if (!this.validateCardDate()) {
        //         isValid = false;
        //         alert("請確認信用卡有效期限是否正確");
        //     }

        //     // 驗證 CVC/CVV
        //     if (this.cardCVC.length !== 3) {
        //         isValid = false;
        //     }

        //     // 驗證信用卡號是否合法
        //     // if (!this.validateCreditCard(this.cardNumber)) {
        //     //     isValid = false;
        //     //     alert("請確認信用卡『卡號』是否正確");
        //     // }

        //     // 如果通過驗證，執行下一步操作
        //     if (isValid) {
        //         this.saveFormDataToDatabase();
        //         // 執行下一步操作
        //         // this.currentStep++;
        //     }
        // },

        checkform() {
            let isValid = true;
            const errorText = []; // 用于收集错误消息的数组

            // 驗證姓名
            if (this.spOrderName.trim() === "") {
                isValid = false;
                errorText.push("姓名");
            }

            // 驗證 Email
            if (!this.validateEmail(this.spOrderEmail)) {
                isValid = false;
                errorText.push("E-mail");
            }

            // 驗證行動電話
            if (!this.validatePhone(this.spOrderPhone)) {
                isValid = false;
                errorText.push("行動電話");
            }

            // 驗證信用卡號的每一個部分是否填寫錯誤
            for (let i = 0; i < this.cardNumber.length; i++) {
                if (this.cardNumber[i].trim() === "" || this.cardNumber[i].length !== 4) {
                    isValid = false;
                    errorText.push("信用卡卡號");
                    break; // 如果发现问题，立即中断循环
                }
            }

            // 驗證有效期限
            if (!this.validateCardDate()) {
                isValid = false;
                errorText.push("信用卡有效期限");
            }

            // 驗證 CVC/CVV
            if (this.cardCVC.length !== 3) {
                isValid = false;
                errorText.push("CVC/CVV");
            }

            // 驗證信用卡號是否合法
            // if (!this.validateCreditCard(this.cardNumber)) {
            //     isValid = false;
            //     errorMessages.push("請確認信用卡『卡號』是否正確");
            // }

            // 如果通過驗證，執行下一步操作
            if (isValid) {
                this.saveFormDataToDatabase();
                // 執行下一步操作
                // this.currentStep++;
            } else {
                // 显示错误消息
                //   alert(errorMessages.join("\n"));
                // alert("請確認以下欄位是否正確：\n" + errorText.join("\n"));
                swal("請確認以下欄位是否正確:\n", errorText.join("\n"), "warning");
            }
        },

        validateEmail(email) {
            const emailRegex =
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            return emailRegex.test(email);
        },
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
        validateCardDate() {
            // 取現在年份new Date().getFullYear()的後兩位數toString().slice(-2)
            const thisYear = new Date().getFullYear().toString().slice(-2);

            // 取現在月份，月份是從0開始的，所以要加1
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
        resetSameMemberChecked() {
            this.sameMemberChecked = false;
        },

        handlePoints(event) {
            const maxUsePoints = this.caculate_point();
            let inputValue = event.target.value;

            // 使用檢查輸入是否為數字或刪除鍵
            const validInputRegex = /^[0-9\b]+$/;

            if (validInputRegex.test(inputValue)) {
                const usePointsValue = parseInt(inputValue);

                // usePoints 是否大於 maxUsePoints
                if (usePointsValue > maxUsePoints) {
                    this.usePoints = maxUsePoints.toString();
                } else {
                    this.usePoints = inputValue;
                }
            } else {
                this.usePoints = "";
            }
        }


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
    },
    watch: {
        // 監視checkedNames的變化。若所有都被選，checked為true，否為false。
        checkedNames(val) {
            this.checked = val.length === this.shoppingItems.length;
        },
    },
});

app.mount("#spApp");
