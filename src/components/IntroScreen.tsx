import React from 'react';
import { 
  Waves, 
  Layers, 
  Hammer, 
  Home, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  Award, 
  BookOpen, 
  Volume2,
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ChuyenDeRoiNuoc, LanguageMode, TuLieuMediaItem } from '../types';
import { translations } from '../utils/i18n';

interface IntroScreenProps {
  guideData: ChuyenDeRoiNuoc;
  mediaList: TuLieuMediaItem[];
  onSelectTab: (tab: string) => void;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  guideData,
  mediaList,
  onSelectTab,
  onSpeakText,
  lang,
}) => {
  const t = translations[lang];
  const fieldMedia = mediaList[0];

  const introTextToRead = `
    Chào mừng đến với Múa Rối HD - Trình diễn dân gian Việt Nam.
    Nhập môn nghệ thuật Múa rối nước cổ truyền. Sân khấu mặt nước độc nhất vô nhị của nền văn minh lúa nước sông Hồng, xuất hiện từ thời vua Lý Nhân Tông năm 1121.
    Nghệ nhân đứng sau buồng trò ngập nước ngang thắt lưng, giấu mình sau tấm mành sáo tre để điều khiển con rối bằng sào và dây chìm dưới nước.
  `;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner with Official Branding */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-red-950 to-stone-900 border border-amber-600/50 text-stone-100 p-6 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-5">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/80 border border-amber-400/50 text-amber-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Waves className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'vi' ? 'Nhập môn di sản mặt nước' : 'Introduction to Aquatic Heritage'}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-mono">
              Bia Sùng Thiện Diên Linh 1121
            </span>
          </div>

          {/* MAIN BRAND TITLE: MÚA RỐI HD */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="font-serif font-black text-3xl sm:text-6xl text-amber-100 tracking-tight leading-none drop-shadow-md">
                MÚA RỐI HD
              </h1>
              <span className="text-sm sm:text-xl font-serif text-amber-400 tracking-wider uppercase font-semibold">
                — {t.siteSub}
              </span>
            </div>

            <p className="text-base sm:text-xl text-stone-200 font-serif italic pt-1 text-amber-200/90">
              {lang === 'vi' 
                ? 'Nghệ thuật trình diễn dân gian trên mặt nước độc nhất vô nhị của nền văn minh lúa nước châu thổ sông Hồng'
                : 'The world\'s singular aquatic puppet theatre born from the Red River wet-rice agrarian civilization'}
            </p>
          </div>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans text-justify">
            {lang === 'vi'
              ? 'Múa rối nước (Trò ổi lỗi nước) biến mặt nước ao đình, đầm hồ thành sàn diễn lung linh. Con rối tạc từ gỗ sung nhẹ, phủ sơn ta Phú Thọ nhiều lớp chống thấm nước. Nghệ nhân ngâm mình ngang thắt lưng sau tấm mành sáo tre buồng trò, sử dụng tài tình hệ thống máy sào và máy dây luồn chìm dưới nước để truyền sinh khí cho các nhân vật lịch sử, thần thoại và nông thôn Việt Nam.'
              : 'Water puppetry transforms village ponds into sparkling stages. Carved from buoyant sung wood and lacquered with natural resin, puppets come alive as puppeteers stand waist-deep behind split-bamboo screens, deftly wielding submerged poles and wire strings in rhythm with traditional Chèo folk music.'}
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('repertoire')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all border border-amber-400/40 hover:scale-[1.02]"
            >
              <Layers className="w-4 h-4 text-amber-200" />
              <span>{lang === 'vi' ? 'Khám phá Thư viện tích trò' : 'Explore Repertoire'}</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => onSelectTab('puppets')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider shadow-md transition-all border border-stone-700 hover:border-amber-500"
            >
              <Hammer className="w-4 h-4 text-amber-400" />
              <span>{lang === 'vi' ? 'Xem các loại con rối' : 'Puppet Taxonomy'}</span>
            </button>

            <button
              onClick={() => onSpeakText(introTextToRead)}
              className="p-3 rounded-xl bg-stone-800/80 text-amber-300 hover:bg-stone-700 border border-stone-700"
              title="Nghe đọc lời giới thiệu"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Structural Components of Water Puppetry */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-800" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'vi' ? 'Bốn Trụ Cột Cốt Lõi Của Múa Rối Nước' : 'Four Foundational Pillars of Water Puppetry'}
            </h2>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline">Nhấp vào từng trụ cột để tìm hiểu sâu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tich tro */}
          <div 
            onClick={() => onSelectTab('repertoire')}
            className="cursor-pointer group p-5 rounded-2xl bg-white border border-stone-200 hover:border-red-600 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-900 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              📜
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Trụ cột 01</span>
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-red-900">
                {lang === 'vi' ? 'Thư viện tích trò cổ' : 'Ancient Repertoire'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              Từ Chú Tễu giáo trò, Múa rồng phun lửa, Chăn vịt bắt cáo, Đánh cá đến truyền thuyết Lê Lợi trả gươm thần Kim Quy.
            </p>
            <span className="text-xs text-red-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Xem 9+ tích trò →
            </span>
          </div>

          {/* Card 2: Con roi */}
          <div 
            onClick={() => onSelectTab('puppets')}
            className="cursor-pointer group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-600 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              🪵
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Trụ cột 02</span>
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900">
                {lang === 'vi' ? 'Nghệ thuật tạo tác con rối' : 'Puppet Craftsmanship'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              Gỗ cây sung nhẹ xốp nổi nước, phủ sơn ta Phú Thọ nhiều lớp chống thấm tuyệt đối, thếp vàng son rực rỡ và đúc đối trọng giữ thăng bằng.
            </p>
            <span className="text-xs text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Khám phá từng con rối →
            </span>
          </div>

          {/* Card 3: Buong tro */}
          <div 
            onClick={() => onSelectTab('booth')}
            className="cursor-pointer group p-5 rounded-2xl bg-white border border-stone-200 hover:border-blue-600 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              🏛️
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Trụ cột 03</span>
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-blue-900">
                {lang === 'vi' ? 'Buồng trò & Thủy đình' : 'Water Pavilion & Booth'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              Kiến trúc thủy đình cổ kính mái cong giữa lòng ao; bí mật buồng trò ngập nước sau tấm mành sáo nứa tre che mắt khán giả.
            </p>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Xem kiến trúc buồng trò →
            </span>
          </div>

          {/* Card 4: Ky thuat */}
          <div 
            onClick={() => onSelectTab('mechanics')}
            className="cursor-pointer group p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-lg transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Trụ cột 04</span>
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-emerald-900">
                {lang === 'vi' ? 'Kỹ thuật điều khiển sào dây' : 'Submerged Mechanics'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              Máy sào đẩy lướt sóng và máy dây ngầm qua ròng rọc giật cử động tinh xảo, hiệp đồng chuẩn xác từng nhịp trống chèo.
            </p>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Xem cơ cấu truyền động →
            </span>
          </div>
        </div>
      </section>

      {/* Historic Famous Guilds Section (Phường Rối Tiêu Biểu) */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 pb-2">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <span>{lang === 'vi' ? 'Các Phường Rối Nước Cổ Truyền & Trung Tâm Bảo Tồn' : 'Historic Water Puppet Guilds & Preservation Centers'}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Được bảo hộ và ghi danh Di sản văn hóa phi vật thể quốc gia theo quy định của Bộ Văn hóa, Thể thao và Du lịch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guideData.cacPhuongRoiTieuBieu?.map((guild, gIdx) => (
            <div
              key={gIdx}
              className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-amber-500 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-base font-bold text-stone-900 text-red-950">
                  {guild.tenPhuong}
                </h3>
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  0{gIdx + 1}
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-xs text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                <span>{guild.diaChi}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 font-sans space-y-1">
                <div className="font-bold text-amber-900 text-[11px] uppercase">Căn cứ pháp lý:</div>
                <p className="text-[11px] leading-relaxed">{guild.canCuPhapLy}</p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
                {guild.dacDiem}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Field Survey Photo Feature (Nguồn 1: B04-anh-01.jpg) */}
      {fieldMedia && (
        <section className="rounded-3xl border border-stone-300 bg-white shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-6 bg-stone-950 p-4 sm:p-6 flex flex-col justify-center items-center">
            <img
              src={fieldMedia.duongDan}
              alt={fieldMedia.tenTuLieu}
              className="max-h-[380px] w-auto object-contain rounded-xl shadow-lg border border-stone-800"
            />
            <p className="text-xs text-amber-300/80 mt-3 text-center italic font-mono">
              Ảnh kiểm kê thực tế: B04-anh-01.jpg — Không chỉnh sửa bằng AI
            </p>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 space-y-4 flex flex-col justify-center">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider">
                Nguồn tư liệu 01 (Khảo sát thực địa)
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {fieldMedia.tenTuLieu}
              </h3>
              <p className="text-xs text-stone-600 font-sans">{fieldMedia.noiDungMoTaNgan}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Địa điểm:</span>
                <strong className="text-stone-800">{fieldMedia.diaDiemThuThap}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Thời điểm:</span>
                <strong className="text-stone-800">{fieldMedia.thoiDiemThuThap}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Người thu thập:</span>
                <strong className="text-amber-800 font-bold">{fieldMedia.nguoiThuThap}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Phạm vi cấp phép:</span>
                <strong className="text-emerald-700">{fieldMedia.phamViDuocPhepSuDung}</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectTab('sources')}
                className="inline-flex items-center gap-1.5 text-xs text-red-800 font-bold hover:text-red-950 underline"
              >
                <span>Xem chi tiết cả 7 nguồn tư liệu kiểm chứng →</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
