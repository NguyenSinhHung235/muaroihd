export interface TichTroItem {
  tenTich: string;
  tenTiengAnh?: string;
  yNghia: string;
  nhanVat: string;
}

export interface ConRoiItem {
  tenConRoi: string;
  tenTiengAnh?: string;
  vaiTro: string;
  hinhDang: string;
  chatLieu: string;
  coCheDieuKhien: string;
}

export interface PhuongRoiItem {
  tenPhuong: string;
  diaChi: string;
  canCuPhapLy: string;
  dacDiem: string;
}

export interface DacTrungConRoi {
  chatLieu: string;
  kyThuatTaoTac: string;
  cauTrucConRoi: string;
}

export interface BuongTroVaThuyDinh {
  khaiNiem: string;
  kienTruc: string;
  buongTro: string;
  dieuKienBieuDien: string;
}

export interface KyThuatDieuKhien {
  maySao: string;
  mayDay: string;
  suKetHop: string;
}

export interface ChuyenDeRoiNuoc {
  cacPhuongRoiTieuBieu?: PhuongRoiItem[];
  danhSachConRoi?: ConRoiItem[];
  tichTroTieuBieu: TichTroItem[];
  dacTrungConRoi: DacTrungConRoi;
  buongTroVaThuyDinh: BuongTroVaThuyDinh;
  kyThuatDieuKhien: KyThuatDieuKhien;
}

export interface TuLieuMediaItem {
  maTuLieu: string;
  tenTuLieu: string;
  loaiTuLieu: string;
  duongDan: string;
  noiDungMoTaNgan: string;
  diSanLienQuan: string;
  diaDiemThuThap: string;
  thoiDiemThuThap: string;
  nguoiThuThap: string;
  nguoiCungCapHoacXuatHien: string;
  phamViDuocPhepSuDung: string;
  nguonGocNeuKhongTuThuThap: string;
}

export interface AuthoritativeSourceItem {
  soThuTu: number;
  tenTuLieu: string;
  loaiTuLieu: string;
  noiDungMoTaNgan: string;
  diSanLienQuan: string;
  diaDiemThuThap: string;
  thoiDiemThuThap: string;
  nguoiThuThap: string;
  nguoiCungCapHoacXuatHien: string;
  phamViDuocPhepSuDung: string;
  nguonGocNeuKhongTuThuThap: string;
  trichDanNguon?: string;
}

export interface DisanRecord {
  id: string;
  tenChinhThuc: string;
  tenTiengAnh?: string;
  tenGoiKhac: string;
  loaiHinh: string;
  diaPhuong: string;
  moTaDacTrung: string;
  moTaTiengAnh?: string;
  ngheNhanTieuBieu: string;
  tinhTrangGhiDanh: string;
  nguonTuLieu: string[];
  chuyenDeRoiNuoc?: ChuyenDeRoiNuoc | null;
  tuLieuMedia?: TuLieuMediaItem[];
}

export type LanguageMode = 'vi' | 'en';

export interface AskResponse {
  success: boolean;
  answer: string;
  recordName: string;
  sourcesUsed: string[];
  confidence: 'grounded' | 'not_found' | string;
  error?: string;
}
