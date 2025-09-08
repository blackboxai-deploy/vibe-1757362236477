"use client";

import { useState } from "react";
import MedicineGame from "@/components/MedicineGame";

export default function HomePage() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <MedicineGame onRestart={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Cabeçalho */}
        <div className="space-y-4">
          <div className="text-6xl mb-4">💊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Armazenamento Seguro de
            <span className="text-blue-600 block">Medicamentos</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Aprenda onde guardar seus medicamentos de forma segura em casa
          </p>
        </div>

        {/* Card de informação */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-4">
            <div className="text-3xl">🏠</div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Como Jogar
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Você verá uma casa com diferentes cômodos. Sua missão é escolher o local
              mais adequado para armazenar medicamentos de forma segura e eficaz.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">
                💡 Dica: Pense em locais secos, frescos e seguros!
              </p>
            </div>
          </div>
        </div>

        {/* Botão de início */}
        <button
          onClick={() => setGameStarted(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          🎮 Iniciar Jogo
        </button>

        {/* Informações extras */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>🎓 Projeto educativo sobre segurança farmacêutica</p>
          <p>⚕️ Informações baseadas em boas práticas de saúde</p>
        </div>
      </div>
    </div>
  );
}