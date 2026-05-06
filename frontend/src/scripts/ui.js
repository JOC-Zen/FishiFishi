function renderTimeline(container, timeline) {
  container.innerHTML = timeline
    .map((item) => {
      const mark = item.state === "pending" ? "" : "OK";

      return `
        <li class="timeline-item ${item.state}">
          <span class="timeline-dot">${mark}</span>
          <span class="timeline-copy">
            <strong>${item.label}</strong>
            <span>${item.detail}</span>
          </span>
          <span class="timeline-time">${item.time}</span>
        </li>
      `;
    })
    .join("");
}

function renderPaymentMethods(container, methods) {
  container.innerHTML = methods
    .map((method) => {
      const activeClass = method.active ? " active" : "";

      return `
        <button class="method-card${activeClass}" type="button" data-method="${method.name}">
          <strong>${method.name}</strong>
          <span>${method.status}</span>
        </button>
      `;
    })
    .join("");
}

function renderSchedule(container, rows) {
  container.innerHTML = rows
    .map((row) => {
      return `
        <tr>
          <td>${row.delivery}</td>
          <td>${row.volume}</td>
          <td>${row.payment}</td>
          <td><span class="table-status ${row.tone}">${row.status}</span></td>
          <td>${row.confirmation}</td>
        </tr>
      `;
    })
    .join("");
}

function activatePaymentMethod(event) {
  const selected = event.target.closest(".method-card");

  if (!selected) {
    return;
  }

  document.querySelectorAll(".method-card").forEach((card) => {
    card.classList.remove("active");
  });

  selected.classList.add("active");
}

window.FishiFishiUI = {
  activatePaymentMethod,
  renderPaymentMethods,
  renderSchedule,
  renderTimeline
};
