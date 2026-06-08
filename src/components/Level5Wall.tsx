import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, RefreshCw, CheckCircle, FileWarning, Eye, ZoomIn, Info, BrainCircuit, Link2, Unlock, Layers, Pin, Check } from "lucide-react";

interface NodeItem {
  id: string;
  type: "suspect" | "timeline" | "evidence" | "filler";
  label: string;
  short: string;
  snippet: string;
  detailedCase: string; // Big fonts for detailed inspection
  timeMark?: string; // Bold time stamp for puzzle element
  consequence?: string; // The significance of the clue
  imageColor: string;
  isCorrect: boolean;
}

interface Level5WallProps {
  onComplete: () => void;
  isUnlocked: boolean;
}

export default function Level5Wall({ onComplete, isUnlocked }: Level5WallProps) {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [inspectingNode, setInspectingNode] = useState<NodeItem | null>(null);

  // Core nodes updated for maximum readability, huge high contrast, and simplified grid layout
  const boardNodes: NodeItem[] = [
    {
      id: "node_suspect_innocent",
      type: "suspect",
      label: "📷 A. 泛黃的長兄肖像",
      short: "嫌疑人王長安的肖像與罪嫌檔案",
      snippet: "【遭媒體與警方指定之惡魔】死者王秀蘭的親兄長。在調查尚未開始前，其姓名及背景即遭到某報社與保密高層洩密、提前印製並蓋棺定論。",
      detailedCase: "這是死者王秀蘭的長兄王長安。在命案爆發的第一天，大華晚報即刊載他是『瑠公圳弒妹惡魔』。他最終在拘留所中因名譽盡毀、憤而自盡。然而，事後警方鑑定檔案透露：裝屍麻袋上的兩組指紋與他完全不同，他是被政商高層指定推上斷頭台的無辜代罪羊。",
      timeMark: "⚠ 報社登報定罪：2月26日早晨即印發頭條",
      consequence: "關鍵：他是官方高層需要迅速拋出、用以平息社會疑竇的完好擋箭牌。",
      imageColor: "from-red-950 via-neutral-900 to-red-950 border-red-800/80",
      isCorrect: true,
    },
    {
      id: "node_timeline_correct",
      type: "timeline",
      label: "📂 B. 警防部第 04 號密卷",
      short: "大安巡官陳國棟登案電報公文",
      snippet: "【官方最早發現記錄】陳國棟巡官親筆登載：『2月26日上午 10:00，巡官接獲市民密報，首次鑿開瑠公圳泥底下的麻袋並封鎖現場。』",
      detailedCase: "這是大安分局檔案庫中被秘密截留的最初抄件。公文白紙黑字寫道：『巡官陳國棟於2月26日上午10點00分打破大麻袋初次發現軀體。』這是整個歷史上，官民首次得知並正式接觸麻袋內遺體與分屍慘相的絕對起點時間。",
      timeMark: "⏱ 警方發現時間：2月26日上午 10:00 (官方首次發現)",
      consequence: "絕對前提：在此時間（10:00）以前，世上不應該有任何普通百姓或報社記者知道袋子裡裝的是何人、或是如何分屍的細節。",
      imageColor: "from-amber-950 via-neutral-900 to-amber-950 border-amber-800/80",
      isCorrect: true,
    },
    {
      id: "node_evidence_fabrication",
      type: "evidence",
      label: "✍️ C. 未公開手稿私卷",
      short: "主筆林志遠的預備分屍手稿",
      snippet: "【主筆預先成稿】從大華晚報社搜出的主筆草擬原稿。上面戳印的時間是『2月26日上午 08:00』，比警方發現屍體提早了兩個小時！",
      detailedCase: "這是主筆林志遠私人抽屜中未及銷毀的原創手稿。手稿寫作時間為『2月26日上午 08點00分』。稿內極其不可思議地、生動地寫下：『瑠公圳驚現分屍女屍，兇嫌為王長安...』等警方在 10點 才發掘出的秘密。此為高層與報社串聯分贓、提前設計好案件劇本的最強鐵證！",
      timeMark: "⏱ 報社稿件定稿：2月26日上午 08:00 (時空悖論破綻)",
      consequence: "致命矛盾：林主筆在警察都還沒打破泥底垃圾袋的前2個小時，就寫好了女屍死因和哥哥是兇手！明顯是一場政治謀劃！",
      imageColor: "from-blue-950 via-neutral-900 to-blue-950 border-blue-800/80",
      isCorrect: true,
    },
    {
      id: "node_filler_soldier",
      type: "filler",
      label: "🛡️ D. 憲兵哨所值勤務表",
      short: "鄰近營區班哨執勤日誌",
      snippet: "【旁支混淆線索】大安哨兵深夜2點聽聞有重型卡車滑行，後經督察大隊證實與本案無直接干涉，是普通居民走私口角。",
      detailedCase: "大安第一分隊班哨的深夜日誌。雖然提及深夜警用轎車熄燈形跡可疑，但後續已證實為當晚大安地區特務機構與黑市煙販約定走物資的私交易。並非分屍掩護的主謀時間環節，與謀取王氏長兄無直接時序矛盾。",
      timeMark: "旁支無關干擾時間",
      consequence: "不相關：雖有神秘感，但無法直接用以指出新報社與警方提早2小時的悖論時戳。",
      imageColor: "from-zinc-900 via-neutral-950 to-zinc-900 border-zinc-800",
      isCorrect: false,
    },
    {
      id: "node_filler_witness",
      type: "filler",
      label: "🗣️ E. 鄰居添福叔口供草案",
      short: "圍觀鄰人閃爍其詞的筆錄",
      snippet: "【旁支混淆線索】住在水閘門旁的添福叔筆錄。他聲稱看見黑色公務車經過，後因保密壓力在正本口供中完全刪除。",
      detailedCase: "圳渠邊農民添福叔的初步手抄筆錄。他提及當晚有大轎車滑行而過，車燈緊閉。雖然此證詞透露出軍憲或高層車輛曾出現，但並無直接透露、或可證實報社與警方在26日上午出現的『2小時時空穿幫』細節。",
      timeMark: "旁支無關干擾時間",
      consequence: "不相關：屬於旁證，但無法單純一舉穿透報商高層串聯的鐵壁陰謀。",
      imageColor: "from-zinc-900 via-neutral-950 to-zinc-900 border-zinc-800",
      isCorrect: false,
    },
    {
      id: "node_filler_autopsy",
      type: "filler",
      label: "🧴 F. 裹屍布潤劑化驗單",
      short: "大安浸潤精油與纖維物證",
      snippet: "【旁支混淆線索】檢出大麻袋邊角含有軍用品等級的少見香茅精油。主要為物理分子報告，對論證時空預謀沒有足夠強度。",
      detailedCase: "這是法醫特別追加化驗的紙件。麻袋纖維帶有軍方才配給享有的蘇打香茅防磨油，藉此可以懷疑有不法軍政物資涉及，但此份自然化學報告在實證『提前預定罪犯、提前撰寫報導』的時間矛盾上，並不符合最快攻克陰謀的鋼鐵邏輯鏈。",
      timeMark: "旁支無關干擾時間",
      consequence: "不相關：屬於鑑識補充物證，但非擊破大華日報與偵警隊高層聯合捏造大劇本的最中心漏洞。",
      imageColor: "from-zinc-900 via-neutral-950 to-zinc-900 border-zinc-800",
      isCorrect: false,
    },
  ];

  // Simply toggle selection on click
  const handleNodeClick = (nodeId: string) => {
    if (success) return;

    setSelectedNodes((prev) => {
      // If already selected, remove it
      if (prev.includes(nodeId)) {
        const next = prev.filter((id) => id !== nodeId);
        checkWinningNodes(next);
        return next;
      }

      // If less than 3 cards are selected, just add it
      if (prev.length < 3) {
        const next = [...prev, nodeId];
        checkWinningNodes(next);
        return next;
      }

      // If 3 cards are already selected, swap the oldest out (FIFO queue)
      const next = [...prev.slice(1), nodeId];
      checkWinningNodes(next);
      return next;
    });
  };

  // Check victory condition: Must have exactly selected A, B, and C
  const checkWinningNodes = (list: string[]) => {
    const required = ["node_suspect_innocent", "node_timeline_correct", "node_evidence_fabrication"];
    // Check if list contains all required IDs
    const won = required.every((reqId) => list.includes(reqId));
    if (won) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  const autoSolveWall = () => {
    const solution = ["node_suspect_innocent", "node_timeline_correct", "node_evidence_fabrication"];
    setSelectedNodes(solution);
    setSuccess(true);
    // Auto set inspecting node as well for visual richness
    const targetNode = boardNodes.find(n => n.id === "node_evidence_fabrication");
    if (targetNode) setInspectingNode(targetNode);
  };

  const resetConnections = () => {
    setSelectedNodes([]);
    setSuccess(false);
    setOpenEnvelope(false);
    setInspectingNode(null);
  };

  const handleEnvelopeClick = () => {
    setOpenEnvelope(true);
    onComplete();
  };

  return (
    <section id="level-5-wall" className="my-12 p-6 md:p-10 rounded-2xl border-2 border-red-900 bg-stone-950 relative overflow-hidden shadow-2xl">
      {/* Visual background atmospheric effects */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/85 to-black pointer-events-none opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Simplified Header - Massive readable spacing */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6 border-b border-stone-850">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase font-mono px-3.5 py-1.5 bg-red-950 text-red-400 border border-red-900 font-black tracking-widest rounded-md">
                最終物證解讀 ── LEVEL 5
              </span>
              <span className="text-xs text-amber-500 font-mono font-bold">
                【極速點選通關 ‧ 全新大字體大按鈕模式】
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-amber-100 font-black tracking-widest mt-3.5">
              破案關鍵：嫌疑人與時空悖論牆
            </h3>
            <p className="text-base text-stone-300 font-serif leading-relaxed mt-2.5 max-w-4xl">
              探長，為了把本分屍案迅速推在無辜的王家長兄身上，警政高層與晚報媒體布了一言堂大局。
              但他們犯了<strong>「時間流動」的低級邏輯錯誤</strong>。
              請仔細核對以下卡片中的「時間戳記」，並將其中的時空悖論抓出！
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full xl:w-auto">
            {/* BIG SHINY BYPASS BUTTON */}
            <button
              type="button"
              onClick={autoSolveWall}
              className="px-4 py-3 text-sm font-sans font-black rounded-lg bg-amber-900 hover:bg-amber-800 text-stone-100 border border-amber-950 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-950/40 flex items-center gap-2"
              title="字太小、卡關或想直接通關？點擊此鈕會由偵探思緒直接一鍵完成連線解答！"
            >
              <BrainCircuit size={17} className="text-amber-250 animate-pulse" />
              <span>⚡ 給我答案 / 直接破關！</span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-2.5 text-xs font-mono rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition duration-300 cursor-pointer flex items-center gap-1.5 hover:border-zinc-500"
            >
              <HelpCircle size={14} className="text-red-400" />
              <span>思路邏輯提示</span>
            </button>

            <button
              type="button"
              onClick={resetConnections}
              className="px-3.5 py-2.5 text-xs font-mono rounded-lg bg-red-950/20 hover:bg-red-900/40 text-red-300 border border-red-900/40 transition duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>重設卡片</span>
            </button>
          </div>
        </div>

        {/* Dynamic Clue Hint Box - Easy to read */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-5 rounded-xl bg-orange-950/20 border-2 border-amber-900/50 text-stone-200 font-serif leading-relaxed shadow-inner"
            >
              <div className="font-bold text-amber-200 flex items-center gap-2 mb-2 text-base">
                <Info size={18} className="text-amber-400 animate-bounce" />
                <span>偵探提示 ── 最簡單的真相破解法：</span>
              </div>
              <p className="text-stone-300 text-sm">
                報社在警方宣布破案前就提前寫好了新聞。要揭穿此謊言，只要在下方卡片中<strong>依次點選以下 3 張時空穿幫卡片</strong>（身上會鎖上紅色圓頭釘並自動扯起毛線）：
              </p>
              <ul className="list-decimal pl-5 mt-2.5 space-y-2 text-stone-300 text-sm">
                <li><strong className="text-red-400 font-bold">【📷 A. 泛黃的長兄肖像】</strong>（首位被預謀當作惡魔、含屈自殺的代罪羔羊）</li>
                <li><strong className="text-amber-400 font-bold">【📂 B. 警防部第 04 號密卷】</strong>（上面記載警方在 <span className="text-yellow-400 font-mono font-bold bg-stone-900 px-1 py-0.5 rounded border border-stone-800">2月26日上午 10:00</span> 才初次割開麻袋發現遺體）</li>
                <li><strong className="text-blue-400 font-bold">【✍️ C. 未公開手稿私卷】</strong>（大華晚報主筆竟然在警方戳穿袋子二小時前的 <span className="text-blue-400 font-mono font-bold bg-stone-900 px-1 py-0.5 rounded border border-stone-800">早上 08:00</span> 就動筆精準寫完了分屍細節新聞！）</li>
              </ul>
              <p className="mt-3 text-amber-250 font-bold border-t border-amber-900/30 pt-2.5 text-sm">
                💡 通關操作：直接在下面 6 張大字體卡片中，點選「A」、「B」、「C」三張，讓它們變成紅色連線狀態，真相箱就會發光浮現！
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simplified Active Connections Tracker */}
        <div className="bg-black/60 border border-stone-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-red-500 animate-pulse animate-duration-1000" />
            <span className="text-sm font-sans font-bold text-stone-300">
              當前已釘入之致命時空焦點 ({selectedNodes.length} / 3)：
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {boardNodes.map((node) => {
              const matched = selectedNodes.includes(node.id);
              if (!matched) return null;
              return (
                <div
                  key={node.id}
                  className="px-3.5 py-1.5 rounded-lg bg-red-950/80 text-red-200 border-2 border-red-800 shadow-md flex items-center gap-2 font-serif text-xs font-black animate-slide-in"
                >
                  <Pin size={12} className="text-red-400" />
                  <span>已拉線 ─ {node.label.split(".")[0]}線索</span>
                </div>
              );
            })}
            {selectedNodes.length === 0 && (
              <span className="text-stone-500 font-mono text-xs italic">[ 尚未選取任何線索卡，請點選下方卡片 ]</span>
            )}
          </div>
        </div>

        {/* RE-ARCHITECTED BENTO GRID OF GIANT DOSSIER CARDS (Extremely Easy to click, Beautiful & Large Fonts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardNodes.map((node) => {
            const isSelected = selectedNodes.includes(node.id);
            const isTarget = node.isCorrect;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className={`relative rounded-2xl p-5 md:p-6 border-2 text-stone-100 shadow-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer select-none flex flex-col justify-between items-stretch min-h-[340px] ${
                  isSelected
                    ? "border-red-650 bg-radial-gradient from-red-950/45 via-neutral-950/95 to-neutral-950/95 shadow-[-1px_15px_30px_rgba(239,68,68,0.25)] ring-4 ring-red-700/60 z-10"
                    : "border-stone-800 hover:border-stone-600 bg-gradient-to-b from-neutral-950 to-stone-950 hover:from-neutral-900/80 hover:to-stone-900/80 shadow-lg"
                }`}
              >
                
                {/* Visual tactile pin slot decoration */}
                <div className="flex justify-between items-center border-b border-stone-900 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Glowing active pin */}
                    <div className="w-6 h-6 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center relative shadow">
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                          isSelected ? "bg-red-500 scale-125 animate-ping" : "bg-neutral-800"
                        }`}
                      />
                      <div className={`absolute w-3 h-3 rounded-full ${isSelected ? "bg-red-500" : "bg-neutral-700"} `} />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-stone-500">
                      物證索引 ID: {node.id.split("_")[1].toUpperCase()}
                    </span>
                  </div>

                  {/* Accessible select checkmark */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "bg-red-600 border-red-500 text-stone-100" : "border-stone-700 bg-black/40 text-transparent"
                  }`}>
                    <Check size={14} className="stroke-[3.5]" />
                  </div>
                </div>

                {/* Massive readable title and descriptions */}
                <div className="space-y-3 flex-1 flex flex-col justify-start">
                  <h4 className="text-lg md:text-xl font-serif font-black text-amber-200 tracking-wide">
                    {node.label}
                  </h4>
                  
                  {/* Dense snippet */}
                  <p className="text-sm font-sans font-bold text-stone-200 leading-relaxed bg-black/35 p-3 rounded-lg border border-stone-900/60 font-serif">
                    {node.snippet}
                  </p>

                  {/* Bold custom time status stamp (Main puzzle helper) */}
                  <div className="mt-2 text-xs font-mono py-1.5 px-2 bg-stone-900/90 rounded border border-stone-800 text-amber-500 font-bold">
                    {node.timeMark}
                  </div>
                </div>

                {/* Bottom button controls - Giant touch targets */}
                <div className="pt-4 border-t border-stone-900/60 mt-4 flex justify-between items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectingNode(node);
                    }}
                    className="px-3.5 py-2 text-xs font-mono tracking-wider bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-md border border-stone-800 hover:border-stone-500 flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow"
                  >
                    <ZoomIn size={13} className="text-amber-400" />
                    <span>👁 放大查閱大字體</span>
                  </button>

                  <div className="text-right">
                    <span className={`text-[10px] font-sans font-black tracking-wider uppercase px-2 py-1 rounded ${
                      isSelected 
                        ? "bg-red-950/60 text-red-400 border border-red-900" 
                        : "bg-stone-900 text-stone-500"
                    }`}>
                      {isSelected ? "● 已拉毛線" : "○ 未圈定"}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Loupe Panel (Highly accessible, spacious, high contrast) */}
        <AnimatePresence>
          {inspectingNode && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-6 p-6 md:p-8 rounded-2xl bg-zinc-950 border-2 border-amber-900 text-stone-100 shadow-2xl relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setInspectingNode(null)}
                  className="p-1 px-3.5 py-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-850 text-stone-300 font-sans text-xs transition cursor-pointer"
                >
                  ✕ 關閉此大字板
                </button>
              </div>

              <div className="flex items-center gap-2 border-b border-stone-900 pb-3 mb-4">
                <Eye size={20} className="text-amber-500 animate-pulse" />
                <h4 className="text-xl font-serif font-black text-amber-250">
                  📷 偵探特寫放大鏡：{inspectingNode.label}
                </h4>
              </div>

              {/* DENSE ACCESSIBILITY COPY */}
              <div className="space-y-4">
                <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-850 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-stone-500 block">物證說明：</span>
                  <p className="text-base md:text-lg text-stone-100 font-serif leading-relaxed">
                    {inspectingNode.detailedCase}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-stone-200">
                    <span className="text-xs text-red-400 font-sans font-bold block mb-1">🔍 本物證時間戳記：</span>
                    <strong className="text-base font-serif font-black block text-red-200">
                      {inspectingNode.timeMark}
                    </strong>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
                    <span className="text-xs text-stone-500 font-sans font-bold block mb-1 text-amber-400">🕵️ 時空矛盾重要度：</span>
                    <p className="text-sm font-serif leading-relaxed italic text-stone-100">
                      {inspectingNode.consequence}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-900 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleNodeClick(inspectingNode.id);
                  }}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-sans font-bold transition flex items-center gap-2 cursor-pointer ${
                    selectedNodes.includes(inspectingNode.id)
                      ? "bg-red-950 hover:bg-red-800 text-red-100 border-red-700"
                      : "bg-amber-900 hover:bg-amber-800 text-stone-100 border-amber-950"
                  }`}
                >
                  <Pin size={14} />
                  <span>
                    {selectedNodes.includes(inspectingNode.id) ? "❌ 從連線牆上取下此證物" : "📌 將此證物敲上紅色毛線鋼針"}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Large Secret Folder Appearance */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-2xl mx-auto my-6 z-40 bg-zinc-950/95"
            >
              {!openEnvelope ? (
                <button
                  onClick={handleEnvelopeClick}
                  className="w-full p-8 rounded-2xl bg-amber-950/95 border-4 border-amber-900 text-stone-100 flex flex-col items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.95)] relative cursor-pointer text-center hover:scale-[1.02] active:scale-98 transition-all"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #451a03 0px, #451a03 8px, #3b0764 8px, #3b0764 10px)",
                    boxShadow: "inset 0 0 35px rgba(0,0,0,0.6)"
                  }}
                >
                  {/* Secret bureaucratic red seal */}
                  <div className="absolute top-4 right-4 border-2 border-red-500 rounded px-3 py-1 text-xs font-sans text-red-500 font-extrabold transform rotate-12 uppercase tracking-widest bg-black/40">
                    TOP SECRET / 特級機密
                  </div>

                  <div className="w-16 h-16 rounded-full bg-red-950 border-2 border-red-700 flex items-center justify-center text-red-400 mb-4 shadow-xl">
                    <FileWarning size={32} className="animate-pulse" />
                  </div>

                  <h5 className="font-serif text-xl md:text-2xl font-black tracking-widest text-amber-250">
                    📂 鎖定成功 ── 暗案檔案箱鎖已解鎖！
                  </h5>
                  
                  <p className="text-sm font-serif text-stone-300 mt-3 leading-relaxed max-w-lg">
                    您已精準選出 <strong>A.長兄肖像 ➔ B.陳國棟密卷 ➔ C.林志遠草稿</strong> 致命的三項時空矛盾交叉特寫！
                    這完全揭穿了晚報與上頭在警方發現袋子前就編好罪名的真相。
                    <br />
                    <span className="text-emerald-400 font-sans font-black block mt-3.5 text-base animate-bounce">
                      📥 點擊此黃金按鈕，正式開啟解密案卷檔案 📥
                    </span>
                  </p>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 md:p-8 rounded-2xl bg-stone-900 border-2 border-amber-900 text-stone-100 text-center shadow-2xl relative"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-900 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle className="text-emerald-400" size={24} />
                  </div>
                  <h5 className="font-serif text-xl font-black text-amber-100 tracking-wider">
                    【密室逃脫第五關 ─ 全面破案通關！】
                  </h5>
                  <p className="text-sm text-stone-300 mt-2.5 leading-relaxed font-serif text-left p-4 bg-neutral-950 rounded-xl border border-stone-850">
                    大安巡官在 <strong>10:00</strong> 才親到瑠公圳底割開麻袋。而官方同謀的新聞稿竟在早晨 <strong>08:00</strong> 就已經完成油印排版。此時空悖論一擊必殺，徹底宣告這是一場官方自編自導、殺王家長兄滅口來安撫社會的大陰謀！
                  </p>
                  <div className="mt-4 p-3 bg-red-950/50 border border-red-950 rounded-lg text-xs font-sans text-red-300 font-bold">
                    🔑 您已成功度過最難的重圍！請往系統底部查閱並選擇雙結局選項！
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
