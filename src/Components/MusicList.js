import React, { useEffect, useState } from "react";
import { musicApi } from "../rest/MusicApi.js";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import ListLength from "./ListLength";

export function MusicList({initialMusic}) {
      
    const [music, setMusic] = useState(initialMusic);
    
    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const data = await musicApi.get();
                setMusic(data);
                console.log(data);
            } catch(e) {
                console.error('Oops, looks like fetchMusic had an issue.');
            }
        };
    
        fetchMusic();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await musicApi.delete(id);
            setMusic(music.filter(music => music.id !== id));
        } catch(e) {
            console.error("Oops, looks like deleting music didn't work.", e);
        }
    }
    
    const handleUpdateReadStatus = async (music, status) => {
        try {
            const updatedMusic = { ...music, ReadStatus: status };
            await musicApi.put(updatedMusic);
            setMusic(music.map(b => b.id === music.id ? updatedMusic : b));
        } catch(e) {
            console.error("Oops, looks like updating the status didn't work.", e);
        }
    }
        
    const sortedMusic = music && music.sort((a,b) => a.id - b.id);
    
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await musicApi.get();
                setMusic(data);
            } catch(e) {
                console.error("Oops, looks like there's an issue getting music", e);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div>
            {music && music.length === 0 && (
                <h2>No music to show</h2>
            )}
          
            {music && music.length > 0 && (
                <div>
                    <ListLength music={music} />
                    <Container className="container" fluid='sm'>
                        <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                            {sortedMusic.reverse().map((music) => (
                                <Col key={music.id}>
                                    <Card  className="music-card" style={{height: '100%'}}>
                                        <Card.Body>
                                            <Card.Title><h2>{music.song}</h2></Card.Title>
                                            <Card.Body>
                                               <h3> by <strong>{music.artist}</strong></h3>
                                                <Row className='music-info gx-1'>
                                                    <Col>
                                                        <h3>{music.genre}</h3>
                                                    </Col>
                                                    <Col>
                                                        <select value={music.ReadStatus} onChange={(e) => handleUpdateReadStatus(music, e.target.value)}>
                                                            <option value="Favorites">Favorites</option>
                                                            <option value="Save For Later">Save For Later</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
          
                                            <Button id='delete-btn' onClick={() => handleDelete(music.id)}>Delete</Button> 
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}
