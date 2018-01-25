import cv2

class FaceDetection:
    @staticmethod
    def find(image, haarcascade, scaleFactor = 1.2, minNeighbors = 8):
        faceCascade = cv2.CascadeClassifier(haarcascade)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(gray, scaleFactor, minNeighbors)
        return faces