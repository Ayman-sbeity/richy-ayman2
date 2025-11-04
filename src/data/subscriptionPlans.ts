export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  userType: "owner" | "realtor" | "both";
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    description: "Basic listing with notifications",
    monthlyPrice: 0,
    yearlyPrice: 0,
    userType: "both",
    features: [
      "1 Property listing",
      "Email notifications for new inquiries",
      "Basic property details",
      "Up to 5 photos",
      "Valid for 30 days",
      "Standard support",
    ],
  },

  {
    id: "basic",
    name: "Basic",
    description: "Perfect for growing portfolios",
    monthlyPrice: 15,
    yearlyPrice: 150,
    userType: "both",
    features: [
      "Up to 3 active listings",
      "Priority email & SMS notifications",
      "Featured in search results",
      "Up to 15 photos per listing",
      "Valid for 90 days",
      "Priority support",
      "Basic analytics",
    ],
  },

  {
    id: "professional",
    name: "Professional",
    description: "Most popular - Full access",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    userType: "both",
    highlighted: true,
    features: [
      "Up to 10 active listings",
      "Instant push notifications",
      "Premium featured listings",
      "Unlimited photos",
      "Valid for 180 days",
      "24/7 Priority support",
      "Advanced analytics & insights",
      "Virtual tour integration",
      "Social media promotion",
      "Lead management dashboard",
    ],
  },
];

export const getPlansByUserType = (userType: "owner" | "realtor") => {
  return subscriptionPlans.filter(
    (plan) => plan.userType === userType || plan.userType === "both"
  );
};

export const calculateYearlySavings = (
  monthlyPrice: number,
  yearlyPrice: number
) => {
  return monthlyPrice * 12 - yearlyPrice;
};
