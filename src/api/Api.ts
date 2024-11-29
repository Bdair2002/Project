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
import {
  AuthenticationRequestBody,
  BookingDetailsDto,
  BookingRequest,
  CityDto,
  CityForCreationDto,
  CityForUpdateDto,
  CityWithoutHotels,
  Destination,
  FeaturedDealDto,
  FilterAmenityDto,
  HotelAmenity,
  HotelAmenityDto,
  HotelAmenityForCreationDto,
  HotelAmenityForUpdateDto,
  HotelDto,
  HotelForCreationDto,
  HotelForUpdateDto,
  HotelType,
  HotelWithoutRooms,
  Operation,
  OperationType,
  PhotoDto,
  PhotoForCreationDto,
  PhotoForUpdateDto,
  ProblemDetails,
  RecentHotelResultDto,
  ReviewDto,
  RoomAmenity,
  RoomAmenityDto,
  RoomAmenityForCreationDto,
  RoomAmenityForUpdateDto,
  RoomAvailabilityResultDto,
  RoomClassDto,
  RoomClassForCreationDto,
  RoomDto,
  RoomForCreationDto,
  RoomForUpdateDto,
  SearchResultDto,
  QueryParamsType,
  ResponseFormat,
  FullRequestParams,
  RequestParams,
  ApiConfig,
  HttpResponse,
  ContentType,
  CancelToken,
} from './types';

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key]);
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      },
    ).then(async response => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title HotelInfo.API
 * @version 1.0
 */
export class Api<SecurityDataType extends { token?: string }> extends HttpClient<SecurityDataType> {
  constructor(config: ApiConfig<SecurityDataType> = {}) {
    super({
      ...config,
      securityWorker: async (securityData: SecurityDataType | null) => {
        if (securityData && securityData.token) {
          return {
            headers: {
              Authorization: `Bearer ${securityData.token}`,
            },
          };
        }
        return {};
      },
    });
  }
  api = {
    /**
     * No description
     *
     * @tags Authentication
     * @name AuthAuthenticateCreate
     * @request POST:/api/auth/authenticate
     * @secure
     */
    authAuthenticateCreate: (data: AuthenticationRequestBody, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/auth/authenticate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name GetBooking
     * @request GET:/api/bookings/{bookingId}
     * @secure
     */
    getBooking: (bookingId: number, params: RequestParams = {}) =>
      this.request<BookingDetailsDto, ProblemDetails>({
        path: `/api/bookings/${bookingId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsCreate
     * @request POST:/api/bookings
     * @secure
     */
    bookingsCreate: (data: BookingRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/bookings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesList
     * @summary Retrieve a list of cities by searching for specific criteria.
     * @request GET:/api/cities
     * @secure
     */
    citiesList: (
      query?: {
        /** The name of the city or a part of it to search for. */
        name?: string;
        /** A string to search for in the city descriptions. */
        searchQuery?: string;
        /**
         * The number of results to display per page (default is 10).
         * @format int32
         * @default 10
         */
        pageSize?: number;
        /**
         * The page number for paginated results (default is 1).
         * @format int32
         * @default 1
         */
        pageNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CityWithoutHotels[], any>({
        path: `/api/cities`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesCreate
     * @summary Create a new city.
     * @request POST:/api/cities
     * @secure
     */
    citiesCreate: (data: CityForCreationDto, params: RequestParams = {}) =>
      this.request<CityDto, any>({
        path: `/api/cities`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name GetCity
     * @summary Get detailed information about a city by its unique identifier.
     * @request GET:/api/cities/{cityId}
     * @secure
     */
    getCity: (
      cityId: number,
      query?: {
        /**
         * Specify whether or not to include information about hotels in the city.
         * @default false
         */
        includeHotels?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesUpdate
     * @summary Update an entire city.
     * @request PUT:/api/cities/{cityId}
     * @secure
     */
    citiesUpdate: (cityId: number, data: CityForUpdateDto, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesPartialUpdate
     * @summary Partially update a city.
     * @request PATCH:/api/cities/{cityId}
     * @secure
     */
    citiesPartialUpdate: (cityId: number, data: Operation[], params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesDelete
     * @summary Delete a city and associated data.
     * @request DELETE:/api/cities/{cityId}
     * @secure
     */
    citiesDelete: (cityId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesHotelsDetail
     * @summary Retrieve a list of hotels in a specific city.
     * @request GET:/api/cities/{cityId}/hotels
     * @secure
     */
    citiesHotelsDetail: (cityId: number, params: RequestParams = {}) =>
      this.request<HotelWithoutRooms[], ProblemDetails>({
        path: `/api/cities/${cityId}/hotels`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesHotelsCreate
     * @summary Create a new hotel in a specific city.
     * @request POST:/api/cities/{cityId}/hotels
     * @secure
     */
    citiesHotelsCreate: (cityId: number, data: HotelForCreationDto, params: RequestParams = {}) =>
      this.request<HotelDto, ProblemDetails>({
        path: `/api/cities/${cityId}/hotels`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesHotelsDelete
     * @summary Delete a hotel within a specific city.
     * @request DELETE:/api/cities/{cityId}/hotels/{hotelId}
     * @secure
     */
    citiesHotelsDelete: (cityId: number, hotelId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}/hotels/${hotelId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesPhotosDetail
     * @summary Retrieve a list of photos of a specific city.
     * @request GET:/api/cities/{cityId}/photos
     * @secure
     */
    citiesPhotosDetail: (cityId: number, params: RequestParams = {}) =>
      this.request<PhotoDto[], ProblemDetails>({
        path: `/api/cities/${cityId}/photos`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesPhotosCreate
     * @summary Add a new photo to a specific city.
     * @request POST:/api/cities/{cityId}/photos
     * @secure
     */
    citiesPhotosCreate: (cityId: number, data: PhotoForCreationDto, params: RequestParams = {}) =>
      this.request<PhotoDto, ProblemDetails>({
        path: `/api/cities/${cityId}/photos`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CitiesPhotosDelete
     * @summary Delete a photo for a specific city.
     * @request DELETE:/api/cities/{cityId}/photos/{photoId}
     * @secure
     */
    citiesPhotosDelete: (cityId: number, photoId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/cities/${cityId}/photos/${photoId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Home
     * @name HomeSearchList
     * @request GET:/api/home/search
     * @secure
     */
    homeSearchList: (
      query?: {
        checkInDate?: string;
        checkOutDate?: string;
        city?: string;
        /** @format int32 */
        starRate?: number;
        sort?: string;
        /**
         * @format int32
         * @default 1
         */
        numberOfRooms?: number;
        /**
         * @format int32
         * @default 2
         */
        adults?: number;
        /**
         * @format int32
         * @default 0
         */
        children?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchResultDto[], any>({
        path: `/api/home/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Home
     * @name HomeUsersRecentHotelsDetail
     * @request GET:/api/home/users/{userId}/recent-hotels
     * @secure
     */
    homeUsersRecentHotelsDetail: (userId: number, params: RequestParams = {}) =>
      this.request<RecentHotelResultDto[], any>({
        path: `/api/home/users/${userId}/recent-hotels`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Home
     * @name HomeFeaturedDealsList
     * @request GET:/api/home/featured-deals
     * @secure
     */
    homeFeaturedDealsList: (params: RequestParams = {}) =>
      this.request<FeaturedDealDto[], any>({
        path: `/api/home/featured-deals`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Home
     * @name HomeDestinationsTrendingList
     * @request GET:/api/home/destinations/trending
     * @secure
     */
    homeDestinationsTrendingList: (params: RequestParams = {}) =>
      this.request<Destination[], any>({
        path: `/api/home/destinations/trending`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags HotelAmenities
     * @name HotelAmenitiesList
     * @summary Retrieve a list of hotels amenities based on search criteria.
     * @request GET:/api/hotel-Amenities
     * @secure
     */
    hotelAmenitiesList: (
      query?: {
        /** The name of the hotels amenities to search for, or a part of it. */
        name?: string;
        /**
         * The number of results to display per page (default is 10).
         * @format int32
         * @default 10
         */
        pageSize?: number;
        /**
         * The page number for paginated results (default is 1).
         * @format int32
         * @default 1
         */
        pageNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HotelAmenity[], any>({
        path: `/api/hotel-Amenities`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags HotelAmenities
     * @name GetHotelAmenity
     * @summary Retrieve information about a hotel amenity by its unique identifier.
     * @request GET:/api/hotel-Amenities/{hotelAmenityId}
     * @secure
     */
    getHotelAmenity: (hotelAmenityId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotel-Amenities/${hotelAmenityId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HotelAmenities
     * @name HotelAmenitiesUpdate
     * @summary Update information about a specific hotel amenity.
     * @request PUT:/api/hotel-Amenities/{hotelAmenityId}
     * @secure
     */
    hotelAmenitiesUpdate: (
      hotelAmenityId: number,
      data: HotelAmenityForUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotel-Amenities/${hotelAmenityId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags HotelAmenities
     * @name HotelAmenitiesPartialUpdate
     * @summary Partially update information about a specific hotel amenity.
     * @request PATCH:/api/hotel-Amenities/{hotelAmenityId}
     * @secure
     */
    hotelAmenitiesPartialUpdate: (
      hotelAmenityId: number,
      data: Operation[],
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotel-Amenities/${hotelAmenityId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsList
     * @summary Retrieve a list of hotels based on search criteria.
     * @request GET:/api/hotels
     * @secure
     */
    hotelsList: (
      query?: {
        /** The name of the hotels to search for, or a part of it. */
        name?: string;
        /** A string to search for in hotel descriptions. */
        searchQuery?: string;
        /**
         * The number of results to display per page (default is 10).
         * @format int32
         * @default 10
         */
        pageSize?: number;
        /**
         * The page number for paginated results (default is 1).
         * @format int32
         * @default 1
         */
        pageNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HotelWithoutRooms[], any>({
        path: `/api/hotels`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name GetHotel
     * @summary Retrieve information about a hotel by its unique identifier.
     * @request GET:/api/hotels/{hotelId}
     * @secure
     */
    getHotel: (
      hotelId: number,
      query?: {
        /**
         * Indicates whether or not to include room details for the hotel.
         * @default false
         */
        includeRooms?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsUpdate
     * @summary Update information about a specific hotel.
     * @request PUT:/api/hotels/{hotelId}
     * @secure
     */
    hotelsUpdate: (hotelId: number, data: HotelForUpdateDto, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsPartialUpdate
     * @summary Partially update information about a specific hotel.
     * @request PATCH:/api/hotels/{hotelId}
     * @secure
     */
    hotelsPartialUpdate: (hotelId: number, data: Operation[], params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsRoomsDetail
     * @summary Retrieve a list of rooms within a specific hotel.
     * @request GET:/api/hotels/{hotelId}/rooms
     * @secure
     */
    hotelsRoomsDetail: (
      hotelId: number,
      query?: {
        checkInDate?: string;
        checkOutDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RoomAvailabilityResultDto[], ProblemDetails>({
        path: `/api/hotels/${hotelId}/rooms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsRoomsCreate
     * @summary Create a new room within a specific hotel.
     * @request POST:/api/hotels/{hotelId}/rooms
     * @secure
     */
    hotelsRoomsCreate: (hotelId: number, data: RoomForCreationDto, params: RequestParams = {}) =>
      this.request<HotelDto, ProblemDetails>({
        path: `/api/hotels/${hotelId}/rooms`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsAvailableRoomsDetail
     * @request GET:/api/hotels/{hotelId}/available-rooms
     * @secure
     */
    hotelsAvailableRoomsDetail: (
      hotelId: number,
      query?: {
        checkInDate?: string;
        CheckOutDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RoomAvailabilityResultDto[], ProblemDetails>({
        path: `/api/hotels/${hotelId}/available-rooms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsReviewsDetail
     * @summary Retrieve a list of reviews to a specific hotel.
     * @request GET:/api/hotels/{hotelId}/reviews
     * @secure
     */
    hotelsReviewsDetail: (hotelId: number, params: RequestParams = {}) =>
      this.request<ReviewDto[], ProblemDetails>({
        path: `/api/hotels/${hotelId}/reviews`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsRoomsDelete
     * @summary Delete a room within a specific hotel.
     * @request DELETE:/api/hotels/{hotelId}/rooms/{roomId}
     * @secure
     */
    hotelsRoomsDelete: (hotelId: number, roomId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}/rooms/${roomId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsGalleryDetail
     * @summary Retrieve a list of photos of a specific hotel.
     * @request GET:/api/hotels/{hotelId}/gallery
     * @secure
     */
    hotelsGalleryDetail: (hotelId: number, params: RequestParams = {}) =>
      this.request<PhotoDto[], ProblemDetails>({
        path: `/api/hotels/${hotelId}/gallery`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsPhotosCreate
     * @summary Add a new photo to a specific hotel.
     * @request POST:/api/hotels/{hotelId}/photos
     * @secure
     */
    hotelsPhotosCreate: (hotelId: number, data: PhotoForCreationDto, params: RequestParams = {}) =>
      this.request<PhotoDto, ProblemDetails>({
        path: `/api/hotels/${hotelId}/photos`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsPhotosDelete
     * @summary Delete a photo for a specific hotel.
     * @request DELETE:/api/hotels/{hotelId}/photos/{photoId}
     * @secure
     */
    hotelsPhotosDelete: (hotelId: number, photoId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}/photos/${photoId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsAmenitiesDetail
     * @summary Retrieve a list of amenities within a specific hotel.
     * @request GET:/api/hotels/{hotelId}/amenities
     * @secure
     */
    hotelsAmenitiesDetail: (hotelId: number, params: RequestParams = {}) =>
      this.request<HotelAmenityDto[], ProblemDetails>({
        path: `/api/hotels/${hotelId}/amenities`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsAmenitiesCreate
     * @summary Add a new hotel amenity to a specific hotel.
     * @request POST:/api/hotels/{hotelId}/amenities
     * @secure
     */
    hotelsAmenitiesCreate: (
      hotelId: number,
      data: HotelAmenityForCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<HotelAmenityDto, ProblemDetails>({
        path: `/api/hotels/${hotelId}/amenities`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hotels
     * @name HotelsAmenitiesDelete
     * @summary Delete a hotel amenity from a specific hotel.
     * @request DELETE:/api/hotels/{hotelId}/amenities/{hotelAmenityId}
     * @secure
     */
    hotelsAmenitiesDelete: (hotelId: number, hotelAmenityId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/hotels/${hotelId}/amenities/${hotelAmenityId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photo
     * @name GetPhoto
     * @summary Retrieve information about a specific photo by its unique identifier.
     * @request GET:/api/photos/{photoId}
     * @secure
     */
    getPhoto: (photoId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/photos/${photoId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photo
     * @name PhotosUpdate
     * @summary Update information about a specific photo.
     * @request PUT:/api/photos/{photoId}
     * @secure
     */
    photosUpdate: (photoId: number, data: PhotoForUpdateDto, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/photos/${photoId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photo
     * @name PhotosPartialUpdate
     * @summary Partially update information about a specific photo using a JSON patch document.
     * @request PATCH:/api/photos/{photoId}
     * @secure
     */
    photosPartialUpdate: (photoId: number, data: Operation[], params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/photos/${photoId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photo
     * @name PhotosCreate
     * @summary Upload new photo.
     * @request POST:/api/photos
     * @secure
     */
    photosCreate: (
      data: {
        /** @format binary */
        files?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/photos`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomAmenities
     * @name RoomAmenitiesList
     * @summary Retrieve a list of room amenities based on search criteria.
     * @request GET:/api/room-amenities
     * @secure
     */
    roomAmenitiesList: (
      query?: {
        /** The name of the room amenities to search for, or a part of it. */
        name?: string;
        /**
         * The number of results to display per page (default is 10).
         * @format int32
         * @default 10
         */
        pageSize?: number;
        /**
         * The page number for paginated results (default is 1).
         * @format int32
         * @default 1
         */
        pageNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RoomAmenity[], any>({
        path: `/api/room-amenities`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomAmenities
     * @name GetRoomAmenity
     * @summary Retrieve information about a room amenity by its unique identifier.
     * @request GET:/api/room-amenities/{roomAmenityId}
     * @secure
     */
    getRoomAmenity: (roomAmenityId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-amenities/${roomAmenityId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomAmenities
     * @name RoomAmenitiesUpdate
     * @summary Update information about a specific room amenity.
     * @request PUT:/api/room-amenities/{roomAmenityId}
     * @secure
     */
    roomAmenitiesUpdate: (
      roomAmenityId: number,
      data: RoomAmenityForUpdateDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-amenities/${roomAmenityId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomAmenities
     * @name RoomAmenitiesPartialUpdate
     * @summary Partially update information about a specific room amenity.
     * @request PATCH:/api/room-amenities/{roomAmenityId}
     * @secure
     */
    roomAmenitiesPartialUpdate: (
      roomAmenityId: number,
      data: Operation[],
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-amenities/${roomAmenityId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name GetRoomClass
     * @summary Retrieve information about a specific room class by its unique identifier.
     * @request GET:/api/room-classes/{roomClassId}
     * @secure
     */
    getRoomClass: (roomClassId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesUpdate
     * @summary Update information about a specific room Class.
     * @request PUT:/api/room-classes/{roomClassId}
     * @secure
     */
    roomClassesUpdate: (
      roomClassId: number,
      data: RoomClassForCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesPartialUpdate
     * @summary Partially update information about a specific room class using a JSON patch document.
     * @request PATCH:/api/room-classes/{roomClassId}
     * @secure
     */
    roomClassesPartialUpdate: (
      roomClassId: number,
      data: Operation[],
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesCreate
     * @summary Create a new room class.
     * @request POST:/api/room-classes
     * @secure
     */
    roomClassesCreate: (data: RoomClassForCreationDto, params: RequestParams = {}) =>
      this.request<RoomClassDto, any>({
        path: `/api/room-classes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesPhotosDetail
     * @summary Retrieve a list of photos of a specific room class.
     * @request GET:/api/room-classes/{roomClassId}/photos
     * @secure
     */
    roomClassesPhotosDetail: (roomClassId: number, params: RequestParams = {}) =>
      this.request<PhotoDto[], ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/photos`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesPhotosCreate
     * @summary Add a new photo to a specific room class.
     * @request POST:/api/room-classes/{roomClassId}/photos
     * @secure
     */
    roomClassesPhotosCreate: (
      roomClassId: number,
      data: PhotoForCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<PhotoDto, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/photos`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesPhotosDelete
     * @summary Delete a photo for a specific room class.
     * @request DELETE:/api/room-classes/{roomClassId}/photos/{photoId}
     * @secure
     */
    roomClassesPhotosDelete: (roomClassId: number, photoId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/photos/${photoId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesAmenitiesDetail
     * @summary Retrieve a list of amenities within a specific room class.
     * @request GET:/api/room-classes/{roomClassId}/amenities
     * @secure
     */
    roomClassesAmenitiesDetail: (roomClassId: number, params: RequestParams = {}) =>
      this.request<RoomAmenityDto[], ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/amenities`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesAmenitiesCreate
     * @summary Add a new room amenity to a specific room class.
     * @request POST:/api/room-classes/{roomClassId}/amenities
     * @secure
     */
    roomClassesAmenitiesCreate: (
      roomClassId: number,
      data: RoomAmenityForCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<RoomAmenityDto, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/amenities`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesAmenitiesDelete
     * @summary Delete a room amenity from a specific room class.
     * @request DELETE:/api/room-classes/{roomClassId}/amenities/{roomAmenityId}
     * @secure
     */
    roomClassesAmenitiesDelete: (
      roomClassId: number,
      roomAmenityId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/amenities/${roomAmenityId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesRoomsDetail
     * @summary Retrieve a list of rooms within a specific room class.
     * @request GET:/api/room-classes/{roomClassId}/rooms
     * @secure
     */
    roomClassesRoomsDetail: (roomClassId: number, params: RequestParams = {}) =>
      this.request<RoomDto[], ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/rooms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesRoomsCreate
     * @summary Add a new room within a specific room class.
     * @request POST:/api/room-classes/{roomClassId}/rooms
     * @secure
     */
    roomClassesRoomsCreate: (
      roomClassId: number,
      query?: {
        /**
         * The unique identifier of the room that will be added.
         * @format int32
         */
        roomId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RoomDto, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/rooms`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags RoomClasses
     * @name RoomClassesRoomsDelete
     * @summary Delete a room within a specific room class.
     * @request DELETE:/api/room-classes/{roomClassId}/rooms/{roomId}
     * @secure
     */
    roomClassesRoomsDelete: (roomClassId: number, roomId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/room-classes/${roomClassId}/rooms/${roomId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name GetRoom
     * @summary Retrieve information about a specific room by its unique identifier.
     * @request GET:/api/rooms/{roomId}
     * @secure
     */
    getRoom: (roomId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/rooms/${roomId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsUpdate
     * @summary Update information about a specific room.
     * @request PUT:/api/rooms/{roomId}
     * @secure
     */
    roomsUpdate: (roomId: number, data: RoomForUpdateDto, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/rooms/${roomId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsPartialUpdate
     * @summary Partially update information about a specific room using a JSON patch document.
     * @request PATCH:/api/rooms/{roomId}
     * @secure
     */
    roomsPartialUpdate: (roomId: number, data: Operation[], params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/rooms/${roomId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsPhotosDetail
     * @summary Retrieve a list of photos of a specific room.
     * @request GET:/api/rooms/{roomId}/photos
     * @secure
     */
    roomsPhotosDetail: (roomId: number, params: RequestParams = {}) =>
      this.request<PhotoDto[], ProblemDetails>({
        path: `/api/rooms/${roomId}/photos`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsPhotosCreate
     * @summary Add a new photo to a specific room.
     * @request POST:/api/rooms/{roomId}/photos
     * @secure
     */
    roomsPhotosCreate: (roomId: number, data: PhotoForCreationDto, params: RequestParams = {}) =>
      this.request<PhotoDto, ProblemDetails>({
        path: `/api/rooms/${roomId}/photos`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsPhotosDelete
     * @summary Delete a photo for a specific room.
     * @request DELETE:/api/rooms/{roomId}/photos/{photoId}
     * @secure
     */
    roomsPhotosDelete: (roomId: number, photoId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/rooms/${roomId}/photos/${photoId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsAmenitiesDetail
     * @summary Retrieve a list of amenities within a specific room.
     * @request GET:/api/rooms/{roomId}/amenities
     * @secure
     */
    roomsAmenitiesDetail: (roomId: number, params: RequestParams = {}) =>
      this.request<RoomAmenityDto[], ProblemDetails>({
        path: `/api/rooms/${roomId}/amenities`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsAmenitiesCreate
     * @summary Add a new room amenity to a specific room.
     * @request POST:/api/rooms/{roomId}/amenities
     * @secure
     */
    roomsAmenitiesCreate: (
      roomId: number,
      data: RoomAmenityForCreationDto,
      params: RequestParams = {},
    ) =>
      this.request<RoomAmenityDto, ProblemDetails>({
        path: `/api/rooms/${roomId}/amenities`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Rooms
     * @name RoomsAmenitiesDelete
     * @summary Delete a room amenity from a specific room.
     * @request DELETE:/api/rooms/{roomId}/amenities/{roomAmenityId}
     * @secure
     */
    roomsAmenitiesDelete: (roomId: number, roomAmenityId: number, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/rooms/${roomId}/amenities/${roomAmenityId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SearchResultsPage
     * @name SearchResultsAmenitiesList
     * @request GET:/api/search-results/amenities
     * @secure
     */
    searchResultsAmenitiesList: (params: RequestParams = {}) =>
      this.request<FilterAmenityDto[], any>({
        path: `/api/search-results/amenities`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
