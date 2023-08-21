export default {
  props: ["message"],
  template: `
  <div class="driverStepper">
  <p></p>
  <div class="driver_Subtotal_icon_wrapper col-5">
    <!-- updateAmount、updateSubtotal:增減數量並更新小計 -->
    <div class="dirver_Subtotal_icon" @click="MinusOne">
      <svg
        width="11"
        height="3"
        viewBox="0 0 11 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3125 0.875H0.6875C0.441406 0.875 0.25 1.09375 0.25 1.3125V2.1875C0.25 2.43359 0.441406 2.625 0.6875 2.625H10.3125C10.5312 2.625 10.75 2.43359 10.75 2.1875V1.3125C10.75 1.09375 10.5312 0.875 10.3125 0.875Z"
          fill="#E6E6E6"
        />
      </svg>
    </div>
    <p>{{ counter }}</p>
    <div class="dirver_Subtotal_icon" @click="PlusOne">
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3125 4.875H6.375V0.9375C6.375 0.71875 6.15625 0.5 5.9375 0.5H5.0625C4.81641 0.5 4.625 0.71875 4.625 0.9375V4.875H0.6875C0.441406 4.875 0.25 5.09375 0.25 5.3125V6.1875C0.25 6.43359 0.441406 6.625 0.6875 6.625H4.625V10.5625C4.625 10.8086 4.81641 11 5.0625 11H5.9375C6.15625 11 6.375 10.8086 6.375 10.5625V6.625H10.3125C10.5312 6.625 10.75 6.43359 10.75 6.1875V5.3125C10.75 5.09375 10.5312 4.875 10.3125 4.875Z"
          fill="#5E5E5E"
        />
      </svg>
    </div>
  </div>
</div>
    `,

  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    PlusOne() {
      this.counter++;
    },
    MinusOne() {
      this.counter--;
    },
  },
};
