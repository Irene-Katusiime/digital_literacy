import React, { useState } from "react";
import "./App.css";
import ChatAssistant from "./ChatAssistant";

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const SUSPICIOUS_WORDS = [
  "urgent", "immediately", "now", "hurry", "minutes", "pin", "otp",
  "password", "passcode", "verification code", "send money", "pay",
  "payment", "transfer", "fee", "deposit", "won", "winner", "prize",
  "reward", "congratulations", "lottery", "http://", "https://", "www.",
  "account will be closed", "account will be blocked", "arrest", "police",
  "legal action"
];

const SCAM_ADVICE = {
  "Mobile Money Scam": {
    icon: "📱",
    title: "Protect your mobile money",
    points: [
      "Never share your mobile-money PIN or OTP.",
      "Don't send money because of an unexpected message.",
      "Contact your mobile-money provider using an official number or app."
    ]
  },
  "Job Scam": {
    icon: "💼",
    title: "Verify the job opportunity",
    points: [
      "Don't pay money just to apply for or receive a job.",
      "Research the company using its official website.",
      "Verify the vacancy with the company's official contact information."
    ]
  },
  "Education Scam": {
    icon: "🎓",
    title: "Verify the education offer",
    points: [
      "Contact the school or university directly.",
      "Don't pay fees through an unverified link or personal number.",
      "Check the institution's official website for scholarship information."
    ]
  },
  "Romance Scam": {
    icon: "❤️",
    title: "Protect yourself from romance scams",
    points: [
      "Don't send money to someone you only know online.",
      "Be cautious if someone creates an emotional emergency.",
      "Verify the person's identity before sharing personal or financial information."
    ]
  },
  "Prize Scam": {
    icon: "🎁",
    title: "Be careful with unexpected prizes",
    points: [
      "Don't pay a fee to claim a prize you didn't enter.",
      "Don't share your PIN, password, or OTP.",
      "Verify the promotion through the organization's official website or contact."
    ]
  },
  "Account / Identity Scam": {
    icon: "🔐",
    title: "Protect your account",
    points: [
      "Never share your password, PIN, or OTP.",
      "Don't log in through links sent in unexpected messages.",
      "Contact the organization directly if you think your account has a problem."
    ]
  },
  "Impersonation Scam": {
    icon: "🎭",
    title: "Verify who contacted you",
    points: [
      "Don't trust a message simply because it uses an official name or logo.",
      "Contact the organization through an official channel.",
      "Don't send money or personal information until the request is verified."
    ]
  },
  "General Scam": {
    icon: "🛡️",
    title: "Stay safe",
    points: [
      "Don't rush into taking action.",
      "Verify the sender independently.",
      "Never share passwords, PINs, or OTPs."
    ]
  }
};

