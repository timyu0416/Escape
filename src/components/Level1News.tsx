import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, ArrowDown, Shuffle, CheckCircle, HelpCircle, FileText } from "lucide-react";

interface JigsawItem {
  id: number;
  correctIndex: number; // 0-based index when sorted correctly (0 is least sensational, 4 is most)
  rank: string;
  headline: string;
  media: string;
  backText: string; // Shows a digit of the 1961 stamp
}

interface Level1NewsProps {
  onComplete: (code: string) => void;
  isUnlocked: boolean;
}

export default function Level1News({ onComplete, isUnlocked }: Level1NewsProps) {
  // Ordered from least sensational (correctIndex = 0) to most sensational (correctIndex = 4)
  const initialItems: JigsawItem[] = [
    {
      id: 101,
      correctIndex: 0,
      rank: "等階：查實報導",
      headline: "「瑠公圳驚現無名水流女屍，警方已成立專案小組，全面封鎖現場查明死者身份投訴。」",
      media: "《中央日報》第二版 官辦通報",
      backText: "1",
    },
    {
      id: 102,
      correctIndex: 1,
      rank: "等階：細節渲染",
      headline: "「水溝撈起異物！驚見大麻袋裹有截斷女屍，圍觀民眾驚呼連連，死者身形疑在二十歲上下！」",
      media: "《台灣新生報》社會焦點",
      backText: "9",
    },
    {
      id: 103,
      correctIndex: 2,
      rank: "等階：聳動推測",
      headline: "「震撼大血案！瑠公圳死者頭部、雙腳遭齊根切斷，床單面料高貴，疑為妙齡富家千金命喪九泉！」",
      media: "《民聲日報》特派頭條",
      backText: "6",
    },
    {
      id: 104,
      correctIndex: 3,
      rank: "等階：情色羅織",
      headline: "「愛恨情仇大屠殺？死者疑遭駐防軍官始亂終棄，狠心大分屍！情夫連夜潜逃，警方疑有驚人黑幕！」",
      media: "《大華晚報》獨家追蹤",
      backText: "1",
    },
    {
      id: 105,
      correctIndex: 4,
      rank: "等階：怪力亂神",
      headline: "「【夜半鬼敲門】無頭怨魂夜夜徘徊瑠公圳！附近軍營驚傳淒厲哀啼，鬼火幽幽現身，疑兇手在軍中！」",
      media: "《民防論壇》靈異怪談",
      backText: "印泥紅色痕跡：「解鎖：電話聯絡室一」",
    },
  ];

  const [items, setItems] = useState<JigsawItem[]>([]);
  const [success, setSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Initialize with shuffled items
  useEffect(() => {
    shuffleItems();
  }, []);

  const shuffleItems = () => {
    let shuffled = [...initialItems];
    // Keep shuffling until it is NOT in the correct order
    do {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    } while (checkIfCorrect(shuffled));
    setItems(shuffled);
    setSuccess(false);
  };

  const checkIfCorrect = (list: JigsawItem[]) => {
    if (list.length === 0) return false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].correctIndex !== i) return false;
    }
    return true;
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (success) return;
    const newItems = [...items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= items.length) return;

    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    if (checkIfCorrect(newItems)) {
      setSuccess(true);
      onComplete("1961");
    }
  };

  const verifyOrder = () => {
    if (checkIfCorrect(items)) {
      setSuccess(true);
      onComplete("1961");
    }
  };

  return (
    <section id="level-1-news" className="my-12 p-6 md:p-8 rounded-xl border border-dashed border-red-900/40 bg-zinc-950/80 relative overflow-hidden">
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-80" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono px-2 py-1 bg-red-950 text-red-400 border border-red-900/60 rounded">
              關卡一 (LEVEL 1)
            </span>
            <h3 className="text-2xl font-serif text-amber-100 mt-2 font-bold tracking-wider">
              新聞拼圖 (News Jigsaw Puzzle)
            </h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl font-sans">
              1960年代的媒體狂熱推波助瀾，甚至引導了辦案方向。請將這五張邊緣破裂、泛黃撕碎的報紙碎片，根據
              <strong className="text-red-400">「新聞聳動、狂熱客觀度排序」</strong>
              （由最冷淡的中立報導，排序到最誇張的牛鬼蛇神怪談）。
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5"
            >
              <HelpCircle size={14} className="text-red-400 animate-pulse" />
              探長提示
            </button>
            <button
              onClick={shuffleItems}
              disabled={success}
              className="px-3 py-1.5 text-xs font-mono rounded bg-red-900/20 hover:bg-red-900/40 text-red-200 border border-red-800/60 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Shuffle size={14} />
              重新洗牌
            </button>
          </div>
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
              <strong>🕵️ 探長檔案備忘錄：</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>第一等：完全不帶情緒的官方警政宣告（極度官方、中立）。</li>
                <li>第二等：加值了具體事件與死者大致年齡推測（開始吸引民眾）。</li>
                <li>第三等：出現肢解、千金小姐、血案等刺激性驚悚詞語。</li>
                <li>第四等：加入了男女情仇、軍人涉案、政治嫌疑（引發社會獵巫輿論）。</li>
                <li>第五等：甚至出現鬼魂索命、陰間討債等鬼神之說，煽動程度達到極致。</li>
              </ul>
              <p className="mt-2 text-red-400">💡 提示：使用卡片右側的上下按鈕將報紙排好。當順序無誤，報紙便會翻面，在背面顯現出暗紅色的血印，那正是當年的關鍵案發年代...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newspaper Layout */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto my-8">
          {items.map((item, index) => {
            const isCorrectPosition = item.correctIndex === index;

            return (
              <motion.div
                key={item.id}
                layout
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`relative transition-all duration-500 perspective-1000 ${
                  success ? "pointer-events-none" : ""
                }`}
              >
                {/* 3D Card flips on success */}
                <div
                  className={`w-full duration-700 transform-style-3d ${
                    success ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side: Newspaper Clip */}
                  <div className={`p-4 md:p-5 rounded border dossier-card flex gap-4 items-center justify-between min-h-[100px] border-amber-900/30 relative text-zinc-900 backface-hidden ${
                    success ? "opacity-40" : ""
                  }`}>
                    {/* Retro torn effect on background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#0000000c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 text-[11px] font-mono tracking-wider opacity-75 text-amber-950">
                        <FileText size={12} className="text-amber-900" />
                        <span>{item.media}</span>
                        {/* Dev aid, subtle */}
                        {/* <span className="opacity-40">({item.correctIndex})</span> */}
                      </div>
                      
                      <h4 className="text-[15px] md:text-base font-serif font-semibold tracking-wide leading-relaxed text-zinc-850">
                        {item.headline}
                      </h4>
                    </div>

                    {/* Ordering Controls */}
                    {!success && (
                      <div className="flex flex-col gap-1 shrink-0 ml-2 bg-amber-950/10 p-1.5 rounded border border-amber-950/20">
                        <button
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0}
                          className="p-1 rounded text-amber-950 hover:bg-amber-950/20 disabled:opacity-20 transition"
                          title="往上移"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <div className="text-[10px] text-center font-mono text-amber-950 select-none font-bold">
                          {index + 1}
                        </div>
                        <button
                          onClick={() => moveItem(index, "down")}
                          disabled={index === items.length - 1}
                          className="p-1 rounded text-amber-950 hover:bg-amber-950/20 disabled:opacity-20 transition"
                          title="往下移"
                        >
                          <ArrowDown size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Back Side: Blood Stamp */}
                  <div className="absolute inset-0 w-full h-full p-4 md:p-5 rounded border border-red-950 bg-stone-900 text-stone-200 flex flex-col items-center justify-center rotate-y-180 backface-hidden shadow-inner overflow-hidden shadow-black/80">
                    <div className="absolute inset-0 bg-[radial-gradient(#7f1d1d22_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                    
                    <div className="text-center relative z-10 flex flex-col items-center">
                      <div className="font-mono text-xs text-red-500/80 mb-1">
                        【案發秘密卷宗 · 血印證物】
                      </div>
                      <div className="font-serif text-5xl md:text-6xl font-black text-red-600/90 tracking-widest flicker-effect select-none border-2 border-dashed border-red-800/40 px-6 py-1 transform -rotate-2 rounded">
                        {item.backText.length === 1 ? item.backText : "解鎖"}
                      </div>
                      <p className="text-[10px] font-serif text-red-500 mt-2 tracking-widest opacity-80">
                        {item.backText.length > 1 ? item.backText : `第 ${item.correctIndex + 1} 塊碎片背面之印印`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Level Complete Status Alert */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-lg border border-red-900 bg-red-950/20 max-w-xl mx-auto text-center"
          >
            <CheckCircle className="text-red-500 mx-auto mb-2 animate-bounce animate-duration-1000" size={32} />
            <h4 className="text-lg font-serif font-bold text-red-200">
              【驗證成功：報紙自動翻面】
            </h4>
            <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed font-serif">
              拼圖拼合完成，報紙在燈光下顯露出了案發那年的關鍵印泥紅字：
              <strong className="text-red-400 text-lg mx-1 tracking-wider">「1961」</strong>。
              這個紅色的四位數密碼似乎是解開往後案子的關鍵。
            </p>
            <div className="mt-4 text-xs font-mono text-zinc-400 animate-pulse">
              * 新線索已登錄手提及道具欄 *
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
