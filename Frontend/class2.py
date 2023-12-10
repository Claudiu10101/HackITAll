from kivy.uix.button import Button
from kivy.app import App 
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from class1 import MyButton

val=1

class MyButton1(Button):
    def __init__(self, my_button, **kwargs):
            super(MyButton1, self).__init__(**kwargs)
            self.text = 'IUBIIIITOO'
            self.bind(on_press=self.on_button_press)
            self.default_color = self.background_color
            self.my_button = my_button
            
    def on_button_press(self, instance):
        print('SI EUU TE IUBEESC')
        global val
      
        self.background_color=(1,0,0,1)
        print('text of the other button: ', self.my_button.text)
        if(val):
            self.my_button.text = 'REGEEELEE MEEUUU'
            val=val-1
        else:
            self.my_button.text = 'FRAIEREEE'    
            val=val+1
            

