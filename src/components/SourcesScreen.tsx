import React, { useState } from 'react';
import { 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  Camera, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Calendar,
  Building,
  UserCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AuthoritativeSourceItem, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface SourcesScreenProps {
  lang: LanguageMode;
}

export const SourcesScreen: React.FC<SourcesScreenProps> = ({ lang }) => {
  const t = translations[lang];
  const [expandedSource, setExpandedSource] = useState<number | null>(null);

  // Exact 7 authoritative sources provided by specification
  const sourcesData: AuthoritativeSourceItem[] = [
    {
      soThuTu: 1,
      tenTuLieu: 'Ảnh cổng nhà hát múa rối Việt Nam',
      loaiTuLieu: 'Ảnh (Tư liệu thực địa)',
      noiDungMoTaNgan: 'Cổng nhà hát múa rối Việt Nam nhìn từ phía ngoài, thời điểm buổi sáng',
      diSanLienQuan: 'Nghệ thuật rối nước Việt Nam',
      diaDiemThuThap: '361 Đường Trường Chinh, Khương Đình, Hà Nội',
      thoiDiemThuThap: '29/10/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng PH70147 nhóm 2',
      nguoiCungCapHoacXuatHien: 'Không có',
      phamViDuocPhepSuDung: 'Đồng ý cho dùng trong sản phẩm học tập phi lợi nhuận',
      nguonGocNeuKhongTuThuThap: 'Tự thu thập (Ảnh nguyên bản B04-anh-01.jpg, không chỉnh sửa AI)',
      trichDanNguon: 'Ảnh thực địa cổng Nhà hát Múa rối Việt Nam, lưu trữ tại thư viện ảnh số của dự án.'
    },
    {
      soThuTu: 2,
      tenTuLieu: 'Quyết định số 473/QĐ-BVHTTDL ngày 06/3/2023 về việc công bố Danh mục di sản văn hóa phi vật thể quốc gia (Múa rối nước Đào Thục)',
      loaiTuLieu: 'Văn bản (quyết định hành chính của Bộ)',
      noiDungMoTaNgan: 'Quyết định của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch công bố Danh mục di sản văn hóa phi vật thể quốc gia đối với Nghệ thuật trình diễn dân gian Múa rối nước Đào Thục (xã Thụy Lâm, huyện Đông Anh, TP. Hà Nội).',
      diSanLienQuan: 'Múa rối nước Đào Thục – Di sản văn hóa phi vật thể quốc gia.',
      diaDiemThuThap: 'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch (Hà Nội).',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Bộ Văn hóa, Thể thao và Du lịch (cơ quan ban hành); người ký: Nguyễn Văn Hùng.',
      phamViDuocPhepSuDung: 'Văn bản công khai của cơ quan nhà nước; sử dụng cho sản phẩm học tập phi lợi nhuận, ghi rõ nguồn.',
      nguonGocNeuKhongTuThuThap: 'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch: https://bvhttdl.gov.vn/van-ban-quan-ly/110595.htm – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Văn bản xác nhận Quyết định 473/QĐ-BVHTTDL ngày 06/3/2023 công bố Múa rối nước Đào Thục là di sản văn hóa phi vật thể quốc gia.'
    },
    {
      soThuTu: 3,
      tenTuLieu: 'Múa rối nước ở Hải Dương',
      loaiTuLieu: 'Văn bản (bài giới thiệu hồ sơ di sản trên cổng thông tin điện tử)',
      noiDungMoTaNgan: 'Bài giới thiệu chi tiết về múa rối nước (trò rối nước) ở Hải Dương: được đưa vào Danh mục di sản văn hóa phi vật thể quốc gia (đợt 1) năm 2012; ba phường rối Bồ Dương – Bùi Thượng – An Liệt; đặc điểm con rối, thủy đình, các tiết mục biểu diễn; lịch sử truyền nghề từ thế kỷ XIV.',
      diSanLienQuan: 'Múa rối nước ở tỉnh Hải Dương – Di sản văn hóa phi vật thể quốc gia.',
      diaDiemThuThap: 'Cổng thông tin điện tử Cục Di sản văn hóa; dữ liệu về các phường rối thuộc tỉnh Hải Dương.',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Cục Di sản văn hóa (cơ quan cung cấp); tác giả bài viết: Thế Phúc (Theo Hồ sơ di sản, tư liệu Cục Di sản văn hóa).',
      phamViDuocPhepSuDung: 'Tài liệu công khai của cơ quan nhà nước; sử dụng cho sản phẩm học tập phi lợi nhuận, ghi rõ nguồn.',
      nguonGocNeuKhongTuThuThap: 'Cổng thông tin điện tử Cục Di sản văn hóa: https://dsvh.gov.vn/mua-roi-nuoc-o-hai-duong-3154 – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Bài viết nêu rõ múa rối nước Hải Dương được đưa vào Danh mục di sản văn hóa phi vật thể quốc gia (đợt 1) năm 2012, với ba phường rối Bồ Dương, An Liệt, Bùi Thượng.'
    },
    {
      soThuTu: 4,
      tenTuLieu: 'Thái Bình: Bảo tồn nghệ thuật múa rối nước góp phần phát triển du lịch cộng đồng',
      loaiTuLieu: 'Văn bản (bài thông tin trên cổng thông tin điện tử của Bộ)',
      noiDungMoTaNgan: 'Bài viết về phường múa rối nước Nguyên Xá (huyện Đông Hưng, tỉnh Thái Bình) – một trong hai phường rối nổi tiếng của tỉnh đã được công nhận di sản văn hóa phi vật thể quốc gia; công tác bảo tồn gắn với phát triển du lịch cộng đồng.',
      diSanLienQuan: 'Múa rối nước Nguyên Xá (Thái Bình) – Di sản văn hóa phi vật thể quốc gia.',
      diaDiemThuThap: 'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch.',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Bộ Văn hóa, Thể thao và Du lịch (đơn vị cung cấp).',
      phamViDuocPhepSuDung: 'Tài liệu công khai trên cổng thông tin của Bộ; sử dụng cho mục đích học tập, phi lợi nhuận, ghi rõ nguồn.',
      nguonGocNeuKhongTuThuThap: 'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch: https://bvhttdl.gov.vn/... (bài đăng ngày 17/3/2025) – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Bài viết xác nhận phường múa rối nước Nguyên Xá (Đông Hưng, Thái Bình) đã được công nhận di sản văn hóa phi vật thể quốc gia.'
    },
    {
      soThuTu: 5,
      tenTuLieu: 'Nghệ thuật múa rối nước (Tô Sanh)',
      loaiTuLieu: 'Văn bản (sách chuyên khảo nghiên cứu)',
      noiDungMoTaNgan: 'Sách nghiên cứu chuyên sâu về nghệ thuật múa rối nước Việt Nam.',
      diSanLienQuan: 'Múa rối nước Việt Nam.',
      diaDiemThuThap: 'Thư viện/CSDL học thuật (CiNii Books).',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Tác giả: Tô Sanh; Nhà xuất bản Văn Hóa, Hà Nội, 1976.',
      phamViDuocPhepSuDung: 'Trích dẫn học thuật, ghi rõ tác giả và nhà xuất bản; không sao chép toàn bộ.',
      nguonGocNeuKhongTuThuThap: 'CiNii Books: https://ci.nii.ac.jp/ncid/BA49279846?l=en – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Thông tin thư mục xác nhận sách “Nghệ thuật múa rối nước” của tác giả Tô Sanh, Nhà xuất bản Văn Hóa, 1976.'
    },
    {
      soThuTu: 6,
      tenTuLieu: 'Lịch sử nghệ thuật múa rối Việt Nam (Nguyễn Huy Hồng)',
      loaiTuLieu: 'Văn bản (sách chuyên khảo nghiên cứu)',
      noiDungMoTaNgan: 'Sách nghiên cứu về lịch sử nghệ thuật múa rối nước Việt Nam qua các triều đại Lý, Trần, Lê và thời kỳ hiện đại.',
      diSanLienQuan: 'Múa rối nước Việt Nam.',
      diaDiemThuThap: 'Thư viện/CSDL học thuật (HathiTrust).',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Tác giả: Nguyễn Huy Hồng; Nhà xuất bản Sân khấu, Hà Nội, 2005.',
      phamViDuocPhepSuDung: 'Trích dẫn học thuật, ghi rõ tác giả và nhà xuất bản.',
      nguonGocNeuKhongTuThuThap: 'HathiTrust Catalog: https://catalog.hathitrust.org/Record/009027848 – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Thông tin thư mục xác nhận sách “Lịch sử nghệ thuật múa rối Việt Nam” của Nguyễn Huy Hồng, Nhà xuất bản Sân khấu, 2005.'
    },
    {
      soThuTu: 7,
      tenTuLieu: 'Hải Phòng đưa múa rối truyền thống ra phố',
      loaiTuLieu: 'Văn bản (bài báo trên báo Nhân Dân điện tử)',
      noiDungMoTaNgan: 'Bài báo về Liên hoan Múa rối Hải Phòng mở rộng lần thứ IV năm 2026; nhận định rối nước Việt Nam là di sản văn hóa độc đáo, kết tinh trí tuệ và bản sắc dân tộc; đề cập lộ trình hướng tới xây dựng hồ sơ trình UNESCO công nhận rối nước là di sản văn hóa phi vật thể của nhân loại.',
      diSanLienQuan: 'Múa rối nước Việt Nam.',
      diaDiemThuThap: 'Báo Nhân Dân điện tử.',
      thoiDiemThuThap: '01/11/2026',
      nguoiThuThap: 'Nguyễn Sinh Hùng, mã sinh viên PH70147',
      nguoiCungCapHoacXuatHien: 'Báo Nhân Dân (đơn vị cung cấp).',
      phamViDuocPhepSuDung: 'Bài báo công khai; sử dụng cho mục đích học tập, phi lợi nhuận, ghi rõ nguồn.',
      nguonGocNeuKhongTuThuThap: 'Báo Nhân Dân điện tử: https://nhandan.vn/ocop/hai-phong-dua-mua-roi-truyen-thong-ra-pho-post961196.html – Ngày truy cập: 01/11/2026.',
      trichDanNguon: 'Bài báo nêu rõ việc tổ chức liên hoan là tiền đề để xây dựng hồ sơ khoa học, hướng tới trình UNESCO công nhận rối nước là di sản văn hóa phi vật thể của nhân loại.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Minh Bạch Học Thuật & Pháp Lý' : 'Scholarly & Legal Transparency'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
          {t.sourcesTitle}
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans">
          {t.sourcesSubtitle}
        </p>

        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-sans">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            {lang === 'vi'
              ? 'Tôn chỉ cốt lõi: Mỗi thông tin về di sản đều được đối soát và dẫn chiếu chính xác từ 7 nguồn tư liệu chính thống và sách chuyên khảo có xuất bản.'
              : 'Core principle: Every datum is cross-verified against 7 authentic regulatory, governmental, and academic publications.'}
          </span>
        </div>
      </div>

      {/* SECTION I: Căn cứ pháp lý & Văn bản quy chuẩn */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <Scale className="w-5 h-5 text-red-800" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            {t.legalSection}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Law 45/2024/QH15 */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
              Văn bản quy chuẩn 01
            </span>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Luật Di sản văn hoá số 45/2024/QH15
            </h3>
            <p className="text-xs text-stone-500 font-mono">Hiệu lực từ ngày 01/7/2025</p>
            <div className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100 font-sans">
              <p><strong>Điều 6:</strong> Quyền và nghĩa vụ của chủ thể di sản văn hóa (nghệ nhân, cộng đồng làng nghề).</p>
              <p><strong>Điều 9:</strong> Các hành vi nghiêm cấm (xuyên tạc, trục lợi, làm sai lệch giá trị di sản).</p>
              <p><strong>Điều 10:</strong> Phân loại 6 loại hình di sản văn hóa phi vật thể.</p>
            </div>
          </div>

          {/* Decision 2026/QD-TTg */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Văn bản quy chuẩn 02
            </span>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Quyết định số 2026/QĐ-TTg
            </h3>
            <p className="text-xs text-stone-500 font-mono">Thủ tướng Chính phủ ký ngày 02/12/2021</p>
            <div className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100 font-sans">
              <p>Phê duyệt Chương trình số hoá Di sản văn hoá Việt Nam giai đoạn 2021 – 2030.</p>
              <p>Số hoá 100% di sản UNESCO và danh mục di sản văn hóa quốc gia.</p>
              <p>Xây dựng nền tảng dữ liệu phục vụ nghiên cứu, giáo dục và người dân.</p>
            </div>
          </div>

          {/* UNESCO Convention 2003 */}
          <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
              Văn bản quy chuẩn 03
            </span>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Công ước UNESCO năm 2003
            </h3>
            <p className="text-xs text-stone-500 font-mono">Bảo vệ di sản văn hoá phi vật thể</p>
            <div className="text-xs text-stone-700 space-y-1.5 pt-2 border-t border-stone-100 font-sans">
              <p>Cộng đồng là chủ thể sáng tạo, nắm giữ, thực hành và trao truyền di sản.</p>
              <p>Di sản phi vật thể luôn gắn liền với người thực hành trong không gian sống.</p>
              <p>Tôn trọng quyền tự quyết và bảo vệ quyền sở hữu của cộng đồng chủ thể.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION II: Bảng kiểm kê 7 nguồn tư liệu chuẩn hoá */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <h2 className="font-serif text-xl font-bold text-stone-900">
              {t.inventorySection}
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {sourcesData.length} nguồn kiểm chứng
          </span>
        </div>

        {/* 7 Sources Cards */}
        <div className="space-y-4">
          {sourcesData.map((src) => {
            const isExpanded = expandedSource === src.soThuTu;
            const isImage = src.soThuTu === 1;

            return (
              <div
                key={src.soThuTu}
                className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden hover:border-amber-400 transition-all"
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedSource(isExpanded ? null : src.soThuTu)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-red-100 text-red-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{src.soThuTu}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 uppercase">
                          {src.loaiTuLieu}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {src.thoiDiemThuThap}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-stone-900 mt-1">
                        NGUỒN {src.soThuTu} — {src.tenTuLieu}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 font-sans">
                        {src.noiDungMoTaNgan}
                      </p>
                    </div>
                  </div>

                  <button className="text-stone-400 hover:text-stone-700 p-1 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details with 10 Standard Fields */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4">
                    {/* If Nguon 1, show photo */}
                    {isImage && (
                      <div className="rounded-xl overflow-hidden bg-stone-900 p-2 max-w-lg mx-auto">
                        <img
                          src="/assets/aistudio/B04-anh-01_154834e1.jpg"
                          alt="Ảnh cổng nhà hát múa rối Việt Nam"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                        <p className="text-[11px] text-stone-400 text-center mt-1.5 italic font-mono">
                          Mã tư liệu: B04-anh-01.jpg — Cổng Nhà hát Múa rối Việt Nam
                        </p>
                      </div>
                    )}

                    {/* 10 Standard Inventory Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">1. Tên tư liệu:</span>
                        <strong className="text-stone-800">{src.tenTuLieu}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">2. Loại tư liệu:</span>
                        <strong className="text-stone-800">{src.loaiTuLieu}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200 sm:col-span-2">
                        <span className="text-stone-500 block text-[11px]">3. Nội dung mô tả ngắn:</span>
                        <strong className="text-stone-800">{src.noiDungMoTaNgan}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">4. Di sản liên quan:</span>
                        <strong className="text-stone-800">{src.diSanLienQuan}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">5. Địa điểm thu thập:</span>
                        <strong className="text-stone-800">{src.diaDiemThuThap}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">6. Thời điểm thu thập:</span>
                        <strong className="text-stone-800">{src.thoiDiemThuThap}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">7. Người thu thập:</span>
                        <strong className="text-amber-800 font-bold">{src.nguoiThuThap}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">8. Người cung cấp/xuất hiện:</span>
                        <strong className="text-stone-800">{src.nguoiCungCapHoacXuatHien}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                        <span className="text-stone-500 block text-[11px]">9. Phạm vi được phép sử dụng:</span>
                        <strong className="text-emerald-700">{src.phamViDuocPhepSuDung}</strong>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-stone-200 sm:col-span-2">
                        <span className="text-stone-500 block text-[11px]">10. Nguồn gốc:</span>
                        <strong className="text-stone-800 break-all">{src.nguonGocNeuKhongTuThuThap}</strong>
                      </div>
                    </div>

                    {/* Citation Note */}
                    {src.trichDanNguon && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 font-sans">
                        <strong>Trích dẫn nguồn: </strong>
                        <span>{src.trichDanNguon}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      {/* SECTION III (Dữ liệu mở) HAS BEEN COMPLETELY REMOVED AS REQUESTED */}
    </div>
  );
};
