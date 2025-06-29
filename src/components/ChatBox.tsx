import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Welcome Love, How do you feel today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }), // ← make sure we send full array
    });

    const data = await response.json();
    console.log("🟢 API said:", data);

    if (data.reply) {
      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]); // ← use updater pattern again
    } else {
      setMessages((prev) => [...prev, { role: "assistant", content: "SpiñO gave no reply." }]);
    }
  } catch (error) {
    console.error("❌", error);
    setMessages((prev) => [...prev, { role: "assistant", content: "SpiñO failed to reply." }]);
  }
};


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-end gap-2">
        <textarea
          rows={3}
          className="flex-1 border p-3 rounded-md shadow resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your reflection and press Enter to send..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
