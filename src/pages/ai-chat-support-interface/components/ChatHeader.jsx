import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const ChatHeader = ({ isMinimized, onToggleMinimize, onClose, isTyping, onlineStatus }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      zimbaAI: 'Zimba AI Assistant',
      online: 'Online',
      typing: 'Typing...',
      minimize: 'Minimize',
      maximize: 'Maximize',
      close: 'Close chat',
      helpWith: 'Here to help with escrow, FlexPay & verification'
    },
    fr: {
      zimbaAI: 'Assistant Zimba AI',
      online: 'En ligne',
      typing: 'En train d\'écrire...',
      minimize: 'Réduire',
      maximize: 'Agrandir',
      close: 'Fermer le chat',
      helpWith: 'Ici pour aider avec l\'entiercement, FlexPay et vérification'
    },
    ar: {
      zimbaAI: 'مساعد زيمبا الذكي',
      online: 'متصل',
      typing: 'يكتب...',
      minimize: 'تصغير',
      maximize: 'تكبير',
      close: 'إغلاق المحادثة',
      helpWith: 'هنا للمساعدة في الضمان وFlexPay والتحقق'
    },
    sw: {
      zimbaAI: 'Msaidizi wa Zimba AI',
      online: 'Mtandaoni',
      typing: 'Anaandika...',
      minimize: 'Punguza',
      maximize: 'Ongeza',
      close: 'Funga mazungumzo',
      helpWith: 'Hapa kusaidia na escrow, FlexPay na uthibitisho'
    },
    am: {
      zimbaAI: 'የዚምባ AI ረዳት',
      online: 'በመስመር ላይ',
      typing: 'እየጻፈ...',
      minimize: 'አሳንስ',
      maximize: 'አሳድግ',
      close: 'ውይይት ዝጋ',
      helpWith: 'ለ escrow፣ FlexPay እና ማረጋገጫ እገዛ ለመስጠት እዚህ ነን'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground border-b border-primary/20">
      <div className="flex items-center space-x-3">
        {/* AI Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-primary ${
            onlineStatus ? 'bg-success' : 'bg-muted'
          }`} />
        </div>

        {/* AI Info */}
        <div className="flex flex-col">
          <h3 className="font-heading font-semibold text-sm">{t.zimbaAI}</h3>
          <p className="text-xs opacity-90">
            {isTyping ? t.typing : onlineStatus ? t.online : t.helpWith}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMinimize}
          className="text-white hover:bg-white/20 p-2"
          title={isMinimized ? t.maximize : t.minimize}
        >
          <Icon name={isMinimized ? "Maximize2" : "Minimize2"} size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 p-2"
          title={t.close}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;