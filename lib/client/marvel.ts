import axios from "axios";
import crypto from "crypto";

const createMarvelClient = () => {
    const instance = axios.create({
        baseURL: 'https://gateway.marvel.com/v1/public',
    });
    
    // Adiciona interceptador para incluir parâmetros de autenticação
    instance.interceptors.request.use((config) => {
        const timestamp = new Date().getTime().toString();
        const privateKey = process.env.MARVEL_PRIVATE_KEY || 'cecc4296a055278d713b1856d264c358645907de';
        const publicKey = process.env.MARVEL_API_KEY || '5df8e281a00cf7c7c907684137a071c1';
        
        // Gera o hash MD5: md5(ts+privateKey+publicKey)
        const hash = crypto
            .createHash('md5')
            .update(timestamp + privateKey + publicKey)
            .digest('hex');

        config.params = {
            ...config.params,
            ts: timestamp,
            apikey: publicKey,
            hash: hash
        };
        return config;
    });

    return instance;
};

export const marvelClient = createMarvelClient();