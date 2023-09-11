export interface ChosenHotel {
  meal: string;
  region: string;
  meal_code: string;
  room_name: string;
  sply_code: string;
  avail_sply: string;
  hotel_sply: string;
  room_grade: string;
  vendor_code: string;
  hotel_room_type_selected: string;
}

export interface ChosenHotelDetail {
  zip: string;
  star: number;
  phone: string;
  images: Image[];
  address: string;
  latitude: number;
  longitude: number;
  facilities: string[];
  hotel_name: string;
  descriptions: Description[];
  region_hotel: string;
  is_recommended: boolean;
}

export interface Image {
  url: string;
  title: string;
  thumbnail: string;
}

export interface Description {
  title: string;
  description: string;
}

export interface ChosenHotelParams {
  check_in: string;
  check_out: string;
  hotel_code: string;
  hotel_name: string;
  total_room: number;
  guest_adult: number;
  guest_infant: number;
  guest_children: number;
  guest_children_ages: any[];
}

export interface CancellationPolicy {
  cxl_fee: number;
  cxl_remark: string;
  cxl_end_date: string;
  cxl_start_date: string;
}

export interface PriceDetail {
  total: number;
  currency: string;
  origin_total: number;
  corporate_fee: number;
  discount_price: number;
}

export interface ImportantInformation {
  info: string;
}

export interface ChosenHotelData {
  chosen_hotel_room: ChosenHotel;
  chosen_hotel_detail: ChosenHotelDetail;
  chosen_hotel_params: ChosenHotelParams;
  chosen_hotel_prices: {
    cxl_policies: CancellationPolicy[];
    precode_book: string;
    price_detail: PriceDetail;
    is_refundable: boolean;
    discount_description: string;
    important_informations: ImportantInformation[];
  };
  chosen_hotel_expired: string;
}

export interface HotelInfoResponse {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  chosen_hotel: ChosenHotelData;
  header: {
    reason: string;
    messages: any[];
    error_code: string;
    process_time: number;
  };
}
