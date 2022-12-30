import React, { useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [ErrorMsg, setErrorMsg] = useState();
  const [file, setfile] = useState(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('foo', file);


      setErrorMsg('');
      await axios.post(`http://localhost:5000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // props.history.push('/'); // add this line
    } else {
      setErrorMsg('Please select a file to add.');
    }


  };

  return (
    <div className="App">
      <form 
          encType="multipart/form-data" 
          onSubmit={handleOnSubmit}
          // action='http://localhost:5000/upload' 
          // method='post'
      >
          <input type='file' name='foo' onChange={(e)=>setfile( e.target.files[0])}/>
       
          <button type="submit">
            SEND
          </button>
          <span align="center"
          style={{
            color : 'red'
          }}
          >
            {ErrorMsg}
          </span>
      </form>
    </div>
  );
}

export default App;
