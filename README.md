# NUMIS — Old Currency Marketplace

NUMIS is a full-stack e-commerce marketplace platform for buying and selling rare historical coins, banknotes, and numismatic collectables.

---

## 🛠️ Tech Stack

*   **Frontend**: React.js + TypeScript (Vite), Tailwind CSS, vanilla HTML/CSS/JS for landing page, and GSAP animations.
*   **Backend**: Django + Django REST Framework + SimpleJWT.
*   **Database**: MySQL.
*   **Notifications**: WhatsApp Business API Integration for Admin order alerts and Customer order status updates.

---

## 🚀 Local Development Setup

### Prerequisite Services
Ensure you have **MySQL** running locally on port `3306`.

### 1. Environment Configuration
Copy the env template file to configure your local credentials:
```bash
cp .env.example .env
```
Open `.env` and fill in your MySQL root password and WhatsApp settings:
```env
DATABASE_PASSWORD=Charan@278
```

### 2. Backend Setup
Create a virtual environment, install requirements, and apply migrations:
```bash
python -m venv .venv
source .venv/Scripts/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Load default users (Admin/Seller) and import coin products
python manage.py shell -c "from django.core.management import call_command; print('System setup complete.')"
```

Start the Django API server:
```bash
python manage.py runserver
```
The Django server will run at: `http://127.0.0.1:8000/`

### 3. Frontend Setup
Install npm modules and start the Vite development server:
```bash
npm install
npm run dev
```
The Vite development server will run at: `http://localhost:5173/`

---

## 🏗️ Production Build & Deployment

To compile the frontend assets for deployment:
```bash
npm run build
```
This generates static files inside `dist/`.

For detailed production server, Gunicorn, systemd, and Nginx reverse proxy configuration details, refer to the [Production Deployment Guide](file:///c:/Users/chara/Desktop/E-commers/DEPLOYMENT.md).

---

## 🩺 System Verification & Health Check

Visit `http://127.0.0.1:8000/api/health/` to check if the backend service is up and healthy.
Expected response:
```json
{
  "status": "ok"
}
```