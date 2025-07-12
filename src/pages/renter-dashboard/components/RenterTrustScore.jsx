import React from 'react';
import Icon from '../../../components/AppIcon';

// Mock TrustScore data for a Renter
const mockRenterTrustScoreData = {
  score: 4.5, // Out of 5
  components: [
    { name: 'Profile Completion', weight: 20, value: 20, description: "Your profile is fully complete. Well done!" },
    { name: 'ID Verification', weight: 20, value: 20, description: "Your identity has been verified." },
    { name: 'On-Time Payments', weight: 30, value: 25, description: "History of paying rent and fees on time." },
    { name: 'Communication', weight: 15, value: 12, description: "Responsiveness and clarity in chats with landlords." },
    { name: 'Landlord Reviews', weight: 15, value: 13, description: "Positive reviews from your past landlords." },
  ],
  tips: [
    "Always pay your rent on or before the due date.",
    "Maintain clear and respectful communication with landlords.",
    "Leave properties in good condition to receive positive reviews.",
    "Ensure your profile information is always up to date.",
  ]
};

// Reusable Progress Bar (could be moved to a shared UI component)
const SimpleProgressBar = ({ value, max = 100, colorClass = "bg-green-500", heightClass = "h-2.5" }) => {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full bg-muted rounded-full ${heightClass} overflow-hidden`}>
      <div className={`${colorClass} ${heightClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const RenterTrustScore = () => {
  const { score, components, tips } = mockRenterTrustScoreData;
  const scorePercentage = (score / 5) * 100;

  const getProgressBarColor = (currentScore, maxScore = 20) => {
    const percentage = (currentScore / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-1 md:p-0">
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 px-1 md:px-0">Your TrustScore</h2>

      <div className="p-6 bg-card rounded-xl shadow-lg mb-8 border border-primary/30">
        <div className="flex items-start">
          <Icon name="ShieldQuestion" size={32} className="mr-4 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">What is a TrustScore?</h3>
            <p className="text-sm text-muted-foreground">
              Your TrustScore is a dynamic rating that shows landlords you're a reliable and trustworthy tenant. A higher score helps you stand out and secure the best properties on Zimba. It's built on factors like your verification status, payment history, and reviews from landlords.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Display */}
        <div className="lg:col-span-1 p-6 bg-card rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
          <Icon name="ShieldCheck" size={48} className="text-primary mb-3" />
          <h3 className="text-lg font-medium text-muted-foreground">Your Current TrustScore</h3>
          <p className="text-6xl font-bold text-primary my-2">{score.toFixed(1)}<span className="text-3xl text-muted-foreground">/5</span></p>
          <div className="w-full max-w-xs mx-auto mt-2">
            <SimpleProgressBar value={scorePercentage} colorClass={getProgressBarColor(score, 5)} />
          </div>
          <p className="text-xs text-muted-foreground mt-3">Keep it up! A high score helps you get approved faster.</p>
        </div>

        {/* Components Breakdown */}
        <div className="lg:col-span-2 p-6 bg-card rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">How Your Score is Calculated</h3>
          <div className="space-y-4">
            {components.map(comp => (
              <div key={comp.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{comp.name}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{comp.value} / {comp.weight} pts</span>
                </div>
                <SimpleProgressBar
                  value={comp.value}
                  max={comp.weight}
                  colorClass={getProgressBarColor(comp.value, comp.weight)}
                  heightClass="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips for Improvement */}
      <div className="mt-8 p-6 bg-card rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={20} className="text-yellow-400 mr-2" />
          How to Maintain a High Score
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RenterTrustScore;
