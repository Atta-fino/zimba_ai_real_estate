import React from 'react';
import Icon from '../../../components/AppIcon';
// import { Progress } from "../../../components/ui/progress"; // Assuming a Progress component exists

// Mock TrustScore data
const mockTrustScoreData = {
  score: 4.2, // Out of 5
  components: [
    { name: 'Verification Status', weight: 20, value: 18, description: "ID & property docs verified." }, // value is score for this component (e.g., 18 out of 20)
    { name: 'Responsiveness', weight: 20, value: 15, description: "Average response time to inquiries." },
    { name: 'Property Flags', weight: -30, value: -5, description: "Recent flags or complaints. (Lower is better for value here, but displayed as impact)" },
    { name: 'Deals Completed', weight: 20, value: 16, description: "Successfully completed bookings." },
    { name: 'Payment History', weight: 10, value: 8, description: "Timeliness of any Zimba service payments." },
    { name: 'Review Timeliness', weight: 10, value: 7, description: "Promptness in reviewing tenants post-stay." }, // Changed "Timeliness" to be more specific
  ],
  tips: [
    "Ensure your profile and property documents are fully verified.",
    "Respond to tenant inquiries and booking requests as quickly as possible.",
    "Address any reported issues promptly to avoid flags.",
    "Encourage tenants to leave reviews after a successful stay.",
    "Maintain a positive payment history for any platform services.",
  ]
};

// Simple progress bar component (if ui/progress is not available or suitable)
const SimpleProgressBar = ({ value, max = 100, colorClass = "bg-green-500", heightClass = "h-2.5" }) => {
  const percentage = (value / max) * 100;
  return (
    <div className={`w-full bg-muted rounded-full ${heightClass} overflow-hidden`}>
      <div className={`${colorClass} ${heightClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};


const LandlordTrustScore = () => {
  const { score, components, tips } = mockTrustScoreData;
  const scorePercentage = (score / 5) * 100;

  // Function to determine color based on score (example)
  const getScoreColor = (currentScore, maxScore = 20) => { // Assuming max component score is its weight
    const percentage = (currentScore / maxScore) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressBarColor = (currentScore, maxScore = 20) => {
    const percentage = (currentScore / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }


  return (
    <div className="p-1 md:p-0">
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 px-1 md:px-0">My TrustScore</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Display */}
        <div className="lg:col-span-1 p-6 bg-card rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
          <Icon name="ShieldCheck" size={48} className="text-primary mb-3" />
          <h3 className="text-lg font-medium text-muted-foreground">Your Current TrustScore</h3>
          <p className="text-6xl font-bold text-primary my-2">{score.toFixed(1)}<span className="text-3xl text-muted-foreground">/5</span></p>
          <div className="w-full max-w-xs mx-auto mt-2">
            <SimpleProgressBar value={scorePercentage} colorClass={getProgressBarColor(score, 5)} />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Last updated: Today
          </p>
        </div>

        {/* Components Breakdown */}
        <div className="lg:col-span-2 p-6 bg-card rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">How Your Score is Calculated</h3>
          <div className="space-y-4">
            {components.map(comp => {
              // For flags, a lower 'value' (e.g., more negative) is worse.
              // We want to show the positive impact or the magnitude of negative impact.
              const displayValue = comp.name === 'Property Flags' ? Math.abs(comp.value) : comp.value;
              const displayMax = comp.name === 'Property Flags' ? Math.abs(comp.weight) : comp.weight;
              const valueColor = comp.name === 'Property Flags'
                                  ? (comp.value === 0 ? 'text-green-500' : 'text-red-500') // Green if 0 flags, red otherwise
                                  : getScoreColor(displayValue, displayMax);
              const progressColor = comp.name === 'Property Flags'
                                  ? (comp.value === 0 ? 'bg-green-500' : 'bg-red-500')
                                  : getProgressBarColor(displayValue, displayMax);


              return (
                <div key={comp.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{comp.name}</span>
                    <span className={`text-sm font-semibold ${valueColor}`}>
                      {comp.name === 'Property Flags' ? `${comp.value} / ${comp.weight}%` : `${displayValue} / ${displayMax} pts`}
                    </span>
                  </div>
                  <SimpleProgressBar
                    value={comp.name === 'Property Flags' ? (displayMax - displayValue) : displayValue} // Invert for flags for visual "good"
                    max={displayMax}
                    colorClass={progressColor}
                    heightClass="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{comp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tips for Improvement */}
      <div className="mt-8 p-6 bg-card rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={20} className="text-yellow-400 mr-2" />
          Tips to Improve Your TrustScore
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

export default LandlordTrustScore;
