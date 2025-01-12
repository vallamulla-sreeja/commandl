'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    BeakerIcon,
    ChatBubbleBottomCenterTextIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/solid';
import Image from 'next/image';

interface ProjectCard {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
    techStack: string[];
}

interface ChatMessage {
    text: string;
    isUser: boolean;
}

const ProjectDashboard = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [projectSuggestion, setProjectSuggestion] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showStartButton, setShowStartButton] = useState(false);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const projectCards: ProjectCard[] = [
        {
            title: "Real-time Chat Platform",
            description: "A scalable chat application with real-time messaging, file sharing, and end-to-end encryption.",
            icon: ChatBubbleBottomCenterTextIcon,
            color: "bg-[#ff4b4b]",
            image: "/images/software_development.png",
            techStack: ["Node.js", "Socket.io", "React", "MongoDB"]
        },
        {
            title: "AI-Powered Health Assistant",
            description: "A sophisticated healthcare platform using machine learning to provide personalized health recommendations and symptom analysis.",
            icon: BeakerIcon,
            color: "bg-[#1cb0f6]",
            image: "/images/ai_ml.png",
            techStack: ["Python", "TensorFlow", "React", "FastAPI"]
        },
        {
            title: "E-commerce Analytics Dashboard",
            description: "Advanced analytics platform for e-commerce businesses with real-time sales tracking and inventory management.",
            icon: ShoppingBagIcon,
            color: "bg-[#ffc800]",
            image: "/images/ds.png",
            techStack: ["Python", "Django", "React", "PostgreSQL"]
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectSuggestion.trim()) {
            setShowChat(true);
            const userMessage = { text: `${projectSuggestion}`, isUser: true };
            
            // Set initial messages including both user input and AI response
            setChatMessages([
                userMessage,
                { 
                    text: "That sounds interesting! Which tech stack would you prefer to use?",
                    isUser: false 
                },
                { 
                    text: "1. MERN (MongoDB, Express.js, React, Node.js)\n2. LAMP (Linux, Apache, MySQL, PHP)\n3. Python/Django with React\n4. Custom stack",
                    isUser: false 
                }
            ]);
            
            setProjectSuggestion('');
        }
    };

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatInput.trim()) {
            const userMessage = { text: chatInput, isUser: true };
            setChatMessages(prev => [...prev, userMessage]);
            
            // Add a small delay before AI response
            setTimeout(() => {
                const aiResponse = { text: "", isUser: false };
                
                // Check if the last message was about tech stack selection
                const lastAIMessage = chatMessages.filter(msg => !msg.isUser).pop();
                
                if (lastAIMessage?.text.includes("tech stack would you prefer")) {
                    if (chatInput.includes("1") || chatInput.toLowerCase().includes("mern")) {
                        aiResponse.text = "Great choice! MERN stack is excellent for real-time applications. What features would you like to include in your project?";
                    } else if (chatInput.includes("2") || chatInput.toLowerCase().includes("lamp")) {
                        aiResponse.text = "LAMP stack is a solid choice for traditional web applications. What specific functionality are you looking to implement?";
                    } else if (chatInput.includes("3") || chatInput.toLowerCase().includes("django")) {
                        aiResponse.text = "Python/Django with React is perfect for data-heavy applications. What kind of data will your application be handling?";
                    } else if (chatInput.includes("4") || chatInput.toLowerCase().includes("custom")) {
                        aiResponse.text = "Tell me more about your custom stack preference. What technologies would you like to use?";
                    } else {
                        aiResponse.text = "Could you elaborate more on that? I'm here to help you plan your project effectively.";
                    }
                } else if (lastAIMessage && (
                    lastAIMessage.text.includes("features") || 
                    lastAIMessage.text.includes("functionality") || 
                    lastAIMessage.text.includes("data") || 
                    lastAIMessage.text.includes("technologies")
                )) {
                    aiResponse.text = "I've prepared a guided development path in CommandL for your project:\n\n1. Environment Setup\n   • Project initialization\n   • Dependencies installation\n   • Development tools configuration\n\n2. UI Development\n   • Component architecture\n   • User interface implementation\n   • Responsive design\n\n3. Backend & Database\n   • API endpoints\n   • Database schema\n   • Integration testing\n\nReady to begin your development journey?";
                    setShowStartButton(true);
                } else {
                    aiResponse.text = "I understand. Could you tell me more about what you'd like to achieve with this project?";
                }
                
                setChatMessages(prev => [...prev, aiResponse]);
            }, 500);
            
            setChatInput('');
        }
    };

    const handleCardClick = (card: ProjectCard) => {
        setShowChat(true);
        const userMessage = { text: `I want to create a project similar to: ${card.title}`, isUser: true };
        setChatMessages([userMessage]);
        
        setTimeout(() => {
            const aiResponse = { 
                text: `Great choice! This project uses ${card.techStack.join(", ")} as its tech stack. Would you like to:\n1. Use the same tech stack\n2. Explore alternative technologies\n3. Customize the tech stack`, 
                isUser: false 
            };
            setChatMessages(prev => [...prev, aiResponse]);
        }, 500);
    };

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-[#23272F]">
                        <span className="bg-[#efccff] text-black px-4 rounded-md">Project Selection</span>
                    </h1>

                    <div className="mb-4">
                        {!showChat && (
                            <h2 className="text-2xl font-bold text-gray-900">
                                Select a project or describe your idea
                            </h2>
                        )}
                    </div>
                </motion.div>

                {!showChat ? (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projectCards.map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                onClick={() => handleCardClick(card)}
                                onHoverStart={() => setHoveredCard(card.title)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className={`
                                    relative overflow-hidden rounded-2xl
                                    transform transition-all duration-300 
                                    ${hoveredCard === card.title ? 'scale-105' : 'scale-100'}
                                    flex flex-col bg-white p-0
                                    cursor-pointer
                                `}
                            >
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                <div className="flex flex-col flex-grow p-4">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {card.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {card.techStack.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        className={`
                    w-full py-3 rounded-lg 
                    border border-gray-300
                    buttonSecondary
                    font-extrabold
                    transition-all duration-300 
                    hover:bg-gray-50
                    mt-auto
                  `}
                                    >
                                        Select Project
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto bg-white rounded-xl p-6 min-h-[500px] flex flex-col"
                    >
                        <div 
                            ref={chatContainerRef}
                            className="flex-grow space-y-4 mb-6 overflow-y-auto px-2 max-h-[500px] scroll-smooth scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {chatMessages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-4 rounded-2xl ${
                                            message.isUser
                                                ? 'text-black border border-gray-300'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        <p className="text-[15px] leading-relaxed whitespace-pre-line">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            {showStartButton ? (
                                <div className="flex flex-col items-center gap-3">
                                    <button
                                        onClick={() => {
                                            // Handle start button click - you can add navigation or other actions here
                                        }}
                                        className="px-8 py-3 bg-[#58cc02] text-white rounded-lg font-semibold hover:bg-[#46a302] transition-colors duration-200"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleChatSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Type your response..."
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#58cc02] focus:border-[#58cc02] text-gray-700 bg-white"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-[#58cc02] text-white rounded-lg font-semibold hover:bg-[#46a302] transition-colors duration-200"
                                    >
                                        Send
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Custom Project Section - Only show when chat is not visible */}
                {!showChat && (
                    <div className="bg-white rounded-2xl p-8 mb-12">
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={projectSuggestion}
                                    onChange={(e) => setProjectSuggestion(e.target.value)}
                                    placeholder="Describe your project idea..."
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] text-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#58cc02] text-white rounded-lg text-lg font-semibold hover:bg-[#46a302] transition-colors duration-200"
                                >
                                    Start Project
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectDashboard; 