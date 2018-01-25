import cv2
import numpy as np
import cv2

class MoveDetection:
	
	def __init__(self):
		self.firstFrame = None;
		
	def find(self, image):
		if self.firstFrame is None :
			firstGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
			firstGray = cv2.equalizeHist(firstGray)
			self.firstFrame = firstGray
			return image
		if image is not None:
			gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
			gray = cv2.equalizeHist(gray)
			firstFrame = self.firstFrame
			frameDelta = cv2.absdiff(firstFrame, gray)
			thresh = cv2.threshold(frameDelta, 150, 255, cv2.THRESH_BINARY)[1]
			thresh = cv2.dilate(thresh, None, iterations=1)
			im2, cnts, hierarchy = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
			for c in cnts:
				# if the contour is too small, ignore it
				if cv2.contourArea(c) < 50:
					continue
				(x, y, w, h) = cv2.boundingRect(c)
				cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 255), 2)
			self.firstFrame = image
			return 	thresh
		else :
			return None