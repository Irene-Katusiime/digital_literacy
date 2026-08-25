import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">

      {/* HOME PAGE */}
      {page === "home" ? (
        <>
          <h1>Digital Buddy</h1>

          <p className="subtitle">
            Learn, stay safe, and understand technology.
          </p>

          <h2>What would you like to do?</h2>

          <div className="cards">

            <button
              className="card"
              onClick={() => setPage("learn")}
            >
              <div className="icon">📚</div>
              <h3>Learn Digital Skills</h3>
              <p>Learn how to use technology safely.</p>
            </button>

            <button className="card">
              <div className="icon">🛡️</div>
              <h3>Check for Scams</h3>
              <p>Check suspicious messages.</p>
            </button>

            <button className="card">
              <div className="icon">🤖</div>
              <h3>Ask Digital Assistant</h3>
              <p>Ask questions about technology.</p>
            </button>

          </div>
        </>

      ) : page === "learn" ? (

        /* LEARN DIGITAL SKILLS PAGE */
        <>
          <button onClick={() => setPage("home")}>
            ← Back
          </button>

          <h1>📚 Learn Digital Skills</h1>

          <p>
            Choose a topic you would like to learn.
          </p>

          <button
            className="lesson-button"
            onClick={() => setPage("cybersecurity")}
          >
            <h3>🔐 Cybersecurity</h3>
            <p>
              Learn how to protect your accounts and personal information.
            </p>
          </button>

          <h3>📧 Email</h3>

          <p>
            Learn how to create and use email.
          </p>

          <h3>🤖 Artificial Intelligence</h3>

          <p>
            Learn how to use AI safely and effectively.
          </p>
        </>

      ) : (

        /* CYBERSECURITY PAGE */
        <>
          <button onClick={() => setPage("learn")}>
            ← Back
          </button>

          <h1>🔐 Cybersecurity</h1>

          <p>
            Learn how to protect yourself when using technology and the internet.
          </p>

          <h2>How to Stay Safe Online</h2>

          <h3>🔑 Use Strong Passwords</h3>

          <p>
            Create passwords that are difficult for other people to guess.
            Avoid using simple information such as your name or birthday.
          </p>

          <h3>🚫 Don't Share Your PIN</h3>

          <p>
            Never share your mobile money PIN, bank PIN, or password with anyone.
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

          <button className="primary-button">
            Take Quiz
          </button>
        </>
      )}

    </div>
  );
}

export default App;