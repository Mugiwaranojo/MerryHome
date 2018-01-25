import cv2, base64, socket, sys
import numpy as np
import recognizer

if __name__ == '__main__':
	if len(sys.argv) == 4:
		TCP_IP = '127.0.0.1'
		TCP_PORT = int(sys.argv[1])
		
		imageName 	= sys.argv[2]
		cameraPath 	= sys.argv[3]
		if len(cameraPath)==1:
			cameraPath = int(cameraPath)

		video = cv2.VideoCapture(cameraPath)
		video.set(3,320)
		video.set(4,240)
		s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		s.bind((TCP_IP, TCP_PORT))
		s.listen(1)
		conn, addr = s.accept()
		try:
			while True:
				if video.isOpened():
					frame = video.read()[1];
				else:
					frame = np.zeros((320, 240), dtype=np.uint8)
					cv2.putText(frame, 'Camera(s) OFF', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 3)
				
				#face detection
				haarcascade = "/usr/local/share/OpenCV/haarcascades/haarcascade_frontalface_default.xml"
				faces = recognizer.FaceDetection.find(frame, haarcascade)
				#for (x, y, w, h) in faces:
					#cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
				# Encodage de l'image
				ret, image = cv2.imencode('.jpg', frame)
				
				# Conversion en Base64
				b64 = base64.encodestring(image)
				conn.sendall(imageName + b64)
		except:
			message = '%s' % sys.exc_value
			message = message.replace('\\', '/').replace('\n', '').replace('\r', '')
			conn.send('{"error": "%s"}' % message)
			print message
		conn.close()
		s.close()