import React, { useState, useEffect } from 'react';

function FormComponent2() {
  const [formData, setFormData] = useState({
    Name: '',
    USN: '',
    Email: '',
    Gender: '',
    City: '',
    Create_Password: '',
    Confirm_Password:'',
    Phone_no: '',
    State:''
  });

  const [currentQuestion, setCurrentQuestion] = useState('Name');
  const [submissionStatus, setSubmissionStatus] = useState(null); // Added state for submission status

  const questions = {
    Name: 'Enter your Name',
    USN: 'Enter your USN',
    Email: 'Enter your Email',
    Gender: 'Enter your Gender',
    City: 'Enter your City',
    Create_Password:'Create Password',
    Confirm_Password:'Confirm Password',
    Phone_no: 'Enter your Phone Number',
    State:'State'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextQuestion = () => {
    const keys = Object.keys(formData);
    const index = keys.indexOf(currentQuestion);
    if (index !== -1 && index < keys.length - 1) {
      setCurrentQuestion(keys[index + 1]);
      speakQuestion(questions[keys[index + 1]]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({form_type:'form2',formData})
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        setSubmissionStatus('success');
        setFormData({
          Name: '',
          USN: '',
          Email: '',
          Gender: '',
          City: '',
          Create_Password: '',
          Confirm_Password:'',
          Phone_no: '',
          State:''
        });
        setCurrentQuestion('Name');
        speakQuestion(questions['Name']);
      } else {
        console.error('Form submission failed!');
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setSubmissionStatus('error');
    }
  };

  const speakQuestion = (questionText) => {
    const speech = new SpeechSynthesisUtterance(questionText);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    speakQuestion(questions[currentQuestion]);
  }, [currentQuestion]);

  const getPreview = () => {
    return Object.entries(formData).map(([key, value]) => (
      <p key={key}>
        <strong>{key}:</strong> {value}
      </p>
    ));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="preview-section">
          <h3>Preview:</h3>
          {getPreview()}
        </div>
        <label>{questions[currentQuestion]}</label>
        <input
          type="text"
          name={currentQuestion}
          placeholder={questions[currentQuestion]}
          value={formData[currentQuestion]}
          onChange={handleChange}
        />
        <button type="button" onClick={handleNextQuestion}>
          Next
        </button>
        {currentQuestion === 'State' && (
          <button type="submit">Submit</button>
        )}
        {submissionStatus === 'success' && (
          <p>Form submitted successfully!</p>
        )}
        {submissionStatus === 'error' && (
          <p>Error submitting the form. Please try again.</p>
        )}
      </form>
    </div>
  );
}

export default FormComponent2;