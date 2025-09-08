"use client";

import { useState } from "react";
import RoomCard from "./RoomCard";
import FeedbackModal from "./FeedbackModal";

interface Room {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

interface Feedback {
  type: "correct" | "incorrect";
  title: string;
  message: string;
  icon: string;
}

const rooms: Room[] = [
  {
    id: "bedroom",
    name: "Quarto",
    icon: "🛏️",
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    id: "living-room", 
    name: "Sala",
    icon: "🛋️",
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600"
  },
  {
    id: "kitchen",
    name: "Cozinha", 
    icon: "🍳",
    color: "bg-red-500",
    gradient: "from-red-400 to-red-600"
  },
  {
    id: "bathroom",
    name: "Banheiro",
    icon: "🚿", 
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600"
  }
];

const getFeedback = (roomId: string): Feedback => {
  switch (roomId) {
    case "bedroom":
      return {
        type: "correct",
        title: "Parabéns! Resposta Correta! 🎉",
        message: "✅ Correto! O ideal é armazenar em um armário fechado, seco, fresco e fora do alcance de crianças e animais.",
        icon: "✅"
      };
    case "living-room":
      return {
        type: "incorrect", 
        title: "Ops! Não é o melhor local 😕",
        message: "⚠️ Não é o local mais indicado. É preciso um ambiente protegido do calor, da luz e fora do alcance de crianças.",
        icon: "⚠️"
      };
    case "kitchen":
    case "bathroom":
      return {
        type: "incorrect",
        title: "Cuidado! Local não recomendado 🚫",
        message: "⚠️ Não é recomendado armazenar aqui, porque há calor e umidade, que podem estragar os medicamentos.",
        icon: "🚫"
      };
    default:
      return {
        type: "incorrect",
        title: "Tente novamente",
        message: "Escolha um cômodo da casa.",
        icon: "❓"
      };
  }
};

interface MedicineGameProps {
  onRestart: () => void;
}

export default function MedicineGame({ onRestart }: MedicineGameProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    setShowFeedback(true);
    
    // Se acertou, marcar como completo
    if (roomId === "bedroom") {
      setGameCompleted(true);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    if (!gameCompleted) {
      setSelectedRoom(null);
    }
  };

  const handleTryAgain = () => {
    setSelectedRoom(null);
    setShowFeedback(false);
    setGameCompleted(false);
  };

  const currentFeedback = selectedRoom ? getFeedback(selectedRoom) : null;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <button
            onClick={onRestart}
            className="mb-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mx-auto gap-2 transition-colors"
          >
            ← Voltar ao Início
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🏠 Sua Casa Virtual
          </h1>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Pergunta do Quiz
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              "Onde é o local mais adequado para armazenar medicamentos?"
            </p>
          </div>
        </div>

        {/* Grid dos cômodos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isSelected={selectedRoom === room.id}
              isDisabled={gameCompleted && selectedRoom !== room.id}
              onClick={() => handleRoomSelect(room.id)}
            />
          ))}
        </div>

        {/* Dica visual */}
        {!selectedRoom && (
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-2xl mb-2">💭</div>
              <p className="text-yellow-800 font-medium">
                Clique em um cômodo para descobrir se é o local ideal!
              </p>
            </div>
          </div>
        )}

        {/* Informações educativas */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
          <div className="text-center space-y-4">
            <div className="text-3xl">🧑‍⚕️</div>
            <h3 className="text-xl font-semibold text-gray-800">
              Dica Importante
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              O armazenamento adequado de medicamentos é essencial para manter sua eficácia e 
              garantir a segurança da família. Sempre verifique as instruções na embalagem!
            </p>
          </div>
        </div>
      </div>

      {/* Modal de feedback */}
      {showFeedback && currentFeedback && (
        <FeedbackModal
          feedback={currentFeedback}
          onClose={handleCloseFeedback}
          onTryAgain={handleTryAgain}
          onRestart={onRestart}
          gameCompleted={gameCompleted}
        />
      )}
    </div>
  );
}