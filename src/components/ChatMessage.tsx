export default function ChatMessage({ role, content }: { role: string; content: string }) {
  return (
    <div className={role === "user" ? "user-msg" : "bot-msg"}>
      <div className="msg-content">{content}</div>
    </div>
  );
}