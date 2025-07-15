import React, { useState, useRef, useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const MessageInput = ({ onSendMessage, onAttachment, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef(null);
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      placeholder: 'Type your message...',
      send: 'Send',
      attach: 'Attach file',
      templates: 'Quick templates',
      escrowStatus: '🔒 Check my escrow status',
      flexPayInfo: '💳 Tell me about FlexPay',
      verifyLandlord: '✅ How to verify a landlord',
      bookingHelp: '📅 Help with booking process',
      paymentIssue: '💰 I have a payment issue',
      documentUpload: '📄 How to upload documents'
    },
    fr: {
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      attach: 'Joindre un fichier',
      templates: 'Modèles rapides',
      escrowStatus: '🔒 Vérifier mon statut d\'entiercement',
      flexPayInfo: '💳 Parlez-moi de FlexPay',
      verifyLandlord: '✅ Comment vérifier un propriétaire',
      bookingHelp: '📅 Aide avec le processus de réservation',
      paymentIssue: '💰 J\'ai un problème de paiement',
      documentUpload: '📄 Comment télécharger des documents'
    },
    ar: {
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال',
      attach: 'إرفاق ملف',
      templates: 'قوالب سريعة',
      escrowStatus: '🔒 تحقق من حالة الضمان',
      flexPayInfo: '💳 أخبرني عن FlexPay',
      verifyLandlord: '✅ كيفية التحقق من المالك',
      bookingHelp: '📅 مساعدة في عملية الحجز',
      paymentIssue: '💰 لدي مشكلة في الدفع',
      documentUpload: '📄 كيفية تحميل المستندات'
    },
    sw: {
      placeholder: 'Andika ujumbe wako...',
      send: 'Tuma',
      attach: 'Ambatisha faili',
      templates: 'Violezo vya haraka',
      escrowStatus: '🔒 Angalia hali yangu ya escrow',
      flexPayInfo: '💳 Niambie kuhusu FlexPay',
      verifyLandlord: '✅ Jinsi ya kuthibitisha mmiliki',
      bookingHelp: '📅 Msaada na mchakato wa kuhifadhi',
      paymentIssue: '💰 Nina tatizo la malipo',
      documentUpload: '📄 Jinsi ya kupakia hati'
    },
    am: {
      placeholder: 'መልእክትዎን ይጻፉ...',
      send: 'ላክ',
      attach: 'ፋይል አያይዝ',
      templates: 'ፈጣን ቅጦች',
      escrowStatus: '🔒 የእኔን escrow ሁኔታ ይመልከቱ',
      flexPayInfo: '💳 ስለ FlexPay ንገሩኝ',
      verifyLandlord: '✅ ባለቤትን እንዴት ማረጋገጥ እንደሚቻል',
      bookingHelp: '📅 በማስያዝ ሂደት እርዳታ',
      paymentIssue: '💰 የክፍያ ችግር አለኝ',
      documentUpload: '📄 ሰነዶችን እንዴት መስቀል እንደሚቻል'
    }
  };

  const t = translations[language] || translations.en;

  const messageTemplates = [
    { text: t.escrowStatus, action: 'escrow_status' },
    { text: t.flexPayInfo, action: 'flexpay_info' },
    { text: t.verifyLandlord, action: 'verify_landlord' },
    { text: t.bookingHelp, action: 'booking_help' },
    { text: t.paymentIssue, action: 'payment_issue' },
    { text: t.documentUpload, action: 'document_upload' }
  ];

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setShowTemplates(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTemplateSelect = (template) => {
    setMessage(template.text);
    setShowTemplates(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAttachment(file);
    }
  };

  return (
    <div className="border-t border-border bg-card">
      {/* Templates Dropdown */}
      {showTemplates && (
        <div className="p-4 border-b border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {messageTemplates.map((template, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleTemplateSelect(template)}
                className="justify-start text-left h-auto py-2 px-3"
              >
                <span className="font-body text-sm">{template.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-end space-x-2">
          {/* Templates Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTemplates(!showTemplates)}
            className="p-2"
            title={t.templates}
          >
            <Icon name="MessageSquare" size={20} />
          </Button>

          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="p-2"
            title={t.attach}
          >
            <Icon name="Paperclip" size={20} />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              disabled={disabled}
              rows={1}
              className="w-full resize-none border border-border rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="absolute bottom-2 right-2 flex space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            variant="default"
            size="sm"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="p-2"
            title={t.send}
            data-testid="send-button"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MessageInput;