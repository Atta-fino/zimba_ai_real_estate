import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: newMessages },
    })

    if (error) {
        console.error('Error sending message:', error);
    } else {
        setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : ''}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <select className="border p-2 mr-2">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="sw">Swahili</option>
            <option value="ar">Arabic</option>
            <option value="am">Amharic</option>
            <option value="yo">Yoruba</option>
            <option value="pcm">Pidgin</option>
        </select>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
