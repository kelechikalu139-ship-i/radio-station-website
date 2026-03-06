import React from 'react'

export const SkeletonLoader = () => {
  return (
     <div className="max-w-5xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            <div className="flex gap-3 mt-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

            <div className="space-y-2 mt-6">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
  )
}
