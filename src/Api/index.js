export const BASE_URL = 'https://habsida-ea8f8-default-rtdb.asia-southeast1.firebasedatabase.app'

export const Api = {
  getVoiceFromHR: () => {
    return fetch(`${BASE_URL}/HR_VOICE.json`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
  },
  sendAnswer: (value) => {
    return fetch(`${BASE_URL}/HR_VOICE.json`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": value
      })
    })
  }
}