import React from 'react';
import { 
  Wrench, 
  Volume2, 
  Sparkles, 
  Music, 
  Flame, 
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { KyThuatDieuKhien, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface MechanicsScreenProps {
  mechanicsData: KyThuatDieuKhien;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const MechanicsScreen: React.FC<MechanicsScreenProps> = ({
  mechanicsData,
  onSpeakText,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Cơ Học Dân Gian Dưới Nước' : 'Submerged Folk Mechanics'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
          {lang === 'vi' ? 'Kỹ Thuật Điều Khiển Máy Sào & Máy Dây Ngầm' : 'Underwater Pole & String Control Mechanics'}
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans">
          {lang === 'vi'
            ? 'Đỉnh cao trí tuệ dân gian của người nông dân châu thổ sông Hồng thể hiện qua việc vận dụng các nguyên lý cơ học (đòn bẩy, ròng rọc, dây căng) hoàn toàn chìm dưới nước đục để tạo ra những màn trình diễn kỳ ảo trên mặt gương nước.'
            : 'The pinnacle of rural engineering: Utilizing physical principles of levers, pulleys, and submerged wire tension concealed within murky water to animate miraculous performances.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onSpeakText(`Kỹ thuật điều khiển rối nước. Máy sào: ${mechanicsData.maySao}. Máy dây: ${mechanicsData.mayDay}. Sự hiệp đồng: ${mechanicsData.suKetHop}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-semibold text-xs border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe đọc phần này</span>
          </button>
        </div>
      </div>

      {/* 2 Main Mechanical Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* May Sao */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
              🎋
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                1. Hệ Thống Máy Sào (Cọc Tre)
              </h3>
              <span className="text-[11px] text-stone-500 font-mono">Truyền lực tịnh tiến & xoay hướng</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-sans text-justify">
            {mechanicsData.maySao}
          </p>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 font-sans space-y-1.5">
            <strong className="text-amber-900 block text-[11px] uppercase">Nguyên lý vận hành:</strong>
            <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
              <li>Cọc tre đực ngâm bùn dài 3 – 5m, dẻo dai và chịu lực uốn cực tốt.</li>
              <li>Đầu ngoài cọc tre nối vào trục bàn trượt ngầm của con rối qua các chốt gỗ hoặc khâu sắt.</li>
              <li>Nghệ nhân dùng hai tay đẩy tới, kéo lui hoặc vặn xoay để con rối rẽ sóng lướt đi thoăn thoắt.</li>
            </ul>
          </div>
        </div>

        {/* May Day */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg">
              🧵
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                2. Hệ Thống Máy Dây (Ròng Rọc Ngầm)
              </h3>
              <span className="text-[11px] text-stone-500 font-mono">Điều khiển khớp nối cử động vi tế</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-sans text-justify">
            {mechanicsData.mayDay}
          </p>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 font-sans space-y-1.5">
            <strong className="text-blue-900 block text-[11px] uppercase">Nguyên lý vận hành:</strong>
            <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
              <li>Dây cước hoặc dây thép mềm luồn ngầm qua hệ thống ròng rọc (con lăn) gắn dưới đế rối.</li>
              <li>Các đầu dây kết nối vào khớp tay, khớp hàm, cổ, mi mắt hoặc bộ phận phụt nước/pháo.</li>
              <li>Khi nghệ nhân giật nhẹ đầu dây trong buồng trò, con rối vỗ tay, chớp mắt, nhào lộn kỳ diệu.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Musical and Pyrotechnic Synchrony */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider">
            Hiệp đồng nghệ thuật
          </span>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            3. Sự Hiệp Đồng Giữa Nghệ Nhân Dưới Nước & Dàn Nhạc Chèo Trên Bờ
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans text-justify">
          {mechanicsData.suKetHop}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold">
              <Music className="w-4 h-4 text-red-700" />
              <span>Tiếng trống giữ nhịp</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Trống đế và mõ chèo là hiệu lệnh dẫn dắt: nhịp trống dồn dập báo hiệu rồng xuất hiện, nhịp khoan thai đưa lối tiên nữ múa lượn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Kỹ xảo hỏa thuật</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Nghệ nhân bọc pháo hoa trong ống tre chống nước, châm ngòi lửa điện ngầm; khi rồng nổi lên là pháo phụt sáng rực mặt hồ.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Phối hợp 2 – 3 nghệ nhân</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Với trò phức tạp, 1 nghệ nhân giữ sào định vị bơi lội, 1-2 nghệ nhân giật các chùm dây chi tiết, tất cả phải đồng điệu từng giây.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
