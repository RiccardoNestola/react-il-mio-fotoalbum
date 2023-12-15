import axios from 'axios';

export const baseUrl = 'http://localhost:3000/api/foto';



export const getFoto = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('Errore durante il recupero delle foto', error);
    }
};
