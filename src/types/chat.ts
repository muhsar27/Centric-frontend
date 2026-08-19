export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'sender' | 'traveler' | 'support';
  text: string;
  timestamp: string;
  isStatusEvent?: boolean;
  statusEventText?: string;
  statusTime?: string;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'sender' | 'traveler' | 'support';
  avatarUrl: string;
  isOnline: boolean;
  statusSubtitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: ChatMessage[];
}
