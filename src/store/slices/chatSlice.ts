import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatConversation, ChatMessage } from '@/types/chat';

const initialConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    participantId: 'trv-1',
    participantName: 'Ridwan K.',
    participantRole: 'traveler',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    isOnline: true,
    statusSubtitle: 'On the way to pickup',
    lastMessage: 'Hi, I’m on my way to pickup your package.',
    lastMessageTime: '10:04 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'trv-1',
        senderName: 'Ridwan K.',
        senderRole: 'traveler',
        text: 'Hi, I’m on my way to pickup your package.',
        timestamp: '10:04 AM',
      },
      {
        id: 'msg-2',
        senderId: 'usr-1',
        senderName: 'Tobi A.',
        senderRole: 'sender',
        text: 'Okay, thank you. Keep me updated.',
        timestamp: '10:15 AM',
      },
      {
        id: 'msg-3',
        senderId: 'system',
        senderName: 'Centric',
        senderRole: 'support',
        text: 'Package picked up.',
        timestamp: '10:24 AM',
        isStatusEvent: true,
        statusEventText: 'Package picked up.',
        statusTime: '10:24 AM',
      },
      {
        id: 'msg-4',
        senderId: 'usr-1',
        senderName: 'Tobi A.',
        senderRole: 'sender',
        text: 'Thanks! Safe trip.',
        timestamp: '10:25 AM',
      },
      {
        id: 'msg-5',
        senderId: 'trv-1',
        senderName: 'Ridwan K.',
        senderRole: 'traveler',
        text: 'Got it, I’ll keep you updated.',
        timestamp: '10:26 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    participantId: 'usr-2',
    participantName: 'David N.',
    participantRole: 'sender',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    isOnline: false,
    statusSubtitle: 'Delivered',
    lastMessage: 'Please call when you arrive',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'msg-201',
        senderId: 'usr-2',
        senderName: 'David N.',
        senderRole: 'sender',
        text: 'Please call when you arrive',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-3',
    participantId: 'usr-3',
    participantName: 'James E.',
    participantRole: 'traveler',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces',
    isOnline: true,
    statusSubtitle: 'Completed',
    lastMessage: 'Delivered successfully',
    lastMessageTime: 'May 11',
    messages: [
      {
        id: 'msg-301',
        senderId: 'usr-3',
        senderName: 'James E.',
        senderRole: 'traveler',
        text: 'Delivered successfully',
        timestamp: 'May 11',
      },
    ],
  },
  {
    id: 'conv-4',
    participantId: 'support-1',
    participantName: 'Centric Support',
    participantRole: 'support',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces',
    isOnline: true,
    statusSubtitle: 'Online',
    lastMessage: 'How can we help you?',
    lastMessageTime: 'May 10',
    messages: [
      {
        id: 'msg-401',
        senderId: 'support-1',
        senderName: 'Centric Support',
        senderRole: 'support',
        text: 'Welcome to Centric Support! How can we help you today?',
        timestamp: 'May 10',
      },
    ],
  },
];

interface ChatSliceState {
  conversations: ChatConversation[];
  activeConversationId: string;
}

const initialState: ChatSliceState = {
  conversations: initialConversations,
  activeConversationId: 'conv-1',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload;
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) {
        conv.unreadCount = 0;
      }
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        senderId: string;
        senderName: string;
        senderRole: 'sender' | 'traveler' | 'support';
        text: string;
      }>
    ) => {
      const conv = state.conversations.find((c) => c.id === action.payload.conversationId);
      if (conv) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: action.payload.senderId,
          senderName: action.payload.senderName,
          senderRole: action.payload.senderRole,
          text: action.payload.text,
          timestamp: timeStr,
        };
        conv.messages.push(newMsg);
        conv.lastMessage = action.payload.text;
        conv.lastMessageTime = timeStr;
      }
    },
  },
});

export const { setActiveConversation, sendMessage } = chatSlice.actions;

export default chatSlice.reducer;
