import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert, BookOpen, Volume2, Key, Star } from "lucide-react";

interface TheatricalIntroProps {
  onEnter: () => void;
}

export default function TheatricalIntro({ onEnter }: TheatricalIntroProps) {
  const [typingStep, setTypingStep] = useState(0);
  const [stampActive, setStampActive] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  // Typewriter text steps simulating confidential archive unlocking
  const logs = [
    "▼ SYSTEM INITIALIZING: RECOVERING FORGOTTEN TAIPEI COLD FILES...",
    "▼ ARCHIVE ID: LIUGONGJUN_1961_02_26 (CONFIDENTIAL GRADE A)",
    "▼ STATUS: RECONSTRUCTING COUPLINGS & INTERROGATION VOICE TAPES...",
    "▼ BRIEFING: 1961年台北。一個寒冷的冬夜，瑠公圳灌溉渠道落下一聲悶響。",
    "▼ 大眾瘋狂了。媒體以鮮血餵養眼球、強權用平民遮掩大老權要。",
    "▼ 案卷已重啟。今日，由你們四人執筆，逆轉這份沈沒深淵的集體私刑。"
  ];

  useEffect(() => {
    if (typingStep < logs.length) {
      const delay = typingStep === 0 ? 500 : typingStep < 3 ? 600 : 1200;
      const timer = setTimeout(() => {
        setTypingStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Trigger wax-stamp slam sound aura!
      const timer = setTimeout(() => {
        setStampActive(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typingStep]);

  const handlePunctureSeal = () => {
    onEnter();
  };

  return (
    <div className="fixed inset-0 bg-stone-950 z-[100] flex flex-col justify-center items-center overflow-hidden font-mono p-4 md:p-8">
      {/* Cinematic vintage CRT scanline lines filter */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-50 opacity-40" />
      
      {/* Outer ambient dark red vignette backing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(54,10,10,0.2)_0%,rgba(9,9,11,0.95)_80%)] pointer-events-none" />

      {/* Retro background dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

      {/* Main Folder representation container */}
      <div className="max-w-2xl w-full bg-[#141212] border-2 border-zinc-800 rounded-xl p-6 md:p-8 relative shadow-2xl space-y-6 z-10">
        
        {/* Retro Header metal pins */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] md:text-xs text-zinc-500 tracking-widest font-bold">
              SECURITY DEPARTMENT OF COLD ARCHIVES
            </span>
          </div>
          <span className="text-[9px] text-[#450a0a] bg-red-950/40 px-2 py-0.5 rounded border border-red-950 font-bold uppercase tracking-widest leading-none">
            RECON REPLICATED
          </span>
        </div>

        {/* Console Typing Monitor screen */}
        <div className="bg-black/95 p-4 rounded border border-zinc-90 w-full min-h-[140px] flex flex-col justify-start text-[10px] md:text-xs leading-relaxed space-y-1 text-emerald-500/90 font-mono tracking-wide">
          {logs.slice(0, typingStep).map((log, i) => (
            <div key={i} className={i >= 3 ? "text-zinc-300 font-serif text-xs md:text-sm pt-1" : "text-emerald-500/70"}>
              {log}
            </div>
          ))}
          {typingStep < logs.length && (
            <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-0.5" />
          )}
        </div>

        {/* Large Cinematic Case Dossier Envelope graphics */}
        <div className="relative border border-dashed border-zinc-800 bg-[#1a1818]/60 p-4 rounded flex items-center justify-between gap-6 overflow-hidden">
          
          {/* Slashed hazard corner decoration */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-[repeating-linear-gradient(-45deg,#450a0a_0px,#450a0a_10px,transparent_10px,transparent_20px)] rotate-45 opacity-20" />

          <div className="space-y-1.5 z-10 font-serif">
            <span className="text-red-500 text-[11px] font-mono tracking-widest block uppercase font-black">
              ★ CLASSIFIED MATERIAL DECAL ★
            </span>
            <h3 className="text-lg md:text-xl font-bold text-amber-50 tracking-widest">
              《瑠公圳分屍案》案卷原檔
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              FILE SERIAL: EXP-1961_COLD_CASE_RM-5
            </p>
          </div>

          {/* Sealed crimson Wax Seal animation representing opening */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center z-10">
            {stampActive ? (
              <motion.div 
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-900 border-2 border-red-500 flex items-center justify-center relative shadow-lg transform rotate-12 shadow-red-950/80"
              >
                {/* Embedded seal details inside stamp */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-red-500/70 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-sans font-black tracking-widest text-[#140202] scale-90 select-none">
                    帽子烤密室工廠
                  </span>
                  <span className="text-[8px] font-mono text-red-200 uppercase tracking-widest scale-75 select-none leading-none">
                    SEALED
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-zinc-800 border-dashed animate-spin-slow" />
            )}
          </div>

        </div>

        {/* Entrance CTA and interaction warning */}
        <div className="flex flex-col items-center space-y-4">
          <button
            type="button"
            disabled={typingStep < logs.length}
            onClick={handlePunctureSeal}
            className={`w-full max-w-sm py-3.5 rounded-lg border-2 font-serif text-sm font-black tracking-widest uppercase transition-all duration-300 relative flex items-center justify-center gap-2 overflow-hidden ${
              typingStep < logs.length
                ? "bg-zinc-950 text-zinc-700 border-zinc-900 cursor-not-allowed"
                : "bg-red-950/90 text-red-200 border-red-700 hover:bg-red-900 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-950 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            }`}
          >
            {/* Gloss light slide across CTA */}
            {typingStep >= logs.length && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shimmer" />
            )}
            
            <Key size={14} className={typingStep >= logs.length ? "animate-pulse" : ""} />
            <span>
              {typingStep < logs.length ? "⏳ 正在校正治安局解密晶振..." : "🔓 拆解深淵封條 · 進入案件"}
            </span>
          </button>

          <p className="text-[9px] text-zinc-600 font-mono tracking-wider text-center">
            * 探案建議：建議佩戴耳機、開啟網頁音頻，並在低光環境下進行探密探索
          </p>
        </div>

      </div>
    </div>
  );
}
