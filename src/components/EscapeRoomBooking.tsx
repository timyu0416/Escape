import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Ticket, User, Phone, CheckCircle, HelpCircle, FileCheck, ShieldAlert } from "lucide-react";
import { BookingSlot } from "../types";

export default function EscapeRoomBooking() {
  const [selectedDay, setSelectedDay] = useState("1961-07-15");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState(4);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [charClass, setCharClass] = useState("記者");
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Generate all 31 days of July 1961 dynamically
  const daysList = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `1961-07-${dayNum.toString().padStart(2, "0")}`;
    const daysOfWeekNames = ["日", "一", "二", "三", "四", "五", "六"];
    const dayOfWeek = (dayNum + 5) % 7; // July 1st, 1961 was a Saturday (6)
    const label = `07月${dayNum.toString().padStart(2, "0")}日 (${daysOfWeekNames[dayOfWeek]})`;
    return { key: dateStr, label };
  });

  // Explicit predefined slots list to match authentic schedule context:
  const slotsByDay: Record<string, BookingSlot[]> = {
    "1961-07-15": [
      { time: "10:00 - 11:20 (第一場)", status: "available", price: 500, note: "09:45報到" },
      { time: "13:00 - 14:20 (第二場)", status: "limited", price: 500, note: "12:45報到" },
      { time: "15:00 - 16:20 (第三場)", status: "available", price: 500, note: "14:45報到" },
      { time: "17:00 - 18:20 (第四場)", status: "available", price: 500, note: "16:45報到" },
      { time: "19:00 - 20:20 (第五場)", status: "limited", price: 500, note: "18:45報到" }
    ],
    "1961-07-16": [
      { time: "10:00 - 11:20 (第一場)", status: "available", price: 500, note: "09:45報到" },
      { time: "13:00 - 14:20 (第二場)", status: "full", price: 500, note: "12:45報到" },
      { time: "15:00 - 16:20 (第三場)", status: "available", price: 500, note: "14:45報到" },
      { time: "17:00 - 18:20 (第四場)", status: "available", price: 500, note: "16:45報到" },
      { time: "19:00 - 20:20 (第五場)", status: "available", price: 500, note: "18:45報到" }
    ],
    "1961-07-22": [
      { time: "10:00 - 11:20 (第一場)", status: "available", price: 500, note: "09:45報到" },
      { time: "13:00 - 14:20 (第二場)", status: "available", price: 500, note: "12:45報到" },
      { time: "15:00 - 16:20 (第三場)", status: "limited", price: 500, note: "14:45報到" },
      { time: "17:00 - 18:20 (第四場)", status: "available", price: 500, note: "16:45報到" },
      { time: "19:00 - 20:20 (第五場)", status: "available", price: 500, note: "18:45報到" }
    ],
    "1961-07-23": [
      { time: "10:00 - 11:20 (第一場)", status: "limited", price: 500, note: "09:45報到" },
      { time: "13:00 - 14:20 (第二場)", status: "full", price: 500, note: "12:45報到" },
      { time: "15:00 - 16:20 (第三場)", status: "available", price: 500, note: "14:45報到" },
      { time: "17:00 - 18:20 (第四場)", status: "limited", price: 500, note: "16:45報到" },
      { time: "19:00 - 20:20 (第五場)", status: "available", price: 500, note: "18:45報到" }
    ]
  };

  // Helper function to return deterministic and beautiful slots representation for any day in July
  const getSlotsForDay = (dayKey: string): BookingSlot[] => {
    if (slotsByDay[dayKey]) {
      return slotsByDay[dayKey];
    }
    const dayNum = parseInt(dayKey.split("-")[2], 10) || 1;
    const isEven = dayNum % 2 === 0;
    const isThreeMult = dayNum % 3 === 0;
    const isFiveMult = dayNum % 5 === 0;

    return [
      { time: "10:00 - 11:20 (第一場)", status: isEven ? "available" : "limited", price: 500, note: "09:45報到" },
      { time: "13:00 - 14:20 (第二場)", status: isThreeMult ? "full" : "available", price: 500, note: "12:45報到" },
      { time: "15:00 - 16:20 (第三場)", status: isFiveMult ? "limited" : "available", price: 500, note: "14:45報到" },
      { time: "17:00 - 18:20 (第四場)", status: isEven ? "available" : "limited", price: 500, note: "16:45報到" },
      { time: "19:00 - 20:20 (第五場)", status: isThreeMult ? "full" : "available", price: 500, note: "18:45報到" }
    ];
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !name || !phone) return;

    const generatedCode = `L-${Math.floor(Math.random() * 90000 + 10000)}-1961`;
    setBookingRef(generatedCode);
    setBooked(true);
  };

  const selectDay = (day: string) => {
    setSelectedDay(day);
    setSelectedSlot(null);
  };

  const resetForm = () => {
    setBooked(false);
    setSelectedSlot(null);
    setName("");
    setPhone("");
  };

  const activeSlots = getSlotsForDay(selectedDay);

  return (
    <section id="escape-booking" className="my-16 p-5 md:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 relative shadow-2xl">
      <div className="border-l-4 border-red-700 pl-4 mb-6">
        <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none">
          RESERVATION LEDGER & SCHEDULE
        </h4>
        <h3 className="text-3xl md:text-4xl font-serif font-black text-amber-200 mt-2 tracking-wider">
          時空機密派遣審批（預約系統）
        </h3>
        <p className="text-base sm:text-lg text-zinc-200 mt-2 max-w-xl font-sans leading-relaxed">
          每人僅需 <strong className="text-red-400">NT$ 500</strong> 元 / 場！支援 <strong>4－6 人</strong> 合作組隊入局。為保證極致沉浸體驗品質，每時段僅限單一組限額精英。
        </p>
      </div>

      {/* Official schedule table for better information readability */}
      <div className="mb-8 overflow-x-auto bg-zinc-950/90 rounded-lg border border-zinc-850 p-4 md:p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <h4 className="text-sm md:text-base font-serif font-bold text-amber-100 tracking-wider">
            【 每日巡查場次派遣表（NT$ 500 / 人 / 場） 】
          </h4>
        </div>
        <table className="w-full text-left text-sm sm:text-base text-zinc-200 font-serif border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 text-xs sm:text-sm uppercase tracking-wider">
              <th className="py-3 px-3">場次</th>
              <th className="py-3 px-3">派遣時間</th>
              <th className="py-3 px-3">限制隊人數</th>
              <th className="py-3 px-3">時空單價</th>
              <th className="py-3 px-3">特別報到須知</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60 break-words">
            <tr className="hover:bg-zinc-900/30 transition">
              <td className="py-4 px-3 font-bold text-red-400">第一場</td>
              <td className="py-4 px-3 font-mono text-amber-200 font-bold">10:00 - 11:20</td>
              <td className="py-4 px-3">4－6 人</td>
              <td className="py-4 px-3 font-mono font-bold text-emerald-400">500元 / 人</td>
              <td className="py-4 px-3 text-amber-200/90 font-bold text-neutral-400">09:45 報到 (含前導)</td>
            </tr>
            <tr className="hover:bg-zinc-900/30 transition">
              <td className="py-4 px-3 font-bold text-red-400">第二場</td>
              <td className="py-4 px-3 font-mono text-amber-200 font-bold">13:00 - 14:20</td>
              <td className="py-4 px-3">4－6 人</td>
              <td className="py-4 px-3 font-mono font-bold text-emerald-400">500元 / 人</td>
              <td className="py-4 px-3 text-amber-200/90 font-bold text-neutral-400">12:45 報到 (含前導)</td>
            </tr>
            <tr className="hover:bg-zinc-900/30 transition">
              <td className="py-4 px-3 font-bold text-red-400">第三場</td>
              <td className="py-4 px-3 font-mono text-amber-200 font-bold">15:00 - 16:20</td>
              <td className="py-4 px-3">4－6 人</td>
              <td className="py-4 px-3 font-mono font-bold text-emerald-400">500元 / 人</td>
              <td className="py-4 px-3 text-amber-200/90 font-bold text-neutral-400">14:45 報到 (含前導)</td>
            </tr>
            <tr className="hover:bg-zinc-900/30 transition">
              <td className="py-4 px-3 font-bold text-red-400">第四場</td>
              <td className="py-4 px-3 font-mono text-amber-200 font-bold">17:00 - 18:20</td>
              <td className="py-4 px-3">4－6 人</td>
              <td className="py-4 px-3 font-mono font-bold text-emerald-400">500元 / 人</td>
              <td className="py-4 px-3 text-amber-200/90 font-bold text-neutral-400">16:45 報到 (含前導)</td>
            </tr>
            <tr className="hover:bg-zinc-900/30 transition">
              <td className="py-4 px-3 font-bold text-red-400">第五場</td>
              <td className="py-4 px-3 font-mono text-amber-200 font-bold">19:00 - 20:20</td>
              <td className="py-4 px-3">4－6 人</td>
              <td className="py-4 px-3 font-mono font-bold text-emerald-400">500元 / 人</td>
              <td className="py-4 px-3 text-amber-200/90 font-bold text-neutral-400">18:45 報到 (含前導)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!booked ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Day & Slot selectors */}
          <div className="lg:col-span-8 space-y-6">
            {/* Days row - Interactive Calendar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  【 1961 年 07 月 督辦派遣日誌表 (CALENDAR) 】
                </span>
                <span className="text-xs text-amber-200/80 font-serif">
                  * 點擊日曆中的日期進行督辦派單
                </span>
              </div>
              
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850 max-w-sm">
                <div className="text-center font-serif text-sm font-bold text-amber-100 mb-3 tracking-widest pb-1 border-b border-zinc-900">
                  一 九 六 一 年 七 月 (JULY 1961)
                </div>
                
                <div className="grid grid-cols-7 text-center text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider font-bold">
                  <span className="text-red-500">日</span>
                  <span>一</span>
                  <span>二</span>
                  <span>三</span>
                  <span>四</span>
                  <span>五</span>
                  <span className="text-red-500">六</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* July 1st, 1961 is Saturday, so we need 6 blank slots before it */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`blank-${i}`} className="aspect-square" />
                  ))}

                  {Array.from({ length: 31 }).map((_, i) => {
                    const dayNum = i + 1;
                    const paddedDay = dayNum.toString().padStart(2, "0");
                    const dateKey = `1961-07-${paddedDay}`;
                    const isActive = selectedDay === dateKey;
                    
                    const weekday = (dayNum + 5) % 7;
                    const isWeekend = weekday === 0 || weekday === 6;

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        onClick={() => selectDay(dateKey)}
                        className={`aspect-square flex flex-col items-center justify-center rounded text-xs transition-all duration-150 border cursor-pointer ${
                          isActive
                            ? "bg-red-950/95 border-red-700 text-red-200 font-bold shadow-lg ring-1 ring-red-800"
                            : "bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900 border-zinc-900 text-zinc-300"
                        }`}
                      >
                        <span className={`${isWeekend && !isActive ? "text-red-500 font-bold" : isActive ? "text-red-200" : "text-zinc-300"}`}>
                          {dayNum}
                        </span>
                        <span className={`w-1 h-1 rounded-full mt-0.5 ${
                          isActive ? "bg-red-400" : isWeekend ? "bg-red-850" : "bg-zinc-800"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="px-3.5 py-2.5 bg-zinc-950/60 rounded-md border border-zinc-900 flex justify-between items-center text-xs md:text-sm font-serif">
                <span className="text-zinc-400 font-mono">當前選定督辦日期：</span>
                <span className="text-amber-200 font-bold tracking-wider">
                  一九六一年 07月{parseInt(selectedDay.split("-")[2], 10)}日 (週{
                    ["日", "一", "二", "三", "四", "五", "六"][(parseInt(selectedDay.split("-")[2], 10) + 5) % 7]
                  })
                </span>
              </div>
            </div>

            {/* Slots layout */}
            <div>
              <h4 className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">
                【 請選擇具體巡查班次 (AVAILABLE SHIFTS) 】
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  const isFull = slot.status === "full";
                  const isLimited = slot.status === "limited";

                  return (
                    <button
                      key={slot.time}
                      disabled={isFull}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3.5 rounded text-left border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                        isFull
                          ? "bg-zinc-950/20 border-zinc-950/20 text-zinc-650 cursor-not-allowed opacity-40"
                          : isSelected
                          ? "bg-stone-950 border-red-700 text-red-200 shadow-lg ring-1 ring-red-800"
                          : "bg-zinc-950/80 border-zinc-900 text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900/45"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 justify-between w-full mb-1">
                        <span className="font-mono text-sm font-bold tracking-tight">
                          {slot.time.split(" ")[0]}
                        </span>
                        
                        {/* Status tag */}
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          isFull
                            ? "bg-zinc-900 text-zinc-500"
                            : isLimited
                            ? "bg-amber-950 text-amber-500 border border-amber-900/30 font-bold animate-pulse"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-900/30 font-bold"
                        }`}>
                          {isFull ? "已滿場" : isLimited ? "緊張" : "空閒"}
                        </span>
                      </div>

                      <div className="font-mono text-[10px] text-amber-200/90 mb-1">
                        🔊 {slot.note}
                      </div>

                      <div className="flex justify-between items-center mt-2 border-t border-zinc-900/60 pt-2 w-full text-xs font-serif">
                        <span className="text-zinc-400 font-bold">
                          NT$ {slot.price} / 人
                        </span>
                        {isSelected && <span className="text-red-400 font-bold">✓ 已選擇</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preparation Checklists */}
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="space-y-2">
                <span className="font-serif font-black text-amber-200 block text-sm">
                  🛡️ 派遣注意事項 (Mission Guide)
                </span>
                <ul className="list-disc list-inside text-zinc-400 space-y-1.5 font-serif leading-relaxed">
                  <li>本遊戲含輕微恐怖、血腥背景元素，敬請有心血管病症者酌情入局。</li>
                  <li>全程將配備兩位互動式 NPC 演員（警署探長與報社記者）。</li>
                  <li>請配合安排，提早 15 分鐘（即各場次報到時間）抵達現場，展開角色分配。</li>
                </ul>
              </div>

              <div className="space-y-2 border-t md:border-t-0 md:border-l border-zinc-900/80 pt-2.5 md:pt-0 md:pl-4">
                <span className="font-serif font-black text-amber-200 block text-sm">
                  🎟️ 票務扣繳須知 (Refund Policy)
                </span>
                <p className="text-zinc-400 font-serif leading-relaxed text-xs md:text-sm">
                  預約送出後，系統可接受 24 小時前無償取消與場次改簽。
                  若有突發情況，請攜隨身「委託憑證」至萬華前哨站尋求協助。
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Right Column Form */}
          <div className="lg:col-span-4 rounded-lg bg-zinc-950 border border-zinc-900 p-5 md:p-6 shadow-xl relative">
            <h4 className="text-lg font-serif font-bold text-amber-105 border-b border-zinc-900 pb-2 mb-4 flex items-center gap-1.5">
              <Ticket size={20} className="text-red-400" />
              派遣登記會審
            </h4>

            {selectedSlot ? (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="p-3.5 bg-zinc-900/60 rounded border border-zinc-850 text-xs md:text-sm text-zinc-300 font-serif space-y-2">
                  <div className="flex justify-between">
                    <span>派遣日期：</span>
                    <span className="text-amber-100 font-mono font-bold">
                      {daysList.find((d) => d.key === selectedDay)?.label.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>具體班次：</span>
                    <span className="text-amber-100 font-mono font-bold">{selectedSlot.replace(/ \(.+?\)/, '')}</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-900/80 pt-1.5 text-zinc-450 text-[11px]">
                    <span>報到提示：</span>
                    <span className="text-amber-300 font-mono tracking-wide font-bold">
                      {selectedSlot.includes("10:00") && "09:45 報到"}
                      {selectedSlot.includes("13:00") && "12:45 報到"}
                      {selectedSlot.includes("15:00") && "14:45 報到"}
                      {selectedSlot.includes("17:00") && "16:45 報到"}
                      {selectedSlot.includes("19:00") && "18:45 報到"}
                    </span>
                  </div>
                </div>

                {/* Team count slider constrained to 4 - 6 */}
                <div>
                  <div className="flex justify-between text-xs md:text-sm font-serif text-zinc-300 mb-1">
                    <span>入局督辦人數：</span>
                    <span className="text-red-400 font-mono font-bold font-black text-sm md:text-base">{teamSize} 人</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={6}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-red-700 bg-zinc-900 h-2 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                    <span>4 人（起點）</span>
                    <span>6 人（極限）</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm sm:text-base font-serif text-zinc-300 mb-1.5 font-bold">
                    主辦探長姓名 (Leader Name)：
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 text-zinc-500" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="請輸入姓名 / 網名"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 rounded border border-zinc-800 p-3 pl-10 text-sm sm:text-base text-amber-100 focus:outline-none focus:border-red-700 font-serif"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm sm:text-base font-serif text-zinc-300 mb-1.5 font-bold">
                    聯絡通傳電話 (Leader Phone)：
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-zinc-500" size={16} />
                    <input
                      type="tel"
                      required
                      placeholder="09xx-xxx-xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 rounded border border-zinc-800 p-3 pl-10 text-sm sm:text-base text-amber-100 focus:outline-none focus:border-red-700 font-mono"
                    />
                  </div>
                </div>

                {/* Character track select */}
                <div>
                  <label className="block text-sm sm:text-base font-serif text-zinc-300 mb-1.5 font-bold">
                    選定首選配給角色 (Path Role)：
                  </label>
                  <select
                    value={charClass}
                    onChange={(e) => setCharClass(e.target.value)}
                    className="w-full bg-zinc-900 rounded border border-zinc-805 p-3 text-sm sm:text-base text-amber-100 focus:outline-none focus:border-red-700 font-serif font-black"
                  >
                    <option value="記者">林志遠 (社會記者) —— 《民聲日報》媒體案線</option>
                    <option value="調查員">陳國棟 (警方調查員) —— 警方案卷紀錄線</option>
                    <option value="家屬">王秀蘭 (受害人妹) —— 家屬清白申冤線</option>
                    <option value="線民">吳添福 (目擊線民) —— 線民封存引導線</option>
                  </select>
                </div>

                {/* Total pricing: NT$ 500 per person */}
                <div className="border-t border-zinc-900/60 pt-3 flex justify-between items-center text-xs md:text-sm font-serif">
                  <span className="text-zinc-400">核計預付款金：</span>
                  <span className="text-red-400 font-bold font-mono text-lg md:text-xl font-black">
                    NT$ {teamSize * 500} 元
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-900/90 hover:bg-red-800 text-white border border-red-800/80 p-2.5 rounded font-serif text-xs md:text-sm tracking-wider transition font-bold active:scale-95 cursor-pointer uppercase shadow-lg"
                >
                  Confirm & Lock Shift / 送出簽認
                </button>
              </form>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4">
                <ShieldAlert className="text-zinc-650 animate-pulse mb-3" size={32} />
                <span className="text-xs md:text-sm font-serif text-zinc-500 leading-relaxed">
                  請先在左側點選一組
                  <br />
                  【 派遣巡查班次 】
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Booking Confirmation Pass UI */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto rounded-lg border-2 border-dashed border-red-800 bg-zinc-950 p-6 shadow-2xl relative text-stone-100 overflow-hidden"
          style={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.9), inset 0 0 40px rgba(127, 29, 29, 0.15)"
          }}
        >
          {/* Weather stamp overlay */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-4 border-dashed border-red-800/40 flex items-center justify-center rotate-12 pointer-events-none select-none">
            <span className="text-red-900/30 text-xs font-serif font-black tracking-widest text-center leading-none uppercase">
              台北市警防局
              <br />
              一級治安核可券
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 mb-4 justify-center md:justify-start">
            <FileCheck size={20} />
            <h4 className="font-serif font-black text-sm tracking-wider uppercase">
              一級機密 · 派遣委託書核發成功
            </h4>
          </div>

          <div className="border-t border-zinc-900 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
            <div className="space-y-3 text-xs md:text-sm text-zinc-300">
              <div>
                <strong>【 派遣案號 】：</strong>
                <span className="text-amber-100 font-mono tracking-widest">{bookingRef}</span>
              </div>
              <div>
                <strong>辦案探長 (Team Leader)：</strong>
                <span className="text-amber-100">{name}</span>
              </div>
              <div>
                <strong>聯絡通傳：</strong>
                <span className="text-amber-100 font-mono">{phone}</span>
              </div>
              <div>
                <strong>委託督辦人數：</strong>
                <span className="text-red-400 font-bold">{teamSize} 位精英探長</span>
              </div>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-zinc-300">
              <div>
                <strong>督辦日期：</strong>
                <span className="text-amber-100">
                  {daysList.find((d) => d.key === selectedDay)?.label.split(" ")[0]}
                </span>
              </div>
              <div>
                <strong>具體派遣班次：</strong>
                <span className="text-amber-100 font-mono">{selectedSlot.replace(/ \(.+?\)/, '')}</span>
              </div>
              <div>
                <strong>起步配合領路人：</strong>
                <span className="text-amber-100">
                  {charClass === "記者" && "林志遠 (社會記者)"}
                  {charClass === "調查員" && "陳國棟 (警方調查員)"}
                  {charClass === "家屬" && "王秀蘭 (受害者家屬)"}
                  {charClass === "線民" && "吳添福 (目擊線民)"}
                </span>
              </div>
              <div className="text-emerald-400 text-xs md:text-sm font-mono mt-2 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                ⚠️ 注意：此場次之報到時間為{" "}
                <span className="underline font-bold text-amber-200">
                  {selectedSlot.includes("10:00") && "09:45"}
                  {selectedSlot.includes("13:00") && "12:45"}
                  {selectedSlot.includes("15:00") && "14:45"}
                  {selectedSlot.includes("17:00") && "16:45"}
                  {selectedSlot.includes("19:00") && "18:45"}
                </span>
                ，請探員切勿遲到。
              </div>
            </div>
          </div>

          {/* Dummy Barcode */}
          <div className="mt-8 border-t border-zinc-900 pt-5 flex flex-col items-center justify-center">
            <div className="h-10 w-48 bg-[repeating-linear-gradient(90deg,#52525b_0px,#52525b_2px,#09090b_2px,#09090b_8px,#a1a1aa_8px,#a1a1aa_10px)] opacity-60" />
            <span className="text-[9px] font-mono text-zinc-600 mt-1 tracking-widest">
              * TAIAPEI-SECURE-1961-{bookingRef} *
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={resetForm}
              className="px-4 py-1.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-850 hover:text-zinc-200 transition"
            >
              登記另一場派遣督辦
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
