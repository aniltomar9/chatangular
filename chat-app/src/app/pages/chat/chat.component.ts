import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  message = '';
  token = localStorage.getItem('token') || '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getConversations(this.token).then(response => {
      this.conversations = response.data;
    });
  }

  sendMessage() {
    const data = { message: this.message, receiverId: 1 }; // Example data
    this.api.sendMessage(this.token, data).then(() => {
      this.message = '';
      this.ngOnInit(); // Reload conversations
    });
  }
}
