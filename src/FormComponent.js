import React, { useState, useEffect } from 'react';

function FormComponent2() {
  const [formData, setFormData] = useState({
    Name: '',
    Usn: '',
    Email: '',
    Gender: '',
    City: '',
    Create_Password: '',
    Confirm_Password: '',
    Address: '',
    Phone_no: '',
    State: ''
  });
  const [voiceInput, setVoiceInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('Name');
  const [submissionStatus, setSubmissionStatus] = useState(null); // Added state for submission status

  const questions = {
    Name: 'Enter your Name',
    Usn: 'Enter your USN',
    Email: 'Enter your Email',
    Gender: 'Enter your Gender',
    City: 'Enter your City',
    Create_Password: 'Create Password',
    Confirm_Password: 'Confirm Password',
    Address: 'Enter your Address',
    Phone_no: 'Enter your Phone Number',
    State: 'Enter your State'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextQuestion = () => {
    const keys = Object.keys(formData);
    const index = keys.indexOf(currentQuestion);
    formData[currentQuestion]=voiceInput
    if (index !== -1 && index < keys.length - 1) {
      setCurrentQuestion(keys[index + 1]);
      setVoiceInput('')
      speakQuestion(questions[keys[index + 1]]);
    }
  };
const startVoiceRecognition = (e) => {
  e.preventDefault();
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.addEventListener('result', handleVoiceInput);
    recognition.addEventListener('error', handleVoiceError);
    recognition.start();
  };
  
const handleVoiceInput = (event) => {
    const transcript = event.results[0][0].transcript;
    setVoiceInput(transcript);
  };
 
  const handleVoiceError = (event) => {
    console.log('Voice recognition error:', event.error);
  };
 
 
  const stopVoiceRecognition = (e) => {
    e.preventDefault();
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit_form2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        setSubmissionStatus('success');
        setFormData({
          Name: '',
          Usn: '',
          Email: '',
          Gender: '',
          City: '',
          Create_Password: '',
          Confirm_Password: '',
          Address: '',
          Phone_no: '',
          State: ''
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

  // useEffect(() => {
  //   speakQuestion(questions[currentQuestion]);
  // }, [currentQuestion]);

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
          value={voiceInput}
          onChange={(e) =>{e.preventDefault();setVoiceInput(e.target.value)} }
        />
        <div className="voice-recognition">
          <button onClick={startVoiceRecognition}>Start Voice Recognition</button>
          <button onClick={stopVoiceRecognition}>Stop Voice Recognition</button>
        </div>
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
