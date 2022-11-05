# import cv2
# import numpy as np

# # Load imgae, grayscale, Gaussian blur, Otsu's threshold
# image = cv2.imread('IMG_8626.png')

# #detect a qr code using QRCodeDetector
# def detect_qr_code(image):
#     detector = cv2.QRCodeDetector()
#     data, bbox, straight_qrcode = detector.detectAndDecode(image)
#     if bbox is not None:
#         print("QR Code detected")
#         print("Data:", data)
#         n_lines = len(bbox)
#         print(n_lines)
#         for i in range(n_lines):
#             # draw all lines
#             point1 = tuple(bbox[i][0])
#             print(point1)
#             point2 = tuple(bbox[(i+1) % n_lines][0])
#             print(point2)
#             cv2.line(image, point1, point2, color=(255, 0, 0), thickness=2)
#     else:
#         print("QR Code not detected")
#     return image

# cv2.imwrite("result.png", detect_qr_code(image))

import cv2
def parse_image(image):

    original = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9,9), 0)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Morph close
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Find contours and filter for QR code
    cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.04 * peri, True)
        x,y,w,h = cv2.boundingRect(approx)
        area = cv2.contourArea(c)
        ar = w / float(h)
        if len(approx) == 4 and area > 1000 and (ar > .85 and ar < 1.3):
            cv2.rectangle(image, (x, y), (x + w, y + h + 6), (255, 0, 0), 3)
            ROI = original[y:y+h, x:x+w]
            cv2.imwrite('ROI.png', ROI)
            return ROI

parse_image(cv2.imread('IMG_8626.png'))