import React, { Component } from "react";
import Avatar from '@mui/material/Button';
import axios from "axios";

class App extends Component {
  render() {
    return(
      <main className='container'>
        <Avatar
          alt="User"
          src="/static/images/avatar/1.jpg"
        >
          U
        </Avatar>
        <p>Scan your receipt.</p>
      </main>
    )
  }
}

export default App;