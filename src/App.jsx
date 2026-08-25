import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);

  // ================= USSD STATES =================
  const [ussdPage, setUssdPage] = useState("dial");
  const [ussdCode, setUssdCode] = useState("");
  const [ussdInput, setUssdInput] = useState("");

  // ================= CYBERSECURITY QUIZ =================
  const questions = [
    {
      question: "Should you share your mobile money PIN with someone?",
      options: ["Yes", "No"],
      correct: "No",
    },
    {
      question: "What should you do before clicking a suspicious link?",
      options: [
        "Click it immediately",
        "Check and verify the link",
        "Share it with everyone",
      ],
      correct: "Check and verify the link",
    },
    {
      question: "Which password is stronger?",
      options: ["123456", "password", "MyP@ssw0rd!2026"],
      correct: "MyP@ssw0rd!2026",
    },
  ];

  // ================= EMAIL QUIZ =================
  const emailQuestions = [
    {
      question: "What is email mainly used for?",
      options: [
        "Sending and receiving messages",
        "Cooking food",
        "Taking photos",
        "Charging a phone",
      ],
      correct: "Sending and receiving messages",
    },
    {
      question:
        "Which button is commonly used to start writing a new email?",
      options: ["Delete", "Compose", "Refresh", "Download"],
      correct: "Compose",
    },
    {
      question:
        "What should you do if you receive an email from an unknown sender with a suspicious attachment?",
      options: [
        "Open the attachment immediately",
        "Forward it to everyone",
        "Be careful and avoid opening it",
        "Reply with your password",
      ],
      correct: "Be careful and avoid opening it",
    },
  ];

  // ================= AI QUIZ =================
  const aiQuestions = [
    {
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automatic Internet",
        "Advanced Information",
        "Artificial Internet",
      ],
      correct: "Artificial Intelligence",
    },
    {
      question: "What can AI help you do?",
      options: [
        "Answer questions and support learning",
        "Share your PIN safely",
        "Guarantee that all information is correct",
        "Replace the internet",
      ],
      correct: "Answer questions and support learning",
    },
    {
      question: "What should you do with important information from AI?",
      options: [
        "Believe everything without checking",
        "Verify the information",
        "Immediately share your password",
        "Delete your phone",
      ],
      correct: "Verify the information",
    },
  ];

  return (
    <div className="app">

      {/* =====================================================
          HOME PAGE
      ===================================================== */}
      {page === "home" ? (
        <>
          <h1>Digital Buddy</h1>

          <p className="subtitle">
            Learn, stay safe, and understand technology.
          </p>

          <h2>What would you like to do?</h2>

          <div className="cards">

            {/* LEARN DIGITAL SKILLS */}
            <button
              className="card"
              onClick={() => setPage("learn")}
            >
              <div className="icon">📚</div>

              <h3>Learn Digital Skills</h3>

              <p>
                Learn how to use technology safely.
              </p>
            </button>


            {/* CHECK FOR SCAMS - NOT FUNCTIONAL YET */}
            <button className="card">
              <div className="icon">🛡️</div>

              <h3>Check for Scams</h3>

              <p>
                Learn how to identify suspicious messages.
              </p>
            </button>


            {/* DIGITAL ASSISTANT - NOT FUNCTIONAL YET */}
            <button className="card">
              <div className="icon">🤖</div>

              <h3>Ask Digital Assistant</h3>

              <p>
                Ask questions about technology.
              </p>
            </button>


            {/* USSD */}
            <button
              className="card"
              onClick={() => {
                setUssdCode("");
                setUssdInput("");
                setUssdPage("dial");
                setPage("ussd");
              }}
            >
              <div className="icon">📱</div>

              <h3>Use USSD</h3>

              <p>
                Dial *122# to access Digital Buddy.
              </p>
            </button>

          </div>
        </>

      ) : page === "learn" ? (

        /* =====================================================
           LEARN DIGITAL SKILLS
        ===================================================== */
        <>
          <button onClick={() => setPage("home")}>
            ← Back
          </button>

          <h1>📚 Learn Digital Skills</h1>

          <p>
            Choose a topic you would like to learn.
          </p>


          {/* CYBERSECURITY */}
          <button
            className="lesson-button"
            onClick={() => setPage("cybersecurity")}
          >
            <h3>🔐 Cybersecurity</h3>

            <p>
              Learn how to protect your accounts and personal information.
            </p>
          </button>


          {/* EMAIL */}
          <button
            className="lesson-button"
            onClick={() => setPage("email")}
          >
            <h3>📧 Email</h3>

            <p>
              Learn how to create and use email safely.
            </p>
          </button>


          {/* AI */}
          <button
            className="lesson-button"
            onClick={() => setPage("ai")}
          >
            <h3>🤖 Artificial Intelligence</h3>

            <p>
              Learn what AI is and how to use it safely and effectively.
            </p>
          </button>
        </>

      ) : page === "cybersecurity" ? (

        /* =====================================================
           CYBERSECURITY
        ===================================================== */
        <>
          <button onClick={() => setPage("learn")}>
            ← Back
          </button>

          <h1>🔐 Cybersecurity</h1>

          <p>
            Learn how to protect yourself when using technology and the
            internet.
          </p>

          <h2>How to Stay Safe Online</h2>

          <h3>🔑 Use Strong Passwords</h3>

          <p>
            Create passwords that are difficult for other people to guess.
            Avoid using simple information such as your name or birthday.
          </p>

          <h3>🚫 Don't Share Your PIN</h3>

          <p>
            Never share your mobile money PIN, bank PIN, or password with
            anyone.
          </p>

          <h3>🔗 Be Careful With Links</h3>

          <p>
            Don't click suspicious links sent through SMS, WhatsApp, or email.
          </p>

          <h3>👤 Verify People</h3>

          <p>
            Before sending money or personal information, make sure you know
            who you are dealing with.
          </p>

          <h2>🎯 Ready to Test Yourself?</h2>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("quiz");
            }}
          >
            Take Quiz
          </button>
        </>

      ) : page === "email" ? (

        /* =====================================================
           EMAIL
        ===================================================== */
        <>
          <button onClick={() => setPage("learn")}>
            ← Back
          </button>

          <h1>📧 Email</h1>

          <p>
            Learn how to use email to communicate and share information
            online.
          </p>

          <h2>How to Use Email</h2>

          <h3>📩 Sending an Email</h3>

          <p>
            Open your email app, click Compose, enter the recipient's email
            address, write your message, and click Send.
          </p>

          <h3>📎 Attaching a File</h3>

          <p>
            You can attach photos, documents, and other files to an email.
            Click the attachment icon and choose the file you want to send.
          </p>

          <h3>👤 Check the Recipient</h3>

          <p>
            Always check that you have entered the correct email address
            before sending your message.
          </p>

          <h3>🔒 Keep Your Email Safe</h3>

          <p>
            Never share your email password with other people. Be careful
            when opening links or attachments from unknown senders.
          </p>

          <h2>🎯 Ready to Test Yourself?</h2>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("emailQuiz");
            }}
          >
            Take Email Quiz
          </button>
        </>

      ) : page === "ai" ? (

        /* =====================================================
           ARTIFICIAL INTELLIGENCE
        ===================================================== */
        <>
          <button onClick={() => setPage("learn")}>
            ← Back
          </button>

          <h1>🤖 Artificial Intelligence</h1>

          <p>
            Artificial Intelligence, also called AI, is technology that can
            perform tasks that normally require human intelligence.
          </p>

          <h2>What Can AI Do?</h2>

          <h3>💬 Answer Questions</h3>

          <p>
            AI can help answer questions and explain different topics.
          </p>

          <h3>📚 Help With Learning</h3>

          <p>
            AI can help students understand difficult topics, practise skills,
            and get ideas.
          </p>

          <h3>✍️ Help Create Content</h3>

          <p>
            AI can help write messages, stories, summaries, and other content.
          </p>

          <h3>⚠️ AI Can Make Mistakes</h3>

          <p>
            AI does not always give correct information. Always verify
            important information before using it.
          </p>

          <h3>🔒 Protect Your Personal Information</h3>

          <p>
            Do not share your passwords, PINs, bank details, or other
            sensitive personal information with AI tools.
          </p>

          <h2>🎯 Ready to Test Yourself?</h2>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("aiQuiz");
            }}
          >
            Take AI Quiz
          </button>
        </>

      ) : page === "quiz" ? (

        /* =====================================================
           CYBERSECURITY QUIZ
        ===================================================== */
        <>
          <button onClick={() => setPage("cybersecurity")}>
            ← Back
          </button>

          <h1>🎯 Cybersecurity Quiz</h1>

          <h2>
            Question {questionNumber + 1} of {questions.length}
          </h2>

          <h3>
            {questions[questionNumber].question}
          </h3>

          {questions[questionNumber].options.map((option) => (
            <button
              key={option}
              className="quiz-option"
              onClick={() => {
                if (
                  option === questions[questionNumber].correct
                ) {
                  setScore(
                    (previousScore) => previousScore + 1
                  );
                }

                if (
                  questionNumber < questions.length - 1
                ) {
                  setQuestionNumber(
                    (previousQuestion) =>
                      previousQuestion + 1
                  );
                } else {
                  setPage("result");
                }
              }}
            >
              {option}
            </button>
          ))}
        </>

      ) : page === "emailQuiz" ? (

        /* =====================================================
           EMAIL QUIZ
        ===================================================== */
        <>
          <button onClick={() => setPage("email")}>
            ← Back
          </button>

          <h1>🎯 Email Quiz</h1>

          <h2>
            Question {questionNumber + 1} of{" "}
            {emailQuestions.length}
          </h2>

          <h3>
            {emailQuestions[questionNumber].question}
          </h3>

          {emailQuestions[questionNumber].options.map(
            (option) => (
              <button
                key={option}
                className="quiz-option"
                onClick={() => {
                  if (
                    option ===
                    emailQuestions[questionNumber].correct
                  ) {
                    setScore(
                      (previousScore) =>
                        previousScore + 1
                    );
                  }

                  if (
                    questionNumber <
                    emailQuestions.length - 1
                  ) {
                    setQuestionNumber(
                      (previousQuestion) =>
                        previousQuestion + 1
                    );
                  } else {
                    setPage("emailResult");
                  }
                }}
              >
                {option}
              </button>
            )
          )}
        </>

      ) : page === "aiQuiz" ? (

        /* =====================================================
           AI QUIZ
        ===================================================== */
        <>
          <button onClick={() => setPage("ai")}>
            ← Back
          </button>

          <h1>🎯 Artificial Intelligence Quiz</h1>

          <h2>
            Question {questionNumber + 1} of{" "}
            {aiQuestions.length}
          </h2>

          <h3>
            {aiQuestions[questionNumber].question}
          </h3>

          {aiQuestions[questionNumber].options.map(
            (option) => (
              <button
                key={option}
                className="quiz-option"
                onClick={() => {
                  if (
                    option ===
                    aiQuestions[questionNumber].correct
                  ) {
                    setScore(
                      (previousScore) =>
                        previousScore + 1
                    );
                  }

                  if (
                    questionNumber <
                    aiQuestions.length - 1
                  ) {
                    setQuestionNumber(
                      (previousQuestion) =>
                        previousQuestion + 1
                    );
                  } else {
                    setPage("aiResult");
                  }
                }}
              >
                {option}
              </button>
            )
          )}
        </>

      ) : page === "emailResult" ? (

        /* =====================================================
           EMAIL RESULT
        ===================================================== */
        <>
          <h1>🏆 Email Quiz Complete!</h1>

          <h2>
            Your Score: {score} / {emailQuestions.length}
          </h2>

          <p>
            Great job! Keep learning how to use email safely.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("learn");
            }}
          >
            Back to Digital Skills
          </button>
        </>

      ) : page === "aiResult" ? (

        /* =====================================================
           AI RESULT
        ===================================================== */
        <>
          <h1>🏆 AI Quiz Complete!</h1>

          <h2>
            Your Score: {score} / {aiQuestions.length}
          </h2>

          <p>
            Great job! Remember to use AI responsibly and always
            verify important information.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("learn");
            }}
          >
            Back to Digital Skills
          </button>
        </>

      ) : page === "ussd" ? (

        /* =====================================================
           USSD
        ===================================================== */
        <>
          <button
            onClick={() => {
              setUssdCode("");
              setUssdInput("");
              setUssdPage("dial");
              setPage("home");
            }}
          >
            ← Back
          </button>

          <h1>📱 Digital Buddy USSD</h1>

          <div className="ussd-box">

            {/* ================= DIAL SCREEN ================= */}
            {ussdPage === "dial" ? (
              <>
                <h2>Dial Digital Buddy</h2>

                <p>Enter the USSD code below:</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Example: *122#"
                  value={ussdCode}
                  onChange={(e) =>
                    setUssdCode(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdCode.trim() === "*122#") {
                      setUssdInput("");
                      setUssdPage("menu");
                    } else {
                      alert(
                        "Invalid code. Please dial *122#"
                      );
                    }
                  }}
                >
                  📞 Dial
                </button>
              </>

            ) : ussdPage === "menu" ? (

              /* ================= MAIN USSD MENU ================= */
              <>
                <h2>Welcome to Digital Buddy</h2>

                <p>
                  Select an option by entering its number:
                </p>

                <p>1. Learn Digital Skills</p>
                <p>2. Digital Safety Tips</p>
                <p>3. About Digital Buddy</p>
                <p>0. Exit</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 1, 2, 3 or 0"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "1") {
                      setUssdPage("learn");
                      setUssdInput("");

                    } else if (ussdInput === "2") {
                      setUssdPage("safety");
                      setUssdInput("");

                    } else if (ussdInput === "3") {
                      setUssdPage("about");
                      setUssdInput("");

                    } else if (ussdInput === "0") {
                      setUssdCode("");
                      setUssdInput("");
                      setUssdPage("dial");
                      setPage("home");

                    } else {
                      alert(
                        "Invalid option. Please enter 1, 2, 3 or 0."
                      );
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : ussdPage === "learn" ? (

              /* ================= LEARN USSD MENU ================= */
              <>
                <h2>📚 Learn Digital Skills</h2>

                <p>Select a topic:</p>

                <p>1. Cybersecurity</p>
                <p>2. Email</p>
                <p>3. Artificial Intelligence</p>
                <p>0. Back</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 1, 2, 3 or 0"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "1") {
                      setUssdPage("ussdCybersecurity");
                      setUssdInput("");

                    } else if (ussdInput === "2") {
                      setUssdPage("ussdEmail");
                      setUssdInput("");

                    } else if (ussdInput === "3") {
                      setUssdPage("ussdAI");
                      setUssdInput("");

                    } else if (ussdInput === "0") {
                      setUssdPage("menu");
                      setUssdInput("");

                    } else {
                      alert(
                        "Invalid option. Please enter 1, 2, 3 or 0."
                      );
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : ussdPage === "ussdCybersecurity" ? (

              /* ================= USSD CYBERSECURITY ================= */
              <>
                <h2>🔐 Cybersecurity</h2>

                <p>1. Use strong passwords.</p>
                <p>2. Never share your PIN.</p>
                <p>3. Do not click suspicious links.</p>
                <p>4. Verify people before sending money.</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 0 to go back"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "0") {
                      setUssdPage("learn");
                      setUssdInput("");
                    } else {
                      alert("Enter 0 to go back.");
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : ussdPage === "ussdEmail" ? (

              /* ================= USSD EMAIL ================= */
              <>
                <h2>📧 Email</h2>

                <p>
                  1. Email helps you send and receive messages.
                </p>

                <p>
                  2. Check the recipient before sending.
                </p>

                <p>
                  3. Do not open suspicious attachments.
                </p>

                <p>
                  4. Never share your email password.
                </p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 0 to go back"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "0") {
                      setUssdPage("learn");
                      setUssdInput("");
                    } else {
                      alert("Enter 0 to go back.");
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : ussdPage === "ussdAI" ? (

              /* ================= USSD AI ================= */
              <>
                <h2>🤖 Artificial Intelligence</h2>

                <p>1. AI can answer questions.</p>
                <p>2. AI can support learning.</p>
                <p>3. AI can sometimes make mistakes.</p>
                <p>4. Always verify important information.</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 0 to go back"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "0") {
                      setUssdPage("learn");
                      setUssdInput("");
                    } else {
                      alert("Enter 0 to go back.");
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : ussdPage === "safety" ? (

              /* ================= USSD SAFETY ================= */
              <>
                <h2>🛡️ Digital Safety Tips</h2>

                <p>1. Never share your PIN or password.</p>
                <p>2. Avoid suspicious links.</p>
                <p>3. Verify people before sending money.</p>
                <p>4. Protect your personal information.</p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 0 to go back"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "0") {
                      setUssdPage("menu");
                      setUssdInput("");
                    } else {
                      alert("Enter 0 to go back.");
                    }
                  }}
                >
                  Continue
                </button>
              </>

            ) : (

              /* ================= USSD ABOUT ================= */
              <>
                <h2>ℹ️ About Digital Buddy</h2>

                <p>
                  Digital Buddy helps people learn digital skills
                  and stay safe when using technology.
                </p>

                <p>
                  The USSD feature can help make digital learning
                  accessible even to people without smartphones.
                </p>

                <input
                  type="text"
                  className="ussd-input"
                  placeholder="Enter 0 to go back"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(e.target.value)
                  }
                />

                <button
                  className="primary-button"
                  onClick={() => {
                    if (ussdInput === "0") {
                      setUssdPage("menu");
                      setUssdInput("");
                    } else {
                      alert("Enter 0 to go back.");
                    }
                  }}
                >
                  Continue
                </button>
              </>
            )}

          </div>
        </>

      ) : (

        /* =====================================================
           CYBERSECURITY RESULT
        ===================================================== */
        <>
          <h1>🏆 Quiz Complete!</h1>

          <h2>
            Your Score: {score} / {questions.length}
          </h2>

          <p>
            Great job! Keep learning how to stay safe online.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              setQuestionNumber(0);
              setScore(0);
              setPage("home");
            }}
          >
            Back to Home
          </button>
        </>
      )}

    </div>
  );
}

export default App;