import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import FloatingChatButton from '../../components/ui/FloatingChatButton';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import ChatHistory from './components/ChatHistory';
import WhatsAppHandoff from './components/WhatsAppHandoff';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

// Mock data for context that would normally come from props, context, or router state
const mockChatContext = {
  user: {
    name: 'Amina',
    role: 'renter',
  },
  property: { // This could be null if chat is initiated from a general page
    id: 'prop1',
    title: 'Modern Downtown Apartment',
  }
};


const AIChatSupportInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [language, setLanguage] = useState('en');
  const [currentConversationId, setCurrentConversationId] = useState('conv-1');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showWhatsAppHandoff, setShowWhatsAppHandoff] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('zimba-language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      chatSupport: 'AI Chat Support',
      welcomeMessage: `Chale, welcome! I'm Zimba AI, your personal guide for all things property in Ghana. 🇬🇭 Whether you're looking to rent, buy, or list a property, I'm here to make it simple and safe for you.\n\nNo long thing, just tell me what you need. Are you trying to understand how our secure Escrow or MoMo payments work, or maybe you want to know about FlexPay?`,
      aiTyping: 'Zimba AI is typing...',
      connectionLost: 'Connection lost. Trying to reconnect...',
      reconnected: 'Reconnected successfully!'
    },
    fr: {
      chatSupport: 'Support Chat IA',
      welcomeMessage: `Bonjour! 👋 Je suis Zimba AI, votre assistant immobilier.\n\nJe suis là pour vous aider avec:\n🔒 Services d'entiercement et statut\n💳 Options de paiement FlexPay\n✅ Vérification du propriétaire\n📅 Assistance de réservation\n📄 Téléchargements de documents\n\nComment puis-je vous aider aujourd'hui?`,
      aiTyping: 'Zimba AI écrit...',
      connectionLost: 'Connexion perdue. Tentative de reconnexion...',
      reconnected: 'Reconnecté avec succès!'
    },
    ar: {
      chatSupport: 'دعم الدردشة بالذكاء الاصطناعي',
      welcomeMessage: `مرحباً! 👋 أنا زيمبا AI، مساعدك العقاري.\n\nأنا هنا لمساعدتك في:\n🔒 خدمات الضمان والحالة\n💳 خيارات دفع FlexPay\n✅ التحقق من المالك\n📅 مساعدة الحجز\n📄 تحميل المستندات\n\nكيف يمكنني مساعدتك اليوم؟`,
      aiTyping: 'زيمبا AI يكتب...',
      connectionLost: 'فقدان الاتصال. محاولة إعادة الاتصال...',
      reconnected: 'تم إعادة الاتصال بنجاح!'
    },
    sw: {
      chatSupport: 'Msaada wa Mazungumzo ya AI',
      welcomeMessage: `Hujambo! 👋 Mimi ni Zimba AI, msaidizi wako wa mali.\n\nNiko hapa kukusaidia na:\n🔒 Huduma za escrow na hali\n💳 Chaguo za malipo ya FlexPay\n✅ Uthibitisho wa mmiliki\n📅 Msaada wa kuhifadhi\n📄 Kupakia hati\n\nNinawezaje kukusaidia leo?`,
      aiTyping: 'Zimba AI anaandika...',
      connectionLost: 'Muunganisho umepotea. Inajaribu kuunganisha tena...',
      reconnected: 'Imeunganishwa tena kwa mafanikio!'
    },
    am: {
      chatSupport: 'የAI ውይይት ድጋፍ',
      welcomeMessage: `ሰላም! 👋 እኔ ዚምባ AI ነኝ፣ የእርስዎ የሪል እስቴት ረዳት።\n\nእዚህ ለመርዳት ነኝ:\n🔒 የEscrow አገልግሎቶች እና ሁኔታ\n💳 የFlexPay ክፍያ አማራጮች\n✅ የባለቤት ማረጋገጫ\n📅 የማስያዝ እርዳታ\n📄 የሰነድ መስቀያዎች\n\nዛሬ እንዴት ልረዳዎት እችላለሁ?`,
      aiTyping: 'ዚምባ AI እየጻፈ...',
      connectionLost: 'ግንኙነት ጠፋ። እንደገና ለማገናኘት እየሞከረ...',
      reconnected: 'በተሳካ ሁኔታ እንደገና ተገናኝቷል!'
    }
  };

  const t = translations[language] || translations.en;

  // Mock conversations data
  const mockConversations = [
    {
      id: 'conv-1',
      title: 'Escrow Status Inquiry',
      lastMessage: 'Your escrow is currently active and secure.',
      lastActivity: new Date().toISOString(),
      messages: [
        {
          id: 'msg-1',
          sender: 'ai',
          content: t.welcomeMessage,
          timestamp: new Date(Date.now() - 3600000),
          status: 'delivered',
          quickReplies: [
            { text: 'How does Escrow work?', icon: 'Shield', action: 'escrow_info' },
            { text: 'Tell me about FlexPay', icon: 'CreditCard', action: 'flexpay_info' },
            { text: 'Why should I trust Zimba?', icon: 'BadgeCheck', action: 'trust_info' }
          ]
        },
        {
          id: 'msg-2',
          sender: 'user',
          content: 'I need to check my escrow status for property booking #ZB2024001',
          timestamp: new Date(Date.now() - 3500000),
          status: 'read'
        },
        {
          id: 'msg-3',
          sender: 'ai',
          content: `Great! I found your escrow details for booking #ZB2024001.\n\n🔒 **Escrow Status**: Active & Secure\n💰 **Amount**: $2,500 USD\n📅 **Created**: Dec 10, 2024\n⏰ **Release Date**: Dec 25, 2024\n\nYour funds are safely held in escrow and will be released to the landlord once you confirm receipt of keys and property condition. Would you like me to explain the next steps?`,
          timestamp: new Date(Date.now() - 3400000),
          status: 'delivered',
          quickReplies: [
            { text: 'Explain Next Steps', icon: 'ArrowRight', action: 'next_steps' },
            { text: 'Contact Landlord', icon: 'Phone', action: 'contact_landlord' },
            { text: 'Release Funds', icon: 'DollarSign', action: 'release_funds' }
          ]
        }
      ]
    },
    {
      id: 'conv-2',
      title: 'FlexPay Information',
      lastMessage: 'FlexPay allows you to split rent payments...',
      lastActivity: new Date(Date.now() - 86400000).toISOString(),
      messages: []
    },
    {
      id: 'conv-3',
      title: 'Landlord Verification Help',
      lastMessage: 'Here\'s how to verify your landlord...',
      lastActivity: new Date(Date.now() - 172800000).toISOString(),
      messages: []
    }
  ];

  const [conversations, setConversations] = useState(mockConversations);
  const [currentMessages, setCurrentMessages] = useState(
    conversations.find(c => c.id === currentConversationId)?.messages || []
  );

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Simulate AI responses
  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);

    setTimeout(() => {
      let response;
      const lowerCaseMessage = userMessage.toLowerCase();

      if (lowerCaseMessage.includes('escrow')) {
        response = {
          content: `I understand, dealing with payments can be stressful. But don't worry, our Escrow system is designed to protect you. Think of it as a secure digital safe. You place your rent payment (via MoMo or card) into the safe, and we only give the key to the landlord after you've moved in and confirmed everything is as it should be. This way, your money is always safe. No wahala.`,
          quickReplies: [
            { text: "So Zimba holds the money?", action: 'escrow_next_steps' },
            { text: "How do I confirm everything?", action: 'escrow_safety' },
          ]
        };
      } else if (lowerCaseMessage.includes('flexpay')) {
        response = {
          content: `Ah, FlexPay! It's a popular one. We know that paying a whole year's rent at once is a heavy lift. So, with FlexPay, you can pay for just 3 months upfront, and then handle the rest in easy monthly payments via MoMo or card. It's all about making life easier for you.`,
          quickReplies: [
            { text: "Which properties have FlexPay?", action: 'flexpay_find' },
            { text: "Are there any hidden charges?", action: 'flexpay_fees' },
          ]
        };
      } else if (lowerCaseMessage.includes('trust')) {
        response = {
          content: `You're right to ask about trust. It's the most important thing. We take your safety very seriously. That's why we verify every landlord's ID and documents. We also have our TrustScore system, which is like a rating for good behaviour on the app. And of course, our secure Escrow means your money is always protected. We're building a community you can rely on.`,
          quickReplies: [
            { text: "How do you verify landlords?", action: 'verification_info' },
            { text: "What's a good TrustScore?", action: 'trustscore_info' },
          ]
        };
      } else if (lowerCaseMessage.includes('rent law')) {
        response = {
          content: `Ah, the Ghana Rent Act! It's very important to know your rights. Here are a few key points:\n\n- Landlords can only ask for a maximum of 6 months' rent in advance.\n- Your landlord must give you a receipt for all payments.\n- As a tenant, you need to give your landlord 3 months' notice if you want to leave before your tenancy is over.\n\nI hope this helps! Let me know if you have any other questions.`,
          quickReplies: [
            { text: "What if my landlord asks for more?", action: 'rent_act_more' },
            { text: "Where can I read the full law?", action: 'rent_act_full' },
          ]
        };
      } else {
        // Default response for unhandled questions, now with context
        let defaultContent = `That's a good question, ${mockChatContext.user.name}. I'm still learning about "${userMessage}".`;

        if (mockChatContext.property?.title) {
            defaultContent += ` Is this related to the "${mockChatContext.property.title}" listing? Knowing this helps me to give you a more accurate answer.`;
        }

        defaultContent += `\n\nIn the meantime, would you like me to connect you with our human support team? They are experts and can give you a hand.`;

        response = {
          content: defaultContent,
          quickReplies: [
            { text: 'Yes, please connect me', icon: 'MessageCircle', action: 'whatsapp_handoff' },
            { text: 'I\'ll ask another question', icon: 'RotateCcw', action: 'retry' }
          ]
        };
      }

      const aiResponse = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        content: response.content,
        timestamp: new Date(),
        status: 'delivered',
        quickReplies: response.quickReplies || []
      };

      setCurrentMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (message) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: message,
      timestamp: new Date(),
      status: 'sending'
    };

    setCurrentMessages(prev => [...prev, userMessage]);

    // Update message status to delivered
    setTimeout(() => {
      setCurrentMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate AI response
    simulateAIResponse(message);
  };

  const handleQuickReply = (reply) => {
    if (reply.action === 'whatsapp_handoff') {
      setShowWhatsAppHandoff(true);
      return;
    }

    handleSendMessage(reply.text);
  };

  const handleAttachment = (file) => {
    const attachmentMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: `Uploaded: ${file.name}`,
      timestamp: new Date(),
      status: 'delivered',
      attachment: {
        type: file.type.startsWith('image/') ? 'image' : 'document',
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: URL.createObjectURL(file)
      }
    };

    setCurrentMessages(prev => [...prev, attachmentMessage]);

    // AI response to attachment
    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        content: `Thank you for uploading "${file.name}"! 📎\n\nI've received your document. Our team will review it and get back to you within 24 hours. Is there anything specific about this document you'd like me to help with?`,
        timestamp: new Date(),
        status: 'delivered',
        quickReplies: [
          { text: 'Document Status', icon: 'FileText', action: 'doc_status' },
          { text: 'Upload Another', icon: 'Upload', action: 'upload_more' }
        ]
      };
      setCurrentMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleSelectConversation = (conversationId) => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      const conversation = conversations.find(c => c.id === conversationId);
      setCurrentMessages(conversation?.messages || []);
    } else {
      // New conversation
      const newConvId = `conv-${Date.now()}`;
      setCurrentConversationId(newConvId);
      setCurrentMessages([
        {
          id: 'msg-welcome',
          sender: 'ai',
          content: t.welcomeMessage,
          timestamp: new Date(),
          status: 'delivered',
          quickReplies: [
            { text: '🔒 Check Escrow Status', icon: 'Shield', action: 'escrow_status' },
            { text: '💳 FlexPay Info', icon: 'CreditCard', action: 'flexpay_info' },
            { text: '✅ Verify Landlord', icon: 'UserCheck', action: 'verify_landlord' }
          ]
        }
      ]);
    }
    setShowHistory(false);
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (conversationId === currentConversationId) {
      handleSelectConversation(null);
    }
  };

  const handleWhatsAppHandoff = () => {
    setShowWhatsAppHandoff(false);
    // Add system message about handoff
    const handoffMessage = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      content: `You've been connected to WhatsApp support! 📱\n\nOur human support team will assist you there. This chat will remain available for future AI assistance.`,
      timestamp: new Date(),
      status: 'delivered'
    };
    setCurrentMessages(prev => [...prev, handoffMessage]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-screen bg-background">
        <Header />
        <PrimaryTabNavigation />
        
        {/* Main Chat Interface */}
        <div className="pt-32 pb-20 md:pb-4">
          <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-8rem)]">
            <div className="flex h-full bg-card rounded-lg shadow-card overflow-hidden">
              
              {/* Chat History Sidebar - Desktop */}
              <div className={`hidden lg:flex flex-col w-80 border-r border-border ${showHistory ? 'flex' : 'hidden lg:flex'}`}>
                <ChatHistory
                  conversations={conversations}
                  onSelectConversation={handleSelectConversation}
                  onDeleteConversation={handleDeleteConversation}
                  currentConversationId={currentConversationId}
                />
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <ChatHeader
                  isMinimized={isMinimized}
                  onToggleMinimize={() => setIsMinimized(!isMinimized)}
                  onClose={() => navigate('/property-search-listing-grid')}
                  isTyping={isTyping}
                  onlineStatus={onlineStatus}
                />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onQuickReply={handleQuickReply}
                      onTranslate={(messageId) => {
                        // Handle translation
                        console.log('Translate message:', messageId);
                      }}
                    />
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2 bg-muted rounded-2xl px-4 py-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Bot" size={12} color="white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onAttachment={handleAttachment}
                  isTyping={isTyping}
                 
                />
              </div>

              {/* Mobile History Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="lg:hidden fixed top-20 right-4 z-40"
              >
                <Icon name="History" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Chat History Overlay */}
        {showHistory && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background">
            <ChatHistory
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onDeleteConversation={handleDeleteConversation}
              currentConversationId={currentConversationId}
            />
          </div>
        )}

        {/* WhatsApp Handoff Modal */}
        <WhatsAppHandoff
          isVisible={showWhatsAppHandoff}
          onHandoff={handleWhatsAppHandoff}
          onCancel={() => setShowWhatsAppHandoff(false)}
        />

        {/* Floating Chat Button (hidden on this page) */}
        <div className="hidden">
          <FloatingChatButton />
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default AIChatSupportInterface;