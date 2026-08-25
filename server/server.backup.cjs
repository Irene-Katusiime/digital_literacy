const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000;

/*
|--------------------------------------------------------------------------
| Scam Analyzer
|--------------------------------------------------------------------------
*/

function analyzeScamMessage(message) {
  const text = message.toLowerCase();

  let score = 0;
  const warningSigns = [];

  // URGENCY
  if (
    text.includes("urgent") ||
    text.includes("immediately") ||
    text.includes("within") ||
    text.includes("now") ||
    text.includes("hurry") ||
    text.includes("minutes")
  ) {
    score += 20;

    warningSigns.push(
      "Creates urgency"
    );
  }

  // SENSITIVE INFORMATION
  if (
    text.includes("pin") ||
    text.includes("otp") ||
    text.includes("password") ||
    text.includes("passcode") ||
    text.includes("verification code")
  ) {
    score += 35;

    warningSigns.push(
      "Requests sensitive information"
    );
  }

  // MONEY
  if (
    text.includes("send money") ||
    text.includes("pay") ||
    text.includes("payment") ||
    text.includes("transfer") ||
    text.includes("fee") ||
    text.includes("deposit")
  ) {
    score += 25;

    warningSigns.push(
      "Requests money"
    );
  }

  // PRIZES
  if (
    text.includes("won") ||
    text.includes("winner") ||
    text.includes("prize") ||
    text.includes("reward") ||
    text.includes("congratulations") ||
    text.includes("lottery")
  ) {
    score += 20;

    warningSigns.push(
      "Unexpected reward"
    );
  }

  // LINKS
  if (
    text.includes("http://") ||
    text.includes("https://") ||
    text.includes("www.") ||
    text.includes(".com/")
  ) {
    score += 15;

    warningSigns.push(
      "Contains a suspicious link"
    );
  }

  // THREATS
  if (
    text.includes("account will be closed") ||
    text.includes("account will be blocked") ||
    text.includes("arrest") ||
    text.includes("police") ||
    text.includes("legal action")
  ) {
    score += 20;

    warningSigns.push(
      "Uses fear or threats"
    );
  }

  score = Math.min(score, 100);

  let riskLevel = "LOW";

  if (score >= 70) {
    riskLevel = "HIGH";
  } else if (score >= 40) {
    riskLevel = "SUSPICIOUS";
  } else if (score >= 20) {
    riskLevel = "CAUTION";
  }

  /*
  |--------------------------------------------------------------------------
  | Scam Category
  |--------------------------------------------------------------------------
  */

  let scamCategory = "No obvious scam detected";

  if (
    text.includes("mobile money") ||
    text.includes("momo") ||
    text.includes("airtel money") ||
    text.includes("mtn") ||
    text.includes("withdraw") ||
    text.includes("deposit")
  ) {
    scamCategory = "Mobile Money Scam";

  } else if (
    text.includes("job") ||
    text.includes("employment") ||
    text.includes("vacancy") ||
    text.includes("salary") ||
    text.includes("work from home") ||
    text.includes("interview")
  ) {
    scamCategory = "Job Scam";

  } else if (
    text.includes("scholarship") ||
    text.includes("university") ||
    text.includes("school") ||
    text.includes("admission") ||
    text.includes("tuition") ||
    text.includes("education")
  ) {
    scamCategory = "Education Scam";

  } else if (
    text.includes("love") ||
    text.includes("relationship") ||
    text.includes("girlfriend") ||
    text.includes("boyfriend") ||
    text.includes("romance") ||
    text.includes("marriage")
  ) {
    scamCategory = "Romance Scam";

  } else if (
    text.includes("prize") ||
    text.includes("winner") ||
    text.includes("won") ||
    text.includes("lottery") ||
    text.includes("reward") ||
    text.includes("congratulations")
  ) {
    scamCategory = "Prize Scam";

  } else if (
    text.includes("account") ||
    text.includes("bank") ||
    text.includes("password") ||
    text.includes("otp") ||
    text.includes("verification code") ||
    text.includes("login")
  ) {
    scamCategory = "Account / Identity Scam";

  } else if (
    text.includes("police") ||
    text.includes("arrest") ||
    text.includes("court") ||
    text.includes("government") ||
    text.includes("tax")
  ) {
    scamCategory = "Impersonation Scam";
  }

  return {
    score,
    riskLevel,
    scamCategory,
    warningSigns
  };
}

