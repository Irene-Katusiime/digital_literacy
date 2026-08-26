import React, { useState, useRef, useEffect } from 'react';

export default function ChatAssistant({ initialPrompt = "", isEmbedded = false }) {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I am Digital Buddy. Ask me any questions about technology or paste a suspicious message to check for scams!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Server error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: last.content + chunk }];
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Unable to connect to server. Make sure node server.js is running.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Outer positioning based on mode
  const containerStyle = isEmbedded
    ? { width: '100%', maxWidth: '600px', height: '520px' }
    : { position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 };

  return (
    <div style={containerStyle}>
      {!isOpen && !isEmbedded && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            padding: '12px 20px', 
            borderRadius: '25px', 
            background: '#0284c7', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}
        >
          💬 Ask Digital Buddy
        </button>
      )}

      {isOpen && (
        <div style={{ 
          width: '100%', 
          height: isEmbedded ? '100%' : '500px', 
          width: isEmbedded ? '100%' : '350px',
          background: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {/* Header */}
          <div style={{ 
            background: '#0284c7', 
            color: '#fff', 
            padding: '12px 16px', 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center' 
          }}>
            <span style={{ fontWeight: 'bold' }}>Digital Buddy AI</span>
            {!isEmbedded && (
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#0284c7' : '#f1f5f9',
                  color: msg.role === 'user' ? '#fff' : '#0f172a',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '82%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {msg.content || (isLoading && i === messages.length - 1 ? "Thinking..." : "")}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #e2e8f0', padding: '8px', background: '#fff' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or paste text..."
              disabled={isLoading}
              style={{ flex: 1, border: 'none', padding: '8px', outline: 'none', fontSize: '14px' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}