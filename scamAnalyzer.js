export const analyzeMessageContent = (messageToAnalyze) => {
  if (!messageToAnalyze.trim()) return null;

  const msg = messageToAnalyze.toLowerCase();

  let scamScore = 0;
  const warningSigns = [];

  if (
    /(urgent|immediately|within|now|hurry|minutes)/.test(msg)
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "urgency",
      icon: "⏰"
    });
  }

  if (
    /(pin|otp|password|passcode|verification code)/.test(msg)
  ) {
    scamScore += 35;

    warningSigns.push({
      type: "sensitive",
      icon: "🔐"
    });
  }

  if (
    /(send money|pay|payment|transfer|fee|deposit)/.test(msg)
  ) {
    scamScore += 25;

    warningSigns.push({
      type: "money",
      icon: "💰"
    });
  }

  if (
    /(won|winner|prize|reward|congratulations|lottery)/.test(msg)
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "reward",
      icon: "🎁"
    });
  }

  if (
    /(http:\/\/|https:\/\/|www\.|\.com\/)/.test(msg)
  ) {
    scamScore += 15;

    warningSigns.push({
      type: "link",
      icon: "🔗"
    });
  }

  if (
    /(account will be closed|account will be blocked|arrest|police|legal action)/.test(
      msg
    )
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "threat",
      icon: "⚠️"
    });
  }

  scamScore = Math.min(scamScore, 100);

  let riskLevel = "LOW";

  if (scamScore >= 70) {
    riskLevel = "HIGH";
  } else if (scamScore >= 40) {
    riskLevel = "SUSPICIOUS";
  } else if (scamScore >= 20) {
    riskLevel = "CAUTION";
  }

  let scamCategory = "General Scam";

  if (
    /(mobile money|momo|airtel money|mtn|withdraw|deposit|mobile money pin)/.test(
      msg
    )
  ) {
    scamCategory = "Mobile Money Scam";
  } else if (
    /(job|employment|vacancy|salary|work from home|interview)/.test(msg)
  ) {
    scamCategory = "Job Scam";
  } else if (
    /(scholarship|university|school|admission|tuition|education)/.test(msg)
  ) {
    scamCategory = "Education Scam";
  } else if (
    /(love|relationship|girlfriend|boyfriend|romance|marriage)/.test(msg)
  ) {
    scamCategory = "Romance Scam";
  } else if (
    /(prize|winner|won|lottery|reward|congratulations)/.test(msg)
  ) {
    scamCategory = "Prize Scam";
  } else if (
    /(account|bank|password|otp|verification code|login)/.test(msg)
  ) {
    scamCategory = "Account / Identity Scam";
  } else if (
    /(police|arrest|court|government|tax)/.test(msg)
  ) {
    scamCategory = "Impersonation Scam";
  }

  return {
    score: scamScore,
    riskLevel,
    warningSigns,
    scamCategory
  };
};
