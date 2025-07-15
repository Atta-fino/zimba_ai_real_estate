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
      welcomeMessage: `Hello there! I'm Zimba AI, your friendly guide to finding and securing your perfect space. 🏡\n\nI can help you with things like understanding escrow, checking on your booking, or learning about our FlexPay options.\n\nWhat's on your mind today?`,
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
          content: `Of course! Escrow is a secure financial arrangement where Zimba holds your payment until you've confirmed you're happy with the property (like after you've received the keys). This protects you from scams and ensures the landlord gets paid only when you're satisfied. It's like having a trusted middle-person for your peace of mind. 🤝`,
          quickReplies: [
            { text: "What happens after I pay?", action: 'escrow_next_steps' },
            { text: "Is my money really safe?", action: 'escrow_safety' },
          ]
        };
      } else if (lowerCaseMessage.includes('flexpay')) {
        response = {
          content: `FlexPay is our feature that makes paying rent easier! Instead of one large annual payment, landlords who enable FlexPay allow you to pay 3 months upfront, and then the rest in convenient monthly installments. It helps with your cash flow and budgeting! 💳`,
          quickReplies: [
            { text: "How do I find FlexPay properties?", action: 'flexpay_find' },
            { text: "Are there extra fees?", action: 'flexpay_fees' },
          ]
        };
      } else if (lowerCaseMessage.includes('trust')) {
        response = {
          content: `That's a great question! Trust is everything in real estate. We build it in a few key ways:\n\n1.  **Verification:** We verify landlords with ID and document checks.\n2.  **TrustScore:** Our scoring system rates users based on their reliability and responsiveness.\n3.  **Secure Escrow:** We protect your money until you confirm you're happy.\n\nThis helps create a safe and reliable community for everyone.`,
          quickReplies: [
            { text: "Tell me more about verification", action: 'verification_info' },
            { text: "How is TrustScore calculated?", action: 'trustscore_info' },
          ]
        };
      } else {
        // Default response for unhandled questions, now with context
        let defaultContent = `Hi ${mockChatContext.user.name}, that's a great question about "${userMessage}".`;

        if (mockChatContext.property?.title) {
            defaultContent += ` Are you asking in relation to the "${mockChatContext.property.title}" listing?`;
        }

        defaultContent += `\n\nWhile I'm still learning, I can connect you with our human support team for detailed help. Would you like that?`;

        response = {
          content: defaultContent,
          quickReplies: [
            { text: 'Yes, connect me to support', icon: 'MessageCircle', action: 'whatsapp_handoff' },
            { text: 'No, I\'ll ask something else', icon: 'RotateCcw', action: 'retry' }
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