import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, language }) => {
  const translations = {
    en: {
      selectRole: 'What brings you to Zimba AI?',
      renter: 'Find a Home',
      renterDesc: 'Looking for apartments, hostels, or rooms to rent',
      landlord: 'List Properties',
      landlordDesc: 'Rent out your properties with verified tenants',
      diaspora: 'Diaspora Services',
      diasporaDesc: 'Property services for Africans living abroad',
      agent: 'Real Estate Agent',
      agentDesc: 'Professional property management and sales'
    },
    fr: {
      selectRole: 'Qu\'est-ce qui vous amène à Zimba AI?',
      renter: 'Trouver un Logement',
      renterDesc: 'Recherche d\'appartements, auberges ou chambres à louer',
      landlord: 'Lister des Propriétés',
      landlordDesc: 'Louez vos propriétés avec des locataires vérifiés',
      diaspora: 'Services Diaspora',
      diasporaDesc: 'Services immobiliers pour les Africains vivant à l\'étranger',
      agent: 'Agent Immobilier',
      agentDesc: 'Gestion professionnelle et vente de propriétés'
    },
    ar: {
      selectRole: 'ما الذي يجلبك إلى زيمبا AI؟',
      renter: 'العثور على منزل',
      renterDesc: 'البحث عن شقق أو نزل أو غرف للإيجار',
      landlord: 'إدراج العقارات',
      landlordDesc: 'أجر عقاراتك مع مستأجرين موثقين',
      diaspora: 'خدمات المهجر',
      diasporaDesc: 'خدمات عقارية للأفارقة المقيمين في الخارج',
      agent: 'وكيل عقاري',
      agentDesc: 'إدارة ومبيعات عقارية احترافية'
    },
    sw: {
      selectRole: 'Ni nini kinachokuleta Zimba AI?',
      renter: 'Tafuta Nyumba',
      renterDesc: 'Kutafuta vyumba, hosteli, au vyumba vya kukodisha',
      landlord: 'Orodhesha Mali',
      landlordDesc: 'Kodisha mali yako na wakodishaji waliohakikiwa',
      diaspora: 'Huduma za Diaspora',
      diasporaDesc: 'Huduma za mali kwa Waafrika wanaoishi nje',
      agent: 'Wakala wa Mali',
      agentDesc: 'Usimamizi wa kitaaluma na mauzo ya mali'
    },
    am: {
      selectRole: 'ወደ ዚምባ AI የሚያመጣዎት ምንድን ነው?',
      renter: 'ቤት ያግኙ',
      renterDesc: 'አፓርትመንቶች፣ ሆቴሎች ወይም ለኪራይ የሚሰጡ ክፍሎች መፈለግ',
      landlord: 'ንብረቶችን ዝርዝር',
      landlordDesc: 'የተረጋገጡ ተከራዮች ያሉት ንብረቶችዎን ያከራዩ',
      diaspora: 'የዲያስፖራ አገልግሎቶች',
      diasporaDesc: 'በውጭ ለሚኖሩ አፍሪካውያን የንብረት አገልግሎቶች',
      agent: 'የሪል እስቴት ወኪል',
      agentDesc: 'ሙያዊ የንብረት አስተዳደር እና ሽያጭ'
    }
  };

  const t = translations[language] || translations.en;

  const roles = [
    {
      id: 'renter',
      title: t.renter,
      description: t.renterDesc,
      icon: 'Search',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      activeColor: 'bg-blue-100 border-blue-500 text-blue-800'
    },
    {
      id: 'landlord',
      title: t.landlord,
      description: t.landlordDesc,
      icon: 'Building',
      color: 'bg-green-50 border-green-200 text-green-700',
      activeColor: 'bg-green-100 border-green-500 text-green-800'
    },
    {
      id: 'diaspora',
      title: t.diaspora,
      description: t.diasporaDesc,
      icon: 'Globe',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      activeColor: 'bg-purple-100 border-purple-500 text-purple-800'
    },
    {
      id: 'agent',
      title: t.agent,
      description: t.agentDesc,
      icon: 'Briefcase',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      activeColor: 'bg-orange-100 border-orange-500 text-orange-800'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-semibold text-foreground text-center mb-6">
        {t.selectRole}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left touch-target ${
              selectedRole === role.id ? role.activeColor : role.color
            } hover:shadow-card`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon name={role.icon} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-semibold text-sm mb-1">
                  {role.title}
                </h3>
                <p className="font-caption text-xs opacity-80 leading-relaxed">
                  {role.description}
                </p>
              </div>
              {selectedRole === role.id && (
                <Icon name="Check" size={20} className="text-current" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;