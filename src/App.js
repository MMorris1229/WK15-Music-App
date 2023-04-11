
import React, { useState } from 'react';
import { MusicList } from './Components/MusicList';
import { MusicForm } from './Components/MusicForm';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';
import './App.css';



function App() {
  const [music, setMusic] = useState([]);


  const addMusic = (newMusic) => {    
    setMusic([newMusic, ...music]); 
  }

  return (
    <div>
    <Header />
    <Container>
        <MusicForm onAddMusic={addMusic} />
        <MusicList initialMusic={music} />
    </Container>
    <Footer />
    </div>
  );
}

export default App;