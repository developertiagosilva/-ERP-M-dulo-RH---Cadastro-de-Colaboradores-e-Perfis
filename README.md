![](/erp_projeto_1/pag.png)

# ERP Módulo RH - Cadastro de Colaboradores e Perfis

Este é o **Projeto 1** de uma série de 20 projetos práticos voltados para o aprendizado e domínio do **Django REST Framework (DRF)** no Backend integrando com **React (Vite)** no Frontend.

---

## 🚀 Tecnologias Utilizadas

### Backend
* **Python 3.x**
* **Django & Django REST Framework** (Criação de APIs RESTful)
* **django-cors-headers** (Gerenciamento de CORS para comunicação com o Frontend)
* **SQLite** (Banco de dados de desenvolvimento)

### Frontend
* **React** (Biblioteca para construção de interfaces SPA)
* **Vite** (Build tool rápida para desenvolvimento frontend)
* **Axios** (Cliente HTTP para consumo da API)

---

## 📐 Arquitetura do Projeto

O projeto é estruturado em uma arquitetura desacoplada (decoupled):

```text
erp_projeto_1/
├── backend/          # API RESTful em Django
│   ├── core/         # Configurações globais do Django
│   ├── rh/           # App com Models, Serializers e ViewSets
│   └── manage.py
├── frontend/         # Aplicação SPA em React
│   ├── src/          # Componentes e integração com Axios
│   └── package.json
├── .gitignore
└── README.md