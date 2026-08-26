const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000;

/*
|--------------------------------------------------------------------------
| SCAM ANALYZER
|--------------------------------------------------------------------------
*/

  const analyzeScamMessage = async () => {
    if (!scamMessage.trim()) {
      return;
    }

    setIsCheckingScam(true);
    setScamResult(null);

    try {
      const response = await fetch("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: scamMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze message");
      }

      const result = await response.json();

      setScamResult(result);
    } catch (error) {
      console.error("Scam analysis error:", error);

      setScamResult({
        score: 0,
        riskLevel: "LOW",
        scamCategory: "Analysis Error",
        warningSigns: [],
        riskDescription:
          "We could not connect to the Digital Buddy safety service.",
        advice:
          "Please make sure the Digital Buddy server is running and try again.",
      });
    } finally {
      setIsCheckingScam(false);
    }
  };

// function analyzeScamMessage(message) {
//   const text = message.toLowerCase().trim();

//   let score = 0;
//   const warningSigns = [];

//   let scamCategory = "No obvious scam detected";

//   /*
//   |--------------------------------------------------------------------------
//   | Helper function
//   |--------------------------------------------------------------------------
//   */

//   function addWarning(points, warning) {
//     score += points;

//     if (!warningSigns.includes(warning)) {
//       warningSigns.push(warning);
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | URGENCY
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("urgent") ||
//     text.includes("immediately") ||
//     text.includes("now") ||
//     text.includes("hurry") ||
//     text.includes("quickly") ||
//     text.includes("asap") ||
//     text.includes("minutes") ||
//     text.includes("today") ||
//     text.includes("deadline")
//   ) {
//     addWarning(20, "Creates urgency");
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | SENSITIVE INFORMATION
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("pin") ||
//     text.includes("otp") ||
//     text.includes("password") ||
//     text.includes("passcode") ||
//     text.includes("verification code") ||
//     text.includes("security code") ||
//     text.includes("secret code")
//   ) {
//     addWarning(35, "Requests sensitive information");
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | MONEY
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("send money") ||
//     text.includes("send cash") ||
//     text.includes("pay") ||
//     text.includes("payment") ||
//     text.includes("transfer") ||
//     text.includes("fee") ||
//     text.includes("deposit") ||
//     text.includes("registration fee") ||
//     text.includes("processing fee") ||
//     text.includes("activation fee") ||
//     text.includes("withdrawal fee")
//   ) {
//     addWarning(25, "Requests money");
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | PRIZE / PROMOTION
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("won") ||
//     text.includes("winner") ||
//     text.includes("prize") ||
//     text.includes("reward") ||
//     text.includes("lottery") ||
//     text.includes("jackpot") ||
//     text.includes("promotion") ||
//     text.includes("congratulations") ||
//     text.includes("selected") ||
//     text.includes("claim your")
//   ) {
//     addWarning(20, "Promises an unexpected reward");

//     scamCategory = "Prize / Promotion Scam";
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | MOBILE MONEY
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("mobile money") ||
//     text.includes("momo") ||
//     text.includes("airtel money") ||
//     text.includes("airtelmoney") ||
//     text.includes("mtn") ||
//     text.includes("mtn momo") ||
//     text.includes("cashout") ||
//     text.includes("withdraw")
//   ) {
//     scamCategory = "Mobile Money Scam";
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | JOB SCAM
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("job") ||
//     text.includes("employment") ||
//     text.includes("vacancy") ||
//     text.includes("salary") ||
//     text.includes("work from home") ||
//     text.includes("interview") ||
//     text.includes("recruitment") ||
//     text.includes("hiring")
//   ) {
//     scamCategory = "Job Scam";

//     if (
//       text.includes("fee") ||
//       text.includes("pay") ||
//       text.includes("payment") ||
//       text.includes("registration") ||
//       text.includes("deposit")
//     ) {
//       addWarning(
//         30,
//         "Requests payment for a job opportunity"
//       );
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | EDUCATION / SCHOLARSHIP
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("scholarship") ||
//     text.includes("university") ||
//     text.includes("school") ||
//     text.includes("admission") ||
//     text.includes("tuition") ||
//     text.includes("education") ||
//     text.includes("student") ||
//     text.includes("bursary") ||
//     text.includes("study abroad")
//   ) {
//     scamCategory = "Education Scam";

