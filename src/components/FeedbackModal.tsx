"use client";

import { useEffect } from "react";

interface Feedback {
  type: "correct" | "incorrect";
  title: string;
  message: string;
  icon: string;
}

interface FeedbackModalProps {
  feedback: Feedback;
  onClose: () => void;
  onTryAgain: () => void;
  onRestart: () => void;
  gameCompleted: boolean;
}

export default function FeedbackModal({ 
  feedback, 
  onClose, 
  onTryAgain, 
  onRestart
}: FeedbackModalProps) {
  
  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div 
        className={`
          max-w-md w-full rounded-2xl p-8 shadow-2xl transform animate-slide-up
          ${feedback.type === "correct" 
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200" 
            : "bg-gradient-to-br from-red-50 to-orange-50 border border-red-200"
          }
        `}
      >
        {/* Ícone principal */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">
            {feedback.icon}
          </div>
          
          {/* Título */}
          <h2 className={`
            text-2xl font-bold mb-4
            ${feedback.type === "correct" ? "text-green-800" : "text-red-800"}
          `}>
            {feedback.title}
          </h2>
        </div>

        {/* Mensagem */}
        <div className={`
          rounded-xl p-6 mb-6 border-l-4
          ${feedback.type === "correct" 
            ? "bg-green-100/50 border-green-400 text-green-900" 
            : "bg-red-100/50 border-red-400 text-red-900"
          }
        `}>
          <p className="font-medium leading-relaxed text-base">
            {feedback.message}
          </p>
        </div>

        {/* Informação extra para resposta correta */}
        {feedback.type === "correct" && (
          <div className="bg-blue-100 rounded-lg p-4 mb-6 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Lembre-se:</h4>
                <p className="text-sm text-blue-800">
                  Mantenha medicamentos longe de crianças, pets, calor, luz e umidade!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="space-y-3">
          {/* Se acertou */}
          {feedback.type === "correct" ? (
            <div className="space-y-3">
              <button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
              >
                🎮 Jogar Novamente
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                📚 Ver Explicação
              </button>
            </div>
          ) : (
            /* Se errou */
            <div className="space-y-3">
              <button
                onClick={onTryAgain}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
              >
                🔄 Tentar Novamente
              </button>
              <button
                onClick={onRestart}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                🏠 Voltar ao Início
              </button>
            </div>
          )}
        </div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}