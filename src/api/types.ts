/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export interface User {
  authentication: string;
  userType: string;
}

export type CancelToken = Symbol | string | number;
export interface AuthenticationRequestBody {
  userName?: string | null;
  password?: string | null;
}

export interface BookingDetailsDto {
  customerName?: string | null;
  hotelName?: string | null;
  roomNumber?: string | null;
  roomType?: string | null;
  /** @format date-time */
  bookingDateTime?: string;
  /** @format double */
  totalCost?: number;
  paymentMethod?: string | null;
  bookingStatus?: string | null;
  confirmationNumber?: string | null;
}

export interface BookingRequest {
  customerName?: string | null;
  hotelName?: string | null;
  roomNumber?: string | null;
  roomType?: string | null;
  /** @format date-time */
  bookingDateTime?: string;
  /** @format double */
  totalCost?: number;
  paymentMethod?: string | null;
}

export interface CityDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
  hotels?: HotelWithoutRooms[] | null;
}

export interface CityForCreationDto {
  name?: string | null;
  description?: string | null;
}

export interface CityForUpdateDto {
  name?: string | null;
  description?: string | null;
}

export interface CityWithoutHotels {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
}

export interface Destination {
  /** @format int32 */
  cityId?: number;
  cityName?: string | null;
  countryName?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
}

export interface FeaturedDealDto {
  /** @format int32 */
  hotelId?: number;
  /** @format double */
  originalRoomPrice?: number;
  /** @format double */
  discount?: number;
  /** @format double */
  finalPrice?: number;
  cityName?: string | null;
  hotelName?: string | null;
  /** @format int32 */
  hotelStarRating?: number;
  title?: string | null;
  description?: string | null;
  roomPhotoUrl?: string | null;
}

export interface FilterAmenityDto {
  name?: string | null;
  description?: string | null;
}

export interface HotelAmenity {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 500
   */
  description?: string | null;
}

export interface HotelAmenityDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
}

export interface HotelAmenityForCreationDto {
  name?: string | null;
  description?: string | null;
}

export interface HotelAmenityForUpdateDto {
  name?: string | null;
  description?: string | null;
}

export interface HotelDto {
  /** @format int32 */
  id?: number;
  hotelName?: string;
  location?: string;
  description?: string | null;
  hotelType?: HotelType;
  /** @format int32 */
  starRating?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  rooms?: RoomDto[] | null;
  imageUrl?: string;
  availableRooms?: number | null;
  cityId?: number | null;
  amenities?: HotelAmenityDto[] | null;
}

export interface HotelForCreationDto {
  name?: string | null;
  description?: string | null;
  hotelType?: HotelType;
  /** @format int32 */
  starRating?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
}

export interface HotelForUpdateDto {
  name?: string | null;
  description?: string | null;
  hotelType?: HotelType;
  /** @format int32 */
  starRating?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
}

/** @format int32 */
export enum HotelType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface HotelWithoutRooms {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
  hotelType?: HotelType;
  /** @format int32 */
  starRating?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
}

export interface Operation {
  operationType?: OperationType;
  path?: string | null;
  op?: string | null;
  from?: string | null;
  value?: any;
}

/** @format int32 */
export enum OperationType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

export interface PhotoDto {
  /** @format int32 */
  id?: number;
  url?: string;
}

export interface PhotoForCreationDto {
  url?: string | null;
}

export interface PhotoForUpdateDto {
  url?: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface RecentHotelResultDto {
  /** @format int32 */
  hotelId?: number;
  hotelName?: string | null;
  /** @format int32 */
  starRating?: number;
  /** @format date-time */
  visitDate?: string;
  cityName?: string | null;
  thumbnailUrl?: string | null;
  /** @format int32 */
  priceLowerBound?: number;
  /** @format int32 */
  priceUpperBound?: number;
}

export interface ReviewDto {
  /** @format int32 */
  reviewId?: number;
  customerName?: string | null;
  /** @format double */
  rating?: number;
  description?: string | null;
}

export interface RoomAmenity {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 500
   */
  description?: string | null;
}

export interface RoomAmenityDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
}

export interface RoomAmenityForCreationDto {
  name?: string | null;
  description?: string | null;
}

export interface RoomAmenityForUpdateDto {
  name?: string | null;
  description?: string | null;
}

export interface RoomAvailabilityResultDto {
  /** @format int32 */
  roomId?: number;
  /** @format int32 */
  roomNumber?: number;
  roomPhotoUrl?: string | null;
  roomType?: string | null;
  /** @format int32 */
  capacityOfAdults?: number;
  /** @format int32 */
  capacityOfChildren?: number;
  roomAmenities?: FilterAmenityDto[] | null;
  /** @format double */
  price?: number;
  availability?: boolean;
}

export interface RoomClassDto {
  /** @format int32 */
  id?: number;
  /** @format double */
  standardCost?: number;
  description?: string | null;
}

export interface RoomClassForCreationDto {
  /** @format double */
  standardCost?: number;
  description?: string | null;
}

export interface RoomDto {
  /** @format int32 */
  id?: number;
  roomNumber?: string | null;
  /** @format double */
  cost?: number | null;
}

export interface RoomForCreationDto {
  roomNumber?: string | null;
  /** @format double */
  cost?: number | null;
}

export interface RoomForUpdateDto {
  roomNumber?: string | null;
  /** @format double */
  cost?: number | null;
}

export interface SearchResultDto {
  /** @format int32 */
  hotelId?: number;
  hotelName?: string | null;
  /** @format int32 */
  starRating?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  /** @format double */
  roomPrice?: number;
  roomType?: string | null;
  cityName?: string | null;
  roomPhotoUrl?: string | null;
  /** @format double */
  discount?: number;
  amenities?: RoomAmenityDto[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}
