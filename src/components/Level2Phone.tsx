import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, Disc, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

interface Level2PhoneProps {
  onComplete: (unlockedItems: string[]) => void;
  isUnlocked: boolean;
}

export default function Level2Phone({ onComplete, isUnlocked }: Level2PhoneProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Left police logs (Contradiction index is 2: 10:00)
  const policeLogs = [
    { id: 1, time: "上午 07:30", text: "警局接獲瑠公圳附近打更巡邏人報案，稱圳底有可疑巨形麻袋。" },
    { id: 2, time: "上午 09:15", text: "偵緝隊派員抵達瑠公圳橋畔，並聯絡消防隊攜器材協助打撈。" },
    { id: 3, time: "上午 10:00", text: "【關鍵線索】正式打撈麻袋，確認無名女屍軀幹，通報分局長。", isContradict: true },
    { id: 4, time: "下午 01:20", text: "法醫到達臨時停屍間，開始對屍軀進行初步防腐與創口測量。" },
  ];

  // Right reporter notes (Contradiction index is 1: 08:00)
  const reporterNotes = [
    { id: 101, time: "上午 06:15", text: "線民回報瑠公圳有大動靜。起床出發，相機備妥底片兩卷。" },
    { id: 102, time: "上午 08:00", text: "【關鍵線索】新聞稿草稿完成：「瑠公圳驚現千金慘遭分屍！無頭女魂夜哭...」", isContradict: true },
    { id: 103, time: "上午 10:30", text: "趕抵現場拍照，圍觀民眾已被驅離。設法買通基層警員獲取線報。" },
    { id: 104, time: "下午 03:00", text: "報社印刷廠開動，緊急加印號外，今日銷售量預期翻倍！" },
  ];

  const handleLeftClick = (index: number) => {
    if (success) return;
    setSelectedLeft(index);
    checkContradiction(index, selectedRight);
  };

  const handleRightClick = (index: number) => {
    if (success) return;
    setSelectedRight(index);
    checkContradiction(selectedLeft, index);
  };

  const checkContradiction = (leftIdx: number | null, rightIdx: number | null) => {
    if (leftIdx !== null && rightIdx !== null) {
      const leftItem = policeLogs[leftIdx];
      const rightItem = reporterNotes[rightIdx];

      if (leftItem.isContradict && rightItem.isContradict) {
        setSuccess(true);
        // Returns the items to inventory: Rusty Key and Cassette Tape
        onComplete(["rusty_key", "audio_tape"]);
      }
    }
  };

  return (
    <section id="level-2-phone" className="my-12 p-6 md:p-8 rounded-xl border border-dashed border-red-900/40 bg-zinc-950/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono px-2 py-1 bg-red-950 text-red-400 border border-red-900/60 rounded">
              關卡二 (LEVEL 2)
            </span>
            <h3 className="text-2xl font-serif text-amber-100 mt-2 font-bold tracking-wider">
              電話紀錄調查 (Call Records Investigation)
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-sans">
              警局內線與報社之間似乎存在著某種不可告人的默契。比對左側的
              <strong className="text-amber-200">《警局通聯紀錄》</strong>與右側的
              <strong className="text-amber-200">《記者個人筆記》</strong>，點擊選出兩者時間上
              <strong className="text-red-400">「最致命矛盾、造假的關鍵時間點」</strong>。
            </p>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5 shrink-0"
          >
            <HelpCircle size={14} className="text-red-400 animate-pulse" />
            比對線索
          </button>
        </div>

        {/* Dynamic Hint Panel */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 p-4 rounded bg-red-950/30 border border-red-950 text-xs text-amber-200/90 leading-relaxed font-serif"
            >
              <strong>🕵️ 探長提示：公理如何被偽造？</strong>
              <p className="mt-2 text-zinc-300">
                仔細看！警方是在甚麼時候才打撈麻袋、切實撬開袋口、
                <strong>「確認女屍的存在」</strong>？
                而報社的嗜血主編，又是在甚麼時候就已經
                <strong>「連新聞通稿都親手撰寫好」</strong>了？
                這中間有著極度荒謬的時間差。點擊選中這兩個充滿謊言的時刻！
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Desk Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
          {/* Left: Police Communications Log */}
          <div className="rounded-lg bg-zinc-900/60 p-4 md:p-6 border border-zinc-800 relative shadow-inner">
            <div className="absolute top-4 right-4 text-[10px] font-mono px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-500 tracking-widest">
              【機密檔案分類：警防通報】
            </div>
            
            <h4 className="text-md font-serif font-bold text-amber-200 border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              台北市警察局偵緝隊 通聯偵查日誌
            </h4>

            <div className="space-y-3">
              {policeLogs.map((log, idx) => {
                const isSelected = selectedLeft === idx;
                return (
                  <button
                    key={log.id}
                    onClick={() => handleLeftClick(idx)}
                    disabled={success}
                    className={`w-full text-left p-3 rounded border font-serif text-sm transition-all flex flex-col md:flex-row gap-2 md:gap-4 items-start ${
                      success && log.isContradict
                        ? "bg-red-950/40 border-red-600 text-red-200 scale-[1.02] shadow-lg shadow-red-950/30"
                        : isSelected
                        ? "bg-amber-950/30 border-amber-600/60 text-amber-100"
                        : "bg-zinc-950/50 border-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40"
                    }`}
                  >
                    <span className="font-mono text-xs text-red-400/80 font-bold tracking-wider shrink-0 bg-black px-1.5 py-0.5 rounded">
                      {log.time}
                    </span>
                    <span className="leading-relaxed">{log.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Reporter Notepad */}
          <div className="rounded-lg bg-stone-900/80 p-4 md:p-6 border border-stone-850 relative shadow-lg text-stone-950 dossier-card">
            <div className="absolute top-4 right-4 text-[9px] font-mono px-1.5 py-0.5 text-stone-700 tracking-wider">
              【搜查證物：黃姓記者手札】
            </div>

            <h4 className="text-md font-serif font-bold text-stone-900 border-b border-stone-300 pb-2 mb-4 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-stone-800" />
              社會熱點特派員 私留隨手簿籍
            </h4>

            <div className="space-y-3">
              {reporterNotes.map((note, idx) => {
                const isSelected = selectedRight === idx;
                return (
                  <button
                    key={note.id}
                    onClick={() => handleRightClick(idx)}
                    disabled={success}
                    className={`w-full text-left p-3 rounded border font-serif text-sm transition-all flex flex-col md:flex-row gap-2 md:gap-4 items-start ${
                      success && note.isContradict
                        ? "bg-red-100 border-red-700 text-red-900 scale-[1.02] shadow-lg shadow-red-200/50"
                        : isSelected
                        ? "bg-stone-200 border-stone-600 text-stone-900"
                        : "bg-stone-100/50 border-stone-200/60 text-stone-700 hover:text-stone-900 hover:border-stone-400 hover:bg-stone-50"
                    }`}
                  >
                    <span className="font-mono text-xs text-amber-900 font-bold tracking-wider shrink-0 bg-stone-250 px-1.5 py-0.5 rounded">
                      {note.time}
                    </span>
                    <span className="leading-relaxed italic">{note.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Level Complete / Rewards Display */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-lg border border-red-800/80 bg-red-950/20 text-center max-w-2xl mx-auto"
            >
              <div className="flex justify-center gap-1.5 mb-2 text-red-500 animate-pulse">
                <AlertTriangle size={24} />
                <span className="font-serif font-bold tracking-widest text-lg text-red-500">
                  時空悖論！造假證實
                </span>
              </div>

              <div className="font-serif text-2xl font-black text-red-400 my-3 leading-relaxed tracking-wider flicker-effect uppercase select-none">
                「越聳動，報紙越賣。」
              </div>

              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-serif px-4">
                警方在上午 <span className="text-red-400 font-bold">10:00</span> 才初次打撈並切實確認女屍，
                而嗜血記者竟在上午 <span className="text-red-400 font-bold">08:00</span> 就已經完成了精準描述的悲慘號外草稿！
                這意味著案件在發生前，媒體早與「某人」聯手，企圖用滔天口水掩蓋背後更大的幽深真相。
              </p>

              {/* Reward Items */}
              <div className="mt-6 border-t border-red-900/50 pt-5">
                <h5 className="text-xs font-mono text-zinc-400 tracking-wider mb-4">
                  【 獲得解謎關鍵實體道具 · 登錄手提袋 】
                </h5>
                
                <div className="flex justify-center gap-6">
                  {/* Reward 1 */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="flex flex-col items-center bg-stone-900/60 p-3 rounded-lg border border-amber-900/30 w-32 shadow-md shadow-black"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-950/40 border border-amber-800 flex items-center justify-center text-amber-400 mb-2">
                      <Key size={24} className="animate-spin-slow text-amber-500" />
                    </div>
                    <span className="text-xs font-serif font-bold text-amber-100">生鏽的鑰匙</span>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1">黃銅生鏽 刻有IV</span>
                  </motion.div>

                  {/* Reward 2 */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="flex flex-col items-center bg-stone-900/60 p-3 rounded-lg border border-red-900/30 w-32 shadow-md shadow-black"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-800 flex items-center justify-center text-red-400 mb-2">
                      <Disc size={24} className="animate-pulse text-red-500" />
                    </div>
                    <span className="text-xs font-serif font-bold text-red-200">未公佈錄音帶</span>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1">殘破磁帶 被燒毀半邊</span>
                  </motion.div>
                </div>

                <div className="mt-5 text-[11px] font-mono text-emerald-500 flex items-center justify-center gap-1">
                  <CheckCircle size={12} />
                  <span>關卡二破譯，通往關卡三紫外線檔案封存室...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
