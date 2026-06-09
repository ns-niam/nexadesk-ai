# NexaDesk AI 🏦

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightblue)
![Status](https://img.shields.io/badge/Status-Active%20Development-success)

AI-Powered Banking Customer Support Agent built with FastAPI, Gemini AI, SQLite, Session Management, FAQ Retrieval, and Customer Support Workflows.


---

## Overview

NexaDesk AI is an intelligent banking customer support backend designed to simulate real-world banking support operations.

The project combines:

* Rule-Based Intent Classification
* FAQ Knowledge Retrieval
* AI-Powered Responses (Gemini)
* Customer Profile Management
* Session-Based Conversations
* Ticket Management
* Persistent Chat History using SQLite

The goal is to build a production-style AI banking assistant capable of handling customer support workflows.

---

# Features

## AI Features

* Gemini AI Integration
* Context-Aware Banking Responses
* AI Fallback System
* Professional Banking Assistant Persona

---

## Banking Support Features

### Account Services

* Account Opening Support
* Savings Account Information
* Current Account Information

### Loan Services

* Personal Loan
* Home Loan
* Education Loan
* Business Loan
* Auto Loan

### Card Services

* Credit Card Support
* Debit Card Support
* Card Security Assistance
* Lost Card Reporting

### Banking Services

* Balance Inquiry
* Money Transfer Support
* Branch Information
* Online Banking Support

---

## Customer Support Features

* Human Agent Handoff
* Ticket Generation
* Session Tracking
* Customer Profile Tracking

---

## Database Features

* SQLite Database
* Persistent Chat History
* FAQ Storage
* Customer Data Storage
* Ticket Storage

---

## System Architecture

```text
┌─────────────────────────┐
│       Customer          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      FastAPI API        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Session Management    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Customer Data Extractor │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     FAQ Retrieval       │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
 FAQ Found      FAQ Not Found
      │             │
      ▼             ▼
Direct Reply  Intent Classifier
                    │
                    ▼
            Banking Workflow
                    │
                    ▼
                Gemini AI
                    │
                    ▼
             Final Response
                    │
                    ▼
┌─────────────────────────┐
│     SQLite Database     │
├─────────────────────────┤
│ Chat History            │
│ FAQ Knowledge Base      │
│ Customer Profiles       │
│ Support Tickets         │
└─────────────────────────┘
```


---

# Current System Flow

```text
User Message
      │
      ▼
Customer Data Extraction
      │
      ▼
FAQ Search
      │
      ├── Found
      │       ▼
      │  FAQ Response
      │
      └── Not Found
              ▼
      Intent Classification
              ▼
      Banking Response
              ▼
          Gemini AI
              ▼
      Save To Database
```

---

# Project Structure

```text
nexadesk-ai/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── models/
│   │   │   └── chat.py
│   │   │
│   │   ├── services/
│   │   │   ├── config.py
│   │   │   ├── gemini_service.py
│   │   │   ├── intent_classifier.py
│   │   │   ├── session_manager.py
│   │   │   ├── ticket_manager.py
│   │   │   ├── memory.py
│   │   │   ├── customer_profile.py
│   │   │   ├── database.py
│   │   │   └── knowledge_base.py
│   │   │
│   │   └── routes/
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│
├── datasets/
│
├── docs/
│
└── models/
```

---

# API Endpoints

## System

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /             |
| GET    | /config-check |

---

## Sessions

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /new-session |

---

## Chat

| Method | Endpoint |
| ------ | -------- |
| GET    | /ask     |
| POST   | /chat    |

---

## History

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /history    |
| GET    | /db-history |

---

## Customer

| Method | Endpoint |
| ------ | -------- |
| GET    | /profile |

---

# Technologies Used

## Backend

* Python
* FastAPI
* Uvicorn

## AI

* Google Gemini API

## Database

* SQLite

## Data Models

* Pydantic

## Version Control

* Git
* GitHub

---

# Current Progress

## Completed

* FastAPI Backend
* Gemini Integration
* Intent Classification
* Session Management
* Customer Profile Extraction
* Human Handoff
* Ticket Generation
* SQLite Integration
* FAQ Retrieval System
* Persistent Chat History

---
# Feature Matrix

| Feature                   | Status     |
| ------------------------- | ---------- |
| FastAPI Backend           | ✅          |
| Gemini AI Integration     | ✅          |
| Intent Classification     | ✅          |
| Session Management        | ✅          |
| FAQ Retrieval System      | ✅          |
| SQLite Database           | ✅          |
| Persistent Chat History   | ✅          |
| Customer Profiles         | ✅          |
| Human Handoff             | ✅          |
| Ticket Generation         | ✅          |
| Banking Support Workflows | ✅          |
| Analytics API             | 🔄 Planned |
| Admin Dashboard           | 🔄 Planned |
| RAG Pipeline              | 🔄 Planned |
| Vector Database           | 🔄 Planned |
| Authentication            | 🔄 Planned |
| ML Intent Classifier      | 🔄 Planned |
| Sentiment Analysis        | 🔄 Planned |
| Fraud Detection Assistant | 🔄 Planned |

```

# Future Roadmap

## Phase 2

* Customer Database Tables
* Ticket Database Tables
* Analytics API
* Admin Dashboard

---

## Phase 3

* Banking Knowledge Base Expansion
* RAG Pipeline
* Semantic Search
* Vector Database

---

## Phase 4

* Authentication
* Role-Based Access Control
* Agent Dashboard
* Multi-Agent Architecture

---

## Phase 5

* ML-Based Intent Classification
* Fine-Tuned Banking Model
* Customer Sentiment Analysis
* Fraud Detection Assistance

---

# Installation

```bash
git clone https://github.com/ns-niam/nexadesk-ai.git

cd nexadesk-ai

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```
# Why This Project?

NexaDesk AI was built to simulate a real-world AI-powered banking customer support system.

The project demonstrates:

* Backend API Development
* AI Integration
* Database Design
* Customer Support Workflows
* Session Management
* Knowledge Retrieval Systems
* Production-Oriented Software Architecture

This project serves as a foundation for building enterprise-grade AI agents for banking, fintech, and customer support industries.

---

# Author

**Md Sha Niamatullah**

Ai Engineering Student

Building AI Products, Intelligent Systems, and Future Technology Ventures.

---

# Project Status

 Active Development

