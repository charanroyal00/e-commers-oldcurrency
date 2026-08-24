# Production Deployment Guide — NUMIS E-Commerce

This document provides step-by-step instructions to deploy the NUMIS Numismatic E-Commerce platform to a production Linux server (e.g., Ubuntu VPS, AWS EC2, DigitalOcean Droplet, Heroku, or Render).

---

## 🏗️ Architecture Summary

*   **Frontend**: React.js + TypeScript (built via Vite into static assets under `dist/`)
*   **Backend**: Django + Django REST Framework + SimpleJWT
*   **Database**: MySQL
*   **WSGI Server**: Gunicorn
*   **Reverse Proxy**: Nginx (serves static assets, proxies `/api/` & `/admin/` to Gunicorn)

---

## 🔑 Environment Variables Setup

Before running the application in production, copy `.env.example` to `.env` in both the root folder and the `backend/` folder (if deploying from there) and set the following parameters:

```env
# ──────────────────────────────────────────────
# Django Core Config
# ──────────────────────────────────────────────
SECRET_KEY=your-long-random-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,api.yourdomain.com,127.0.0.1

# ──────────────────────────────────────────────
# Database (MySQL)
# ──────────────────────────────────────────────
DATABASE_NAME=e-commerce
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=your_db_host (e.g., RDS endpoint or 127.0.0.1)
DATABASE_PORT=3306

# ──────────────────────────────────────────────
# CORS / CSRF Origins (No wildcards in production)
# ──────────────────────────────────────────────
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# ──────────────────────────────────────────────
# Backend Base URL (Used for absolute media URLs in WhatsApp notifications)
# ──────────────────────────────────────────────
BACKEND_BASE_URL=https://api.yourdomain.com

# ──────────────────────────────────────────────
# WhatsApp Business Cloud API Settings
# ──────────────────────────────────────────────
WHATSAPP_ACCESS_TOKEN=your_whatsapp_business_permanent_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
ADMIN_WHATSAPP_NUMBER=919786497111
```

---

## 🖥️ Backend Deployment Steps

### 1. Install System Dependencies (Ubuntu example)
```bash
sudo apt update
sudo apt install -y python3-pip python3-venv mysql-server libmysqlclient-dev pkg-config
```

### 2. Set Up Virtual Environment & Dependencies
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Database Setup & Migrations
Ensure your MySQL server has a database matching the `DATABASE_NAME` value in your `.env`.
```bash
# Run Django Migrations
python manage.py migrate
```

### 4. Collect Static Files
This compiles all Django admin, REST framework, and app static files into the `staticfiles/` directory so Nginx can serve them directly.
```bash
python manage.py collectstatic --noinput
```

### 5. Running the Backend Server
Use Gunicorn to serve the WSGI application in production:
```bash
gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 3
```

To run this reliably in the background, set up a Systemd service:
```ini
# /etc/systemd/system/django.service
[Unit]
Description=Django Gunicorn Daemon
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/var/www/E-commers
ExecStart=/var/www/E-commers/.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 3
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl enable django
sudo systemctl start django
```

---

## 🎨 Frontend Build & Deployment

### 1. Install & Build
Before building the React app, make sure to set the API Base URL environment variable (if your build setup injects it) or set the `<meta>` tag in your templates:
```bash
# Install frontend dependencies
npm install

# Compile the TypeScript / React files
npm run build
```
This generates a production-ready `dist/` directory containing all optimized HTML, JS, and CSS files.

### 2. Connect Custom Landing Page (Vanilla JS)
For the customer-facing landing pages (which are vanilla HTML/JS), the scripts read the API base path dynamically from `window.__API_BASE_URL__`.
If your backend is hosted at a separate domain (e.g. `https://api.yourdomain.com`), add this `<meta>` tag inside the `<head>` of your public HTML files (`index.html`, `registration-form.html`, etc.) before loading any scripts:
```html
<meta name="api-base-url" content="https://api.yourdomain.com/api">
```
If your frontend and backend are served from the same domain (behind Nginx routing `/api` to Django), you do not need to add this tag; it will default to relative `/api` paths automatically.

---

## 🔌 Nginx Configuration (Reverse Proxy)

Create an Nginx configuration to serve the React files directly and proxy API/Admin traffic to Gunicorn:

```nginx
server {
    listen 80;
    server_name yourdomain.com api.yourdomain.com;

    # Static assets (Frontend React App Build)
    location / {
        root /var/www/E-commers/dist;
        try_files $uri $uri/ /index.html;
    }

    # Admin App Routing
    location /admin {
        root /var/www/E-commers/dist;
        try_files /admin.html =404;
    }

    # Django Admin Panel & API Endpoints
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /django-admin/ {
        proxy_pass http://127.0.0.1:8000/admin/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Django Admin Static Files
    location /static/ {
        alias /var/www/E-commers/staticfiles/;
    }

    # User-uploaded Media Files (Coin Images)
    location /media/ {
        alias /var/www/E-commers/media/;
    }
}
```

---

## 🩺 Monitoring & Verification

1.  **Health Check Endpoint**:
    *   Verify the server is running by visiting: `https://yourdomain.com/api/health/`
    *   Expected JSON response: `{"status": "ok"}`
2.  **Product Images & Media**:
    *   Ensure permissions are set correctly on the `media/` directory:
        ```bash
        chmod -R 755 /var/www/E-commers/media
        chown -R www-data:www-data /var/www/E-commers/media
        ```
