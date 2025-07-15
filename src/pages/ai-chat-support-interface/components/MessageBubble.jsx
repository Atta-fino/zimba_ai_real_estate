import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const MessageBubble = ({ message, onQuickReply, onTranslate }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      translate: 'Translate',
      delivered: 'Delivered',
      read: 'Read',
      failed: 'Failed to send',
      retry: 'Retry'
    },
    fr: {
      translate: 'Traduire',
      delivered: 'Livré',
      read: 'Lu',
      failed: 'Échec de l\'envoi',
      retry: 'Réessayer'
    },
    ar: {
      translate: 'ترجم',
      delivered: 'تم التسليم',
      read: 'تم القراءة',
      failed: 'فشل في الإرسال',
      retry: 'إعادة المحاولة'
    },
    sw: {
      translate: 'Tafsiri',
      delivered: 'Imefikishwa',
      read: 'Imesomwa',
      failed: 'Imeshindwa kutuma',
      retry: 'Jaribu tena'
    },
    am: {
      translate: 'ተርጉም',
      delivered: 'ተደርሷል',
      read: 'ተነብቧል',
      failed: 'መላክ አልተሳካም',
      retry: 'እንደገና ሞክር'
    }
  };

  const t = translations[language] || translations.en;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderAttachment = (attachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="mt-2 rounded-lg overflow-hidden max-w-xs">
            <img 
              src={attachment.url} 
              alt={attachment.name}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      case 'document':
        return (
          <div className="mt-2 flex items-center space-x-2 p-3 bg-muted rounded-lg max-w-xs">
            <Icon name="FileText" size={20} className="text-primary" />
            <div className="flex-1 min-w-0">
              <p className="font-caption text-sm font-medium truncate">{attachment.name}</p>
              <p className="font-caption text-xs text-muted-foreground">{attachment.size}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuickReplies = () => {
    if (!message.quickReplies || message.quickReplies.length === 0) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {message.quickReplies.map((reply, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuickReply(reply)}
            className="text-xs"
          >
            {reply.icon && <Icon name={reply.icon} size={14} className="mr-1" />}
            {reply.text}
          </Button>
        ))}
      </div>
    );
  };

  const renderMessageStatus = () => {
    if (message.sender === 'ai') return null;

    const statusIcons = {
      sending: <Icon name="Clock" size={12} className="text-muted-foreground" />,
      delivered: <Icon name="Check" size={12} className="text-muted-foreground" />,
      read: <Icon name="CheckCheck" size={12} className="text-primary" />,
      failed: <Icon name="AlertCircle" size={12} className="text-destructive" />
    };

    return (
      <div className="flex items-center space-x-1 mt-1">
        {statusIcons[message.status]}
        <span className="text-xs text-muted-foreground">
          {message.status === 'failed' ? t.failed : formatTime(message.timestamp)}
        </span>
        {message.status === 'failed' && (
          <Button variant="ghost" size="sm" className="text-xs text-destructive p-0 h-auto">
            {t.retry}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
        {/* Avatar for AI messages */}
        {message.sender === 'ai' && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={12} color="white" />
            </div>
            <span className="font-caption text-xs text-muted-foreground">Zimba AI</span>
          </div>
        )}

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-2 ${
          message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
        }`}>
          {/* Main Message */}
          <p className="font-body text-sm whitespace-pre-wrap">{message.content}</p>

          {/* Attachment */}
          {message.attachment && renderAttachment(message.attachment)}

          {/* Translation Option */}
          {message.sender === 'ai' && message.originalLanguage && message.originalLanguage !== language && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTranslate(message.id)}
              className="mt-2 text-xs p-1 h-auto"
            >
              <Icon name="Languages" size={12} className="mr-1" />
              {t.translate}
            </Button>
          )}
        </div>

        {/* Quick Replies */}
        {renderQuickReplies()}

        {/* Timestamp for AI or Status for User */}
        {message.sender === 'ai' ? (
          <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
        ) : (
          renderMessageStatus()
        )}
      </div>
    </div>
  );
};

export default MessageBubble;