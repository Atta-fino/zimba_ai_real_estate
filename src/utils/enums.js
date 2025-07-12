export const PropertyType = {
  apartment: "Apartment",
  detached_house: "Detached House",
  semi_detached: "Semi-Detached",
  townhouse: "Townhouse",
  duplex: "Duplex",
  studio: "Studio",
  hostel_room: "Hostel Room",
  shared_room: "Shared Room",
  office_space: "Office Space",
  commercial_building: "Commercial Building",
  warehouse: "Warehouse",
  short_let: "Short Let",
  single_room_self_contain: "Single Room Self Contain",
  one_bedroom_chamber_hall: "One Bedroom Chamber/Hall",
  two_bedroom_apartment: "Two Bedroom Apartment",
  three_bedroom_apartment: "Three Bedroom Apartment",
  five_bedroom_apartment: "Five Bedroom Apartment",
  compound_house: "Compound House",
  family_compound_house: "Family Compound House",
  flat: "Flat",
  gated_townhouse: "Gated Townhouse",
  story_building: "Story Building",
  market_stall: "Market Stall",
};

export const Feature = {
  air_conditioner: "Air Conditioner",
  garage: "Garage",
  parking_spot: "Parking Spot",
  pool: "Pool",
  furnace: "Furnace",
  compound_space: "Compound Space",
  solar_ready: "Solar Ready",
  prepaid_meter: "Prepaid Meter",
  fiber_internet: "Fiber Internet",
  water_storage: "Water Storage",
  generator_power: "Generator Power",
  cctv_surveillance: "CCTV Surveillance",
  ensuite_bathroom: "Ensuite Bathroom",
  home_office_space: "Home Office Space",
  shared_bathroom: "Shared Bathroom",
  outdoor_bathroom: "Outdoor Bathroom",
  water_heater: "Water Heater",
};

// Helper function to get the display value, defaulting to the key if not found
export const getPropertyTypeDisplay = (typeKey) => PropertyType[typeKey] || typeKey;
export const getFeatureDisplay = (featureKey) => Feature[featureKey] || featureKey;
