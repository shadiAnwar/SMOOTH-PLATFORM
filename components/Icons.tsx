import React from 'react';

export const InstapayIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#4A148C" />
    <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18V18.01" stroke="#E1BEE7" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const FawryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FFC107" />
    <path d="M6 8H18" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 12H14" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6 16H10" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const VodafoneCashIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#E60000" />
    <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
    <path d="M14 9L15 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const OrangeCashIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF7900" />
    <rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="2"/>
  </svg>
);