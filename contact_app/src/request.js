import axios from "axios";
export const instance = axios.create({
  baseURL: 'http://192.168.0.12:3000/api/',
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
  }
});