const app = Vue.createApp({
    data() {
        return {
            currentStep: 0,
            steps: ["查看購物車", "填寫資料", "完成付款"],
            checked: false,
            checkedNames: [],

            member_data: {
                id: 1,
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
            // shoppingItems: [
            //     {
            //         id: "Car",
            //         type: "spDriver",
            //         pictureSrc_m: "./images/pic/shop/goShop01_m.png",
            //         pictureSrc: "./images/pic/shop/goShop01.png",
            //         product: "寵物接送",
            //         listType: "轎車",
            //         spStepper: false,
            //         spPrice: 300,
            //         BuyNum: 1,
            //         listDate_S: "2023/8/17",
            //         listDate_E: "2023/8/17",
            //         listDate_T: "16:00",
            //         startadd: "台北市中山區南京東路三段219號5樓",
            //         endadd: "台北市信義區福德街86號9樓"
            //     },
            //     {
            //         id: "Hostel1",
            //         type: "spHostel",
            //         pictureSrc_m: "./images/pic/shop/goShop02_m.png",
            //         pictureSrc: "./images/pic/shop/goShop02.png",
            //         product: "快樂寵物旅館",
            //         listType: "狗套房",
            //         dogSize: "小型犬",
            //         spStepper: true,
            //         spPrice: 800,
            //         BuyNum: 1,
            //         listDate_S: "2023/8/17",
            //         listDate_E: "2023/8/20",
            //         listDate_T: "16:00",
            //     },
            //     {
            //         id: "Hostel2",
            //         type: "spHostel",
            //         pictureSrc_m: "./images/pic/shop/goShop03_m.png",
            //         pictureSrc: "./images/pic/shop/goShop03.png",
            //         product: "快樂寵物旅館",
            //         listType: "貓套房",
            //         spStepper: true,
            //         spPrice: 800,
            //         BuyNum: 1,
            //         listDate_S: "2023/8/17",
            //         listDate_E: "2023/8/20",
            //         listDate_T: "16:00",
            //     },
            // ],
            shoppingItems: [],
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
            this.checked = true;
        }

        // 獲取最大可使用的點數
        const maxUsePoints = this.caculate_point();

        // 將 usePoints 初始化為最大可使用的點數
        this.usePoints = maxUsePoints;
    },

    // 預設全選。
    mounted() {
        this.checked = true;
        // this.checkedNames = this.shoppingItems.map((item) => item.id);

        let nextButton = document.getElementById("Go_index");
        nextButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        const options = { year: "numeric", month: "long", day: "numeric" };
        this.nowDate = new Date().toLocaleDateString("zh-TW", options);

        // 獲取最大可使用的點數
        const maxUsePoints = this.caculate_point();

        // 將 usePoints 初始化為最大可使用的點數
        this.usePoints = maxUsePoints;


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
        caculate_point() {
            return this.havePoints < this.totalPrice * 0.2 ? this.havePoints : this.totalPrice * 0.2;
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
        confirmDelete(index) {
            const isConfirmed = confirm("確認移除嗎？");
            if (isConfirmed) {
                // 點擊後刪除當前.spCard
                this.shoppingItems.splice(index, 1);
                // 引用整理索引
                this.updateIndex();
                this.updateLocalStorage();
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
            let cardFieldErrorShown = false;

            // 驗證姓名
            if (this.spOrderName.trim() === "") {
                isValid = false;
                alert("姓名欄位不可為空值");
            }

            // 驗證 Email
            if (!this.validateEmail(this.spOrderEmail)) {
                isValid = false;
                alert("請輸入正確的E-mail格式，例:XXX@XXX.XXX");
            }

            // 驗證行動電話
            if (!this.validatePhone(this.spOrderPhone)) {
                isValid = false;
                alert("請輸入正確的行動電話格式，例:09XXXXXXXX");
            }

            // 驗證信用卡號的每一個部分是否填寫錯誤
            for (let i = 0; i < this.cardNumber.length; i++) {
                if (this.cardNumber[i].trim() === "" || this.cardNumber[i].length !== 4) {
                    isValid = false;
                    if (!cardFieldErrorShown) {
                        alert("請確認信用卡『欄位填寫』是否正確");
                        cardFieldErrorShown = true; // 標記為已經顯示警告
                    }
                }
            }

            // 驗證有效期限
            if (!this.validateCardDate()) {
                isValid = false;
                alert("請確認信用卡有效期限是否正確");
            }

            // 驗證 CVC/CVV
            if (this.cardCVC.length !== 3) {
                isValid = false;
            }

            // 驗證信用卡號是否合法
            // if (!this.validateCreditCard(this.cardNumber)) {
            //     isValid = false;
            //     alert("請確認信用卡『卡號』是否正確");
            // }

            // 如果通過驗證，執行下一步操作
            if (isValid) {
                this.saveFormDataToDatabase();
                // 執行下一步操作
                // this.currentStep++;
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
            // 獲取當前年份new Date().getFullYear()的後兩位數toString().slice(-2)
            const currentYear = new Date().getFullYear().toString().slice(-2);

            // 驗證第一個input是否為01、02、03、04、05、06、07、08、09、10、11、12
            const monthInput = this.cardDate[0];
            if (!/^(0[1-9]|1[0-2])$/.test(monthInput)) {
                return false;
            }

            // 驗證第二個input是否大於等於今年的後兩碼
            const yearInput = this.cardDate[1];
            if (!/^\d{2}$/.test(yearInput) || parseInt(yearInput) < parseInt(currentYear)) {
                return false;
            }
            return true;
        },
        resetSameMemberChecked() {
            this.sameMemberChecked = false;
        },
        // async saveFormDataToDatabase() {
        //     try {
        //         // 構建要保存到ORDER表中的數據
        //         const orderData = {
        //             ORDERSTATUS: "無異動", // 從前端獲取
        //             ORDERDATE: this.nowDate, // 當前日期和時間
        //             BEFORETOTAL: this.totalPrice, // 總價格
        //             USEPOINTS: this.usePoints, // 使用的積分
        //             MEMBER_ID: this.member_data.id, // 會員ID
        //         };

        //         // 向伺服器發送POST請求保存訂單數據，並獲取生成的ORDER_ID
        //         const orderResponse = await fetch('../php/shopping/shopping.php', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ orderData }),
        //         });

        //         if (!orderResponse.ok) {
        //             console.error('保存ORDER數據到數據庫時出錯');
        //             return;
        //         }

        //         // 解析ORDER_RESPONSE以獲取生成的ORDER_ID
        //         const { ORDER_ID } = await orderResponse.json();

        //         // 將每個購物項的相關數據添加到ORDERDETAILS表中
        //         const orderDetailsData = this.shoppingItems.map((item) => {
        //             return {
        //                 NOWPRICE: item.spPrice, // 商品價格
        //                 QUANTITY: item.listDate_D, // 數量
        //                 AMOUNT: item.BuyNum, // 金額
        //                 SIZE: item.listType === "狗套房" ? item.dogSize : null, // 僅當listType為狗套房時傳遞
        //                 START: item.spStepper ? item.startadd : null, // 僅當spStepper為true時傳遞
        //                 END: item.spStepper ? item.endadd : null, // 僅當spStepper為true時傳遞
        //                 STARTDATE: item.listDate_S, // 開始日期
        //                 ENDDATE: item.listDate_E, // 結束日期
        //                 ORDER_ID, // 使用從ORDER表獲取的ORDER_ID
        //                 PRODUCT_ID: item.listType === "轎車" ? 1 : item.listType === "休旅車" ? 2 : item.listType === "貓套房" ? 3 : item.listType === "狗套房" ? 4 : null, // 根據不同的listType傳遞不同的值
        //                 HOTELINFO_ID: !item.spStepper ? item.product : null, // 僅當spStepper為false時傳遞
        //             };
        //         });

        //         // 向伺服器發送POST請求保存ORDERDETAILS數據
        //         const orderDetailsResponse = await fetch('../php/shopping/shopping.php', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ orderDetailsData }),
        //         });

        //         if (orderDetailsResponse.ok) {
        //             console.log('訂單數據已成功保存到數據庫');

        //             // 在此處執行currentStep++
        //             this.currentStep++;
        //         } else {
        //             console.error('保存訂單詳細數據到數據庫時出錯');
        //         }
        //     } catch (error) {
        //         console.error('保存訂單數據時發生錯誤:', error);
        //     }
        //     // try {
        //     //     const response = await fetch('../php/shopping/shopping.php', {
        //     //         method: 'POST',
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //         },
        //     //         body: JSON.stringify(dataToSave),
        //     //     });

        //     //     if (response.ok) {
        //     //         const responseData = await response.json();
        //     //         if (responseData.success) {
        //     //             console.log('订单数据已成功保存到数据库');
        //     //         } else {
        //     //             console.error('保存订单数据时出现问题：', responseData);
        //     //         }
        //     //     } else {
        //     //         console.error('请求出现问题，状态码：', response.status);
        //     //     }
        //     // } catch (error) {
        //     //     console.error('保存订单数据时出现错误：', error);
        //     // }

        // },





        handlePoints(event) {
            const maxUsePoints = this.caculate_point();
            let inputValue = event.target.value;

            // 使用正則表達式檢查輸入是否為有效數字或刪除鍵
            const validInputRegex = /^[0-9\b]+$/;

            if (validInputRegex.test(inputValue)) {
                // 如果輸入有效，將 usePoints 轉換為數值
                const usePointsValue = parseInt(inputValue);

                // 檢查 usePoints 是否大於 maxUsePoints
                if (usePointsValue > maxUsePoints) {
                    this.usePoints = maxUsePoints.toString();
                } else {
                    this.usePoints = inputValue;
                }
            } else {
                // 如果輸入無效，將其修正為合法的值 (只能是數字或空)
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
