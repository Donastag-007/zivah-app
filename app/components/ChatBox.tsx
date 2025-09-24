'use client';

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setChat([...chat, "🧑: " + userMsg]);
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    });

    const data = await res.json();
    setChat((prev) => [...prev, "🤖 Zivah: " + data.reply]);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        {chat.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        {loading && <p>🤖 Zivah is typing...</p>}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Zivah something..."
        style={{ width: "80%", marginRight: "1rem" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}