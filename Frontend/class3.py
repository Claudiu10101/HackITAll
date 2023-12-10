
from kivy.lang import Builder
from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.uix.screenmanager import Screen, ScreenManager
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.textfield import MDTextField

KV = '''

<LoginBusinessScreen>
name: 'loginbusiness'
    BoxLayout:
        orientation: 'vertical'
        MDBoxLayout:
            orientation: 'vertical'
            adaptive_height: False
            spacing: dp(10)
            padding: dp(10)
            md_bg_color: 253.0/255.0, 233.0/255.0, 146.0/255.0, 1
            Widget:
                size_hint: None, None
                size: 800, 800
                
            MDLabel:
                text: business_name
                theme_text_color: "Secondary"
                font_name: 'C:/Users/Andreea/source/repos/amor/amor/carter'
                font_size: '24sp'
                pos_hint: {'center_x': 0.5, 'center_y': 0.05}
        
                
           
            Widget:
                size_hint: None, None
                size: 200, 200

            MDRaisedButton:
                text: 'LOG IN'
                font_name: 'C:/Users/Andreea/source/repos/amor/amor/carter'
                size_hint_x: 0.5
                size_hint_y: 0.2
                size: 300, 148
                pos_hint: {'center_x': 0.7, 'center_y': 1}
                md_bg_color: 1, 165.0/255.0, 0, 1
                on_release: app.switch_screen('other')
                on_release: app.print_textfield_text(email_textfield.text)

            MDRaisedButton:
                text: 'BACK'
                font_name: 'C:/Users/Andreea/source/repos/amor/amor/carter'
                size_hint_x: 0.5
                size_hint_y: 0.2
                size: 300, 148
                pos_hint: {'center_x': 0.7, 'center_y': 1}
                md_bg_color: 1, 165.0/255.0, 0, 1
                on_release: app.switch_screen('menu')

            Widget:
                size_hint: None, None
                size: 400, 300  
   


'''

class LoginBusinessScreen(Screen):
    pass

