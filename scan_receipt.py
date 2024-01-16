from PIL import Image

import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

img = 'img/rewe_kassenbon_02.jpeg'
blacklisted_chars = 'ÄäÜüÖö'
blacklisted_chars = '\u00C4\u00E4\u00DC\u00FC\u00D6\u00F6'
config = f'--oem 3 --psm 11 tessedit_char_blacklist={blacklisted_chars}'
config = f'tessedit_char_blacklist={blacklisted_chars}'

str = pytesseract.image_to_string(Image.open(img), lang='deu', config="-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.")
print(str)