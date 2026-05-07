"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";

type Message = {
    id: string;
    text: string;
    sender: "bot" | "user";
    options?: string[];
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm the Cruze Marine assistant. How can I help you today? You can ask about crew manning, college admissions, STCW courses, or passports.",
            sender: "bot",
            options: ["Crew Manning", "College Admission", "STCW Courses", "Passport Help"],
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting. Please reach out via WhatsApp.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionClick = (option: string) => {
        handleSend(option);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: isOpen ? "var(--color-surface)" : "var(--color-gold)",
                    color: isOpen ? "var(--color-gold)" : "var(--color-ink)",
                    border: isOpen ? "1px solid var(--color-rule)" : "none",
                }}
                className="fixed bottom-[88px] right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-none flex items-center justify-center transition-colors shadow-2xl"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            background: "var(--color-ink)",
                            border: "1px solid var(--color-rule)",
                        }}
                        className="fixed bottom-[160px] right-6 md:bottom-28 md:right-8 z-50 w-[90vw] md:w-[360px] h-[500px] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center gap-3 border-b border-[var(--color-rule)]" style={{ background: "var(--color-surface)" }}>
                            <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-rule)]" style={{ background: "var(--color-ink)", color: "var(--color-gold)" }}>
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm tracking-widest uppercase font-medium" style={{ color: "var(--color-ivory)" }}>Cruze AI</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 bg-[var(--color-gold)] animate-pulse" />
                                    <span className="font-sans text-[10px] uppercase tracking-wider" style={{ color: "var(--color-smoke)" }}>Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-serif text-[15px] leading-relaxed hide-scrollbar" style={{ background: "var(--color-ink)" }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        style={{
                                            background: msg.sender === "user" ? "var(--color-gold)" : "var(--color-surface)",
                                            color: msg.sender === "user" ? "var(--color-ink)" : "var(--color-ivory)",
                                            border: msg.sender === "user" ? "none" : "1px solid var(--color-rule)",
                                        }}
                                        className="max-w-[85%] p-4"
                                    >
                                        {msg.text}
                                    </div>

                                    {/* Options Chips */}
                                    {msg.sender === "bot" && msg.options && (
                                        <div className="flex flex-col gap-2 mt-3 w-full max-w-[85%]">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="w-full text-left p-3 font-sans text-[11px] uppercase tracking-widest transition-colors"
                                                    style={{
                                                        background: "transparent",
                                                        border: "1px solid var(--color-rule)",
                                                        color: "var(--color-gold)",
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-start">
                                    <div className="p-4 flex items-center gap-3 border border-[var(--color-rule)]" style={{ background: "var(--color-surface)" }}>
                                        <Loader2 size={16} className="animate-spin" style={{ color: "var(--color-gold)" }} />
                                        <span className="font-sans text-[11px] uppercase tracking-widest" style={{ color: "var(--color-smoke)" }}>Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-[var(--color-rule)]" style={{ background: "var(--color-surface)" }}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(input);
                                }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your query..."
                                    className="w-full pl-4 pr-12 py-3 outline-none font-serif text-[16px] border border-[var(--color-rule)]"
                                    style={{
                                        background: "var(--color-ink)",
                                        color: "var(--color-ivory)",
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center transition-colors disabled:opacity-50"
                                    style={{ color: "var(--color-gold)" }}
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
