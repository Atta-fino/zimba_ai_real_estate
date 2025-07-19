import { PropertyType, Feature, getPropertyTypeDisplay, getFeatureDisplay } from '../enums';

describe('Enum Definitions and Helpers', () => {
  describe('PropertyType Enum', () => {
    it('should have correct structure for PropertyType', () => {
      expect(PropertyType).toBeDefined();
      expect(PropertyType.apartment).toEqual('Apartment');
      expect(PropertyType.detached_house).toEqual('Detached House');
      // Add more checks if necessary for all types
    });

    it('getPropertyTypeDisplay should return correct display string', () => {
      expect(getPropertyTypeDisplay('apartment')).toEqual('Apartment');
      expect(getPropertyTypeDisplay('detached_house')).toEqual('Detached House');
    });

    it('getPropertyTypeDisplay should return key if not found', () => {
      expect(getPropertyTypeDisplay('non_existent_type')).toEqual('non_existent_type');
    });
  });

  describe('Feature Enum', () => {
    it('should have correct structure for Feature', () => {
      expect(Feature).toBeDefined();
      expect(Feature.air_conditioner).toEqual('Air Conditioner');
      expect(Feature.garage).toEqual('Garage');
      // Add more checks if necessary for all features
    });

    it('getFeatureDisplay should return correct display string', () => {
      expect(getFeatureDisplay('air_conditioner')).toEqual('Air Conditioner');
      expect(getFeatureDisplay('garage')).toEqual('Garage');
    });

    it('getFeatureDisplay should return key if not found', () => {
      expect(getFeatureDisplay('non_existent_feature')).toEqual('non_existent_feature');
    });
  });
});
