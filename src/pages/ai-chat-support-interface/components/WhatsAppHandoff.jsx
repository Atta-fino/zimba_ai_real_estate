import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const WhatsAppHandoff = ({ onHandoff, onCancel, isVisible }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      needMoreHelp: 'Need More Help?',
      aiLimitation: 'Our AI couldn\'t fully resolve your query. Would you like to connect with a human support agent via WhatsApp?',
      whatsappSupport: 'Continue on WhatsApp',
      stayHere: 'Stay in Chat',
      benefits: 'WhatsApp Support Benefits:',
      benefit1: '🕐 Faster response times',
      benefit2: '📱 Continue on your phone',
      benefit3: '👤 Human expert assistance',
      benefit4: '📎 Easy file sharing',
      supportHours: 'Support Hours: 8 AM - 10 PM (GMT)',
      avgResponse: 'Average response time: 5 minutes'
    },
    fr: {
      needMoreHelp: 'Besoin de Plus d\'Aide?',
      aiLimitation: 'Notre IA n\'a pas pu résoudre complètement votre demande. Souhaitez-vous vous connecter avec un agent de support humain via WhatsApp?',
      whatsappSupport: 'Continuer sur WhatsApp',
      stayHere: 'Rester dans le Chat',
      benefits: 'Avantages du Support WhatsApp:',
      benefit1: '🕐 Temps de réponse plus rapides',
      benefit2: '📱 Continuer sur votre téléphone',
      benefit3: '👤 Assistance d\'expert humain',
      benefit4: '📎 Partage de fichiers facile',
      supportHours: 'Heures de Support: 8h - 22h (GMT)',
      avgResponse: 'Temps de réponse moyen: 5 minutes'
    },
    ar: {
      needMoreHelp: 'تحتاج مساعدة أكثر؟',
      aiLimitation: 'لم يتمكن الذكاء الاصطناعي من حل استفسارك بالكامل. هل تريد التواصل مع وكيل دعم بشري عبر واتساب؟',
      whatsappSupport: 'متابعة على واتساب',
      stayHere: 'البقاء في المحادثة',
      benefits: 'فوائد دعم واتساب:',
      benefit1: '🕐 أوقات استجابة أسرع',
      benefit2: '📱 متابعة على هاتفك',
      benefit3: '👤 مساعدة خبير بشري',
      benefit4: '📎 مشاركة الملفات بسهولة',
      supportHours: 'ساعات الدعم: 8 صباحاً - 10 مساءً (GMT)',
      avgResponse: 'متوسط وقت الاستجابة: 5 دقائق'
    },
    sw: {
      needMoreHelp: 'Unahitaji Msaada Zaidi?',
      aiLimitation: 'AI yetu haikuweza kutatua swali lako kikamilifu. Ungependa kuunganishwa na wakala wa msaada wa kibinadamu kupitia WhatsApp?',
      whatsappSupport: 'Endelea kwenye WhatsApp',
      stayHere: 'Baki kwenye Mazungumzo',
      benefits: 'Faida za Msaada wa WhatsApp:',
      benefit1: '🕐 Muda wa kujibu haraka',
      benefit2: '📱 Endelea kwenye simu yako',
      benefit3: '👤 Msaada wa mtaalamu wa kibinadamu',
      benefit4: '📎 Kushiriki faili kwa urahisi',
      supportHours: 'Masaa ya Msaada: 8 AM - 10 PM (GMT)',
      avgResponse: 'Wastani wa muda wa kujibu: dakika 5'
    },
    am: {
      needMoreHelp: 'ተጨማሪ እርዳታ ይፈልጋሉ?',
      aiLimitation: 'የእኛ AI ጥያቄዎን ሙሉ በሙሉ መፍታት አልቻለም። በWhatsApp በኩል ከሰው ድጋፍ ወኪል ጋር መገናኘት ይፈልጋሉ?',
      whatsappSupport: 'በWhatsApp ይቀጥሉ',
      stayHere: 'በውይይት ውስጥ ይቆዩ',
      benefits: 'የWhatsApp ድጋፍ ጥቅሞች:',
      benefit1: '🕐 ፈጣን ምላሽ ጊዜዎች',
      benefit2: '📱 በስልክዎ ላይ ይቀጥሉ',
      benefit3: '👤 የሰው ባለሙያ እርዳታ',
      benefit4: '📎 ቀላል ፋይል መጋራት',
      supportHours: 'የድጋፍ ሰዓቶች: 8 AM - 10 PM (GMT)',
      avgResponse: 'አማካይ ምላሽ ጊዜ: 5 ደቂቃዎች'
    }
  };

  const t = translations[language] || translations.en;

  if (!isVisible) return null;

  const handleWhatsAppHandoff = () => {
    // Generate WhatsApp URL with pre-filled message
    const phoneNumber = '+1234567890'; // Replace with actual support number
    const message = encodeURIComponent(`Hello! I need help with my Zimba AI Real Estate query. I was transferred from the chat system.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    onHandoff();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={32} className="text-success" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">
            {t.needMoreHelp}
          </h3>
          <p className="font-body text-muted-foreground">
            {t.aiLimitation}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
            {t.benefits}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm">{t.benefit1}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm">{t.benefit2}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm">{t.benefit3}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-body text-sm">{t.benefit4}</span>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="font-caption text-xs text-muted-foreground mb-1">
              {t.supportHours}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {t.avgResponse}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            onClick={handleWhatsAppHandoff}
            className="w-full"
          >
            <Icon name="MessageCircle" size={20} className="mr-2" />
            {t.whatsappSupport}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            {t.stayHere}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppHandoff;