const { activeOrder, deliverySchedule, paymentMethods } = window.FishiFishiData;
const {
  activatePaymentMethod,
  renderPaymentMethods,
  renderSchedule,
  renderTimeline
} = window.FishiFishiUI;

const activeOrderTitle = document.querySelector("#activeOrderTitle");
const protectedAmount = document.querySelector("#protectedAmount");
const timelineContainer = document.querySelector("#deliveryTimeline");
const paymentMethodsContainer = document.querySelector("#paymentMethods");
const scheduleRows = document.querySelector("#scheduleRows");
const confirmReceivedButton = document.querySelector("#confirmReceivedButton");
const reportIssueButton = document.querySelector("#reportIssueButton");

function bootDashboard() {
  activeOrderTitle.textContent = activeOrder.title;
  protectedAmount.textContent = activeOrder.amount;
  renderTimeline(timelineContainer, activeOrder.timeline);
  renderPaymentMethods(paymentMethodsContainer, paymentMethods);
  renderSchedule(scheduleRows, deliverySchedule);
}

function bindEvents() {
  paymentMethodsContainer.addEventListener("click", activatePaymentMethod);

  confirmReceivedButton.addEventListener("click", () => {
    const updatedTimeline = activeOrder.timeline.map((item) => {
      if (item.label === "Pendiente de recibido") {
        return {
          ...item,
          label: "Recibido confirmado",
          detail: "Li Wei confirmo recepcion",
          time: "Ahora",
          state: "done"
        };
      }

      return item;
    });

    renderTimeline(timelineContainer, updatedTimeline);
    confirmReceivedButton.textContent = "Recibido confirmado";
    confirmReceivedButton.disabled = true;
  });

  reportIssueButton.addEventListener("click", () => {
    reportIssueButton.textContent = "Incidencia abierta";
    reportIssueButton.disabled = true;
  });
}

bootDashboard();
bindEvents();
