import { apiClient } from './authService';

export interface Subscription {
  _id: string;
  user_id: string;
  plan: 'free' | 'basic' | 'premium' | 'professional';
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  expirationDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  price: number;
}

export interface SubscriptionPayload {
  userId?: string; // Try camelCase
  user_id?: string; // Keep snake_case as fallback
  plan: string;
  billingCycle: string;
  billing_cycle?: string; // Also snake_case
  startDate: string;
  start_date?: string; // Also snake_case
  expirationDate: string;
  expiration_date?: string; // Also snake_case
  status: string;
  autoRenew: boolean;
  auto_renew?: boolean; // Also snake_case
  price: number;
}

export const subscriptionService = {
  // Get user's current subscription
  async getCurrentSubscription(): Promise<Subscription | null> {
    try {
      const response = await apiClient.get<Subscription>('/user-subscriptions/current');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // No subscription found
      }
      const errorMessage = error.response?.data?.message || 'Failed to fetch subscription';
      throw new Error(errorMessage);
    }
  },

  // Subscribe to a plan
  subscribe: async (subscriptionData: SubscriptionPayload): Promise<Subscription> => {
    try {
      console.log('Sending subscription data:', subscriptionData);
      const response = await apiClient.post<Subscription>(
        '/user-subscriptions', 
        subscriptionData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Subscription response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Subscription error:', error.response?.data, subscriptionData);
      throw error.response?.data || error;
    }
  },

  // Update subscription
  async updateSubscription(subscriptionData: Partial<SubscriptionPayload>): Promise<Subscription> {
    try {
      const response = await apiClient.put<Subscription>('/user-subscriptions', subscriptionData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update subscription';
      throw new Error(errorMessage);
    }
  },

  // Cancel subscription
  async cancelSubscription(): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<{ message: string }>('/user-subscriptions');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel subscription';
      throw new Error(errorMessage);
    }
  },

  isSubscriptionActive(subscription: Subscription | null): boolean {
    if (!subscription) return false;
    
    const now = new Date();
    const expirationDate = new Date(subscription.expirationDate);
    
    return subscription.status === 'active' && expirationDate > now;
  },

  getDaysUntilExpiration(subscription: Subscription | null): number | null {
    if (!subscription) return null;
    
    const now = new Date();
    const expirationDate = new Date(subscription.expirationDate);
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  },
};
