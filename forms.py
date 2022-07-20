from wtforms import Form, StringField, DateField, validators

class KeywordForm(Form):
    query = StringField('Query')
    #language = StringField('Language')
    #place = StringField('Place')
    #user = StringField('User')
    #since = DateField('Since',[
        #validators.Required(message = "This field is required!")
        #],
        #format='%Y-%m-%d')
    #until = DateField('Until',[
        #validators.Required(message = "This field is required!")
        #],
        #format='%Y-%m-%d',)