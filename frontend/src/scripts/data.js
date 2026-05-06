window.FishiFishiData = {
  activeOrder: {
    id: "FF-CN-24018",
    title: "FF-CN-24018 / Jaiba azul congelada",
    amount: "$428,600 USD",
    timeline: [
      {
        label: "Pago confirmado",
        detail: "Tarjeta empresarial tokenizada",
        time: "08:20",
        state: "done"
      },
      {
        label: "Mercancia en preparacion",
        detail: "Lote MX-JB-018 asignado",
        time: "10:40",
        state: "done"
      },
      {
        label: "En transito internacional",
        detail: "Cadena fria activa",
        time: "Actual",
        state: "current"
      },
      {
        label: "Pendiente de recibido",
        detail: "Comprador confirma al entregar",
        time: "Prox.",
        state: "pending"
      }
    ]
  },
  paymentMethods: [
    {
      name: "Tarjeta",
      status: "Aprobada",
      active: true
    },
    {
      name: "WeChat Pay",
      status: "Disponible CN",
      active: false
    },
    {
      name: "Stablecoin",
      status: "Proveedor KYC",
      active: false
    }
  ],
  deliverySchedule: [
    {
      delivery: "Semana 1 / Enero",
      volume: "1,000 ton",
      payment: "Confirmado",
      status: "En transito",
      confirmation: "Pendiente",
      tone: "ok"
    },
    {
      delivery: "Semana 1 / Febrero",
      volume: "1,000 ton",
      payment: "Preautorizado",
      status: "Reservado",
      confirmation: "No aplica",
      tone: "pending"
    },
    {
      delivery: "Semana 1 / Marzo",
      volume: "1,000 ton",
      payment: "Pendiente",
      status: "Bloqueado",
      confirmation: "No aplica",
      tone: "blocked"
    },
    {
      delivery: "Semana 1 / Abril",
      volume: "1,000 ton",
      payment: "Pendiente",
      status: "Sin liberar",
      confirmation: "No aplica",
      tone: "blocked"
    }
  ]
};
