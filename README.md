# 🧠 NeuroBalance

> **An AI-powered burnout detection system built with an enterprise-grade DevOps, CI/CD, and Observability pipeline.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=Grafana&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## 📖 Overview
NeuroBalance is a full-stack web application designed to detect and predict burnout using Artificial Intelligence. Beyond the application layer, this project demonstrates a highly robust cloud infrastructure architecture, featuring automated provisioning, containerization, real-time hardware/traffic monitoring, and zero-downtime CI/CD deployments.

## 🏗️ Architecture & Tech Stack

### 💻 Application Layer
* **Frontend:** React + Vite (Fast, hot-module replacement client)
* **Backend:** FastAPI (High-performance asynchronous Python API)
* **AI/ML:** Machine Learning models for predictive burnout analysis

### ⚙️ DevOps & Infrastructure
* **Containerization:** Docker & Docker Compose
* **Infrastructure as Code (IaC):** Terraform
* **Configuration Management:** Ansible
* **CI/CD Pipeline:** Jenkins (Automated pulling, testing, and deployment via GitHub Webhooks)
* **Hosting:** Amazon Web Services (AWS EC2)

### 📊 Observability & Monitoring
* **Prometheus:** Time-series database scraping backend metrics.
* **Grafana:** Live command-center dashboard tracking:
  * Total API Traffic & Endpoint usage
  * Real-time Server CPU Load
  * Memory (RAM) Consumption
  * Backend Service Uptime

## 🚀 Features
- **Automated Deployments:** A git push to the `main` branch instantly triggers a Jenkins webhook, deploying the latest containerized code to the AWS server without manual SSH intervention.
- **Hardware Telemetry:** Prometheus continuously monitors the Python backend, visualizing hardware constraints and network requests to prevent memory leaks or server crashes.
- **AI Integration:** Seamlessly connects the React frontend to advanced predictive models via a RESTful FastAPI backend.
