<div id="top" align="center">

# 🛰️ Mission Control UI (`mission-control-ui`)

**Real-Time Astronaut Telemetry Dashboard, Risk Visualization & Mission Operations Interface — Team Rapadura Cósmica**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-Static_Serve-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<p>
  <a href="#english">🇺🇸 English</a> •
  <a href="#português">🇧🇷 Português</a>
</p>

</div>

---

## 🇺🇸 English

Real-time astronaut health dashboard and mission control interface for visualizing biometric vital signs, automated risk classifications, and clinical countermeasures. Developed by **Team Rapadura Cósmica** for the **NASA Space Apps Challenge 2026**.

### Overview

`mission-control-ui` is the front-end layer of the **Rapadura Cósmica** astronaut telemetry ecosystem. It polls the Spring Boot persistence and orchestration gateway (`astronaut-health-api`) to display live biometric readings analyzed by the Python clinical rules engine (`telemetry-analytics`), providing immediate situational awareness for flight surgeons and mission operators.

### Key Features

* **Live Telemetry Polling:** Automatically fetches the latest astronaut telemetry payload every 3 seconds (`GET /api/telemetry/latest`) with manual refresh support.
* **Biometric Vital Cards:** Real-time display of **Heart Rate (`bpm`)**, **Blood Oxygen Saturation (`SpO₂ %`)**, **Orbital Radiation Exposure (`mSv`)**, and **Sleep Duration (`h`)** with domain-specific SVG iconography.
* **Automated Risk Status Banner:** Dynamic visual classification (`NOMINAL`, `WARNING`, `CRITICAL`) with color-coded badges and alert animations.
* **Actionable Countermeasures:** Highlights prioritized `recommendedAction` directives alongside structured, itemized clinical alerts (`alertMessage`).
* **Resilient State Handling:** Gracefully distinguishes between offline API states and empty database initialization (`404 Not Found`) prior to simulator ingestion.

### Architecture Integration

```text
[ Hardware / Telemetry Simulator ]
               │  POST /api/telemetry
               ▼
[ astronaut-health-api (Spring Boot :8080) ] ◄──► [ telemetry-analytics (Flask :5000) ]
               │
               │  GET /api/telemetry/latest (CORS enabled)
               ▼
[ mission-control-ui (Nginx / Static :3000) ]
```

### Project Structure

```text
mission-control-ui/
├── index.html                 # Semantic Mission Control layout and SVG metric cards
├── estilizacao_dashboard.css  # Dark aerospace theme, responsive grid, and risk state animations
├── aplicacao_dashboard.js     # Fetch API integration, polling loop, and DOM state rendering
├── .gitignore                 # Editor and local environment exclusions
└── README.md                  # Bilingual project documentation
```

### Getting Started

#### Option 1: Docker Compose (Recommended)

Run the entire stack (`telemetry-analytics`, `astronaut-health-api`, and `mission-control-ui`) from the root workspace:

```bash
docker compose up --build
```

Access the dashboard at **`http://localhost:3000`**.

#### Option 2: Standalone Local Server

If the back-end API is already running on `http://localhost:8080`, serve the static assets directly using Python or Nginx:

```bash
python3 -m http.server 3000
```

Then open **`http://localhost:3000`** in your browser.

### API Contract Consumed

The dashboard expects the following JSON payload from `GET http://localhost:8080/api/telemetry/latest`:

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

---

## 🇧🇷 Português

<p align="right">
  <a href="#top">⬆️ Voltar ao topo / Back to top</a>
</p>

Painel de saúde de astronautas em tempo real e interface de controle de missão para visualização de sinais vitais biométricos, classificações automatizadas de risco e contramedidas clínicas. Desenvolvido pela equipe **Rapadura Cósmica** para o **NASA Space Apps Challenge 2026**.

### Visão Geral

O `mission-control-ui` é a camada de front-end do ecossistema de telemetria de astronautas **Rapadura Cósmica**. Ele consulta periodicamente o gateway de persistência e orquestração em Spring Boot (`astronaut-health-api`) para exibir leituras biométricas em tempo real analisadas pelo motor de regras clínicas em Python (`telemetry-analytics`), oferecendo consciência situacional imediata para médicos de voo e operadores da missão.

### Principais Funcionalidades

* **Atualização Automática (Live Polling):** Busca automaticamente os dados mais recentes de telemetria a cada 3 segundos (`GET /api/telemetry/latest`), além de permitir atualização manual sob demanda.
* **Cards de Indicadores Biométricos:** Exibição em tempo real de **Frequência Cardíaca (`bpm`)**, **Oxigenação Sanguínea (`SpO₂ %`)**, **Exposição à Radiação Orbital (`mSv`)** e **Horas de Sono (`h`)** com ícones SVG dedicados ao domínio aeroespacial.
* **Banner Automatizado de Status de Risco:** Classificação visual dinâmica (`NOMINAL`, `WARNING`, `CRITICAL`) com badges coloridos e animações de alerta.
* **Contramedidas Acionáveis:** Destaca a diretriz prioritária de `recommendedAction` acompanhada da lista estruturada de alertas clínicos (`alertMessage`).
* **Tratamento Resiliente de Estados:** Diferencia de forma clara quando a API está offline ou quando o banco de dados ainda está vazio (`404 Not Found`) antes do início do simulador.

### Integração na Arquitetura

```text
[ Hardware / Simulador de Telemetria ]
               │  POST /api/telemetry
               ▼
[ astronaut-health-api (Spring Boot :8080) ] ◄──► [ telemetry-analytics (Flask :5000) ]
               │
               │  GET /api/telemetry/latest (CORS habilitado)
               ▼
[ mission-control-ui (Nginx / Estático :3000) ]
```

### Estrutura do Projeto

```text
mission-control-ui/
├── index.html                 # Estrutura semântica do Mission Control e cards SVG de métricas
├── estilizacao_dashboard.css  # Tema escuro aeroespacial, grid responsivo e animações de risco
├── aplicacao_dashboard.js     # Integração via Fetch API, loop de polling e renderização no DOM
├── .gitignore                 # Exclusões de configurações locais de editor e ambiente
└── README.md                  # Documentação bilíngue do projeto
```

### Como Executar

#### Opção 1: Docker Compose (Recomendado)

Suba toda a arquitetura (`telemetry-analytics`, `astronaut-health-api` e `mission-control-ui`) a partir da pasta raiz do workspace:

```bash
docker compose up --build
```

Acesse o painel em **`http://localhost:3000`**.

#### Opção 2: Servidor Local Isolado

Caso a API back-end já esteja em execução em `http://localhost:8080`, sirva os arquivos estáticos diretamente via Python ou Nginx:

```bash
python3 -m http.server 3000
```

Em seguida, abra **`http://localhost:3000`** no navegador.

### Contrato de API Consumido

O dashboard consome o seguinte payload JSON do endpoint `GET http://localhost:8080/api/telemetry/latest`:

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

---

<div align="center">

**Team Rapadura Cósmica** — NASA Space Apps Challenge 2026

<a href="#top">⬆️ Voltar ao topo / Back to top</a>

</div>
