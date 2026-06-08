import { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, Eye, ShieldAlert, Award, Volume2, FileText, MapPin, Users, Clock } from "lucide-react";

export default function InteractivePoster() {
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [redactedRevealed, setRedactedRevealed] = useState(false);

  // Clues dictionary for interactive hover/click feedback
  const interactiveClues = {
    news: {
      title: "📰 1961 瑠公圳分屍案頭條",
      text: "「大安區瑠公圳段昨驚現重疊密封防水麻袋，撈出雙足砍斷、頭顱不知去向之無名慘死女屍...全台輿論大譁！」",
      sub: "報紙印刷油墨未乾，邊緣滿佈血手印。"
    },
    tape: {
      title: "📼 【無聲錄音帶】",
      text: "「播放起細微的流水聲、沉重的喘息聲，和在倒播時依稀浮現的保安處編號語音自白...」",
      sub: "帶殼表面因灼燒部分損毀，貼有極機密分銷章。"
    },
    police: {
      title: "👮 警方內部調查案卷",
      text: "「王秀蘭之兄長嫌疑已獲法醫判定指紋完全不合。內部報告被高層責令塗黑強壓，對外宣稱其仍是重大惡魔疑犯。」",
      sub: "案卷蓋有『極機密』朱砂橢圓章，且被粗黑奇異筆多次塗鴉遮蓋。"
    },
    gossip: {
      title: "🗣️ 報社內部教條",
      text: "「『越聳動，報紙越賣。』主筆林志遠的抽屜草稿簿，密密麻麻寫滿了在分屍案被發現前就擬定好的驚悚標題。」",
      sub: "金錢與銷量至上的筆桿，有時比兇悍砍刀更殺人不眨眼。"
    },
    moon: {
      title: "🌒 瑠下圓月與陰影",
      text: "「水面上那一輪血紅妖月，冷冷俯瞰著台北城暗夜下的強暴。陰影中頭戴斗笠/圓帽的男子，究竟是誰的影子？」",
      sub: "當晚留在橋墩旁，帶有最高司令部鋼印的信卡在血水中載浮載沉。"
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl border-4 border-red-950/50 bg-stone-950 p-4 md:p-8 overflow-hidden shadow-2xl my-8 font-serif select-none">
      
      {/* Dynamic Red String Grid Lines representing the deduction boards links behind poster elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="85%" y1="20%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="1" />
          <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>
      </div>

      {/* Top Banner Context */}
      <div className="text-center space-y-1 relative z-10">
        <div className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-1">
          ✦ 1961.02.26 ✦
        </div>
        <div className="text-xs md:text-sm text-zinc-400 tracking-wider">
          ─── 台大周邊，一段被歷史遺忘的驚天重案 ───
        </div>
      </div>

      {/* Main Theatrical Poster Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6 relative z-10">
        
        {/* Left Columns: Pinned Clues */}
        <div className="md:col-span-4 space-y-6 flex flex-col justify-between h-full">
          
          {/* 1. Newspaper Scrap */}
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -2 }}
            onClick={() => setActiveClue(activeClue === "news" ? null : "news")}
            className={`p-4 bg-amber-50/10 hover:bg-amber-50/15 rounded border border-amber-900/40 shadow-xl cursor-pointer transition-colors relative ${
              activeClue === "news" ? "ring-2 ring-red-500" : ""
            }`}
          >
            {/* Pinned visual icon */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-zinc-400 font-mono text-xs">📌</div>
            <h3 className="text-red-500 font-bold text-sm leading-tight tracking-wider mb-1">
              瑠公圳驚現女屍<br/>全台震驚！
            </h3>
            <span className="text-[10px] text-zinc-400 block border-t border-zinc-900/40 pt-1 mt-1 font-sans">
              警方尚未公布嫌犯身分...
            </span>
          </motion.div>

          {/* 2. Headline Note */}
          <motion.div 
            whileHover={{ scale: 1.03, rotate: 1 }}
            onClick={() => setActiveClue(activeClue === "gossip" ? null : "gossip")}
            className="p-4 bg-zinc-900/90 border border-zinc-800 rounded shadow-md cursor-pointer relative"
          >
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600/70" />
            <p className="text-amber-100/90 text-xs leading-relaxed italic">
              「越聳動，<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;報紙越賣。」
            </p>
            <div className="text-[9px] text-zinc-500 mt-2 font-mono text-right">- 摘自志遠案頭草編</div>
          </motion.div>

          {/* 3. Red Question Note */}
          <div className="p-3 bg-red-950/20 border border-red-900/30 rounded text-center">
            <span className="text-red-400 text-xs font-bold block animate-pulse">真相？</span>
          </div>

        </div>

        {/* Center Canvas Column: Circle Portal (Visual Core of Poster) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col justify-between p-4 group">
            
            {/* Blood Circular Vignette Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-black/90 z-0" />
            
            {/* Immersive Red Full Moon Backdrop */}
            <div 
              onClick={() => setActiveClue(activeClue === "moon" ? null : "moon")}
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-b from-red-200 to-red-950/90 filter blur-[0.5px] opacity-70 z-0 shadow-inner cursor-pointer" 
            />

            {/* Silhouetted Man Wearing Hat */}
            <div className="absolute inset-0 flex items-center justify-center z-12 pointer-events-none opacity-90">
              <svg className="w-40 h-40 text-black translate-y-3" viewBox="0 0 100 100" fill="currentColor">
                {/* Bucket Hat/Fisherman Hat shape matching poster */}
                <path d="M 30 55 C 30 50, 70 50, 70 55 L 75 57 C 80 59, 20 59, 25 57 Z" />
                <path d="M 40 50 C 40 38, 60 38, 60 50 Z" />
                {/* Silhouette Face & shoulders */}
                <path d="M 43 56 C 43 54, 46 51, 48 53 C 50 55, 48 57, 50 58 C 52 59, 55 58, 57 61 C 58 63, 56 65, 54 65 Z" />
                <path d="M 35 75 C 35 63, 65 63, 65 75 Z" fill="#030712" />
              </svg>
            </div>

            {/* Canal Arch bridge and Dark Water lines */}
            <div className="absolute bottom-6 inset-x-0 h-16 border-t border-zinc-900 bg-stone-950/85 flex flex-col justify-end z-10 pointer-events-none">
              {/* Arch Silhouette representing the bridge water outlet in the poster */}
              <div className="w-16 h-8 bg-zinc-950 rounded-t-full mx-auto border-t border-red-950/40" />
            </div>

            {/* Threatening hands rising / Emerging from canal water representing poster hand */}
            <div className="absolute bottom-0 inset-x-0 h-14 z-20 pointer-events-none flex justify-center items-center">
              <svg className="w-20 h-12 text-zinc-900" viewBox="0 0 100 50" fill="currentColor">
                {/* Hand claws and blood ripples */}
                <path d="M 50 45 C 45 42, 42 35, 45 32 C 48 29, 50 37, 52 35 C 54 33, 52 28, 55 26 C 58 24, 60 27, 59 31 C 61 31, 64 26, 67 27 C 70 28, 67 35, 66 38 Z" fill="#0d0d0d"/>
                {/* Blood red ripples around hand */}
                <ellipse cx="50" cy="42" rx="25" ry="4" fill="none" stroke="#7f1d1d" strokeWidth="1.5" />
                <ellipse cx="50" cy="42" rx="15" ry="2" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              </svg>
            </div>

            {/* Circular Text labels */}
            <div className="relative z-20 text-center py-2 h-full flex flex-col justify-between">
              <div className="text-[13px] tracking-[0.15em] font-black text-amber-50 drop-shadow-md">
                瑠下的人
              </div>
              
              <div className="text-[10px] tracking-[0.2em] font-bold text-red-500 bg-black/60 px-2 py-0.5 rounded mx-auto mb-1">
                真相，該被公開嗎？
              </div>
            </div>

          </div>

          <div className="mt-4 text-center">
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              The Under-Canal Incident Visual Core
            </span>
            <span className="text-xs text-red-400 font-bold block mt-1 tracking-widest">
              【 誰在說謊？ 】
            </span>
          </div>

        </div>

        {/* Right Columns: Evidence & Redaction Dossiers */}
        <div className="md:col-span-4 space-y-6 flex flex-col justify-between h-full">
          
          {/* 1. Police Secret Case File (Redacted) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-stone-900 border border-amber-900/30 rounded-lg shadow-xl relative"
          >
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
              <span className="text-[10px] font-mono text-amber-200 tracking-wider">警方內部調查紀錄</span>
              <button
                type="button"
                onClick={() => setRedactedRevealed(!redactedRevealed)}
                className="px-1.5 py-0.5 rounded bg-red-950 text-[9px] text-red-200 border border-red-900 hover:bg-red-900 transition flex items-center gap-1 cursor-pointer"
              >
                <Eye size={10} />
                {redactedRevealed ? "覆蓋黑條" : "破解紅線遮罩"}
              </button>
            </div>

            <div className="space-y-2 text-[10px] leading-relaxed">
              <p className="text-zinc-400">
                <span>犯嫌姓名：</span>
                <span className={redactedRevealed ? "text-emerald-400" : "bg-zinc-950 px-6 inline-block text-[1px] select-none"}>
                  王姓退伍房東 (已洗清)
                </span>
              </p>
              
              <p className="text-zinc-400">
                <span>真兇身分：</span>
                <span className={redactedRevealed ? "text-red-400 underline font-bold" : "bg-zinc-950 px-12 inline-block text-[1px] select-none"}>
                  某保安司令部高層子嗣
                </span>
              </p>

              <div className="h-4 bg-zinc-950 rounded flex items-center px-2 opacity-80 text-[8px] justify-between">
                <span className="text-zinc-500">SECRET REDACTED</span>
                <span className="text-red-600 font-mono">CLASSIFIED 1961</span>
              </div>
            </div>

            <span 
              onClick={() => setActiveClue(activeClue === "police" ? null : "police")}
              className="text-[9px] text-amber-200/80 cursor-pointer hover:underline block text-right mt-2"
            >
              詳細機密卷宗內容...
            </span>
          </motion.div>

          {/* 2. Tape Cassette Widget */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveClue(activeClue === "tape" ? null : "tape")}
            className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg shadow-xl p-3 flex items-center gap-3 cursor-pointer"
          >
            {/* Tape spools animation */}
            <div className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center relative flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse block" />
              <div className="absolute inset-1 border border-zinc-800/40 rounded flex justify-around items-center">
                <div className="w-2.5 h-2.5 rounded-full border border-dashed border-zinc-650 animate-spin" />
                <div className="w-2.5 h-2.5 rounded-full border border-dashed border-zinc-650 animate-spin" />
              </div>
            </div>
            
            <div className="font-serif">
              <h4 className="text-xs text-zinc-100 font-bold">無聲錄音帶</h4>
              <p className="text-[9px] text-zinc-500 font-sans mt-0.5">輿論渲染背後的真實自白音源...</p>
            </div>
          </motion.div>

          {/* 3. Gossip Note */}
          <div className="p-3 bg-zinc-950 rounded border border-zinc-900/60 shadow-inner flex justify-between items-center">
            <span className="text-zinc-500 text-[10px] font-mono">輿論？</span>
            <span className="text-[10px] text-amber-250 italic font-mono">Who is lying?</span>
          </div>

        </div>

      </div>

      {/* Clue Details Drawers Layer */}
      <div className="relative z-20 min-h-[70px] mt-2 mb-4">
        {activeClue ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-950/15 border border-red-900/40 font-serif leading-relaxed text-xs"
          >
            {(() => {
              const clue = interactiveClues[activeClue as keyof typeof interactiveClues];
              return (
                <>
                  <div className="flex justify-between items-center text-red-300 font-bold mb-1 pb-1 border-b border-red-950">
                    <span>{clue.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500">EVIDENCE DOSSIER</span>
                  </div>
                  <p className="text-zinc-200 mt-1">{clue.text}</p>
                  <p className="text-[10px] text-zinc-500 italic mt-1.5">{clue.sub}</p>
                </>
              );
            })()}
          </motion.div>
        ) : (
          <div className="text-center p-4 rounded-lg border border-dashed border-zinc-900 text-zinc-500 text-xs">
            💡 <strong>探案指引：</strong>點擊海報兩側的【泛黃報紙碎片】、【新聞稿筆記】、【機密調查案卷】或【錄音磁帶】，可撥開歷史迷霧並在下方查看對應的詳細證言物證。
          </div>
        )}
      </div>

      {/* Bottom Information Specs row matching exact poster bottom spec line */}
      <div className="border-t-2 border-amber-900/30 pt-4 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs relative z-10 text-amber-100/90 font-serif">
        <div className="flex items-center justify-center gap-2 py-1 bg-zinc-900/40 rounded border border-zinc-900">
          <MapPin size={14} className="text-red-500" />
          <span>帽子烤密室工廠 (台大公館附近)</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-1 bg-zinc-900/40 rounded border border-zinc-900">
          <Users size={14} className="text-red-500" />
          <span>建議人數：4 - 6 人局合作</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-1 bg-zinc-900/40 rounded border border-zinc-900">
          <Clock size={14} className="text-red-500" />
          <span>體驗時長：約 80 分鐘 (含解說)</span>
        </div>
      </div>

    </div>
  );
}
