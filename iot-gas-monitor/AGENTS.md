# AGENTS.md

# Project Overview

This project is an IoT Gas Leak Monitoring System for a university final project.

The goal is reliability, readability, and successful demonstration.

Do not over-engineer the solution.

---

# Tech Stack

Firmware

- ESP8266
- Arduino IDE
- ESP8266WiFi
- PubSubClient
- ArduinoJson

Backend

- Python
- Flask
- SQLAlchemy
- SQLite
- paho-mqtt

Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Chart.js

Future

- Flutter

---

# Architecture

ESP8266

↓

MQTT Broker

↓

Flask Backend

↓

REST API

↓

React Dashboard

↓

Flutter (Future)

Never bypass the backend.

The frontend and Flutter must communicate only through REST API.

---

# Development Principles

Never generate the whole project at once.

Always work module by module.

Each module must compile before continuing.

Always explain the plan before writing code.

Wait for approval before the next module.

---

# Coding Rules

Use simple and readable code.

Prefer beginner-friendly implementation.

Avoid unnecessary abstraction.

Avoid unnecessary design patterns.

Do not optimize prematurely.

Keep files below approximately 300 lines whenever possible.

---

# Libraries

Do not introduce new libraries unless requested.

Do not replace approved libraries.

---

# File Modification Rules

Never modify unrelated files.

Never rename folders.

Never move files without approval.

Explain affected files before making changes.

---

# Backend Rules

Use Flask Blueprints.

Use SQLAlchemy ORM.

Use REST API.

No GraphQL.

No WebSocket.

No Socket.IO.

---

# Frontend Rules

Use React Functional Components.

Use Hooks.

Use Axios.

Use Tailwind CSS.

No Redux.

No Context API unless requested.

Keep components small.

---

# MQTT Rules

Use JSON payload.

Never publish plain text.

Separate telemetry and commands.

---

# Database Rules

Use SQLite.

Create only required tables.

No unnecessary tables.

---

# Error Handling

Always explain the cause of an error.

Suggest the simplest fix first.

Do not hide errors.

---

# Before Every Task

Always provide:

1. What will be created
2. Why it is needed
3. Files affected
4. Dependencies
5. How to test

Wait for approval before implementation.

---

# Prohibited

Do not redesign architecture.

Do not over-engineer.

Do not generate thousands of lines at once.

Do not invent requirements.

If requirements are unclear,

ASK FIRST.