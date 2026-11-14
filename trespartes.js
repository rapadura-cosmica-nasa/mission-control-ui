// ENDEREÇO DA API JAVA
const API_URL = "http://localhost:8080/api/telemetry/latest";


// FUNÇÃO PRINCIPAL: BUSCAR E ATUALIZAR OS DADOS
async function updateDashboard() {

    const refreshButton = document.getElementById("refreshButton");
    const connectionStatus = document.getElementById("connectionStatus");

    // Informa que a consulta está acontecendo
    refreshButton.disabled = true;
    refreshButton.textContent = "Carregando...";

    connectionStatus.textContent = "Consultando a API...";
    

    try {

        // 1. REALIZA A REQUISIÇÃO PARA A API JAVA
        const response = await fetch(API_URL);


        // 2. VERIFICA SE A RESPOSTA FOI BEM-SUCEDIDA
        if (!response.ok) {
            throw new Error(
                `Erro na API: ${response.status}`
            );
        }


        // 3. CONVERTE A RESPOSTA PARA JSON
        const data = await response.json();


        // 4. ATUALIZA A IDENTIFICAÇÃO DO ASTRONAUTA
        document.getElementById("astronautId").textContent =
            data.astronautId ?? "--";


        // 5. ATUALIZA A FREQUÊNCIA CARDÍACA
        document.getElementById("heartRate").textContent =
            data.heartRate ?? "--";


        // 6. ATUALIZA A OXIGENAÇÃO
        document.getElementById("spo2").textContent =
            data.spo2 ?? "--";


        // 7. ATUALIZA A EXPOSIÇÃO À RADIAÇÃO
        document.getElementById("radiation").textContent =
            data.radiationDoseMsv ?? "--";


        // 8. ATUALIZA AS HORAS DE SONO
        document.getElementById("sleep").textContent =
            data.sleepHours ?? "--";


        // 9. ATUALIZA O NÍVEL DE RISCO
        const riskElement = document.getElementById("riskLevel");

        const risk = String(data.riskLevel ?? "")
            .toUpperCase();

        riskElement.textContent = risk || "INDEFINIDO";


        // Aplica a classe CSS correspondente ao risco
        if (["NOMINAL", "WARNING", "CRITICAL"].includes(risk)) {
            riskElement.className = risk.toLowerCase();
        } else {
            riskElement.className = "loading";
        }


        // 10. ATUALIZA A MENSAGEM DE ALERTA
        document.getElementById("alertMessage").textContent =
            data.alertMessage ?? "Nenhuma mensagem de alerta recebida.";


        // 11. FORMATA A DATA RECEBIDA DA API
        const date = new Date(data.timestamp);

        if (data.timestamp && !Number.isNaN(date.getTime())) {

            document.getElementById("timestamp").textContent =
                date.toLocaleString("pt-BR");

        } else {

            document.getElementById("timestamp").textContent =
                "Data não disponível";

        }


        // 12. INDICA QUE A CONEXÃO FOI BEM-SUCEDIDA
        connectionStatus.textContent =
            "Conexão com a API estabelecida.";

    }


    // 13. TRATAMENTO DE ERROS
    catch (error) {

        console.error("Erro ao buscar telemetria:", error);

        connectionStatus.textContent =
            "Não foi possível conectar à API. Verifique o servidor.";

        document.getElementById("alertMessage").textContent =
            "Falha ao receber os dados de telemetria.";


        const riskElement = document.getElementById("riskLevel");

        riskElement.textContent = "SEM CONEXÃO";
        riskElement.className = "loading";

    }


    // 14. RESTAURA O BOTÃO
    finally {

        refreshButton.disabled = false;
        refreshButton.textContent = "Atualizar dados";

    }

}


// CONSULTA A API ASSIM QUE A PÁGINA É CARREGADA
document.addEventListener("DOMContentLoaded", updateDashboard);
