import React, { useState, useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const ChatHistory = ({ conversations, onSelectConversation, onDeleteConversation, currentConversationId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      chatHistory: 'Chat History',
      search: 'Search conversations...',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      older: 'Older',
      noResults: 'No conversations found',
      delete: 'Delete',
      newChat: 'New Chat',
      clear: 'Clear History'
    },
    fr: {
      chatHistory: 'Historique des Chats',
      search: 'Rechercher des conversations...',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      thisWeek: 'Cette Semaine',
      older: 'Plus Ancien',
      noResults: 'Aucune conversation trouvée',
      delete: 'Supprimer',
      newChat: 'Nouveau Chat',
      clear: 'Effacer l\'Historique'
    },
    ar: {
      chatHistory: 'تاريخ المحادثات',
      search: 'البحث في المحادثات...',
      today: 'اليوم',
      yesterday: 'أمس',
      thisWeek: 'هذا الأسبوع',
      older: 'أقدم',
      noResults: 'لم يتم العثور على محادثات',
      delete: 'حذف',
      newChat: 'محادثة جديدة',
      clear: 'مسح التاريخ'
    },
    sw: {
      chatHistory: 'Historia ya Mazungumzo',
      search: 'Tafuta mazungumzo...',
      today: 'Leo',
      yesterday: 'Jana',
      thisWeek: 'Wiki Hii',
      older: 'Za Zamani',
      noResults: 'Hakuna mazungumzo yaliyopatikana',
      delete: 'Futa',
      newChat: 'Mazungumzo Mapya',
      clear: 'Futa Historia'
    },
    am: {
      chatHistory: 'የውይይት ታሪክ',
      search: 'ውይይቶችን ፈልግ...',
      today: 'ዛሬ',
      yesterday: 'ትናንት',
      thisWeek: 'በዚህ ሳምንት',
      older: 'የቆዩ',
      noResults: 'ምንም ውይይቶች አልተገኙም',
      delete: 'ሰርዝ',
      newChat: 'አዲስ ውይይት',
      clear: 'ታሪክ አጽዳ'
    }
  };

  const t = translations[language] || translations.en;

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupConversationsByDate = (conversations) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    conversations.forEach(conv => {
      const convDate = new Date(conv.lastActivity);
      const convDay = new Date(convDate.getFullYear(), convDate.getMonth(), convDate.getDate());

      if (convDay.getTime() === today.getTime()) {
        groups.today.push(conv);
      } else if (convDay.getTime() === yesterday.getTime()) {
        groups.yesterday.push(conv);
      } else if (convDate >= weekAgo) {
        groups.thisWeek.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  };

  const groupedConversations = groupConversationsByDate(filteredConversations);

  const renderConversationGroup = (title, conversations) => {
    if (conversations.length === 0) return null;

    return (
      <div key={title} className="mb-4">
        <h4 className="font-caption text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-3">
          {title}
        </h4>
        <div className="space-y-1">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                conv.id === currentConversationId
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
              }`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="flex-1 min-w-0">
                <h5 className="font-body font-medium text-sm truncate">{conv.title}</h5>
                <p className="font-caption text-xs text-muted-foreground truncate mt-1">
                  {conv.lastMessage}
                </p>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {new Date(conv.lastActivity).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1"
                title={t.delete}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-lg">{t.chatHistory}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectConversation(null)}
          >
            <Icon name="Plus" size={16} className="mr-1" />
            {t.newChat}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-body text-muted-foreground">{t.noResults}</p>
          </div>
        ) : (
          <div>
            {renderConversationGroup(t.today, groupedConversations.today)}
            {renderConversationGroup(t.yesterday, groupedConversations.yesterday)}
            {renderConversationGroup(t.thisWeek, groupedConversations.thisWeek)}
            {renderConversationGroup(t.older, groupedConversations.older)}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {/* Handle clear history */}}
          className="w-full"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          {t.clear}
        </Button>
      </div>
    </div>
  );
};

export default ChatHistory;