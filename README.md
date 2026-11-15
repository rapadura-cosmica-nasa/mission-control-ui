<a id="top"></a>
<div align="center">

# 🛰️ Mission Control UI (`mission-control-ui`)

**Real-Time Astronaut Telemetry Dashboard, Risk Visualization & Mission Operations Interface — Team Rapadura Cósmica**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Nginx](https://img.shields.io/badge/Nginx-Static_Serve-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[🇺🇸 English](#english-docs) • [🇧🇷 Português](#portugues-docs)

</div>

---

<a id="english-docs"></a>
## 🇺🇸 English

### Overview

This service is the **Real-Time Astronaut Health Dashboard & Mission Control Interface** (`mission-control-ui`) developed by **Team Rapadura Cósmica** for the **NASA Space Apps Challenge 2026**.

Operating as the front-end presentation layer within a decoupled microservice architecture, it continuously polls the **Core API (Java / Spring Boot)** to render live biometric vital signs, automated clinical risk classifications analyzed by the **Python Analytics Engine**, and prioritized operational countermeasures (`recommendedAction`) for flight surgeons and mission operators.

### Key Features

* **Live Telemetry Polling:** Automatically fetches the latest astronaut telemetry payload every 3 seconds (`GET /api/telemetry/latest`) with manual refresh support.
* **Biometric Vital Cards:** Real-time display of **Heart Rate (`bpm`)**, **Blood Oxygen Saturation (`SpO₂ %`)**, **Orbital Radiation Exposure (`mSv`)**, and **Sleep Duration (`h`)** with domain-specific SVG iconography.
* **Automated Risk Status Banner:** Dynamic visual classification (`NOMINAL`, `WARNING`, `CRITICAL`) with color-coded badges and alert animations.
* **Actionable Countermeasures:** Highlights prioritized `recommendedAction` directives alongside structured, itemized clinical alerts (`alertMessage`).
* **Resilient State Handling:** Gracefully distinguishes between offline API states and empty database initialization (`404 Not Found`) prior to simulator ingestion.

### System Flow

```text
[Telemetry Simulator] ──(POST /api/telemetry)──► [Core API: Spring Boot] ──► [H2 Database]
                                                        │          │
                              (GET /api/telemetry/latest)          └──(POST /api/v1/analyze)──► [Flask Analytics Engine]
                                        ▼                                                               │
                               [Mission Dashboard] ◄───────────────(200 OK: Enriched JSON)────────────┘
```

### Project Architecture

Built with vanilla semantic HTML5, modular aerospace-themed CSS3, and asynchronous ES6+ JavaScript for zero-dependency static serving via Nginx:

```text
mission-control-ui/
├── index.html                 # Semantic Mission Control layout and SVG metric cards
├── estilizacao_dashboard.css  # Dark aerospace theme, responsive grid, and risk state animations
├── aplicacao_dashboard.js     # Fetch API integration, polling loop, and DOM state rendering
├── .gitignore                 # Editor and local environment exclusions
└── README.md                  # Bilingual project documentation
```

### API Contract Consumed

#### Latest Telemetry Retrieval
* **Endpoint:** `GET http://localhost:8080/api/telemetry/latest`
* **Response Payload (`200 OK`):**
```json
{
  "astronautId": "ASTRO-01",
  "heartRate": 102,
  "spo2": 86,
  "radiationDoseMsv": 1.49,
  "sleepHours": 4.8,
  "riskLevel": "CRITICAL",
  "alertMessage": "Hipóxia crítica detectada (SpO2 < 90%). | Privação severa de sono (< 5.0h).",
  "recommendedAction": "Verificar vedação do traje/cabine e administrar oxigênio suplementar a 100%.",
  "timestamp": "2026-11-15T00:56:21Z"
}
```

### Getting Started

#### Option 1: Full Platform via Docker Compose (Recommended)

Run the entire stack (`telemetry-analytics`, `astronaut-health-api`, and `mission-control-ui`) from the central platform orchestrator:

```bash
# 1. Clone the platform repository with submodules
git clone --recurse-submodules https://github.com/rapadura-cosmica-nasa/rapadura-cosmica-platform.git
cd rapadura-cosmica-platform

# 2. Build and start all containers
docker compose up --build -d

# 3. Access the Mission Control UI at http://localhost:3000
```

#### Option 2: Standalone Local Server

If the Core API is already running on `http://localhost:8080`, serve the static assets directly using Python:

```bash
# 1. Clone the UI repository
git clone https://github.com/rapadura-cosmica-nasa/mission-control-ui.git
cd mission-control-ui

# 2. Start a local static server on port 3000
python3 -m http.server 3000

# 3. Open http://localhost:3000 in your browser
```

---

<a id="portugues-docs"></a>
## 🇧🇷 Português

[⬆️ Back to top / Voltar ao topo](#top)

### Visão Geral

Este serviço é o **Painel de Saúde de Astronautas em Tempo Real e Interface de Controle de Missão** (`mission-control-ui`) desenvolvido pela equipe **Rapadura Cósmica** para o **NASA Space Apps Challenge 2026**.

Operando como a camada de apresentação front-end dentro de uma arquitetura de microsserviços desacoplados, ele consulta continuamente a **Core API (Java / Spring Boot)** para exibir sinais vitais biométricos em tempo real, classificações automatizadas de risco clínico analisadas pelo **Motor Analítico Python** e contramedidas operacionais priorizadas (`recommendedAction`) para médicos de voo e operadores da missão.

### Principais Funcionalidades

* **Atualização Automática (Live Polling):** Busca automaticamente os dados mais recentes de telemetria a cada 3 segundos (`GET /api/telemetry/latest`), além de permitir atualização manual sob demanda.
* **Cards de Indicadores Biométricos:** Exibição em tempo real de **Frequência Cardíaca (`bpm`)**, **Oxigenação Sanguínea (`SpO₂ %`)**, **Exposição à Radiação Orbital (`mSv`)** e **Horas de Sono (`h`)** com ícones SVG dedicados ao domínio aeroespacial.
* **Banner Automatizado de Status de Risco:** Classificação visual dinâmica (`NOMINAL`, `WARNING`, `CRITICAL`) com badges coloridos e animações de alerta.
* **Contramedidas Acionáveis:** Destaca a diretriz prioritária de `recommendedAction` acompanhada da lista estruturada de alertas clínicos (`alertMessage`).
* **Tratamento Resiliente de Estados:** Diferencia de forma clara quando a API está offline ou quando o banco de dados ainda está vazio (`404 Not Found`) antes do início do simulador.

### Fluxo no Sistema

```text
[Simulador de Telemetria] ──(POST /api/telemetry)──► [Core API: Spring Boot] ──► [Banco H2]
                                                            │          │
                                  (GET /api/telemetry/latest)          └──(POST /api/v1/analyze)──► [Motor Flask Analytics]
                                            ▼                                                               │
                                   [Painel da Missão] ◄───────────────(200 OK: JSON Enriquecido)────────────┘
```

### Arquitetura do Projeto

Desenvolvido com HTML5 semântico puro, CSS3 modular com tema aeroespacial e JavaScript ES6+ assíncrono para entrega estática leve e sem dependências via Nginx:

```text
mission-control-ui/
├── index.html                 # Estrutura semântica do Mission Control e cards SVG de métricas
├── estilizacao_dashboard.css  # Tema escuro aeroespacial, grid responsivo e animações de risco
├── aplicacao_dashboard.js     # Integração via Fetch API, loop de polling e renderização no DOM
├── .gitignore                 # Exclusões de configurações locais de editor e ambiente
└── README.md                  # Documentação bilíngue do projeto
```

### Contrato de API Consumido

#### Consulta da Última Telemetria
* **Endpoint:** `GET http://localhost:8080/api/telemetry/latest`
* **Payload de Saída (`200 OK`):**
```json
{
  "astronautId": "ASTRO-01",
  "heartRate": 102,
  "spo2": 86,
  "radiationDoseMsv": 1.49,
  "sleepHours": 4.8,
  "riskLevel": "CRITICAL",
  "alertMessage": "Hipóxia crítica detectada (SpO2 < 90%). | Privação severa de sono (< 5.0h).",
  "recommendedAction": "Verificar vedação do traje/cabine e administrar oxigênio suplementar a 100%.",
  "timestamp": "2026-11-15T00:56:21Z"
}
```

### Como Executar

#### Opção 1: Plataforma Completa via Docker Compose (Recomendado)

Suba toda a arquitetura (`telemetry-analytics`, `astronaut-health-api` e `mission-control-ui`) a partir do repositório orquestrador central:

```bash
# 1. Clone o repositório da plataforma com os submódulos
git clone --recurse-submodules https://github.com/rapadura-cosmica-nasa/rapadura-cosmica-platform.git
cd rapadura-cosmica-platform

# 2. Construa e inicie todos os contêineres
docker compose up --build -d

# 3. Acesse a interface Mission Control UI em http://localhost:3000
```

#### Opção 2: Servidor Local Isolado

Caso a Core API já esteja em execução em `http://localhost:8080`, sirva os arquivos estáticos diretamente via Python:

```bash
# 1. Clone o repositório da interface
git clone https://github.com/rapadura-cosmica-nasa/mission-control-ui.git
cd mission-control-ui

# 2. Inicie um servidor estático local na porta 3000
python3 -m http.server 3000

# 3. Abra http://localhost:3000 no navegador
```

---

<div align="center">

**Team Rapadura Cósmica** — NASA Space Apps Challenge 2026

* **Core API & Persistência (Java / Spring Boot):** [Mateus Queiroz](https://github.com/tue1093) & [Grimaldo Júnior](https://github.com/grimaldojunior0413-cloud)
* **Edge, Simulação & Análise de Anomalias (Python / Flask):** [Murilo Costa](https://github.com/MuriloDev07) & [Gabriel Guedes](https://github.com/gueeds)
* **Interface & Experiência do Astronauta (Front-end):** [Cauã Max](https://github.com/pl4utus)
* **Pesquisa Científica NASA, Documentação & Pitch:** [Davi Duclerc](https://github.com/daviduclerc)

[⬆️ Back to top / Voltar ao topo](#top)

</div>
