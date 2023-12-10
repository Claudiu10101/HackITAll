
from kivy.uix.button import Button

class MyButton(Button):
    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)
        self.text = 'IUBIIITUUULEEE'
        self.bind(on_press=self.on_button_press)
       
    def on_button_press(self, instance):
        print('TE IUBEEESC')