import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Import your environment config

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  conversations: any[] = []; // Store chat conversations
  newMessage: string = ''; // Input field for new messages
  token: string | null = null; // Auth token retrieved from localStorage
  private baseUrl: string = environment.baseUrl; // Use the base URL from environment config

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve token from localStorage
    this.token = localStorage.getItem('token');
    console.log('Token from localStorage:', this.token); // Log token to check if it's null or undefined
    
    // If token is missing, log an error and stop further requests
    if (!this.token) {
      console.error('No token found. Please log in.');
      return; // Prevent making API calls if token is not available
    }

    // Proceed to fetch conversations
    this.getConversations();
  }

  // Get conversations from the API
  getConversations(): void {
    if (!this.token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Set Authorization header with token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    console.log('Headers for getConversations:', headers); // Log headers for debugging

    this.http.get(`${this.baseUrl}/conversations`, { headers }).subscribe({
      next: (response: any) => {
        console.log('Conversations:', response);
        this.conversations = response; // Update the conversations array
      },
      error: (error: any) => {
        console.error('Error fetching conversations:', error);
      },
    });
  }

  // Send a new message to the API
  sendMessage(): void {
    if (!this.token || !this.newMessage.trim()) {
      console.error('No token or empty message.');
      return;
    }

    // Set Authorization header with token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    // Log the message being sent and headers
    console.log('Sending message with data:', { message: this.newMessage });
    console.log('Headers for sendMessage:', headers);

    const messageData = {
      message: this.newMessage,
      to_id: 1, // Replace with the actual recipient ID
      is_group: 0, // Adjust based on your chat type
    };

    this.http.post(`${this.baseUrl}/send-message`, messageData, { headers }).subscribe({
      next: (response: any) => {
        console.log('Message sent:', response);
        this.newMessage = ''; // Clear the input field after sending
        this.getConversations(); // Refresh conversations after sending a message
      },
      error: (error: any) => {
        console.error('Error sending message:', error);
      },
    });
  }
}
