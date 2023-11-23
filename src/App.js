import React, { useState } from 'react';
import FormComponent from './FormComponent';
import FormComponent2 from './FormComponent2';

function App() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleFormSelection = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div className="App">
      <h2>Select a Form to Fill:</h2>
      <select onChange={handleFormSelection}>
        <option value="">Select a form</option>
        <option value="FormComponent">Form Component 1</option>
        <option value="FormComponent2">Form Component 2</option>
      </select>
      
      {selectedForm === 'FormComponent' && <FormComponent />}
      {selectedForm === 'FormComponent2' && <FormComponent2 />}
    </div>
  );
}

export default App;
