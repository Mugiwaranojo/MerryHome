# import the necessary packages
import numpy as np
import argparse, time, cv2, base64, socket
import detector

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--port", type=int, required=True,
	help="port use in local for transmit image to server")
ap.add_argument("-f", "--file", required=True,
	help="name of file output")
ap.add_argument("-c", "--camera", required=True,
	help="int of video camera or url")
args = vars(ap.parse_args())

def diffImg(t0, t1, t2):
  d1 = cv2.absdiff(t2, t1)
  d2 = cv2.absdiff(t1, t0)
  return cv2.bitwise_and(d1, d2)
  
# initialize the video stream and allow the cammera sensor to warmup
cameraPath 	= args["camera"]
if len(cameraPath)==1:
	cameraPath = int(cameraPath)
print("[INFO] camera sensor warming up...")
video = cv2.VideoCapture(cameraPath)
video.set(cv2.CAP_PROP_FPS, 16);
video.set(3,320)
video.set(4,240)
time.sleep(2.0)

# initialize local socket for emit stream to client
TCP_IP = '127.0.0.1'
TCP_PORT = int(args["port"])
imageName= args["file"]
print("[INFO] initialize socket "+str(TCP_IP)+":"+str(TCP_PORT)+" "+imageName+" ...")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)
conn, addr = s.accept()


# Read three images first:
t_minus = None
frame = None
# loop over the frames from the video stream
while True:
	if not video.isOpened():
		print "[ERROR] camera is not open."
		break
	
	if t_minus is None :
		t_minus = cv2.cvtColor(video.read()[1], cv2.COLOR_RGB2GRAY)
		t_minus = cv2.GaussianBlur(t_minus, (5, 5), 0)
		t = t_minus.copy()
		t_plus = t_minus.copy()
		continue
	if frame is None:
		frame = video.read()[1]
		frame_plus= frame.copy()
		continue
	
	
	frameDelta = diffImg(t_minus, t, t_plus)
	thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]
	thresh = cv2.dilate(thresh, None, iterations=1)
	im2, cnts, hierarchy = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	for c in cnts:
		#if the contour is too small, ignore it
		if cv2.contourArea(c) < 5:
			continue
		(x, y, w, h) = cv2.boundingRect(c)
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 255), 2)
	
	
	# Encodage de l'image
	ret, image = cv2.imencode('.jpg', frame)
	# Conversion en Base64
	b64 = base64.encodestring(image)
	conn.sendall(imageName + b64)
	
	t_minus = t
	t = t_plus
	t_plus = cv2.cvtColor(video.read()[1], cv2.COLOR_RGB2GRAY)
	t_plus = cv2.GaussianBlur(t_plus, (5, 5), 0)
	frame= frame_plus
	frame_plus= video.read()[1]
	
	key = cv2.waitKey(1) & 0xFF
	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
		break
 
# do a bit of cleanup
conn.close()
s.close()