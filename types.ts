
export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Could be video URL or text
  isFreePreview: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export enum PricingType {
  FREE = 'FREE',
  ONE_TIME = 'ONE_TIME',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export interface PricingPlan {
  type: PricingType;
  price: number;
  currency: string;
  interval?: 'month' | 'year'; // Only for subscription
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  status: CourseStatus;
  modules: Module[];
  pricing: PricingPlan;
  studentsCount: number;
  revenue: number;
  acceptedPaymentMethods: string[];
}

export type UserRole = 'TUTOR' | 'STUDENT';

export type ViewState = 'LANDING' | 'LOGIN' | 'DASHBOARD' | 'COURSE_EDITOR' | 'SETTINGS';

export interface GeneratedSyllabusItem {
  moduleTitle: string;
  description: string;
}

export type PlanInterval = 'MONTHLY' | 'YEARLY';

export interface TutorSubscription {
  active: boolean;
  plan: PlanInterval | null;
  expiryDate: string | null;
}

export type Theme = 'light' | 'dark' | 'ocean';
export type Language = 'en' | 'ar';

export const PAYMENT_METHODS = {
  CARD: 'CARD',
  INSTAPAY: 'INSTAPAY',
  FAWRY: 'FAWRY',
  VODAFONE_CASH: 'VODAFONE_CASH',
  ORANGE_CASH: 'ORANGE_CASH'
};