//     if (
//       text.includes("fee") ||
//       text.includes("pay") ||
//       text.includes("payment") ||
//       text.includes("deposit") ||
//       text.includes("registration")
//     ) {
//       addWarning(
//         25,
//         "Requests payment for an education opportunity"
//       );
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ROMANCE SCAM
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("love") ||
//     text.includes("relationship") ||
//     text.includes("girlfriend") ||
//     text.includes("boyfriend") ||
//     text.includes("romance") ||
//     text.includes("marriage") ||
//     text.includes("husband") ||
//     text.includes("wife") ||
//     text.includes("dating")
//   ) {
//     scamCategory = "Romance Scam";

//     if (
//       text.includes("send money") ||
//       text.includes("money") ||
//       text.includes("transfer") ||
//       text.includes("fee") ||
//       text.includes("hospital") ||
//       text.includes("emergency") ||
//       text.includes("travel")
//     ) {
//       addWarning(
//         30,
//         "Uses a relationship to request money"
//       );
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | LOAN / INVESTMENT SCAM
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("loan") ||
//     text.includes("quick loan") ||
//     text.includes("instant loan") ||
//     text.includes("investment") ||
//     text.includes("invest") ||
//     text.includes("forex") ||
//     text.includes("crypto") ||
//     text.includes("profit") ||
//     text.includes("returns") ||
//     text.includes("double your money") ||
//     text.includes("guaranteed returns")
//   ) {
//     scamCategory = "Loan / Investment Scam";

//     if (
//       text.includes("fee") ||
//       text.includes("deposit") ||
//       text.includes("registration") ||
//       text.includes("activation") ||
//       text.includes("processing") ||
//       text.includes("send money") ||
//       text.includes("pay")
//     ) {
//       addWarning(
//         30,
//         "Requests upfront payment for a financial service"
//       );
//     }

//     if (
//       text.includes("guaranteed") ||
//       text.includes("double") ||
//       text.includes("triple") ||
//       text.includes("risk free") ||
//       text.includes("no risk") ||
//       text.includes("easy money")
//     ) {
//       addWarning(
//         20,
//         "Promises unrealistic financial returns"
//       );
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ACCOUNT / IDENTITY
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("account") ||
//     text.includes("bank") ||
//     text.includes("password") ||
//     text.includes("otp") ||
//     text.includes("verification code") ||
//     text.includes("login") ||
//     text.includes("sign in") ||
//     text.includes("security") ||
//     text.includes("wallet")
//   ) {
//     if (scamCategory === "No obvious scam detected") {
//       scamCategory = "Account / Identity Scam";
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | PHISHING LINKS
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("http://") ||
//     text.includes("https://") ||
//     text.includes("www.") ||
//     text.includes("bit.ly") ||
//     text.includes("tinyurl.com") ||
//     text.includes(".com/") ||
//     text.includes(".net/") ||
//     text.includes(".org/")
//   ) {
//     addWarning(
//       20,
//       "Contains a suspicious link"
//     );

//     if (scamCategory === "No obvious scam detected") {
//       scamCategory = "Phishing Scam";
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | IMPERSONATION
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("police") ||
//     text.includes("arrest") ||
//     text.includes("court") ||
//     text.includes("government") ||
//     text.includes("tax") ||
//     text.includes("ura") ||
//     text.includes("bank manager") ||
//     text.includes("official") ||
//     text.includes("authority")
//   ) {
//     if (
//       text.includes("send money") ||
//       text.includes("pay") ||
//       text.includes("otp") ||
//       text.includes("pin") ||
//       text.includes("password") ||
//       text.includes("account") ||
//       text.includes("immediately") ||
//       text.includes("arrest") ||
//       text.includes("blocked")
//     ) {
//       scamCategory = "Impersonation Scam";

//       addWarning(
//         25,
//         "May be impersonating an authority or organization"
//       );
//     }
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | THREATS
//   |--------------------------------------------------------------------------
//   */

