import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [role, setRole] = useState('Software Engineer');
  const [question, setQuestion] = useState('Tell me about a time you solved a difficult bug.');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/interview', {
      role, question, answer
    });
    setFeedback(res.data.feedback);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>TalkPrep: Tech Interview Simulator</h1>
      <label>
        Select Role:
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option>Software Engineer</option>
          <option>Data Scientist</option>
          <option>Product Manager</option>
        </select>
      </label>
      <br />
      <label>
        Interview Question:
        <input value={question} onChange={e => setQuestion(e.target.value)} style={{ width: '100%' }} />
      </label>
      <br />
      <label>
        Your Answer:
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6} style={{ width: '100%' }} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br /><br />
      <div><strong>AI Feedback:</strong></div>
      <pre>{feedback}</pre>
    </div>
  );
}

export default App;
