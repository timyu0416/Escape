import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Eye, EyeOff } from "lucide-react";
import { CharacterProfile } from "../types";

export default function CaseIntro() {
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  const stats = [
    { label: "謎題難度 (Difficulty)", value: "★★★☆☆ (3 / 5 顆星)" },
    { label: "建議人數 (Players)", value: "4 ～ 6 人合作組隊" },
    { label: "體驗時長 (Duration)", value: "80 分鐘 (含前後解說)" },
    { label: "主題特色 (Features)", value: "半角色扮演式沉浸密室" },
  ];

  const characters: CharacterProfile[] = [
    {
      id: "char1",
      name: "林志遠",
      role: "記者",
      avatar: "🔍",
      description: "《民聲日報》社會版記者，長期追蹤命案，希望透過獨家新聞提高報社銷量與自身知名度。",
      feature: "擁有最多媒體相關資訊與新聞線索，能較快掌握案件方向，但同時也曾參與未經證實的報導。",
      hiddenAgenda: "【隱藏秘密】：曾撰寫誇大新聞內容，間接造成無辜民眾被懷疑。",
      goal: "【角色目標】：蒐集能成為頭條的資訊，同時避免自己過去的行為被揭發。"
    },
    {
      id: "char2",
      name: "陳國棟",
      role: "調查員",
      avatar: "👮",
      description: "參與案件調查的警方人員，負責整理案件紀錄與嫌疑人資料。",
      feature: "較了解警方調查流程與證據內容，能判斷部分媒體資訊是否真實。",
      hiddenAgenda: "【隱藏秘密】：知道警方曾要求媒體不要公開部分資訊，但消息仍遭外流。",
      goal: "【角色目標】：完成案件調查，同時避免更多未經證實的消息擴散。"
    },
    {
      id: "char3",
      name: "王秀蘭",
      role: "家屬",
      avatar: "👩",
      description: "哥哥曾因媒體報導而被列為嫌疑人，導致家庭長期遭受輿論壓力。",
      feature: "對案件抱有強烈情緒，並掌握部分其他玩家不知道的關鍵文件。",
      hiddenAgenda: "【隱藏秘密】：藏有警方已排除哥哥嫌疑的證明文件。",
      goal: "【角色目標】：替家人洗清嫌疑，避免媒體再次公開相關消息。"
    },
    {
      id: "char4",
      name: "吳添福",
      role: "線民",
      avatar: "🕵️",
      description: "曾因與受害者有接觸而被媒體列為嫌疑人，雖然警方未正式起訴，社會始終認為與案件有關。事件後，他開始替不同單位蒐集消息，熟悉媒體與輿論操作。",
      feature: "擅長觀察他人與蒐集資訊，對玩家間的矛盾與情緒變化特別敏感。",
      hiddenAgenda: "【隱藏秘密】：他並非真正兇手，但若案件真相重新被公開，過去對他的懷疑也可能再次被放大。",
      goal: "【角色目標】：阻止部分資料曝光，引導玩家偏向「封存真相」，同時保護自己不再成為輿論焦點。"
    }
  ];

  return (
    <section id="case-intro" className="my-12 animate-fade-in">
      {/* Overview Specs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center shadow-md">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
              {stat.label}
            </span>
            <span className="text-sm font-serif font-bold text-amber-100 mt-1 block">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Left Side: Dramatic Prelude */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-l-4 border-red-700 pl-4">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest leading-none">
              Historic Dossier File
            </h4>
            <h3 className="text-2xl font-serif font-black text-amber-200 mt-2 tracking-wider">
              1961 瑠公圳分屍謎霧
            </h3>
          </div>

          <p className="text-base sm:text-lg text-zinc-100 leading-relaxed font-serif">
            一九六〇年代的台北，正處於風聲鶴唳的戒嚴年代。
            一九六一年二月，一具無頭、雙腳被鋸斷的無名女屍被床單層層包裹，沉入了瑠公圳。
            這起離奇大案迅速震驚了全台，社會陷入瘋狂的追逐。
          </p>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-serif">
            當時的報紙為求銷量，每日在頭條編造死因、大肆拼湊男女幽會與桃色仇殺；
            更有警方高層為了掩飾政治鬥爭、保護某些「達官顯要」，任由輿論妖魔化無辜的退伍軍官與房東，致其在千夫所指中於拘所含恨自裁。
            <br />
            <strong className="text-red-400">這是一場被狂熱媒體與冷酷強權共同編織的集體私刑。</strong>
          </p>

          <div className="bg-red-950/20 rounded border border-red-900/40 p-5 font-serif text-sm md:text-base text-red-200/90 leading-relaxed relative shadow-md">
            <div className="absolute -top-3.5 left-4 bg-zinc-950 text-red-500 text-xs font-mono px-2.5 py-0.5 rounded border border-red-950 font-bold">
              🕵️ 密室逃脫主題玩法
            </div>
            <span className="block mt-2 text-zinc-300 leading-relaxed">
              在大受好評的<strong>帽子烤密室工廠</strong>《瑠公圳分屍案》半角色扮演、沉浸式解謎體驗中，玩家們將直接跨越時空，扮演這場媒體與強權鬥爭中的四名關鍵推動者。
              藉由解開遺留在偵訊室底下的破裂隨身物品，互相盤問，釐清真相到底該在牛皮紙袋前大白於天下，還是一同在泥濘中掩藏。
            </span>
          </div>
        </div>

        {/* Right Side: Immersive Team Characters Selection */}
        <div className="lg:col-span-7 bg-zinc-900/80 rounded-xl border border-zinc-850 p-6 shadow-xl relative">
          <div className="mb-4">
            <h4 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Users size={18} className="text-red-400" />
              沉浸式角色扮演選單 (Roles Profile)
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              點擊查看各個角色當初入局的【身份背景】、【特色專長】與【角色目標】：
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {characters.map((char) => {
              const isActive = selectedChar === char.id;

              return (
                <button
                  key={char.id}
                  onClick={() => {
                    setSelectedChar(isActive ? null : char.id);
                    setShowSecret(false);
                  }}
                  className={`text-left p-4 rounded-lg border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-stone-950 border-red-700 shadow-lg shadow-red-950/50"
                      : "bg-zinc-950/50 border-zinc-900 hover:border-zinc-850 hover:bg-zinc-900/60"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl select-none" role="img" aria-label="avatar">
                        {char.avatar}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-405 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                        {char.role}
                      </span>
                    </div>

                    <h5 className="font-serif text-md font-bold text-amber-100 mt-1">
                      {char.name} <span className="text-xs text-zinc-500 font-sans">({char.role})</span>
                    </h5>

                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-2 line-clamp-3">
                      {char.description}
                    </p>
                  </div>

                  <p className="text-[11px] text-amber-250/90 font-serif mt-3 border-t border-zinc-900/60 pt-2 shrink-0">
                    <strong>專長氣質：</strong>{char.feature}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Character secret info presentation drawer */}
          <AnimatePresence>
            {selectedChar && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-4 p-4 rounded-lg bg-zinc-955 border border-zinc-800 text-xs font-serif leading-relaxed space-y-3 shadow-inner"
              >
                {(() => {
                  const curr = characters.find((c) => c.id === selectedChar);
                  if (!curr) return null;
                  return (
                    <>
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                        <span className="text-amber-100 font-bold tracking-wider uppercase">
                          🎭 {curr.name} ({curr.role}) 的深入特點：
                        </span>
                        <button
                          onClick={() => setShowSecret(!showSecret)}
                          className="px-2.5 py-1 rounded text-[11px] font-bold font-serif bg-red-950/80 text-red-105 border border-red-900 hover:bg-opacity-80 transition flex items-center gap-1 cursor-pointer"
                        >
                          {showSecret ? <EyeOff size={11} /> : <Eye size={11} />}
                          {showSecret ? "隱藏黑幕" : "揭露極密隱藏秘密"}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-zinc-300">
                          <strong>【大眾名望、特色專長】：</strong>{curr.feature}
                        </p>
                        <p className="text-emerald-350">
                          <strong>【角色目標局勢】：</strong>{curr.goal}
                        </p>
                      </div>

                      {showSecret && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 p-3 bg-red-950/45 rounded border border-red-900 text-red-200 font-mono leading-relaxed shadow-lg border-dashed"
                        >
                          <strong>【隱藏秘密檔案】：</strong>{curr.hiddenAgenda}
                        </motion.div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
