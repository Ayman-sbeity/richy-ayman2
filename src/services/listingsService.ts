import { apiClient } from "./authService";

export interface ListingPayload {
  user_id: string;
  sellerType: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: string;
  location: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  parkingSpaces?: string;
  yearBuilt?: string;
  features: string[];
  images: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  agencyName?: string;
  licenseNumber?: string;
}

export interface ListingResponse {
  _id: string;
  title: string;
  message?: string;
  success?: boolean;
}

export interface ListingsApiResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
}

export const listingsService = {
  async addListing(
    listingData: ListingPayload,
    token?: string
  ): Promise<ListingResponse> {
    try {
      const response = await apiClient.post<ListingResponse>(
        "/listings",
        listingData
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create listing";
      throw new Error(errorMessage);
    }
  },

  async getListings(filters?: Record<string, any>): Promise<any[] | ListingsApiResponse> {
    try {
      const response = await apiClient.get("/listings", { params: filters });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch listings";
      throw new Error(errorMessage);
    }
  },

  async getListingById(id: string): Promise<any> {
    try {
      const response = await apiClient.get(`/listings/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch listing";
      throw new Error(errorMessage);
    }
  },

  async updateListing(
    id: string,
    listingData: Partial<ListingPayload>,
    token?: string
  ): Promise<ListingResponse> {
    try {
      // Token is automatically added by axios interceptor
      const response = await apiClient.put<ListingResponse>(
        `/listings/${id}`,
        listingData
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update listing";
      throw new Error(errorMessage);
    }
  },

  async deleteListing(
    id: string,
    token?: string
  ): Promise<{ message: string }> {
    try {
      // Token is automatically added by axios interceptor
      const response = await apiClient.delete<{ message: string }>(
        `/listings/${id}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete listing";
      throw new Error(errorMessage);
    }
  },
};
