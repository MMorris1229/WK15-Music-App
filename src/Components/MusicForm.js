import React, { useState } from "react";
import { musicApi } from "../rest/MusicApi";
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';

export function MusicForm({ onAddMusic, title }) {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newMusic = {
      song,
      artist,
      genre,
      status
    };

    try {
      const addedMusic = await musicApi.post(newMusic);
      onAddMusic(addedMusic);  
      setSong('');
      setArtist('');
      setGenre('');
      setStatus('');
    } catch(e) {
      console.error("Oops, looks like adding music didn't work.", e);
    }
  }
    
  return (
    <div>
      <h2>{title}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup className="mb-1" controlId="formSong">
              <Form.Label className='label'>Song</Form.Label>
              <Form.Control type='text' placeholder='Enter song name' value={song} onChange={(event) => setSong(event.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2" controlId="formArtist">
              <Form.Label className='label'>Artist</Form.Label>
              <Form.Control type='text' placeholder='Enter artist' value={artist} onChange={(event) => setArtist(event.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-3" controlId="formGenre">
              <Form.Label className='label'>Genre</Form.Label>
              <Form.Control type='text' placeholder='Enter genre' value={genre} onChange={(event) => setGenre(event.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-4" controlId="formStatus">
              <Form.Label className='label'>Status</Form.Label>
              <Form.Select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option>Select Status</option>
                <option value="Favorites">Favorites</option>
                <option value="Save For Later">Save For Later</option>
              </Form.Select>
            </FormGroup>
          </Col>
        </Row>
        <Button type='submit' className='button'>Add Music</Button>
      </Form>
    </div>
  );
}