//   if (
//     text.includes("account will be closed") ||
//     text.includes("account will be blocked") ||
//     text.includes("account has been blocked") ||
//     text.includes("legal action") ||
//     text.includes("court action") ||
//     text.includes("you will be arrested") ||
//     text.includes("account will be suspended")
//   ) {
//     addWarning(
//       20,
//       "Uses fear or threats"
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | FAKE CUSTOMER CARE
//   |--------------------------------------------------------------------------
//   */

//   if (
//     (
//       text.includes("customer care") ||
//       text.includes("support agent") ||
//       text.includes("help desk") ||
//       text.includes("technical support") ||
//       text.includes("customer service")
//     ) &&
//     (
//       text.includes("pin") ||
//       text.includes("otp") ||
//       text.includes("password") ||
//       text.includes("send money") ||
//       text.includes("pay") ||
//       text.includes("verification")
//     )
//   ) {
//     scamCategory = "Customer Care Scam";

//     addWarning(
//       30,
//       "Requests sensitive information while posing as customer support"
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | SCORE
//   |--------------------------------------------------------------------------
//   */

//   score = Math.min(score, 100);

//   let riskLevel = "LOW";

//   if (score >= 70) {
//     riskLevel = "HIGH";
//   } else if (score >= 40) {
//     riskLevel = "SUSPICIOUS";
//   } else if (score >= 20) {
//     riskLevel = "CAUTION";
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ADVICE
//   |--------------------------------------------------------------------------
//   */

//   let advice =
//     "No obvious scam indicators were detected. Stay cautious and verify unexpected requests.";

//   if (scamCategory === "Mobile Money Scam") {
//     advice =
//       "Never share your mobile-money PIN or OTP.";
//   }

//   else if (scamCategory === "Job Scam") {
//     advice =
//       "Never pay money to receive a job. Verify the employer independently.";
//   }

//   else if (scamCategory === "Education Scam") {
//     advice =
//       "Verify the school, scholarship or university using official contacts.";
//   }

//   else if (scamCategory === "Romance Scam") {
//     advice =
//       "Do not send money to someone you only know online.";
//   }

//   else if (scamCategory === "Prize / Promotion Scam") {
//     advice =
//       "Do not pay to claim an unexpected prize or promotion.";
//   }

//   else if (scamCategory === "Loan / Investment Scam") {
//     advice =
//       "Verify the financial provider and be suspicious of upfront fees or guaranteed profits.";
//   }

//   else if (scamCategory === "Account / Identity Scam") {
//     advice =
//       "Never share passwords, PINs or OTPs.";
//   }

//   else if (scamCategory === "Phishing Scam") {
//     advice =
//       "Do not click suspicious links. Visit the official website directly.";
//   }

//   else if (scamCategory === "Impersonation Scam") {
//     advice =
//       "Contact the organization through an official channel before taking action.";
//   }

//   else if (scamCategory === "Customer Care Scam") {
//     advice =
//       "Real customer-care agents should not ask for your PIN or OTP.";
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | RESULT
//   |--------------------------------------------------------------------------
//   */

//   return {
//     score,
//     riskLevel,
//     scamCategory,
//     warningSigns,
//     advice
//   };
// }




/*
|--------------------------------------------------------------------------
| Web Scam Analysis API
|--------------------------------------------------------------------------
*/

app.post("/api/analyze", (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "No message was provided."
      });
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
    } else if (result.scamCategory === "Account / Identity Scam") {
      advice =
        "Never share passwords, PINs or OTPs.";
    } else if (result.scamCategory === "Loan / Investment Scam") {
      advice =
        "Verify the financial provider and be suspicious of upfront fees or guaranteed profits.";
    }

    return res.json({
      ...result,
      advice
    });

  } catch (error) {
    console.error("Analysis error:", error);

    return res.status(500).json({
      error: "Unable to analyze the message."
    });
  }
});


/*
|--------------------------------------------------------------------------
| USSD ENDPOINT
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
${result.advice}`
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
| TEST ROUTE
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.send(
    "Digital Buddy USSD server is running."
  );

});

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {

  console.log(
    `Digital Buddy USSD server running on http://localhost:${PORT}`
  );

});