const LESSONS_DATA = {
  cybersecurity: {
    title: "🔐 Cybersecurity",
    description: "Learn how to protect yourself when using technology and the internet.",
    sections: [
      {
        heading: "🔑 Use Strong Passwords",
        text: "Create passwords that are hard to guess. Use a mix of letters, numbers, and symbols. Never share your password with anyone."
      },
      {
        heading: "📱 Keep Your Mobile Money Safe",
        text: "Never share your Mobile Money PIN or One-Time Passwords (OTPs) with anyone, including people claiming to work for your network provider."
      },
      {
        heading: "🔗 Be Careful with Links",
        text: "Do not click on links in unexpected messages or emails. Always double-check the website address before entering personal details."
      }
    ],
    questions: [
      {
        question: "Should you share your mobile money PIN with someone?",
        options: ["Yes", "No"],
        correct: "No"
      },
      {
        question: "What should you do before clicking a suspicious link?",
        options: ["Click it immediately", "Check and verify the link", "Share it with everyone"],
        correct: "Check and verify the link"
      },
      {
        question: "Which password is stronger?",
        options: ["123456", "password", "MyP@ssw0rd!2026"],
        correct: "MyP@ssw0rd!2026"
      }
    ]
  },
  email: {
    title: "📧 Email",
    description: "Learn how to communicate professionally and safely using email.",
    sections: [
      {
        heading: "📬 What is Email?",
        text: "Email (Electronic Mail) is a method of exchanging digital messages across the internet between two or more people."
      },
      {
        heading: "✍️ Key Actions",
        text: "Compose: Write a new message.\nInbox: Where incoming emails arrive.\nAttachments: Files attached to a message."
      }
    ],
    questions: [
      {
        question: "What is email mainly used for?",
        options: ["Sending and receiving messages", "Cooking food", "Taking photos", "Charging a phone"],
        correct: "Sending and receiving messages"
      },
      {
        question: "Which button is commonly used to start writing a new email?",
        options: ["Delete", "Compose", "Refresh", "Download"],
        correct: "Compose"
      },
      {
        question: "What should you do if you receive an email from an unknown sender with a suspicious attachment?",
        options: [
          "Open the attachment immediately",
          "Forward it to everyone",
          "Be careful and avoid opening it",
          "Reply with your password"
        ],
        correct: "Be careful and avoid opening it"
      }
    ]
  },
  ai: {
    title: "🤖 Artificial Intelligence",
    description: "Learn about Artificial Intelligence and how to use it responsibly.",
    sections: [
      {
        heading: "💡 What is AI?",
        text: "Artificial Intelligence refers to computer systems designed to simulate human intelligence to perform tasks like answering questions, translating languages, or recognizing images."
      },
      {
        heading: "⚠️ Responsible Usage",
        text: "Always verify critical facts provided by AI systems, as they can sometimes make mistakes or present inaccurate information."
      }
    ],
    questions: [
      {
        question: "What is Artificial Intelligence (AI)?",
        options: [
          "Technology that allows computers to perform tasks that normally require human intelligence",
          "A type of mobile phone",
          "A social media application",
          "A computer cable"
        ],
        correct: "Technology that allows computers to perform tasks that normally require human intelligence"
      },
      {
        question: "Which of these is an example of Artificial Intelligence?",
        options: ["A voice assistant answering questions", "A notebook", "A USB cable", "A normal light bulb"],
        correct: "A voice assistant answering questions"
      },
      {
        question: "What should you do before trusting important information generated by AI?",
        options: ["Share it immediately", "Verify the information", "Ignore it completely", "Send it to everyone"],
        correct: "Verify the information"
      }
    ]
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const analyzeMessageContent = (messageToAnalyze) => {
  if (!messageToAnalyze.trim()) return null;

  const msg = messageToAnalyze.toLowerCase();
  let scamScore = 0;
  const warningSigns = [];

  if (/(urgent|immediately|within|now|hurry|minutes)/.test(msg)) {
    scamScore += 20;
    warningSigns.push({
      icon: "⏰",
      title: "Creates urgency",
      description: "The sender is pressuring you to act quickly instead of giving you time to verify the message."
    });
  }

  if (/(pin|otp|password|passcode|verification code)/.test(msg)) {
    scamScore += 35;
    warningSigns.push({
      icon: "🔐",
      title: "Requests sensitive information",
      description: "Legitimate organizations should not ask you to reveal your PIN, password, or OTP."
    });
  }

  if (/(send money|pay|payment|transfer|fee|deposit)/.test(msg)) {
    scamScore += 25;
    warningSigns.push({
      icon: "💰",
      title: "Requests money",
      description: "The message asks you to send money or make a payment."
    });
  }

  if (/(won|winner|prize|reward|congratulations|lottery)/.test(msg)) {
    scamScore += 20;
    warningSigns.push({
      icon: "🎁",
      title: "Unexpected reward",
      description: "The message promises a prize, reward, or money that you may not have expected."
    });
  }

  if (/(http:\/\/|https:\/\/|www\.|\.com\/)/.test(msg)) {
    scamScore += 15;
    warningSigns.push({
      icon: "🔗",
      title: "Contains a link",
      description: "Be careful with links in unexpected messages. Verify the destination before opening them."
    });
  }

  if (/(account will be closed|account will be blocked|arrest|police|legal action)/.test(msg)) {
    scamScore += 20;
    warningSigns.push({
      icon: "⚠️",
      title: "Uses fear or threats",
      description: "The sender may be using fear or threats to pressure you into acting."
    });
  }

  scamScore = Math.min(scamScore, 100);

  let riskLevel = "LOW";
  let riskDescription = "We found few obvious warning signs, but always verify unexpected messages.";

  if (scamScore >= 70) {
    riskLevel = "HIGH";
    riskDescription = "This message contains several common warning signs associated with scams.";
  } else if (scamScore >= 40) {
    riskLevel = "SUSPICIOUS";
    riskDescription = "This message contains warning signs that you should investigate before taking action.";
  } else if (scamScore >= 20) {
    riskLevel = "CAUTION";
    riskDescription = "There are some warning signs. Be careful and verify the sender.";
  }

  let scamCategory = "General Scam";
  if (/(mobile money|momo|airtel money|mtn|withdraw|deposit|mobile money pin)/.test(msg)) {
    scamCategory = "Mobile Money Scam";
  } else if (/(job|employment|vacancy|salary|work from home|interview)/.test(msg)) {
    scamCategory = "Job Scam";
  } else if (/(scholarship|university|school|admission|tuition|education)/.test(msg)) {
    scamCategory = "Education Scam";
  } else if (/(love|relationship|girlfriend|boyfriend|romance|marriage)/.test(msg)) {
    scamCategory = "Romance Scam";
  } else if (/(prize|winner|won|lottery|reward|congratulations)/.test(msg)) {
    scamCategory = "Prize Scam";
  } else if (/(account|bank|password|otp|verification code|login)/.test(msg)) {
    scamCategory = "Account / Identity Scam";
  } else if (/(police|arrest|court|government|tax)/.test(msg)) {
    scamCategory = "Impersonation Scam";
  }

  return { score: scamScore, riskLevel, riskDescription, warningSigns, scamCategory };
};

const highlightScamWords = (text) => {
  const escaped = SUSPICIOUS_WORDS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return text.split(pattern).map((part, index) => {
    const isSuspicious = SUSPICIOUS_WORDS.some((w) => w.toLowerCase() === part.toLowerCase());
    return isSuspicious ? (
      <mark className="suspicious-highlight" key={index}>
        {part}
      </mark>
    ) : (
      part
    );
  });
};

// ==========================================
// SUBCOMPONENTS
// ==========================================

function Quiz({ questions }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (option === questions[questionNumber].correct) {
      setScore((prev) => prev + 1);
    }
    setQuestionNumber((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setQuestionNumber(0);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <hr />
      <h2>🧪 Lesson Quiz</h2>
      {questionNumber < questions.length ? (
        <div className="quiz-card">
          <p>
            <strong>Question {questionNumber + 1} of {questions.length}:</strong>
          </p>
          <p className="quiz-question">{questions[questionNumber].question}</p>
          <div className="quiz-options">
            {questions[questionNumber].options.map((option, idx) => (
              <button key={idx} className="quiz-option-button" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Completed! 🎉</h3>
          <p>
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>
          <button className="primary-button" onClick={resetQuiz}>
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}

function HomeView({ onNavigate, onOpenAssistant }) {
  return (
    <>
      <h1>Digital Buddy</h1>
      <p className="subtitle">Learn, stay safe, and understand technology.</p>
      <h2>What would you like to do?</h2>
      <div className="cards">
        <button className="card" onClick={() => onNavigate("learn")}>
          <div className="icon">📚</div>
          <h3>Learn Digital Skills</h3>
          <p>Learn how to use technology safely.</p>
        </button>

        <button className="card" onClick={() => onNavigate("scamCheck")}>
          <div className="icon">🛡️</div>
          <h3>Check For Scams</h3>
          <p>Check suspicious messages.</p>
        </button>

        <button className="card" onClick={() => onOpenAssistant("")}>
          <div className="icon">🤖</div>
          <h3>Ask Digital Assistant</h3>
          <p>Ask questions about technology.</p>
        </button>
      </div>
    </>
  );
}

function LessonView({ lesson, onBack }) {
  return (
    <>
      <button className="back-button" onClick={onBack}>← Back</button>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>

      {lesson.sections.map((sec, idx) => (
        <React.Fragment key={idx}>
          <h3>{sec.heading}</h3>
          <p style={{ whitespace: "pre-line" }}>{sec.text}</p>
        </React.Fragment>
      ))}

      <Quiz questions={lesson.questions} />
    </>
  );
}

function ScamCheckView({
  scamMessage,
  setScamMessage,
  scamResult,
  setScamResult,
  isCheckingScam,
  onAnalyze,
  onNavigate
}) {
  const advice = scamResult ? SCAM_ADVICE[scamResult.scamCategory] || SCAM_ADVICE["General Scam"] : null;

  return (
    <>
      <button className="back-button" onClick={() => { setScamResult(null); onNavigate("home"); }}>
        ← Back
      </button>

      <div className="offline-option">
        <div className="offline-icon">📱</div>
        <div className="offline-content">
          <h3>No internet?</h3>
          <p>You can also check suspicious messages using our USSD service.</p>
        </div>
        <button className="ussd-button" onClick={() => onNavigate("ussd")}>
          Use USSD
        </button>
      </div>

      <div className="scam-header">
        <div className="scam-icon">🛡️</div>
        <h1>Safety Check</h1>
        <p className="subtitle">Not sure about a message? Let's look for warning signs.</p>
      </div>

      <div className="scam-card">
        <label htmlFor="scam-message">Paste the suspicious message</label>
        <textarea
          id="scam-message"
          value={scamMessage}
          onChange={(e) => setScamMessage(e.target.value)}
          placeholder="Example: Congratulations! You have won..."
          rows="7"
        />
        <p className="privacy-note">🔒 Don't include passwords, PINs, OTPs, or other sensitive information.</p>

        <div className="scam-actions">
          <button
            className="example-button"
            onClick={() => setScamMessage("Congratulations! You have won UGX 500,000. Send your mobile money PIN within 10 minutes to claim your prize: https://example.com/claim")}
          >
            Try an example
          </button>
          <button
            className="primary-button"
            onClick={() => onAnalyze(scamMessage)}
            disabled={!scamMessage.trim() || isCheckingScam}
          >
            {isCheckingScam ? "Checking..." : "Check Message"}
          </button>
        </div>
      </div>

      {isCheckingScam && (
        <div className="checking-card">
          <div className="loading-icon">🔎</div>
          <h2>Checking for warning signs...</h2>
          <p>We're looking for common scam patterns.</p>
        </div>
      )}

      {scamResult && !isCheckingScam && (
        <div className="scam-result">
          <div className={`risk-card risk-${scamResult.riskLevel.toLowerCase()}`}>
            <div className="risk-top">
              <div className="risk-icon">
                {scamResult.riskLevel === "HIGH" ? "🚨" : scamResult.riskLevel === "SUSPICIOUS" ? "⚠️" : scamResult.riskLevel === "CAUTION" ? "🟡" : "🟢"}
              </div>
              <div className="risk-heading">
                <span className="risk-label">Risk Assessment</span>
                <h2>
                  {scamResult.riskLevel === "HIGH" ? "Potential Scam" : scamResult.riskLevel === "SUSPICIOUS" ? "Suspicious Message" : scamResult.riskLevel === "CAUTION" ? "Proceed With Caution" : "Low Risk"}
                </h2>
                <span className="scam-category">🏷️ {scamResult.scamCategory}</span>
              </div>
              <div className="risk-score">
                <strong>{scamResult.score}</strong><span>/100</span>
              </div>
            </div>
            <p className="risk-description">{scamResult.riskDescription}</p>
            <div className="risk-meter">
              <div className="risk-meter-fill" style={{ width: `${scamResult.score}%` }} />
            </div>
            <div className="risk-meter-labels">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>

          <div className="message-preview">
            <div className="message-preview-header">
              <h2>🔎 Message Analysis</h2>
              <span>Highlighted warning signs</span>
            </div>
            <div className="message-content">{highlightScamWords(scamMessage)}</div>
            <div className="highlight-legend">
              <span><mark className="legend-highlight">Warning sign</mark></span>
              <span>Words or phrases that deserve extra attention</span>
            </div>
          </div>

          <div className="warning-section">
            <h2>Why we're concerned</h2>
            {scamResult.warningSigns.length === 0 ? (
              <div className="no-warning">
                <span>✓</span>
                <p>We didn't detect obvious scam warning signs. However, always verify unexpected messages.</p>
              </div>
            ) : (
              scamResult.warningSigns.map((warning, index) => (
                <div className="warning-item" key={index}>
                  <div className="warning-icon">{warning.icon}</div>
                  <div>
                    <h3>{warning.title}</h3>
                    <p>{warning.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {advice && (
            <div className="safety-actions-card">
              <div className="advice-header">
                <div className="advice-icon">{advice.icon}</div>
                <div>
                  <span className="advice-label">Safety Advice</span>
                  <h2>{advice.title}</h2>
                </div>
              </div>
              <div className="advice-list">
                {advice.points.map((point, index) => (
                  <div className="advice-item" key={index}>
                    <div className="advice-number">{index + 1}</div>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="secondary-button" onClick={() => { setScamMessage(""); setScamResult(null); }}>
            Check Another Message
          </button>
        </div>
      )}
    </>
  );
}

function UssdView({ ussdStep, setUssdStep, ussdInput, setUssdInput, scamResult, onCheckMessage, onNavigate }) {
  return (
    <div className="ussd-page">
      <button className="back-button" onClick={() => onNavigate("scamCheck")}>← Back to Safety Check</button>

      <div className="ussd-header">
        <div className="ussd-large-icon">📱</div>
        <h1>Offline Safety Check</h1>
        <p>Check suspicious messages without using internet data.</p>
      </div>

      <div className="phone-container">
        <div className="phone-screen">
          <div className="network-bar">
            <span>MTN</span>
            <span>▮▮▮▮</span>
          </div>

          {ussdStep === "menu" && (
            <>
              <div className="ussd-title">DIGITALBRIDGE</div>
              <p>Welcome to Safety Check.</p>
              <p>Choose an option:</p>
              <div className="ussd-menu">
                <p>1. Check a message</p>
                <p>2. Safety tips</p>
                <p>3. Exit</p>
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={ussdInput}
                onChange={(e) => setUssdInput(e.target.value)}
                placeholder="Enter option"
              />
              <button onClick={() => {
                if (ussdInput === "1") setUssdStep("message");
                else if (ussdInput === "2") setUssdStep("tips");
                else if (ussdInput === "3") setUssdStep("exit");
                setUssdInput("");
              }}>
                Send
              </button>
            </>
          )}

          {ussdStep === "message" && (
            <>
              <div className="ussd-title">CHECK MESSAGE</div>
              <p>Enter the suspicious message:</p>
              <textarea
                value={ussdInput}
                onChange={(e) => setUssdInput(e.target.value)}
                placeholder="Type message here..."
                rows="5"
              />
              <button onClick={onCheckMessage}>Check</button>
              <button className="ussd-secondary" onClick={() => { setUssdStep("menu"); setUssdInput(""); }}>
                Back
              </button>
            </>
          )}

          {ussdStep === "tips" && (
            <>
              <div className="ussd-title">SAFETY TIPS</div>
              <p>• Never share your PIN or OTP.</p>
              <p>• Don't send money to strangers.</p>
              <p>• Verify suspicious messages.</p>
              <p>• Don't click unknown links.</p>
              <button onClick={() => { setUssdStep("menu"); setUssdInput(""); }}>Back</button>
            </>
          )}

          {ussdStep === "result" && (
            <>
              <div className="ussd-title">RESULT</div>
              {scamResult ? (
                <>
                  <p>Risk: <strong>{scamResult.riskLevel}</strong></p>
                  <p>Score: {scamResult.score}/100</p>
                  <p>Type:<br />{scamResult.scamCategory}</p>
                  <p>Warning signs:</p>
                  {scamResult.warningSigns.slice(0, 3).map((w, idx) => (
                    <p key={idx}>{w.icon} {w.title}</p>
                  ))}
                  <p>🛡️ Never share your PIN, OTP, passwords, or send money because of an unexpected message.</p>
                </>
              ) : (
                <p>Unable to analyze the message.</p>
              )}
              <button onClick={() => onNavigate("scamCheck")}>Finish</button>
            </>
          )}

          {ussdStep === "exit" && (
            <>
              <div className="ussd-title">DIGITALBRIDGE</div>
              <p>Thank you for using Safety Check.</p>
              <p>Stay safe online.</p>
              <button onClick={() => onNavigate("scamCheck")}>Close</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [page, setPage] = useState("home");
  const [initialPrompt, setInitialPrompt] = useState("");

  // Scam State
  const [scamMessage, setScamMessage] = useState("");
  const [scamResult, setScamResult] = useState(null);
  const [isCheckingScam, setIsCheckingScam] = useState(false);

  // USSD State
  const [ussdStep, setUssdStep] = useState("menu");
  const [ussdInput, setUssdInput] = useState("");

  const openAssistant = (promptText = "") => {
    setInitialPrompt(promptText);
    setPage("assistant");
  };

  const handleAnalyzeScam = (messageText) => {
    if (!messageText.trim()) return;

    setIsCheckingScam(true);
    setScamResult(null);

    const result = analyzeMessageContent(messageText);

    setTimeout(() => {
      setScamResult(result);
      setIsCheckingScam(false);
    }, 900);
  };

  const handleUSSDCheck = () => {
    if (!ussdInput.trim()) return;
    const msg = ussdInput;
    setScamMessage(msg);
    handleAnalyzeScam(msg);
    setUssdInput("");
    setTimeout(() => setUssdStep("result"), 950);
  };

  return (
    <div className="app">
      {page === "home" && (
        <HomeView onNavigate={setPage} onOpenAssistant={openAssistant} />
      )}

      {page === "scamCheck" && (
        <ScamCheckView
          scamMessage={scamMessage}
          setScamMessage={setScamMessage}
          scamResult={scamResult}
          setScamResult={setScamResult}
          isCheckingScam={isCheckingScam}
          onAnalyze={handleAnalyzeScam}
          onNavigate={(target) => {
            if (target === "ussd") {
              setUssdStep("menu");
              setUssdInput("");
            }
            setPage(target);
          }}
        />
      )}

      {page === "ussd" && (
        <UssdView
          ussdStep={ussdStep}
          setUssdStep={setUssdStep}
          ussdInput={ussdInput}
          setUssdInput={setUssdInput}
          scamResult={scamResult}
          onCheckMessage={handleUSSDCheck}
          onNavigate={setPage}
        />
      )}

      {page === "learn" && (
        <>
          <button className="back-button" onClick={() => setPage("home")}>← Back</button>
          <h1>📚 Learn Digital Skills</h1>
          <p>Choose a topic you would like to learn.</p>
          {Object.entries(LESSONS_DATA).map(([key, lesson]) => (
            <button key={key} className="lesson-button" onClick={() => setPage(key)}>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </button>
          ))}
        </>
      )}

      {LESSONS_DATA[page] && (
        <LessonView lesson={LESSONS_DATA[page]} onBack={() => setPage("learn")} />
      )}

      {page === "assistant" && (
        <>
          <button className="back-button" onClick={() => setPage("home")}>
            ← Back
          </button>

          <h1>🤖 Digital Safety Assistant</h1>
          <p>Ask any tech question or paste a suspicious message to check for scams.</p>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            {/* Embedded Inline Mode */}
            <ChatAssistant initialPrompt={initialPrompt} isEmbedded={true} />
          </div>
        </>
      )}

      {/* Persistent Floating Widget (Hidden when on dedicated assistant page) */}
      {page !== "assistant" && <ChatAssistant />}
    </div>
  );
}