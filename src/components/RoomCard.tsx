"use client";

interface Room {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function RoomCard({ room, isSelected, isDisabled, onClick }: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative w-full aspect-square rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
        ${isSelected 
          ? `bg-gradient-to-br ${room.gradient} text-white shadow-2xl scale-105 ring-4 ring-blue-300` 
          : 'bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-100'
        }
        ${isDisabled && !isSelected 
          ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' 
          : 'cursor-pointer'
        }
      `}
    >
      {/* Conteúdo do card */}
      <div className="flex flex-col items-center justify-center h-full space-y-3">
        {/* Ícone do cômodo */}
        <div className="text-4xl md:text-5xl transform transition-transform duration-300 hover:scale-110">
          {room.icon}
        </div>
        
        {/* Nome do cômodo */}
        <h3 className="font-bold text-lg md:text-xl text-center leading-tight">
          {room.name}
        </h3>

        {/* Indicador visual para seleção */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="bg-white/20 rounded-full p-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Efeito de hover - gradiente sutil */}
      {!isSelected && !isDisabled && (
        <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
      )}

      {/* Border animado para seleção */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
      )}
    </button>
  );
}