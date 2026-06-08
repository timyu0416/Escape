import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

interface Level3FileProps {
  onComplete: (code: string) => void;
  isUnlocked: boolean;
}

export default function Level3File({ onComplete, isUnlocked }: Level3FileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 150, y: 150 });
  const [isHovered, setIsHovered] = useState(false);
  const [revealedPart1, setRevealedPart1] = useState(false);
  const [revealedPart2, setRevealedPart2] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(false);

  // Track cursor position inside the file card container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Check if player has shined light on the sensitive regions
    // Region 1 (Innocence clue) is roughly center-top: y in [90..200] and x in [100..400]
    if (x > 120 && x < 420 && y > 100 && y < 190) {
      setRevealedPart1(true);
    }
    // Region 2 (Date clue) is lower-center: y in [240..310] and x in [200..450]
    if (x > 180 && x < 460 && y > 240 && y < 320) {
      setRevealedPart2(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePos({ x, y });

    if (x > 120 && x < 420 && y > 100 && y < 190) {
      setRevealedPart1(true);
    }
    if (x > 180 && x < 460 && y > 240 && y < 320) {
      setRevealedPart2(true);
    }
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputVal.trim().replace(/\s+/g, "");
    if (cleaned === "1961/02/26") {
      setSuccess(true);
      setErrorMsg("");
      onComplete("1961/02/26");
    } else {
      setErrorMsg("【密碼錯誤：資料庫拒絕存取】格式需完全符合「1961/02/26」");
    }
  };

  return (
    <section id="level-3-file" className="my-12 p-6 md:p-8 rounded-xl border border-dashed border-red-900/40 bg-zinc-950/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono px-2 py-1 bg-red-950 text-red-400 border border-red-900/60 rounded">
              關卡三 (LEVEL 3)
            </span>
            <h3 className="text-2xl font-serif text-amber-100 mt-2 font-bold tracking-wider">
              封存檔案透視 (Sealed Archive Exposure)
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-sans">
              這份是當年從特務局攔截的
              <strong className="text-red-400">《警方內部調查紀錄》</strong>。
              警局政戰組用粗黑奇異筆進行了永久性圖黑掩蓋。請將滑鼠游標移入下方檔案內，游標將轉變為
              <strong className="text-purple-400">「紫外線紫外線光圈」</strong>，尋找隱密防偽螢光隱字，並在下方輸入破譯密碼通關。
            </p>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5 shrink-0"
          >
            <HelpCircle size={14} className="text-red-400 animate-pulse" />
            顯字技巧
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
              <strong>🕵️ 探長提示：隱形螢光墨水</strong>
              <p className="mt-2 text-zinc-300">
                1960年代官方為防情報外流，部分機密檔案已由國防處蓋上手電筒顯像膠片。
                在下方文件區中<strong>來回挪動滑鼠或在觸控螢幕上滑動手指</strong>。
                你會看到原本塗黑的橫條下，顯現出幽幽的霓虹紫光墨水。
                其中藏有一半是<strong>被代罪的疑犯名單</strong>，文件的最底部則藏有一組關鍵日期，其格式為<strong>「年/月/日」</strong>。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto my-8">
          {/* Left / Center-Left: Interactive UV Document Reader */}
          <div className="lg:col-span-8 flex justify-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-[500px] h-[400px] rounded-lg border border-amber-950/40 cursor-crosshair overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-300 select-none"
              style={{
                background: "radial-gradient(circle at center, #eee5d8 0%, #d8cdbe 100%)",
                boxShadow: "0 12px 36px rgba(0, 0, 0, 0.7), inset 0 0 50px rgba(0, 0, 0, 0.15)"
              }}
            >
              {/* Paper Background Texture & Header */}
              <div className="p-6 h-full flex flex-col justify-between font-serif text-zinc-900">
                <div>
                  <div className="flex justify-between items-center border-b border-amber-900/20 pb-2 mb-4">
                    <span className="text-xs font-mono text-amber-900 tracking-widest font-bold">
                      ★ 國防部治安處聯合偵辦小組 ★
                    </span>
                    <span className="text-[10px] text-red-800 font-bold border border-red-800 px-1 py-0.2 transform rotate-1 rounded font-sans">
                      極機密 · 限閱
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-stone-850 tracking-wider text-center mb-5">
                    治安嫌疑人與背景查核報告
                  </h4>

                  <div className="space-y-4 text-xs md:text-sm text-stone-800 leading-relaxed pl-1">
                    <div>
                      <strong>案號：</strong> L-1961-0023
                    </div>
                    <div>
                      <strong>案由：</strong> 瑠公圳死軀未明分嫌搜查
                    </div>
                    
                    {/* Censored Block 1 (Innocence text) */}
                    <div className="relative py-1 my-2 bg-stone-900 text-stone-900 h-8 rounded px-2 overflow-hidden flex items-center">
                      案查：王姓富商與軍官涉入，經特務組指紋比對與深夜通訊...
                      {/* Black marker mask on top */}
                      <div className="absolute inset-0 bg-stone-950 pointer-events-none" />
                    </div>

                    <div className="text-stone-700">
                      專案結論：此案干預高層利益，查獲之嫌疑人有極強之代罪抗辯。其家屬在報社施加之壓力，已使專案重心轉移至掩飾國安局之越軌調查...
                    </div>

                    {/* Censored Block 2 (Date text) */}
                    <div className="relative py-1 my-2 bg-stone-900 text-stone-900 h-8 rounded px-2 overflow-hidden flex items-center w-3/4">
                      建請將此卷宗永久封存。
                      {/* Black marker mask on top */}
                      <div className="absolute inset-0 bg-stone-950 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-amber-900/20 pt-3 flex justify-between items-center text-[10px] text-stone-600 font-mono">
                  <span>檔案紀錄官：調查員 陳國棟</span>
                  <span>密封編號：L-1961_CEN</span>
                </div>
              </div>

              {/* Dynamic UV Mask Reveal Canvas Overlays */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-100 transition-opacity duration-300"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle 75px at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.45) 0%, rgba(168, 85, 247, 0.05) 75%, transparent 100%)`
                    : "none"
                }}
              />

              {/* Fluorescent Ink Text Layer revealed by clipping mask */}
              <div
                className="absolute inset-0 pointer-events-none text-purple-200 select-none"
                style={{
                  clipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
                  WebkitClipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
                  visibility: isHovered ? "visible" : "hidden",
                }}
              >
                {/* Simulated exact underlying file but with purple glowing text in censored zones */}
                <div
                  className="p-6 h-full flex flex-col justify-between font-serif text-purple-900"
                  style={{
                    background: "radial-gradient(circle at center, #ece1fc 0%, #d8c2fa 100%)",
                  }}
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-purple-400/30 pb-2 mb-4">
                      <span className="text-xs font-mono text-purple-900 tracking-widest font-bold">
                        ★ 紫外線光透視顯示：嫌疑名錄 ★
                      </span>
                      <span className="text-[10px] text-purple-800 font-bold border border-purple-850 px-1 py-0.2 transform rotate-1 rounded font-sans">
                        已破譯
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-purple-900 tracking-wider text-center mb-5">
                      治安嫌疑人與背景查核報告
                    </h4>

                    <div className="space-y-4 text-xs md:text-sm text-purple-950 leading-relaxed pl-1">
                      <div>
                        <strong>案號：</strong> L-1961-0023
                      </div>
                      <div>
                        <strong>案由：</strong> 瑠公圳死軀未明分嫌搜查
                      </div>
                      
                      {/* Censored Block 1 Glowing content */}
                      <div className="py-1 my-2 bg-purple-950 text-emerald-400 font-bold h-8 rounded px-2 flex items-center shadow-inner text-xs md:text-sm border border-emerald-500/30">
                        🚨 特務決簽：王姓男子已排除嫌疑
                      </div>

                      <div className="text-purple-900">
                        專案結論：此案干預高層利益，查獲之嫌疑人有極強之代罪抗辯。其家屬在報社施加之壓力，已使專案重心轉移至掩飾國安局之越軌調查...
                      </div>

                      {/* Censored Block 2 Glowing content */}
                      <div className="py-1 my-2 bg-purple-950 text-amber-300 font-mono font-bold h-8 rounded px-2 flex items-center w-3/4 shadow-inner border border-amber-400/30">
                        🤐 案卷永封日：1961/02/26
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-purple-400/30 pt-3 flex justify-between items-center text-[10px] text-purple-800 font-mono">
                    <span>檔案紀錄官：調查員 陳國棟</span>
                    <span>密封編號：L-1961_CEN</span>
                  </div>
                </div>
              </div>

              {/* Torch Glow Circle Border helper */}
              {isHovered && (
                <div
                  className="absolute pointer-events-none w-[140px] h-[140px] rounded-full border border-purple-500/40 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-600/20"
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`
                  }}
                />
              )}

              {/* Mobile Swipe helper */}
              <div className="absolute bottom-2 right-2 bg-zinc-950/80 px-2 py-1 rounded text-[9px] font-mono text-zinc-400 pointer-events-none block md:hidden">
                👆 划動螢幕透視
              </div>
            </div>
          </div>

          {/* Right: Decoding and Input Gate */}
          <div className="lg:col-span-4 rounded-lg bg-zinc-900 border border-zinc-800 p-5 md:p-6 shadow-xl">
            <h4 className="text-base font-serif font-bold text-amber-200 border-b border-zinc-800 pb-2 mb-4 flex items-center gap-1.5">
              <ShieldAlert size={18} className="text-red-400" />
              破譯安全驗證鎖
            </h4>
            
            <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-sans">
              請用紫光圈仔細搜查左側的案件封裝檔案。尋找到
              <strong className="text-red-400">當初決定封存檔案的那個具體日期</strong>。
              請將其完整地填入下方安全驗證鎖解密（格式：寬字元斜線年/月/日）。
            </p>

            <div className="bg-zinc-950/70 p-3 rounded border border-zinc-900 mb-4 font-mono text-[11px] space-y-1.5 text-zinc-400">
              <div className="flex justify-between">
                <span>嫌疑真相破譯：</span>
                <span className={revealedPart1 ? "text-emerald-400" : "text-amber-500 animate-pulse"}>
                  {revealedPart1 ? "王姓嫌犯被排除" : "【待掃描】"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>封存日期破譯：</span>
                <span className={revealedPart2 ? "text-emerald-400" : "text-amber-500 animate-pulse"}>
                  {revealedPart2 ? "已獲取日期密碼" : "【待掃描】"}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitCode} className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-zinc-300 mb-1">
                  輸入永封檔案日期：
                </label>
                <input
                  type="text"
                  placeholder="例：1961/01/01"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={success}
                  className="w-full bg-zinc-950 rounded border border-zinc-800 p-2.5 text-sm text-amber-100 font-mono tracking-wider focus:outline-none focus:border-red-700 disabled:opacity-50 disabled:text-zinc-500"
                />
              </div>

              {errorMsg && (
                <div className="text-red-400 text-[10px] font-mono leading-normal bg-red-950/20 p-2 rounded border border-red-950/40">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={success || (!revealedPart1 && !revealedPart2)}
                className={`w-full p-2.5 rounded font-serif text-xs tracking-widest font-bold transition-all duration-300 ${
                  success
                    ? "bg-emerald-950 border border-emerald-800 text-emerald-300 cursor-not-allowed"
                    : !revealedPart1 && !revealedPart2
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-transparent"
                    : "bg-red-900/80 hover:bg-red-800 text-white border border-red-800/60 active:scale-95 cursor-pointer"
                }`}
              >
                {success ? "🔓 檔案破譯成功" : "🔍 送出密碼驗證"}
              </button>
            </form>
          </div>
        </div>

        {/* Level Complete Box */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-lg border border-red-900 bg-red-950/20 max-w-xl mx-auto text-center mt-6"
          >
            <CheckCircle className="text-red-500 mx-auto mb-2 animate-bounce animate-duration-1000" size={32} />
            <h4 className="text-lg font-serif font-bold text-red-200">
              【驗證成功：解鎖防護隔層】
            </h4>
            <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed font-serif">
              當年的永久封存日期
              <strong className="text-red-400 text-lg mx-1 font-mono">「1961/02/26」</strong>
              對比無誤！我們得知王姓房東其實早已被排除了兇嫌疑慮，但媒體依然將其大肆醜化，以此大賺眼球。
              這份極機密的黑箱操作檔案，將為接下來的錄音帶解碼與偵查牆大有裨益。
            </p>
            <div className="mt-4 text-xs font-mono text-zinc-400 animate-pulse">
              * 開鎖成功，進入關卡四之中央放音室 *
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
