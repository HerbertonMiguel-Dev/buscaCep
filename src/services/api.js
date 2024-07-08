// Importando a biblioteca axios para fazer requisições HTTP
import axios from 'axios';

// Criando uma instância do axios com a baseURL da API ViaCEP
const api = axios.create({
    baseURL: 'https://viacep.com.br/ws'
});

export default api;