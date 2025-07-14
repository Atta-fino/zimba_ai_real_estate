import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const LanguageContext = React.createContext({ language: 'en' });
const socket = io('http://localhost:3001');

const ChatPage = () => {
  const { language } = useContext(LanguageContext);
  const { propertyId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('join room', propertyId);

    socket.on('chat history', (history) => {
      setMessages(history);
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
    };
  }, [propertyId]);

  const t = {
    en: {
      title: "Chat",
      sendMessage: "Send",
      typeMessage: "Type a message...",
    },
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const msg = { text: newMessage, sender: 'tenant' }; // Replace 'tenant' with actual user role
      socket.emit('chat message', { propertyId, msg });
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-6 py-6 pt-24">
        <h1 className="text-2xl font-bold mb-4">{t.en.title}</h1>
        <div className="bg-card border border-border rounded-lg shadow-card h-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'tenant' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`px-4 py-2 rounded-lg ${msg.sender === 'tenant' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex items-center">
            <Input
              type="text"
              placeholder={t.en.typeMessage}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="ml-2">
              <Icon name="Send" size={16} />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
