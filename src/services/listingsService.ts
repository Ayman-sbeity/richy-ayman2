const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

export interface ListingPayload {
  sellerType: string;
  subscriptionPlan: string;
  billingCycle: 'monthly' | 'yearly';
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

export const listingsService = {
  async addListing(listingData: ListingPayload, token?: string): Promise<ListingResponse> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create listing');
    }

    return response.json();
  },

  async getListings(filters?: Record<string, any>): Promise<any[]> {
    let url = `${API_BASE_URL}/listings`;
    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }

    return response.json();
  },

  async getListingById(id: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch listing');
    }

    return response.json();
  },

  async updateListing(id: string, listingData: Partial<ListingPayload>, token?: string): Promise<ListingResponse> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update listing');
    }

    return response.json();
  },

  async deleteListing(id: string, token?: string): Promise<{ message: string }> {
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete listing');
    }

    return response.json();
  },
};