/*
|--------------------------------------------------------------------------
| USSD Endpoint
|--------------------------------------------------------------------------
*/

app.post("/ussd", (req, res) => {

  const {
    sessionId,
    phoneNumber,
    serviceCode,
    text
  } = req.body;

  console.log("USSD request:");
  console.log({
    sessionId,
    phoneNumber,
    serviceCode,
    text
  });

  const input = text || "";

  /*
  |--------------------------------------------------------------------------
  | MAIN MENU
  |--------------------------------------------------------------------------
  */

  if (input === "") {

    return res.send(
`CON DIGITAL BUDDY
Welcome to Safety Check.

1. Check a message
2. Safety tips
3. Exit`
    );

  }

  /*
  |--------------------------------------------------------------------------
  | SAFETY TIPS
  |--------------------------------------------------------------------------
  */

  if (input === "2") {

    return res.send(
`END SAFETY TIPS

- Never share your PIN or OTP.
- Do not send money to strangers.
- Verify suspicious messages.
- Avoid unknown links.
- Contact organizations using official channels.`
    );

  }

  /*
  |--------------------------------------------------------------------------
  | EXIT
  |--------------------------------------------------------------------------
  */

  if (input === "3") {

    return res.send(
`END Thank you for using Digital Buddy.

Stay safe online.`
    );

  }

  /*
  |--------------------------------------------------------------------------
  | CHECK MESSAGE
  |--------------------------------------------------------------------------
  */

  if (input === "1") {

    return res.send(
`CON CHECK MESSAGE

Enter the suspicious message:`
    );

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE ANALYSIS
  |--------------------------------------------------------------------------
  */

  if (input.startsWith("1*")) {

    const message = input.substring(2);

    if (!message.trim()) {

      return res.send(
`END No message was provided.

Please try again.`
      );

    }

    const result = analyzeScamMessage(message);

    let advice =
      "Do not share PINs, OTPs, passwords or money.";

    if (result.scamCategory === "Mobile Money Scam") {

      advice =
        "Never share your mobile-money PIN or OTP.";

    } else if (result.scamCategory === "Job Scam") {

      advice =
        "Never pay money to receive a job.";

    } else if (result.scamCategory === "Education Scam") {

      advice =
        "Verify the school or university directly.";

    } else if (result.scamCategory === "Romance Scam") {

      advice =
        "Do not send money to someone you only know online.";

    } else if (result.scamCategory === "Prize Scam") {

      advice =
        "Do not pay to claim an unexpected prize.";

    } else if (
      result.scamCategory === "Account / Identity Scam"
    ) {

      advice =
        "Never share passwords, PINs or OTPs.";

    }

    const warnings =
      result.warningSigns.length > 0
        ? result.warningSigns
            .slice(0, 3)
            .map((warning) => `- ${warning}`)
            .join("\n")
        : "- No obvious warning signs detected.";

    return res.send(
`END DIGITAL BUDDY RESULT

Risk: ${result.riskLevel}
Score: ${result.score}/100

Type:
${result.scamCategory}

Warning signs:
${warnings}

Advice:
${advice}`
    );

  }

  /*
  |--------------------------------------------------------------------------
  | INVALID OPTION
  |--------------------------------------------------------------------------
  */

  return res.send(
`END Invalid option.

Please dial the service again.`
  );

});


/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.send(
    "Digital Buddy USSD server is running."
  );

});


/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {

  console.log(
    `Digital Buddy USSD server running on http://localhost:${PORT}`
  );

});
