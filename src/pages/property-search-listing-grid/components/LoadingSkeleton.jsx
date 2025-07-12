import React from 'react';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden shadow-card animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Price and Rating */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-muted rounded w-24"></div>
              <div className="h-6 bg-muted rounded w-12"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
            
            {/* Location */}
            <div className="h-3 bg-muted rounded w-1/2"></div>
            
            {/* Features */}
            <div className="flex space-x-4">
              <div className="h-3 bg-muted rounded w-12"></div>
              <div className="h-3 bg-muted rounded w-12"></div>
              <div className="h-3 bg-muted rounded w-12"></div>
            </div>
            
            {/* Amenities */}
            <div className="flex space-x-2">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-12"></div>
              <div className="h-6 bg-muted rounded-full w-14"></div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;