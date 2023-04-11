const MUSIC_ENDPOINT = 'https://64305d97c26d69edc890890e.mockapi.io/Music';

class MusicApi {
  async get() {
    try {
      const resp = await fetch(MUSIC_ENDPOINT);
      const data = await resp.json();
      return data;
    } catch (e) {
      console.log('Oops, looks like fetchMusic had an issue.', e);
    }
  }

  async put(music) {
    try {
      const resp = await fetch(`${MUSIC_ENDPOINT}/${music.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(music)
      });
      return await resp.json();
    } catch (e) {
      console.log('Oops, looks like updating music had an issue.', e);
    }
  }

  async delete(id) {
    try {
      const resp = await fetch(`${MUSIC_ENDPOINT}/${id}`, {
        method: 'DELETE'
      });
      return await resp.json();
    } catch (e) {
      console.error(`Oops, looks like deleting music didn't work.`, e);
    }
  };

  async post(music) {
    try {
      const resp = await fetch(MUSIC_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(music)
      });
      return await resp.json();
    } catch (e) {
      console.log('Oops, looks like adding music had an issue.', e);
    }
  }
}

export const musicApi = new MusicApi();
