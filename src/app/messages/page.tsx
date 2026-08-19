'use client';

import React, { useState } from 'react';
import { Search, Phone, Send, CheckCheck, Package, ShieldCheck } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveConversation, sendMessage } from '@/store/slices/chatSlice';
import { cn } from '@/lib/cn';

export default function MessagesPage() {
  const dispatch = useAppDispatch();
  const { role, isSender, fullName, firstName } = useCurrentUser();
  const { conversations, activeConversationId } = useAppSelector((state) => state.chat);

  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const currentUserId = isSender ? 'usr-1' : 'trv-1';
  const currentUserName = fullName;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;

    dispatch(
      sendMessage({
        conversationId: activeConv.id,
        senderId: currentUserId,
        senderName: currentUserName,
        senderRole: role,
        text: inputMessage.trim(),
      })
    );
    setInputMessage('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden h-[calc(100vh-120px)] min-h-[580px] grid grid-cols-1 md:grid-cols-[320px_1fr]">
        {/* Left Column: Conversations List */}
        <div className="border-r border-slate-100 flex flex-col h-full bg-white">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Messages</h2>
            <div className="relative mt-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--primary)] focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              const displayName =
                !isSender && conv.id === 'conv-1'
                  ? 'Tobi A. (Sender)'
                  : conv.participantName;

              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => dispatch(setActiveConversation(conv.id))}
                  className={cn(
                    'flex w-full items-start gap-3 p-4 text-left transition-colors',
                    isActive ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                  )}
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200">
                    <img
                      src={
                        !isSender && conv.id === 'conv-1'
                          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'
                          : conv.avatarUrl
                      }
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[var(--primary)]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-bold text-slate-900">{displayName}</p>
                      <span className="text-[11px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{conv.lastMessage}</p>
                  </div>

                  {conv.unreadCount && conv.unreadCount > 0 ? (
                    <span className="mt-1 flex h-2 w-2 rounded-full bg-[var(--primary)]" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chat Thread */}
        <div className="flex flex-col h-full bg-slate-50/30">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-slate-200">
                    <img
                      src={
                        !isSender && activeConv.id === 'conv-1'
                          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'
                          : activeConv.avatarUrl
                      }
                      alt={activeConv.participantName}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[var(--primary)]" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {!isSender && activeConv.id === 'conv-1'
                        ? 'Tobi A.'
                        : activeConv.participantName}
                    </h3>
                    <p className="text-xs text-[var(--primary)] font-medium">
                      {activeConv.statusSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Calling participant...')}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
                  >
                    <Phone className="h-4 w-4 text-[var(--primary)]" />
                  </button>
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeConv.messages.map((msg) => {
                  if (msg.isStatusEvent) {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-[var(--primary)] border border-emerald-200 shadow-xs">
                          <Package className="h-3.5 w-3.5" />
                          <span>{msg.statusEventText}</span>
                          <span className="text-[10px] text-slate-400">• {msg.statusTime}</span>
                        </div>
                      </div>
                    );
                  }

                  const isMe = msg.senderId === currentUserId || msg.senderRole === role;

                  return (
                    <div
                      key={msg.id}
                      className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-xs',
                          isMe
                            ? 'bg-emerald-50 text-slate-900 border border-emerald-100 rounded-br-none'
                            : 'bg-white text-slate-900 border border-slate-100 rounded-bl-none'
                        )}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="mt-1 px-1 text-[10px] text-slate-400 flex items-center gap-1">
                        {msg.timestamp}
                        {isMe && <CheckCheck className="h-3 w-3 text-[var(--primary)]" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <form
                onSubmit={handleSend}
                className="border-t border-slate-100 bg-white p-4 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-12 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--primary)] focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-sm hover:bg-[var(--primary-hover)] disabled:opacity-50 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
