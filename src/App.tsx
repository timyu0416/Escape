import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, Calendar, HelpCircle, ShieldAlert, Navigation, RotateCcw, 
  MapPin, Clock, Award, ChevronDown, CheckCircle, HelpCircle as HelpIcon, FileText
} from "lucide-react";

import { InventoryItem, LevelState } from "./types";
import CaseIntro from "./components/CaseIntro";
import Level1News from "./components/Level1News";
import Level2Phone from "./components/Level2Phone";
import Level3File from "./components/Level3File";
import Level4Audio from "./components/Level4Audio";
import Level5Wall from "./components/Level5Wall";
import EscapeRoomBooking from "./components/EscapeRoomBooking";
import Inventory from "./components/Inventory";
import HelpfulHints from "./components/HelpfulHints";
import InteractivePoster from "./components/InteractivePoster";
import TheatricalIntro from "./components/TheatricalIntro";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [ending, setEnding] = useState<"A" | "B" | null>(null);
  const [flashActive, setFlashActive] = useState(false);

  // Set initial level states
  const [levels, setLevels] = useState<LevelState[]>([
    { id: 1, name: "新聞拼圖", completed: false, active: true },
    { id: 2, name: "電話紀錄調查", completed: false, active: false },
    { id: 3, name: "封存檔案透視", completed: false, active: false },
    { id: 4, name: "錄音帶解碼", completed: false, active: false },
    { id: 5, name: "嫌疑人推理牆", completed: false, active: false },
  ]);

  // Suitcase inventory clues list
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "news_jigsaw",
      name: "【泛黃報紙碎片】",
      icon: "newspaper",
      description: "拼合完成之大華晚報，反面指紋處蓋有印泥重印『1961』。",
      acquired: false,
    },
    {
      id: "rusty_key",
      name: "【生鏽的黃銅匙】",
      icon: "key",
      description: "警署審訊室檔案格鑰匙，通聯矛盾破綻解開後從桌下摸出，刻有 Romans IV。",
      acquired: false,
    },
    {
      id: "audio_tape",
      name: "【被毀的錄音磁帶】",
      icon: "tape",
      description: "嫌犯寓所搜出之殘卷磁軌，倒轉播音赫然解碼出驚人自白。",
      acquired: false,
    },
    {
      id: "uv_torch",
      name: "【紫外線手電筒】",
      icon: "uv",
      description: "極機密專案配置之便攜探照燈，能穿透奇異筆黑漆、照射防偽防爆墨水。",
      acquired: false,
    },
    {
      id: "classified_holder",
      name: "【未公開調查資料袋】",
      icon: "file",
      description: "軟木連線三角鐵網成立後掉出，指明官豪利益與無辜房東代罪的驚人黑幕。",
      acquired: false,
    },
  ]);

  // Level 1 complete callback
  const handleLevel1Complete = (code: string) => {
    // Mark newspaper acquired
    updateInventory("news_jigsaw", true);
    // Automatically acquire UV torch as reward for finding code 1961
    updateInventory("uv_torch", true);
    // Mark level complete
    completeLevel(1);
    // Unlock level 2
    unlockLevel(2);
  };

  // Level 2 complete callback
  const handleLevel2Complete = (unlockedItems: string[]) => {
    if (unlockedItems.includes("rusty_key")) {
      updateInventory("rusty_key", true);
    }
    if (unlockedItems.includes("audio_tape")) {
      updateInventory("audio_tape", true);
    }
    completeLevel(2);
    unlockLevel(3);
  };

  // Level 3 complete callback
  const handleLevel3Complete = (code: string) => {
    completeLevel(3);
    unlockLevel(4);
  };

  // Level 4 complete callback
  const handleLevel4Complete = (code: string) => {
    completeLevel(4);
    unlockLevel(5);
  };

  // Level 5 complete callback
  const handleLevel5Complete = () => {
    // Acquire the final envelope
    updateInventory("classified_holder", true);
    completeLevel(5);
  };

  // Helper to mark a level complete
  const completeLevel = (levelId: number) => {
    setLevels((prev) =>
      prev.map((lvl) => (lvl.id === levelId ? { ...lvl, completed: true } : lvl))
    );
  };

  // Helper to unlock a level
  const unlockLevel = (levelId: number) => {
    setLevels((prev) =>
      prev.map((lvl) => (lvl.id === levelId ? { ...lvl, active: true } : lvl))
    );
  };

  // Helper to update inventory item acquired status
  const updateInventory = (id: string, state: boolean) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, acquired: state } : item))
    );
  };

  // Handle Double Ending Selection triggers
  const handleEndingChoice = (choice: "A" | "B") => {
    setEnding(choice);
    if (choice === "A") {
      // Trigger short camera shutter flash effect
      setFlashActive(true);
      const timer = setTimeout(() => setFlashActive(false), 800);
      return () => clearTimeout(timer);
    }
  };

  const handleResetEnding = () => {
    setEnding(null);
  };

  // Full puzzle reset shortcut
  const handleFullReset = () => {
    setEnding(null);
    setLevels([
      { id: 1, name: "新聞拼圖", completed: false, active: true },
      { id: 2, name: "電話紀錄調查", completed: false, active: false },
      { id: 3, name: "封存檔案透視", completed: false, active: false },
      { id: 4, name: "錄音帶解碼", completed: false, active: false },
      { id: 5, name: "嫌疑人推理牆", completed: false, active: false },
    ]);
    setInventory([
      {
        id: "news_jigsaw",
        name: "【泛黃報紙碎片】",
        icon: "newspaper",
        description: "拼合完成之大華晚報，反面指紋處蓋有印泥重印『1961』。",
        acquired: false,
      },
      {
        id: "rusty_key",
        name: "【生鏽的黃銅匙】",
        icon: "key",
        description: "警署審訊室檔案格鑰匙，通聯矛盾破綻解開後從桌下摸出，刻有 Romans IV。",
        acquired: false,
      },
      {
        id: "audio_tape",
        name: "【被毀的錄音磁帶】",
        icon: "tape",
        description: "嫌犯寓所搜出之殘卷磁軌，倒轉播音赫然解碼出驚人自白。",
        acquired: false,
      },
      {
        id: "uv_torch",
        name: "【紫外線手電筒】",
        icon: "uv",
        description: "極機密專案配置之便攜探照燈，能穿透奇異筆黑漆、照射防偽防爆墨水。",
        acquired: false,
      },
      {
        id: "classified_holder",
        name: "【未公開調查資料袋】",
        icon: "file",
        description: "軟木連線三角鐵網成立後掉出，指明官豪利益與無辜房東代罪的驚人黑幕。",
        acquired: false,
      },
    ]);
  };

  // Determine active level tab index
  const activeLevelId = levels.find((l) => l.active && !l.completed)?.id || (levels.every(l => l.completed) ? 6 : 1);

  return (
    <div 
      className={`min-h-screen text-stone-200 font-sans transition-colors duration-1000 overflow-x-hidden ${
        ending === "A" 
          ? "bg-red-950" 
          : ending === "B" 
          ? "bg-neutral-950" 
          : "bg-stone-950"
      }`}
    >
      {/* Cinematic Web Entrance Opening Overlay */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="theatrical-open"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <TheatricalIntro onEnter={() => setEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Flash Light effect layered for Ending A shutter trigger */}
      {flashActive && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none flash-active" />
      )}

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Floated Atmosphere header audio bar */}
        <header className="flex justify-between items-center pb-6 border-b border-zinc-900/60 mb-10">
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 tracking-wider">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span>台北市治安檔案 · 重案一級重啟 </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick full reset button */}
            <button
              onClick={handleFullReset}
              className="text-[10px] font-mono text-zinc-500 hover:text-red-400 border border-zinc-900 hover:border-red-900/40 px-2 py-1 rounded transition select-none"
              title="重設所有謎題與進度"
            >
              🔄 重置謎題
            </button>
          </div>
        </header>

        {/* HERO SECTION / Splash View */}
        <div className="relative rounded-2xl border-4 border-zinc-900/60 bg-zinc-950 p-6 md:p-12 mb-12 overflow-hidden shadow-2xl">
          {/* Grudge Backdrop design simulating old Taipei canal drainage sewer & reddish water */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            {/* Base water noise */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1616_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Flowing canal river graphic representation */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-900/35 to-transparent blur-md" />
            {/* Steel sewer drainage grating vectors overlay */}
            <div className="absolute inset-x-0 top-1/4 h-24 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_12px,#450a0a_12px,#450a0a_14px)] opacity-35" />
            {/* Warning tape diagonal stripes in bottom corner */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[repeating-linear-gradient(-45deg,#78350f_0px,#78350f_15px,#09090b_15px,#09090b_30px)] rotate-12 opacity-40 blur-[1px]" />
          </div>

          {/* Warning banner */}
          <div className="relative z-10 bg-red-950/45 border border-red-900 text-red-200 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded inline-block mb-6">
            ☠️ 1960S TAIPEI COLD ARCHIVE: THE UNDER-CANAL INCIDENT
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-black text-amber-50 tracking-wider leading-none">
                瑠下的人
              </h1>
              <h2 className="text-xl md:text-2xl font-serif text-red-600 font-bold tracking-widest mt-2 uppercase">
                《瑠公圳分屍案》主題沉浸式密室逃脫
              </h2>
              <p className="text-sm md:text-base text-zinc-300 max-w-2xl font-serif leading-relaxed">
                這是一座專為深度解謎玩家與懸疑歷史探索者打造的城市實景密室逃脫。
                重回1960年代那個狂熱、封埋的雨夜臺北，化身偵緝隊警助、報社黑笔記者、公設辯護大律師與守水老翁。
                在冰冷的圳下解鎖檔案。
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <a 
                  href="#online-puzzle"
                  className="px-4 py-2 bg-red-900/80 hover:bg-red-800 text-white border border-red-800/60 rounded text-xs tracking-wider transition-all font-serif font-bold flex items-center gap-1.5 active:scale-95"
                >
                  🧩 開始線上解謎體驗
                </a>
                <a 
                  href="#escape-booking" 
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-amber-200 border border-zinc-800 rounded text-xs tracking-wider transition-all font-serif font-bold flex items-center gap-1.5"
                >
                  🗓️ 實體密室售票預約
                </a>
              </div>
            </div>

            {/* Quick Specs badges */}
            <div className="lg:col-span-4 bg-zinc-900/90 p-5 md:p-6 rounded-xl border-2 border-red-950 space-y-4 font-serif shadow-xl">
              <div className="text-xs md:text-sm text-amber-200/90 font-bold border-b border-zinc-800 pb-2">
                🕵️ 密室派遣官方情報規格 (ROOM DETAILS)
              </div>
              
              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60">
                <span className="text-zinc-400">遊戲難度 (Difficulty)</span>
                <span className="text-red-400 font-bold flex items-center gap-1">
                  ★★★☆☆ <span className="text-xs bg-red-950/80 px-1.5 py-0.5 rounded text-red-300 font-mono">3 / 5 顆星</span>
                </span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60">
                <span className="text-zinc-400">時空票價 (Price)</span>
                <span className="text-amber-100 font-bold font-mono">NT$ 500 / 人 / 場</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60">
                <span className="text-zinc-400">組隊人數 (Players)</span>
                <span className="text-amber-100 font-bold">4 － 6 人局</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60">
                <span className="text-zinc-400">探案時間 (Duration)</span>
                <span className="text-amber-100 font-bold">80 分鐘 (含前後解說)</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60 font-serif">
                <span className="text-zinc-400">遊戲位置 (Location)</span>
                <span className="text-amber-100 font-bold">帽子烤密室工廠</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-b border-zinc-850/60 font-serif">
                <span className="text-zinc-400">沉浸特點 (Features)</span>
                <span className="text-emerald-400 font-bold text-xs">半角色扮演式沉浸密室</span>
              </div>

              <div className="text-[11px] text-zinc-400 leading-relaxed pt-1 bg-zinc-950/40 p-2.5 rounded border border-zinc-850">
                💡 <strong>探長密令：</strong>本作品融合了 1960 年代台北三大真實謎案，中等難度的情境解謎，極度考驗隊友通訊與聲音倒播破譯合作，非常適合新手及密室愛好者！
              </div>
            </div>
          </div>
        </div>

        {/* 1. CASE DETAILS / BRIEFINGS */}
        <CaseIntro />

        {/* 1.5 THEATRICAL KEY INTERACTIVE VISUAL POSTER */}
        <div className="my-12" id="key-visual-poster">
          <div className="text-center space-y-2 mb-6">
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              ▼ THEATRICAL POSTER BACKBOARD
            </span>
            <h3 className="text-2xl font-serif text-[#ef4444] font-black tracking-widest">
              《瑠下的人》主題互動視覺看板
            </h3>
            <p className="text-xs text-zinc-400 font-serif max-w-xl mx-auto leading-relaxed">
              這是依據實體高沈浸密室現場海報「還原」之情境佈告板。
              你可以<strong>點擊</strong>海報上的圓月、左右兩側的【大華晚報】、【機密通聯對聯】或【警方案卷遮罩】來解碼未公開細節。
            </p>
          </div>
          <InteractivePoster />
        </div>

        {/* 2. SUITCASE DETECTIVE INVENTORY WIDGET */}
        <div className="my-10" id="detective-suitcase">
          <Inventory items={inventory} activeTab="" setActiveTab={() => {}} />
        </div>

        {/* 3. ONLINE INTERACTIVE SOLVING ZONE HEADER */}
        <div id="online-puzzle" className="border-t border-zinc-900 pt-12 mt-12 mb-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-red-500 bg-red-950/30 border border-red-950 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
              CASE FILE DRILLS LIVE
            </span>
            <h2 className="text-3xl font-serif text-amber-100 font-black mt-3 tracking-widest">
              線上解謎體驗區 (Drills Workspace)
            </h2>
            <p className="text-xs text-zinc-500 max-w-xl mx-auto leading-relaxed">
              請循序漸進攻克下方這五道關卡。每通關一項便能登錄隨身手提箱的證據，
              直至拼接出官僚抹黑王房東、掩埋黃金利益、誤導市民大眾的終極罪網。
            </p>
          </div>

          {/* Quick status timeline path */}
          <div className="flex justify-center items-center gap-2 md:gap-4 my-8 font-serif text-[10px] md:text-xs">
            {levels.map((lvl) => (
              <div 
                key={lvl.id} 
                className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-colors duration-300 ${
                  lvl.completed 
                    ? "bg-emerald-950/40 border-emerald-900 text-emerald-400" 
                    : lvl.active 
                    ? "bg-red-950/20 border-red-900 text-red-300 animate-pulse" 
                    : "bg-zinc-950 border-zinc-950 text-zinc-650"
                }`}
              >
                <span>{lvl.id}.</span>
                <span>{lvl.name}</span>
                {lvl.completed && <span className="font-sans text-[10px]">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* SEQUENTIAL WORKSPACE LAYOUT */}
        <div className="space-y-4">
          
          {/* Level 1: News Jigsaw Jigsaw */}
          <AnimatePresence>
            {levels[0].active && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Level1News onComplete={handleLevel1Complete} isUnlocked={true} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Level 2: Phone Logs Investigation */}
          <AnimatePresence>
            {levels[1].active ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Level2Phone onComplete={handleLevel2Complete} isUnlocked={true} />
              </motion.div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-zinc-950/20 border border-zinc-950 border-dashed text-zinc-700 font-serif text-xs leading-relaxed">
                <span>🔒 【 第二關 · 電話紀錄調查 】：通關第一關 新聞拼圖 後，將獲發首鑰進入通訊聯絡室...</span>
              </div>
            )}
          </AnimatePresence>

          {/* Level 3: Sealed File Lens UV */}
          <AnimatePresence>
            {levels[2].active ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Level3File onComplete={handleLevel3Complete} isUnlocked={true} />
              </motion.div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-zinc-950/20 border border-zinc-950 border-dashed text-zinc-700 font-serif text-xs leading-relaxed">
                <span>🔒 【 第三關 · 封存檔案透視 】：通關第二關 通聯紀錄對決 後，獲發防爆紫外線光圈前往往昔機要格...</span>
              </div>
            )}
          </AnimatePresence>

          {/* Level 4: Cassette Recorder Decoders */}
          <AnimatePresence>
            {levels[3].active ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Level4Audio onComplete={handleLevel4Complete} isUnlocked={true} />
              </motion.div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-zinc-950/20 border border-zinc-950 border-dashed text-zinc-700 font-serif text-xs leading-relaxed">
                <span>🔒 【 第四關 · 錄音帶解碼 】：通關第三關 紫外線印章密碼 1961/02/26 後，本台錄音機會自動解密卡槽...</span>
              </div>
            )}
          </AnimatePresence>

          {/* Level 5: String Board Deduction Wall */}
          <AnimatePresence>
            {levels[4].active ? (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Level5Wall onComplete={handleLevel5Complete} isUnlocked={true} />
              </motion.div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-zinc-950/20 border border-zinc-950 border-dashed text-zinc-700 font-serif text-xs leading-relaxed">
                <span>🔒 【 第五關 · 嫌疑人推理連線牆 】：通關第四關 逐字補全錄音解碼 後，警督將重組偵審牆，為你引渡赤色毛線針...</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. IMPRINT: DOUBLE ENDINGS AREA */}
        <section id="double-endings" className="my-16 border-t border-zinc-900 pt-16">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono text-red-500 bg-red-950/30 border border-red-950 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
              THE MOMENT OF CHOICE
            </span>
            <h2 className="text-3xl font-serif text-amber-100 font-black mt-3 tracking-widest">
              命運命判之門 ── 雙結局大抉擇
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed font-serif">
              當偵訊室底端拼貼出的事實落入你的手手掌心。
              你是要把官商勾結的『未公開資料袋』大白於嗜血大眾；還是一直埋藏，以此平息無妄的冤讎，
              這將重啟1961那夜的塵埃。
            </p>

            {/* Locked indicator if level 5 not completed yet */}
            {!levels[4].completed && (
              <div className="inline-block p-2 bg-red-950/40 border border-red-900 text-[10px] text-red-400 font-mono rounded mt-2">
                🤐 命運雙結局尚未解鎖。請先依次戰勝五個線上解謎互動通關獲得【未公開調查資料袋】。
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Ending A: Open Ledger */}
            <div className="rounded-xl bg-zinc-900/60 border border-zinc-850 p-6 flex flex-col justify-between items-center text-center shadow-xl">
              <div>
                <span className="text-[10px] font-mono text-red-500 bg-red-950/40 tracking-wider px-2 py-0.5 rounded border border-red-900/40">
                  DECISION PATH A
                </span>
                
                <h4 className="text-xl font-serif font-black text-amber-50 mt-4 tracking-wider">
                  A ｜ 公開文件袋
                </h4>

                <p className="text-xs text-zinc-400 leading-relaxed font-serif mt-3">
                  你聯絡起當晚那班熱衷特刊的記者同友。
                  將防部治安處偽造新聞、以冤屈平民為遮羞布的真本白黑字大白、印於所有號外。
                  驚天大雷，民聲愕然。
                </p>
              </div>

              <div className="w-full mt-8 border-t border-zinc-850/60 pt-6">
                <button
                  disabled={!levels[4].completed}
                  onClick={() => handleEndingChoice("A")}
                  className={`w-full py-2.5 rounded font-serif text-xs font-black tracking-widest uppercase transition duration-300 ${
                    !levels[4].completed
                      ? "bg-zinc-950 text-zinc-650 cursor-not-allowed border border-zinc-900"
                      : "bg-red-800 hover:bg-red-700 text-white border border-red-950 active:scale-95 cursor-pointer shadow-lg shadow-red-950/25"
                  }`}
                >
                  {ending === "A" ? "✓ 已判定此軌結局" : "🔴 做出判定：公開真相"}
                </button>
              </div>
            </div>

            {/* Ending B: Seal Ledger */}
            <div className="rounded-xl bg-zinc-900/60 border border-zinc-855 p-6 flex flex-col justify-between items-center text-center shadow-xl">
              <div>
                <span className="text-[10px] font-mono text-blue-500 bg-blue-952/40 tracking-wider px-2 py-0.5 rounded border border-blue-900/40">
                  DECISION PATH B
                </span>

                <h4 className="text-xl font-serif font-black text-amber-50 mt-4 tracking-wider">
                  B ｜ 永久封存
                </h4>

                <p className="text-xs text-zinc-400 leading-relaxed font-serif mt-3">
                  你接過特警隊那盒殘存磁軌，將它丟入了融爐中。
                  這袋能引起全城震顫、洗刷冤讎的指明件，將同它含恨九泉的主人、
                  以及沈沒於圳流泥濘之中的腐骨一同在時空中風化不復。
                </p>
              </div>

              <div className="w-full mt-8 border-t border-zinc-855/60 pt-6">
                <button
                  disabled={!levels[4].completed}
                  onClick={() => handleEndingChoice("B")}
                  className={`w-full py-2.5 rounded font-serif text-xs font-black tracking-widest uppercase transition duration-300 ${
                    !levels[4].completed
                      ? "bg-zinc-950 text-zinc-650 cursor-not-allowed border border-zinc-900"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-950 active:scale-95 cursor-pointer shadow-lg shadow-black/40"
                  }`}
                >
                  {ending === "B" ? "✓ 已判定此軌結局" : "🔵 做出判定：永久埋藏"}
                </button>
              </div>
            </div>
          </div>

          {/* Render Active Dramatic Ending Outcome Card with beautiful entry transitions */}
          <AnimatePresence>
            {ending && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="mt-12 max-w-3xl mx-auto rounded-xl p-8 relative overflow-hidden shadow-2xl border text-center"
                style={{
                  background: ending === "A" 
                    ? "radial-gradient(circle at center, #7f1d1d 0%, #450a0a 100%)" 
                    : "radial-gradient(circle at center, #1b1c1e 0%, #0c0c0e 100%)",
                  borderColor: ending === "A" ? "#dc2626" : "#27272a"
                }}
              >
                {/* Visual backdrops */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <h3 className="font-serif text-2xl md:text-3xl font-black text-amber-100 tracking-widest uppercase mb-4">
                  {ending === "A" ? "【 選擇 A 的歷史宣告 ── 喧囂的白晝 】" : "【 選擇 B 的歷史宣告 ── 幽閉的深淵 】"}
                </h3>

                <p className="font-serif text-base md:text-lg text-amber-50/90 leading-relaxed max-w-2xl mx-auto tracking-wide my-4">
                  {ending === "A" 
                    ? "「你們選擇了公開真相... 大家在乎的，真的是事實嗎？」" 
                    : "「你們選擇讓一切停在這裡... 有些錯誤，再也不會有人承認。」"}
                </p>

                <p className="font-serif text-xs text-zinc-300 leading-normal max-w-xl mx-auto py-2 border-t border-white/15">
                  {ending === "A" 
                    ? "市民在接過號外後，爆發出高潮般的叫好。然而僅僅三天，隨著治安處拋出新一輪情婦與金條疑懼，所有人再次投身到批判新疑點的狂歡中。那具最初的女屍和無辜冤死房東的血衣，隨即被掃入歷史的塵埃，再也沒有人真正在意。"
                    : "在炙熱的手爐前，資料袋化為灰燼。街坊依然在傳說王姓房東是惡魔下凡、死於天譴。官員在歌舞昇平中退休，無名女屍也再也無法歸根。你走出審訊大樓，黑色的雨水淋濕臉龐，你懂得，這是一場永不落幕的沈默私刑。"}
                </p>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={handleResetEnding}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:text-white transition flex items-center gap-1.5"
                  >
                    <RotateCcw size={12} />
                    <span>重讀命運，查看另一结局</span>
                  </button>
                  <a
                    href="#escape-booking"
                    className="px-4 py-2 rounded bg-amber-900/80 hover:bg-amber-800 border border-amber-800/40 text-xs font-serif font-bold text-amber-100 transition"
                  >
                    🎟️ 立即預約實體場館
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 5.5 BACKGROUND DECORATION */}

        {/* 6. HELP HINTS & LORE HANDBOOK */}
        <HelpfulHints />

        {/* 7. REAL INTERACTIVE BOOKING PORTAL */}
        <EscapeRoomBooking />

        {/* Dynamic Footer with responsive spacing */}
        <footer className="mt-20 pt-8 border-t border-zinc-900 text-center font-serif text-[10px] md:text-xs text-zinc-650 space-y-2">
          <div>© 1961 - 2026 臺北《瑠下的人》沉浸式密室大作宣傳辦會公所</div>
          <div className="font-mono opacity-40">
            ★ METADATA-RECORD: CH-1961-02-26_SECURE-1961 ★
          </div>
        </footer>
      </div>
    </div>
  );
}
