import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Square, Disc, Sparkles, CheckCircle, HelpCircle, FileAudio } from "lucide-react";

interface Level4AudioProps {
  onComplete: (code: string) => void;
  isUnlocked: boolean;
}

export default function Level4Audio({ onComplete, isUnlocked }: Level4AudioProps) {
  const [playState, setPlayState] = useState<"idle" | "playing" | "reversing">("idle");
  const [blank1, setBlank1] = useState("");
  const [blank2, setBlank2] = useState("");
  const [blank3, setBlank3] = useState("");
  const [focusedInput, setFocusedInput] = useState<1 | 2 | 3>(1);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealMessage, setRevealMessage] = useState(false);

  const CLUE_STAMPS = [
    "茶餘飯後",
    "政府高層",
    "大賺一筆",
    "官商勾結",
    "代罪羔羊",
    "無辜市民",
    "製造輿論",
    "隻手遮天"
  ];

  const handleClueClick = (word: string) => {
    if (success) return;
    if (focusedInput === 1) {
      setBlank1(word);
      setFocusedInput(2);
    } else if (focusedInput === 2) {
      setBlank2(word);
      setFocusedInput(3);
    } else if (focusedInput === 3) {
      setBlank3(word);
    }
  };

  useEffect(() => {
    if (playState === "reversing") {
      setRevealMessage(true);
    } else {
      setRevealMessage(false);
    }
  }, [playState]);

  // Check answers with maximum tolerance (traditional, simplified, synonyms)
  const isB1Valid = (val: string) => {
    const term = val.trim().toLowerCase();
    const list = ["茶餘飯後", "茶余饭后", "代罪羔羊", "無辜市民", "無辜百姓", "茶餘飯後的談資", "茶餘談資", "茶樓圍觀"];
    return list.some(item => term.includes(item));
  };

  const isB2Valid = (val: string) => {
    const term = val.trim().toLowerCase();
    const list = ["政府高層", "政府高层", "官商勾結", "官商勾结", "警方高層", "官方高層", "內政重臣", "達官顯要", "特務局"];
    return list.some(item => term.includes(item));
  };

  const isB3Valid = (val: string) => {
    const term = val.trim().toLowerCase();
    const list = ["大賺一筆", "大赚一笔", "大撈一筆", "大撈一票", "撈一筆", "撈一票", "大賺一票", "製造輿論", "隻手遮天"];
    return list.some(item => term.includes(item));
  };

  const checkAnswers = () => {
    if (isB1Valid(blank1) && isB2Valid(blank2) && isB3Valid(blank3)) {
      setSuccess(true);
      onComplete("RECORD_DECODED");
    }
  };

  useEffect(() => {
    checkAnswers();
  }, [blank1, blank2, blank3]);

  return (
    <section id="level-4-audio" className="my-12 p-6 md:p-8 rounded-xl border border-dashed border-red-900/40 bg-zinc-950/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono px-2 py-1 bg-red-950 text-red-400 border border-red-900/60 rounded">
              關卡四 (LEVEL 4)
            </span>
            <h3 className="text-2xl font-serif text-amber-100 mt-2 font-bold tracking-wider">
              錄音帶解碼 (Tape Recorder Decoding)
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl font-sans">
              播放警方從嫌犯寓所起獲的
              <strong className="text-red-400">《現場調查聲帶錄像》</strong>，
              並比對旁邊被燒毀了一半的秘密「偵查逐字稿」。
              音軌正軌已被干擾，必須使用播放器中的
              <strong className="text-amber-250">「倒播」</strong>按鍵反向破解聲流頻率，並填寫稿件空缺。
            </p>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5 shrink-0"
          >
            <HelpCircle size={14} className="text-red-400 animate-pulse" />
            播音求助
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
              <strong>🕵️ 探長提示：倒轉磁帶的詭秘聲音</strong>
              <p className="mt-2 text-zinc-300">
                點擊播放器的 <strong>「倒播」鈕</strong>（逆旋轉圖示），會在音響底端解讀出一行血紅字跡：
                <span className="text-red-400 font-bold font-serif">「真正毀掉他的，不是案件。」</span>
                <br />
                從黃姓記者筆記與此言拼湊推測，無辜的房東先生被扣上殺人魔頭銜後，鄰里便以其作為
                <strong>「茶餘飯後」</strong>的談資；而整起案件真正的保護傘是
                <strong>「政府高層」</strong>，他們引導輿論而讓新聞社大老們
                <strong>「大賺一筆」</strong>。將這三組詞依次輸入到逐字稿中。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 items-start">
          {/* Left Panel: Retro Cassette Tape Player UI */}
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-5 md:p-6 shadow-2xl relative flex flex-col items-center">
            <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-500 bg-black/60 px-2 py-0.5 rounded border border-zinc-800">
              CASSETTE TAPE PORTABLE PLAYER CH-60
            </div>

            {/* Simulated Cassette Outer Housing */}
            <div className="w-full max-w-[340px] aspect-[15/9] rounded-xl bg-zinc-950 border-4 border-zinc-800 p-3 mt-8 relative shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
              
              {/* Cassette Label Tape */}
              <div className="w-full bg-zinc-900 border border-zinc-800 p-2 text-center rounded-t">
                <span className="font-mono text-[10px] text-red-500 tracking-widest font-bold">
                  【 1961 · 瑠公圳死因偵訊現場 B-SIDE 】
                </span>
              </div>

              {/* Tape Core Spindles */}
              <div className="flex-1 bg-zinc-900/50 border border-zinc-950 my-2 rounded flex justify-around items-center px-8 relative overflow-hidden">
                <div className="absolute top-2 w-full text-center text-[8px] font-mono text-zinc-600">
                  REEL TO REEL ANALOG AUDIO RECORDER
                </div>

                {/* Left Spindle */}
                <div className="relative">
                  <motion.div
                    animate={
                      playState === "playing"
                        ? { rotate: 360 }
                        : playState === "reversing"
                        ? { rotate: -1080 }
                        : { rotate: 0 }
                    }
                    transition={
                      playState === "playing"
                        ? { duration: 4, repeat: Infinity, ease: "linear" }
                        : playState === "reversing"
                        ? { duration: 1, repeat: Infinity, ease: "linear" }
                        : {}
                    }
                    className="w-14 h-14 rounded-full bg-zinc-800 border-4 border-dashed border-zinc-950/80 flex items-center justify-center relative shadow-md"
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    </div>
                  </motion.div>
                </div>

                {/* Simulated Magnetic Ribbon Tape display in middle */}
                <div className="w-16 h-4 bg-zinc-950 rounded flex items-center justify-center overflow-hidden">
                  <div className="flex gap-1.5 justify-center items-center h-full w-full opacity-60">
                    {playState === "playing" && (
                      <div className="flex gap-1 items-end h-6 pb-1">
                        <span className="w-1 bg-green-500 h-2 animate-pulse" />
                        <span className="w-1 bg-green-500 h-4 animate-pulse animate-delay-150" />
                        <span className="w-1 bg-green-500 h-3 animate-pulse animate-delay-300" />
                        <span className="w-1 bg-green-400 h-1 animate-pulse" />
                      </div>
                    )}
                    {playState === "reversing" && (
                      <div className="flex gap-0.5 items-end h-6 pb-1">
                        <span className="w-1.5 bg-red-500 h-4 animate-bounce" />
                        <span className="w-1.5 bg-amber-500 h-4 animate-bounce animate-delay-200" />
                        <span className="w-1.5 bg-purple-500 h-4 animate-bounce animate-delay-100" />
                      </div>
                    )}
                    {playState === "idle" && (
                      <span className="w-full h-[2px] bg-zinc-800" />
                    )}
                  </div>
                </div>

                {/* Right Spindle */}
                <div className="relative">
                  <motion.div
                    animate={
                      playState === "playing"
                        ? { rotate: 360 }
                        : playState === "reversing"
                        ? { rotate: -1080 }
                        : { rotate: 0 }
                    }
                    transition={
                      playState === "playing"
                        ? { duration: 4, repeat: Infinity, ease: "linear" }
                        : playState === "reversing"
                        ? { duration: 1, repeat: Infinity, ease: "linear" }
                        : {}
                    }
                    className="w-14 h-14 rounded-full bg-zinc-800 border-4 border-dashed border-zinc-950/80 flex items-center justify-center relative shadow-md"
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Tape bottom window styling */}
              <div className="h-4 bg-zinc-900 border border-zinc-800 border-b-0 rounded-b mt-1" />
            </div>

            {/* Tape Controls buttons layout */}
            <div className="flex gap-3 justify-center items-center mt-6 w-full max-w-[340px] bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 shadow-md">
              {/* Play Button */}
              <button
                onClick={() => setPlayState("playing")}
                className={`p-2.5 rounded transition flex items-center justify-center gap-1 text-xs font-serif ${
                  playState === "playing"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800/80"
                    : "bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-850"
                }`}
                title="常規播放"
              >
                <Play size={14} className="fill-current" />
                <span>播放</span>
              </button>

              {/* Rewind / Reverse Clue Button */}
              <button
                onClick={() => setPlayState("reversing")}
                className={`p-2.5 rounded transition flex items-center justify-center gap-1 text-xs font-serif ${
                  playState === "reversing"
                    ? "bg-red-950 text-red-400 border border-red-700/80 animate-pulse"
                    : "bg-zinc-900 hover:bg-zinc-850 hover:text-red-400 text-zinc-300 border border-zinc-850"
                }`}
                title="倒帶播放（關鍵解碼）"
              >
                <RotateCcw size={14} />
                <span>倒播 (REV)</span>
              </button>

              {/* Stop Button */}
              <button
                onClick={() => setPlayState("idle")}
                className={`p-2.5 rounded transition flex items-center justify-center gap-1 text-xs font-serif ${
                  playState === "idle"
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    : "bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-850"
                }`}
                title="停止播音"
              >
                <Square size={14} className="fill-current" />
                <span>停止</span>
              </button>
            </div>

            {/* Glowing Clue Float Message */}
            <div className="h-16 mt-4 flex items-center justify-center">
              <AnimatePresence>
                {revealMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-red-950/40 border-2 border-dashed border-red-700 rounded-lg text-center shadow-lg shadow-red-950/40"
                  >
                    <span className="text-red-400 font-serif text-sm font-black tracking-widest flicker-effect">
                      📢 磁帶逆向聲流：「真正毀掉他的，不是案件。」
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Burned Transcript Document Sheet */}
          <div className="relative p-6 md:p-8 rounded-lg text-stone-900 dossier-card shadow-xl overflow-hidden min-h-[380px] bg-stone-100 border border-stone-300">
            {/* Burnt Corner Effect overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-950 opacity-10 blur-xl -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-zinc-950/100 rotate-45 translate-x-28 translate-y-28 border-l-[3px] border-amber-900/40 border-dashed pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-300 pb-3 mb-4 gap-2">
              <h4 className="text-base md:text-lg font-serif font-black text-amber-950 flex items-center gap-2">
                <FileAudio size={20} className="text-amber-900" />
                台北特勤偵警隊 審訊錄像逐字稿（極機密複本）
              </h4>
              
              {/* Auto solver helper button */}
              <button
                type="button"
                onClick={() => {
                  setBlank1("茶餘飯後");
                  setBlank2("政府高層");
                  setBlank3("大賺一筆");
                  setFocusedInput(3);
                }}
                className="px-2.5 py-1.5 rounded-md bg-amber-900 text-stone-100 hover:bg-amber-800 transition text-[11px] font-sans font-bold shadow-md cursor-pointer flex items-center gap-1"
                title="點擊直接填入正確解答通關"
              >
                ⚡ 一鍵自動填入正確答案
              </button>
            </div>

            {/* Play status log */}
            <div className="text-[11px] font-mono text-stone-600 mb-4 bg-stone-200/80 px-2 py-1.5 rounded-md inline-block border border-stone-350">
              {playState === "playing"
                ? "🎙️ 當前：順行聲軌播放中（雜音充盈，含混不清）"
                : playState === "reversing"
                ? "🎙️ 當前：逆行聲域除噪破譯中..."
                : "🎙️ 當前：音頻信號已終止，請按下方播放或倒播鈕"}
            </div>

            {/* DIRECT FULL TEXT TRANSCRIPT FOR ACCESSIBILITY */}
            <div className="mb-4 p-3 bg-red-100/40 border border-red-200/60 rounded-md">
              <span className="text-xs font-serif font-bold text-red-900 block mb-1">
                📢 復原逐字稿架構（需聆聽錄音倒播取得謎底，或點右側自動填入）：
              </span>
              <p className="text-xs text-stone-800 font-serif leading-relaxed">
                「...王姓房東本是一清白市民...不料卻淪為了大眾的<strong className="text-red-700 underline">【 ❓ 】</strong>與狂熱抹黑... 其實真正的幕後元兇是<strong className="text-red-700 underline">【 ❓ 】</strong>為了掩飾通聯，刻意洩露虛假筆錄... 新聞社藉此<strong className="text-red-700 underline">【 ❓ 】</strong>，房東在冤案洗清前自盡而亡...」
              </p>
            </div>

            <div className="space-y-4 font-serif text-sm md:text-base text-stone-900 leading-relaxed font-bold">
              <p>
                「當時，第一發現人向警員通報在圳底撈獲麻袋。
                案件曝光後，輿論簡作瘋狂。王姓房東本是一清白市民，最為顧及家族聲譽，
                不料卻淪為了大眾的
                <input
                  type="text"
                  placeholder="[請點下方字卡填入]"
                  value={blank1}
                  onFocus={() => setFocusedInput(1)}
                  onChange={(e) => setBlank1(e.target.value)}
                  disabled={success}
                  className={`mx-1 w-32 text-center bg-stone-200/90 border-b-2 font-serif text-red-800 font-bold px-1.5 py-0.5 focus:outline-none transition-all duration-300 ${
                    success 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 text-base" 
                      : focusedInput === 1 
                      ? "border-amber-600 bg-amber-50 ring-2 ring-amber-400/50 text-base" 
                      : "border-stone-800 focus:border-red-600 text-base"
                  }`}
                />
                與報紙瘋狂抹黑、茶樓圍觀的奇聞談資。其生意和心志盡毀。」
              </p>
 
              <p>
                「而這場大火背後真正的元兇，卻根本不在民間。
                我們曾取得治安處的批卷，發現是
                <input
                  type="text"
                  placeholder="[請點下方字卡填入]"
                  value={blank2}
                  onFocus={() => setFocusedInput(2)}
                  onChange={(e) => setBlank2(e.target.value)}
                  disabled={success}
                  className={`mx-1 w-32 text-center bg-stone-200/90 border-b-2 font-serif text-red-800 font-bold px-1.5 py-0.5 focus:outline-none transition-all duration-300 ${
                    success 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 text-base" 
                      : focusedInput === 2 
                      ? "border-amber-655 bg-amber-50 ring-2 ring-amber-400/50 text-base" 
                      : "border-stone-800 focus:border-red-600 text-base"
                  }`}
                />
                內政重臣為了掩飾情報走私與特務部門過失，刻意向報章大量洩露虛假筆錄，以藉此平息風雲。」
              </p>
 
              <p>
                「此計不單成功推卸罪責，更使嗜血的新聞社老闆與大老們憑藉此番造假，瘋狂印行十七期號外、追加發售十萬卷，乘機
                <input
                  type="text"
                  placeholder="[請點下方字卡填入]"
                  value={blank3}
                  onFocus={() => setFocusedInput(3)}
                  onChange={(e) => setBlank3(e.target.value)}
                  disabled={success}
                  className={`mx-1 w-33 text-center bg-stone-200/90 border-b-2 font-serif text-red-800 font-bold px-1.5 py-0.5 focus:outline-none transition-all duration-300 ${
                    success 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 text-base" 
                      : focusedInput === 3 
                      ? "border-amber-655 bg-amber-50 ring-2 ring-amber-400/50 text-base" 
                      : "border-stone-800 focus:border-red-600 text-base"
                  }`}
                />
                。
                可憐王姓房東百口莫辯，在冤案終結前夜，自崩於停屍所，再也沒有人去追查女屍被拋棄的最初真相...」
              </p>
            </div>

            {/* Clue Stamp board */}
            <div className="my-5 p-4 bg-stone-200/80 rounded border border-stone-300 shadow-inner">
              <span className="text-xs font-sans font-bold text-stone-850 block mb-2 leading-relaxed">
                🔎 快捷拼圖字卡（字大清晰好按！點選上方任一空格後，點選下方字卡直接代入）：
              </span>
              <div className="flex flex-wrap gap-2.5">
                {CLUE_STAMPS.map((stamp) => {
                  return (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => handleClueClick(stamp)}
                      className="px-3.5 py-2 text-sm font-serif font-black bg-stone-50 hover:bg-amber-100 hover:text-red-900 border border-stone-400 rounded-md shadow transition active:scale-95 cursor-pointer hover:border-red-700"
                    >
                      印入 ─ {stamp}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-xs font-sans text-stone-600 flex flex-col sm:flex-row justify-between gap-1">
                <span>目前點選填入目標：<strong className="text-red-700 bg-amber-50 px-1 border border-amber-200 rounded">👉 空格 {focusedInput} 👈</strong></span>
                <span>（大字直接輸入/點選都可以通關）</span>
              </div>
            </div>

            {/* Live Checklist Feedback */}
            <div className="mt-6 pt-4 border-t border-stone-300/80 font-mono text-xs text-stone-700 space-y-2.5 bg-stone-150/50 p-2.5 rounded">
              <div className="font-bold text-stone-800 text-sm">【審核進度】：</div>
              <div className="flex justify-between items-center bg-stone-200/60 p-2 rounded">
                <span>1. 大眾談資狀態：</span>
                <span className={isB1Valid(blank1) ? "text-emerald-800 font-bold" : "text-stone-505"}>
                  {isB1Valid(blank1) ? "✓ 已解鎖 (大眾茶餘飯後)" : "✗ 未解碼 (請點下方字卡填入填空一)"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-stone-200/60 p-2 rounded">
                <span>2. 幕後利益元兇：</span>
                <span className={isB2Valid(blank2) ? "text-emerald-800 font-bold" : "text-stone-505"}>
                  {isB2Valid(blank2) ? "✓ 已解鎖 (政府高層)" : "✗ 未解碼 (請點下方字卡填入填空二)"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-stone-200/60 p-2 rounded">
                <span>3. 媒體勾結目標：</span>
                <span className={isB3Valid(blank3) ? "text-emerald-800 font-bold" : "text-stone-500"}>
                  {isB3Valid(blank3) ? "✓ 已解鎖 (大賺一筆)" : "✗ 未解碼 (倒著播放磁帶取得謎底後填入填空三)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Complete Gate Box */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-lg border border-red-900 bg-red-950/20 max-w-xl mx-auto text-center mt-6"
          >
            <CheckCircle className="text-red-500 mx-auto mb-2 animate-bounce animate-duration-1000" size={32} />
            <h4 className="text-lg font-serif font-bold text-red-200 font-black">
              【逐字稿翻譯正確：錄音解碼完成】
            </h4>
            <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed font-serif">
              當磁帶的顛倒密語與逐字稿在你的筆下拼合，1961年的黑暗輪廓正式大白。
              無頭女屍只是他們
              <strong className="text-red-400">「大賺一筆」</strong>、轉移注意力
              與充當市民
              <strong className="text-red-400">「茶餘飯後」</strong>談資的犧牲品，
              媒體更淪為了
              <strong className="text-red-400">「政府高層」</strong>洗脫髒手的喉舌。
            </p>
            <div className="mt-4 text-xs font-mono text-zinc-400 animate-pulse">
              * 已獲取「警署銷毀錄音帶復原本」關鍵證據，解鎖最終嫌疑人推理連線牆 *
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
