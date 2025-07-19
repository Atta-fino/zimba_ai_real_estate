import React from 'react';
import Icon from '../../../components/AppIcon';

// Mock data for legal guides for different countries
// This structure aligns with the 'legal_guides' table in the brief
const mockLegalGuidesData = {
  GH: {
    countryName: "Ghana",
    flag: "🇬🇭",
    guides: [
      {
        id: 'gh_guide_1',
        title: "Advance Rent Limit",
        summary: "Under Ghana's Rent Act, 1963 (Act 220), landlords are legally prohibited from demanding or receiving more than 6 months of advance rent from a tenant. Be aware of your rights!",
        doc_url: null, // Placeholder for a link to the actual law document
      },
      {
        id: 'gh_guide_2',
        title: "Rent Card",
        summary: "Your landlord is required to provide you with a 'rent card' that records all payments you make. Always ensure your payments are recorded to avoid disputes.",
        doc_url: null,
      },
    ],
  },
  KE: {
    countryName: "Kenya",
    flag: "🇰🇪",
    guides: [
      {
        id: 'ke_guide_1',
        title: "Lease Agreements",
        summary: "In Kenya, written lease agreements are highly recommended for tenancies over two years, but crucial for any tenancy to outline rights and obligations. Always read your lease carefully before signing.",
        doc_url: null,
      },
      {
        id: 'ke_guide_2',
        title: "Deposit Handling",
        summary: "Security deposits should be held in a separate account by the landlord or agent. The lease must state the conditions for any deductions at the end of your tenancy.",
        doc_url: null,
      },
    ],
  },
  NG: {
      countryName: "Nigeria (Lagos)",
      flag: "🇳🇬",
      guides: [
          {
              id: 'ng_guide_1',
              title: "Tenancy Law of Lagos State",
              summary: "The Lagos State Tenancy Law of 2011 governs landlord-tenant relationships. It stipulates that it is illegal for a landlord to demand or receive more than 1 year's rent in advance for a new tenant.",
              doc_url: null,
          },
          {
              id: 'ng_guide_2',
              title: "Notice to Quit",
              summary: "The required length of a 'Notice to Quit' depends on your tenancy period. For a yearly tenancy, it's typically 6 months. For a monthly tenancy, it's 1 month. Check your agreement for specifics.",
              doc_url: null,
          }
      ]
  },
  // Add other countries as needed...
  DEFAULT: {
      countryName: "General",
      flag: "🌍",
      guides: [
          {
              id: 'def_guide_1',
              title: "Read Your Agreement",
              summary: "Always read your tenancy or lease agreement thoroughly before signing. It is a legally binding contract that outlines your rights and responsibilities as a tenant.",
              doc_url: null,
          }
      ]
  }
};

const LegalGuides = ({ userCountryCode = 'KE' }) => { // Default to Kenya for mock display
  const legalInfo = mockLegalGuidesData[userCountryCode] || mockLegalGuidesData.DEFAULT;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-heading text-foreground">
          Helpful Legal Guides for {legalInfo.countryName} {legalInfo.flag}
        </h2>
      </div>

      <div className="space-y-6">
        {legalInfo.guides.map(guide => (
          <div key={guide.id} className="p-6 bg-card rounded-xl shadow-lg border border-border/50">
            <div className="flex items-start">
              <Icon name="ScrollText" size={24} className="mr-4 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{guide.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{guide.summary}</p>
                {guide.doc_url && (
                  <a href={guide.doc_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">
                    Read More <Icon name="ExternalLink" size={12} className="inline-block ml-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <div className="flex items-start">
            <Icon name="AlertTriangle" size={20} className="mr-2 text-amber-600 flex-shrink-0"/>
            <div>
                <h4 className="font-semibold">Disclaimer</h4>
                <p>This information is for guidance purposes only and does not constitute legal advice. Please consult with a qualified legal professional for advice on your specific situation.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LegalGuides;
