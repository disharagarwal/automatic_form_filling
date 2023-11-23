from flask import Flask, request
from form import fill_form  # Importing the function from form.py
from form2 import fill_form2
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.json
    # Access form data and pass it to fill_form function
    
    Name = data.get('Name')
    SRN = data.get('SRN')
    Email = data.get('Email')
    Gender = data.get('Gender')
    Age = data.get('Age')
    Address = data.get('Address')
    Phone_no = data.get('Phone_no')
    
    # Call fill_form for FormComponent with the received data
    fill_form(Name, SRN, Email, Gender, Age, Address, Phone_no)
    return "Form 1 submitted successfully!", 200

@app.route('/submit_form2', methods=['POST'])
def submit_form2():
    data = request.json
    Name = data.get('Name')
    Usn = data.get('Usn')
    Email = data.get('Email')
    Gender = data.get('Gender')
    City = data.get('City')
    Create_Password=data.get('Create_Password')
    Confirm_Password=data.get('Confirm_Password')
    Address = data.get('Address')
    Phone_no = data.get('Phone_no')
    State = data.get('State')
    fill_form2(Name,Usn,Email,Gender,City,Create_Password,Confirm_Password,Phone_no,State)
    return "Form2 submitted successfully!", 200

if __name__ == '__main__':
    app.run(port=5000)
