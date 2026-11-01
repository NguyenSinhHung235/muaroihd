import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  Users, 
  AlertOctagon, 
  CheckCircle, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Scale, 
  FileCheck 
} from 'lucide-react';
import { LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface AboutScreenProps {
  lang: LanguageMode;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Mandatory Internship Project Identification Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 border border-amber-600/50 p-6 sm:p-8 text-stone-100 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
            Thông tin tác quyền & Dự án
          </span>
          <span className="text-xs text-amber-300 font-mono">Phi lợi nhuận vì cộng đồng</span>
        </div>

        {/* EXACT MANDATORY STATEMENT FROM SPECIFICATION */}
        <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-amber-400/40 space-y-2">
          <p className="font-serif text-lg sm:text-xl font-bold text-amber-100 leading-snug">
            {lang === 'vi' 
              ? 'Sản phẩm thực tập của Nguyễn Sinh Hùng, mã sinh viên PH70147, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.'
              : 'Internship project by Nguyễn Sinh Hùng, Student ID PH70147, Team 2, Batch 15 Internship Program of FPT Polytechnic and IMTA TECH, non-profit social initiative.'}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2 border-t border-stone-800 font-sans">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>FPT Polytechnic</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>IMTA TECH</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Nhóm 2 — Đợt 15</span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          {lang === 'vi'
            ? 'Ứng dụng ra đời nhằm giải quyết nhu cầu có thật: Giúp học sinh, sinh viên và người làm công tác văn hoá cơ sở tra cứu đúng tên gọi, đặc trưng, tình trạng ghi danh di sản; đồng thời tiếp cận sâu sắc nghệ thuật Múa rối nước cổ truyền và ngăn chặn thông tin sai lệch trên môi trường số.'
            : 'Designed for students, grassroots cultural officers, and citizens to research authenticated heritage nomenclature, preventing disinformation while providing open access to cultural archives.'}
        </p>
      </div>

      {/* Target Audience & Social Value */}
      <section className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-red-800" />
          <span>{lang === 'vi' ? 'Người Dùng Mục Tiêu & Giá Trị Xã Hội' : 'Target Users & Social Value'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <strong className="text-stone-900 block text-sm font-serif">1. Học sinh, sinh viên</strong>
            <p className="text-stone-600 leading-relaxed">
              Tài liệu học tập chuẩn mực về văn hóa dân gian, dễ hiểu, trực quan, hỗ trợ làm bài nghiên cứu và thuyết trình chuẩn nguồn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <strong className="text-stone-900 block text-sm font-serif">2. Cán bộ văn hóa cơ sở</strong>
            <p className="text-stone-600 leading-relaxed">
              Công cụ hỗ trợ rà soát, kiểm kê di sản địa phương, tra cứu số quyết định ghi danh và tuân thủ Luật Di sản văn hoá 45/2024/QH15.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <strong className="text-stone-900 block text-sm font-serif">3. Người cao tuổi & khiếm thị</strong>
            <p className="text-stone-600 leading-relaxed">
              Tích hợp công nghệ đọc thành tiếng (TTS) và nhận diện giọng nói (STT), phục vụ tiếp cận di sản thuận tiện trên điện thoại.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Mandatory Heritage Principles */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 pb-2">
          <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <span>{t.aboutMission}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Các nguyên tắc bắt buộc khi làm về di sản — Tuân thủ nghiêm ngặt Công ước UNESCO 2003 và Luật Di sản văn hóa
          </p>
        </div>

        <div className="space-y-4">
          {/* Principle 1 */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900 text-red-900">
              {t.principle1Title}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-sans">
              Di sản văn hóa phi vật thể do cộng đồng sáng tạo, nắm giữ, thực hành và trao truyền. Người làm sản phẩm số chỉ là người ghi chép và giới thiệu lại, không phải người sở hữu di sản đó. Khi sử dụng hình ảnh, bản ghi của nghệ nhân phải được sự đồng ý, ghi rõ tên người cung cấp. Nếu người cung cấp yêu cầu gỡ bỏ, cam kết gỡ ngay không tranh luận.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900 text-amber-900">
              {t.principle2Title}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-sans">
              Mỗi di sản giới thiệu có tối thiểu ba nguồn tham khảo chính thống (văn bản pháp luật, cổng thông tin cơ quan quản lý văn hoá, hồ sơ UNESCO công bố, công trình nghiên cứu chuyên khảo). Tên gọi dùng đúng theo danh mục đã ghi danh. Khi hai nguồn nói khác nhau, nêu cả hai và chỉ rõ nguồn thay vì tự ý chọn một bên.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900 text-emerald-900">
              {t.principle3Title}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-sans">
              Không dùng trí tuệ nhân tạo sinh ảnh hiện vật, di tích, hoa văn, trang phục rồi trình bày như tư liệu thật. Không gán ghép di sản vào danh mục UNESCO khi chưa có quyết định chính thức. Không tự đặt ra niên đại, số liệu, tên nghệ nhân khi không có tư liệu. Phần nào chưa khảo được thì ghi rõ là &quot;chưa có tư liệu&quot; — đó cũng là thông tin trung thực.
            </p>
          </div>

          {/* Principle 4 */}
          <div className="p-5 rounded-xl bg-red-50/70 border border-red-200 shadow-sm space-y-2">
            <h3 className="font-serif text-base font-bold text-red-950 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-700 shrink-0" />
              <span>{t.principle4Title}</span>
            </h3>
            <ul className="text-xs text-red-900 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
              <li>Phổ biến sai lệch nội dung di sản, hoặc đưa thêm yếu tố không phù hợp làm giảm giá trị di sản.</li>
              <li>Xúc phạm, chế giễu tín ngưỡng, phong tục, nghi lễ của bất kỳ cộng đồng hay dân tộc nào.</li>
              <li>So sánh hơn kém giữa các dân tộc, vùng miền; dùng từ ngữ miệt thị khi gọi tên dân tộc.</li>
              <li>Cổ suý mê tín dị đoan, bói toán, dâng sao giải hạn thu tiền dưới danh nghĩa tín ngưỡng.</li>
              <li>Lợi dụng di sản để quảng cáo, bán hàng hoặc thu lợi dưới bất kỳ hình thức nào.</li>
              <li>Dùng hình ảnh, bản ghi của người khác khi chưa được phép hoặc không ghi nguồn.</li>
              <li>Đưa nội dung sai lệch về chủ quyền quốc gia, lãnh thổ, biển đảo, về danh nhân và sự kiện lịch sử.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact & Feedback */}
      <div className="p-4 rounded-xl bg-stone-100 text-stone-600 text-xs text-center border border-stone-200 space-y-1">
        <p>Mọi đóng góp tư liệu hoặc yêu cầu hiệu chỉnh xin gửi về nhóm dự án nghiên cứu số hóa di sản.</p>
        <p className="font-mono text-stone-500">© 2026 Hồ Sơ Số Di Sản Trình Diễn Dân Gian Việt Nam — FPT Polytechnic & IMTA TECH</p>
      </div>
    </div>
  );
};
