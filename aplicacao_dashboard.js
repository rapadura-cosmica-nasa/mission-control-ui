const API_URL = "http://localhost:8080/api/telemetry/latest";

async function updateDashboard() {
    const refreshButton = document.getElementById("refreshButton");
    const connectionStatus = document.getElementById("connectionStatus");
    const riskElement = document.getElementById("riskLevel");
    const alertContainer = document.getElementById("alertMessage");

    refreshButton.disabled = true;
    refreshButton.textContent = "Carregando...";
    connectionStatus.textContent = "Consultando a API...";

    try {
        const response = await fetch(API_URL);

        if (response.status === 404) {
            riskElement.textContent = "AGUARDANDO DADOS";
            riskElement.className = "loading";
            alertContainer.textContent = "Nenhuma telemetria registrada ainda. Inicie o simulador para enviar leituras.";
            connectionStatus.textContent = "API online (banco vazio).";
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        document.getElementById("astronautId").textContent = data.astronautId ?? "--";
        document.getElementById("heartRate").textContent = data.heartRate ?? "--";
        document.getElementById("spo2").textContent = data.spo2 ?? "--";
        document.getElementById("radiation").textContent = data.radiationDoseMsv ?? "--";
        document.getElementById("sleep").textContent = data.sleepHours ?? "--";

        const risk = String(data.riskLevel ?? "").toUpperCase();
        riskElement.textContent = risk || "INDEFINIDO";
        riskElement.className = ["NOMINAL", "WARNING", "CRITICAL"].includes(risk)
            ? risk.toLowerCase()
            : "loading";

        const actionHtml = data.recommendedAction
            ? `<div style="margin-bottom: 10px; padding: 10px; border-radius: 6px; background: rgba(37, 99, 235, 0.12); border-left: 3px solid #3b82f6; color: #f8fafc;">
                 <strong>Ação Recomendada:</strong> ${data.recommendedAction}
               </div>`
            : "";

        const alerts = (data.alertMessage || "Nenhuma mensagem de alerta recebida.")
            .split(" | ")
            .map(msg => `<li style="margin-left: 18px; margin-bottom: 4px;">${msg}</li>`)
            .join("");

        alertContainer.innerHTML = `${actionHtml}<ul style="margin: 0; padding: 0;">${alerts}</ul>`;

        const date = new Date(data.timestamp);
        document.getElementById("timestamp").textContent =
            data.timestamp && !Number.isNaN(date.getTime())
                ? date.toLocaleString("pt-BR")
                : "Data não disponível";

        connectionStatus.textContent = "Conexão com a API estabelecida.";

    } catch (error) {
        console.error("Erro ao buscar telemetria:", error);
        connectionStatus.textContent = "Não foi possível conectar à API. Verifique o servidor.";
        alertContainer.textContent = "Falha ao receber os dados de telemetria.";
        riskElement.textContent = "SEM CONEXÃO";
        riskElement.className = "loading";
    } finally {
        refreshButton.disabled = false;
        refreshButton.textContent = "Atualizar dados";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
    setInterval(updateDashboard, 3000);
});