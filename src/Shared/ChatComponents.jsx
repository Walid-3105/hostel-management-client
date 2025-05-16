import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Backend request failed");

      const data = await response.json();
      const botMessage = {
        text: data.reply || "Sorry, I didn’t understand.",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Could not connect to the server.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="relative z-50">
      {/* Ask AI Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-xl flex flex-col items-center justify-center"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -12, 0],
          transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        }}
      >
        <span className="text-base font-bold">Ask AI</span>
        <span className="text-xs opacity-85">Start chatting</span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-40"
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Chat Modal */}
            <motion.div
              className="fixed bottom-24 right-8 w-[400px] max-w-[95vw] rounded-3xl shadow-2xl flex flex-col h-[450px] bg-gradient-to-b from-white/95 to-gray-100/95 backdrop-blur-xl z-50 overflow-hidden ring-1 ring-indigo-200/50"
              initial={{ y: 150, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 150, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-t-3xl flex justify-between items-center">
                <span className="font-semibold text-lg">
                  Hostel AI Assistant
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div
                className="flex-1 p-6 overflow-y-auto flex flex-col gap-4"
                ref={chatBodyRef}
              >
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                        msg.isUser
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white self-end"
                          : "bg-white/80 text-gray-800 self-start border border-gray-200"
                      }`}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: index * 0.1,
                      }}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      className="max-w-[80%] p-4 rounded-2xl bg-white/80 text-gray-600 self-start border border-gray-200 flex items-center gap-2"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 30, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span>Typing</span>
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: 0,
                        }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: 0.2,
                        }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          delay: 0.4,
                        }}
                      >
                        .
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex p-5 bg-white/90 border-t border-gray-200 shadow-inner">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/95 shadow-sm"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(79, 70, 229, 0.3)",
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  onClick={sendMessage}
                  className="ml-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
