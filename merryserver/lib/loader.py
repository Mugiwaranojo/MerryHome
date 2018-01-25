import sys
from Tkinter import *

from PIL import Image, ImageTk
from itertools import count


class ImageLabel(Label):
    """a label that displays images, and plays them if they are gifs"""
    def load(self, im):
        if isinstance(im, str):
            im = Image.open(im)
        self.loc = 0
        self.frames = []

        try:
            for i in count(1):
                photo_image= ImageTk.PhotoImage(im.copy())
                self.frames.append(photo_image)
                im.seek(i)
        except EOFError:
            pass

        try:
            self.delay = im.info['duration']
        except:
            self.delay = 100

        if len(self.frames) == 1:
            self.config(image=self.frames[0])
        else:
            self.next_frame()

    def unload(self):
        self.config(image=None)
        self.frames = None

    def next_frame(self):
        if self.frames:
            self.loc += 1
            self.loc %= len(self.frames)
            self.config(image=self.frames[self.loc])
            self.after(self.delay, self.next_frame)


root = Tk()
w, h = root.winfo_screenwidth(), root.winfo_screenheight()
root.overrideredirect(1)
root.geometry("%dx%d+0+0" % (w, h))
root.configure(background = 'black')

label = Label(root, text="Merry Home", fg="#1E90FF", background="black", font=("Muti", 42))
label.pack(pady=100)
lbl = ImageLabel(root, borderwidth=0)
lbl.pack()
text = sys.argv[1]
lbl.load('/home/pi/merryserver/lib/giftime.gif')
labelLoading = Label(root, text="chargement "+text, fg="#FFF", background="black", font=("Muti", 24))
labelLoading.pack()
root.mainloop()