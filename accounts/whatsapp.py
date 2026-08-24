import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

def send_whatsapp_notification(order, message, image_url=None, recipient_phone=None):
    """
    Sends a WhatsApp notification using the WhatsApp Business Cloud API.
    Falls back gracefully if credentials are not configured.
    """
    access_token = getattr(settings, 'WHATSAPP_ACCESS_TOKEN', None)
    phone_number_id = getattr(settings, 'WHATSAPP_PHONE_NUMBER_ID', None)
    
    if not recipient_phone:
        recipient_phone = getattr(settings, 'ADMIN_WHATSAPP_NUMBER', '919786497111')
    
    clean_recipient = ''.join(c for c in recipient_phone if c.isdigit())
    if clean_recipient.startswith('0'):
        clean_recipient = clean_recipient[1:]
    if len(clean_recipient) == 10:
        clean_recipient = "91" + clean_recipient

    if access_token and phone_number_id:
        url = f"https://graph.facebook.com/v18.0/{phone_number_id}/messages"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        # Build payload using the actual product image URL if available
        if image_url:
            payload = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": clean_recipient,
                "type": "image",
                "image": {
                    "link": image_url,
                    "caption": message
                }
            }
        else:
            payload = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": clean_recipient,
                "type": "text",
                "text": {
                    "preview_url": False,
                    "body": message
                }
            }
        
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            if response.status_code in [200, 201]:
                logger.info(f"WhatsApp Cloud API notification sent successfully to {clean_recipient}.")
                return True, response.json()
            else:
                logger.error(f"WhatsApp Cloud API failure. Code: {response.status_code}, Response: {response.text}")
                return False, response.text
        except Exception as e:
            logger.error(f"Exception raised during WhatsApp Cloud API call: {str(e)}")
            return False, str(e)
            
    logger.info("WhatsApp Cloud API credentials not configured. Using frontend wa.me fallback.")
    return False, None
