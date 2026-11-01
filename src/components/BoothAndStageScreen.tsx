import React from 'react';
import { 
  Home, 
  Waves, 
  Volume2, 
  Eye, 
  ThermometerSnowflake, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { BuongTroVaThuyDinh, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface BoothAndStageScreenProps {
  boothData: BuongTroVaThuyDinh;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const BoothAndStageScreen: React.FC<BoothAndStageScreenProps> = ({
  boothData,
  onSpeakText,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Home className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Không Gian Diễn Xướng Mặt Nước' : 'Aquatic Stage Architecture'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
          {lang === 'vi' ? 'Buồng Trò & Kiến Trúc Thủy Đình Cổ Kính' : 'The Water Pavilion & Backstage Booth'}
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans">
          {lang === 'vi'
            ? 'Thủy đình là kiệt tác kiến trúc dân gian dựng giữa lòng ao hồ làng quê, nơi mặt nước phẳng lặng trở thành sân khấu sống động và buồng trò sau tấm mành sáo tre lưu giữ trọn vẹn bí quyết nghề của các nghệ nhân múa rối.'
            : 'The Thuy Dinh (water pavilion) is an architectural masterpiece erected in the heart of village ponds, where tranquil water becomes a stage and the bamboo curtain conceals puppeteers manipulating their craft.'}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onSpeakText(`Buồng trò và Thủy đình múa rối nước. ${boothData.khaiNiem}. ${boothData.kienTruc}. ${boothData.buongTro}.`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 font-semibold text-xs border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe đọc phần này</span>
          </button>
        </div>
      </div>

      {/* Main Structural Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thuy Dinh Architecture */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-9 h-9 rounded-xl bg-red-100 text-red-900 flex items-center justify-center font-bold text-lg">
              🏛️
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                1. Kiến Trúc Thủy Đình Đình Làng
              </h3>
              <span className="text-[11px] text-stone-500 font-mono">Sân khấu mặt gương nước</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-sans text-justify">
            {boothData.kienTruc}
          </p>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
            <strong className="text-stone-800 block text-[11px] uppercase">Đặc điểm diễn xướng:</strong>
            <p className="leading-relaxed">{boothData.khaiNiem}</p>
          </div>
        </div>

        {/* Secret Booth behind Bamboo Curtain */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
              🎋
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                2. Bí Mật Sau Tấm Mành Sáo Nứa Tre
              </h3>
              <span className="text-[11px] text-stone-500 font-mono">Không gian buồng trò</span>
            </div>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-sans text-justify">
            {boothData.buongTro}
          </p>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <strong className="text-amber-900 block text-[11px] uppercase flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Cơ chế quang học dân gian:</span>
            </strong>
            <p className="leading-relaxed">
              Mành sáo được đan bằng nứa mỏng, chìm mép dưới nước. Nghệ nhân ở trong bóng tối nhìn qua khe sáo ra ngoài trời sáng thấy con rối rõ mồn một; ngược lại khán giả nhìn từ chỗ sáng vào bóng tối buồng trò chỉ thấy tấm mành nứa khép kín.
            </p>
          </div>
        </div>
      </div>

      {/* Extreme Physical Conditions & Winter Safeguarding */}
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-stone-50 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-red-900">
          <ThermometerSnowflake className="w-5 h-5 text-red-700" />
          <h3 className="font-serif text-lg font-bold text-stone-900">
            3. Sự Hy Sinh Bền Bỉ Của Các Nghệ Nhân Dưới Làn Nước Buốt
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans text-justify">
          {boothData.dieuKienBieuDien}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
          <div className="p-3 rounded-xl bg-white border border-amber-200">
            <strong className="text-stone-900 block mb-1">Thời tiết khắc nghiệt:</strong>
            <span className="text-stone-600">Các hội làng diễn ra vào tháng Giêng, tháng Hai âm lịch giữa tiết trời mùa đông rét căm căm của miền Bắc, nhiệt độ nước ao làng có khi xuống dưới 10°C.</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-amber-200">
            <strong className="text-stone-900 block mb-1">Phương thức giữ nhiệt bí truyền:</strong>
            <span className="text-stone-600">Trước khi xuống nước, nghệ nhân phải uống bát nước mắm cốt nguyên chất pha gừng nướng cay nóng, thoa dầu nóng để giữ ấm tim phổi và lục phủ ngũ tạng.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
