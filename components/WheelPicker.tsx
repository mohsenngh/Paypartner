import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

interface WheelPickerColumnProps {
  items: string[];
  onSelect: (value: string) => void;
  initialValue: string;
}

const WheelPickerColumn: React.FC<WheelPickerColumnProps> = ({ items, onSelect, initialValue }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40; // Corresponds to h-10
  
  useLayoutEffect(() => {
    if (scrollRef.current) {
        const initialIndex = items.indexOf(initialValue);
        if (initialIndex > -1) {
            scrollRef.current.scrollTop = initialIndex * itemHeight;
        }
    }
  }, [items, initialValue]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedValue = items[selectedIndex];
      if (selectedValue) {
        onSelect(selectedValue);
      }
    }
  };

  const handleScrollEnd = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      scrollRef.current.scrollTo({ top: selectedIndex * itemHeight, behavior: 'smooth' });
    }
  };

  return (
    <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseUp={handleScrollEnd}
        onTouchEnd={handleScrollEnd}
        className="h-48 w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollPaddingTop: `${itemHeight*2}px`, scrollPaddingBottom: `${itemHeight*2}px` }}
    >
        <div style={{ height: `${itemHeight*2}px` }} /> 
        {items.map((item) => (
            <div key={item} className="h-10 flex items-center justify-center snap-center text-lg text-slate-700 dark:text-slate-300">
                {item}
            </div>
        ))}
        <div style={{ height: `${itemHeight*2}px` }} />
    </div>
  );
};


interface WheelDateTimePickerProps {
    onConfirm: (date: Date) => void;
    onCancel: () => void;
}

const WheelDateTimePicker: React.FC<WheelDateTimePickerProps> = ({ onConfirm, onCancel }) => {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [day, setDay] = useState(now.getDate());
    const [hour, setHour] = useState(now.getHours());
    const [minute, setMinute] = useState(now.getMinutes());

    const years = Array.from({ length: 10 }, (_, i) => (now.getFullYear() + i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    
    useEffect(() => {
        const newDaysInMonth = new Date(year, month, 0).getDate();
        if (day > newDaysInMonth) {
            setDay(newDaysInMonth);
        }
    }, [year, month, day]);

    const handleConfirm = () => {
        const selectedDate = new Date(year, month - 1, day, hour, minute);
        onConfirm(selectedDate);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-t-2xl w-full max-w-lg p-4">
                 <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={onCancel} className="text-indigo-600 dark:text-indigo-400 font-semibold">لغو</button>
                    <h3 className="font-bold">انتخاب تاریخ و ساعت</h3>
                    <button onClick={handleConfirm} className="text-indigo-600 dark:text-indigo-400 font-bold">تایید</button>
                </div>
                <div className="flex items-center justify-center relative h-48 mt-4" dir="ltr">
                    <div className="absolute inset-0 flex items-center">
                         <div className="h-10 w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-lg border-y border-slate-300 dark:border-slate-600"></div>
                    </div>
                     <div className="flex w-full z-10">
                        <WheelPickerColumn items={years} initialValue={year.toString()} onSelect={(v) => setYear(parseInt(v))} />
                        <WheelPickerColumn items={months} initialValue={month.toString().padStart(2, '0')} onSelect={(v) => setMonth(parseInt(v))} />
                        <WheelPickerColumn items={days} initialValue={day.toString().padStart(2, '0')} onSelect={(v) => setDay(parseInt(v))} />
                        <div className="self-center font-bold text-xl">:</div>
                        <WheelPickerColumn items={hours} initialValue={hour.toString().padStart(2, '0')} onSelect={(v) => setHour(parseInt(v))} />
                        <WheelPickerColumn items={minutes} initialValue={minute.toString().padStart(2, '0')} onSelect={(v) => setMinute(parseInt(v))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WheelDateTimePicker;
