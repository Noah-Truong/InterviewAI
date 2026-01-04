'use client';

import { JobType } from '../types';

interface FilterBarProps {
  selectedType: JobType;
  onTypeChange: (type: JobType) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export default function FilterBar({
  selectedType,
  onTypeChange,
  selectedLocation,
  onLocationChange,
  locations,
}: FilterBarProps) {
  const jobTypes: JobType[] = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Type
        </label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-base"
        >
          <option value="All">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

