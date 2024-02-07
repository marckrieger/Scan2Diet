from PIL import Image
from .process_receipt import process_receipt

def process_image(file_name, user, scan_mode):
    # Process image based on scan_mode and save values to database corresponding to user
    if scan_mode == 'receipt':
        process_receipt(file_name, user)
    elif scan_mode == 'product':
        pass
    elif scan_mode == 'dish':
        pass