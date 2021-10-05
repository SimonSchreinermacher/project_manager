import axios from 'axios';
import jwt from 'jsonwebtoken';

export function authToken(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = token;
    }
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function isValidToken(token){
    if(token){
        const {exp} = jwt.decode(token);
        return (exp >= (new Date().getTime() +1) /1000);
    }
    
}

export function getUsernameFromToken(token){
    if(token){
        const {sub} = jwt.decode(token)
        return sub;
    }
    return null;
}
