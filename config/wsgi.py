"""
WSGI config for config project.
Exposes application and app for WSGI servers and Vercel serverless functions.
"""

import os
import pymysql

pymysql.install_as_MySQLdb()

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
app = application
