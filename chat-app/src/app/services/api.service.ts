import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://makemayagroup.com/api/',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(email: string, password: string) {
    return this.axiosInstance.post('login', { email, password });
  }

  getConversations(token: string) {
    return this.axiosInstance.get('conversations', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  sendMessage(token: string, data: any) {
    return this.axiosInstance.post('send-message', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
