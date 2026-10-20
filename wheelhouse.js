const API_URL = "http://localhost:3000/api/v1";

const money = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const servicesStatus = document.getElementById("services-status");
const servicesList = document.getElementById("services-list");
const serviceStatus = document.getElementById("service-status");
const serviceDetail = document.getElementById("service-detail");
const serviceSearch = document.getElementById("service-search");

async function readService(path, status) {
  try {
    const response = await fetch(`${API_URL}/services${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    const document = await response.json();
    if (!response.ok) {
      status.textContent = document.errors.join(" ");
      return null;
    }
    status.textContent = "";
    return document;
  } catch {
    status.textContent = "No se pudo contactar con la API de Wheelhouse. Inténtalo más tarde.";
    return null;
  }
}

async function loadServices() {
  const services = await readService("", servicesStatus);
  if (services === null) return;

  servicesList.replaceChildren();
  for (const service of services) {
    const item = document.createElement("li");
    item.textContent = `${service.name}: ${money.format(service.standard_price)}`;
    servicesList.append(item);
  }
  if (services.length === 0) servicesStatus.textContent = "No hay servicios registrados.";
}

async function findService(event) {
  event.preventDefault();
  const id = document.getElementById("service-id").value;
  const button = serviceSearch.querySelector("button");
  button.disabled = true;
  serviceDetail.replaceChildren();
  serviceStatus.textContent = "Cargando servicio…";
  try {
    const service = await readService(`/${encodeURIComponent(id)}`, serviceStatus);
    if (service === null) return;

    for (const [label, value] of [
      ["Nombre", service.name],
      ["Precio", money.format(service.standard_price)],
      ["Reparaciones en que se cobró", service.repairs_count],
    ]) {
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      detail.textContent = value;
      serviceDetail.append(term, detail);
    }
  } finally {
    button.disabled = false;
  }
}

serviceSearch.addEventListener("submit", findService);
await loadServices();
