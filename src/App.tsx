import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { VehicleOnboarding, VehiclePreferences } from './components/VehicleOnboarding';
import { VehicleIdentification } from './components/VehicleIdentification';
import { VehicleDetails } from './components/VehicleDetails';
import { VehicleListings } from './components/VehicleListings';

interface VehicleRecommendation {
  id: string;
  make: string;
  model: string;
  description: string;
  priceRange: string;
  image: string;
  savings: string;
  matchScore: number;
  reasons: string[];
}

type AppState = 'homepage' | 'onboarding' | 'identification' | 'details' | 'listings';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('homepage');
  const [vehiclePreferences, setVehiclePreferences] = useState<VehiclePreferences | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecommendation | null>(null);
  const [addedVehicles, setAddedVehicles] = useState<VehicleRecommendation[]>([]);

  const handleStartOnboarding = () => {
    setCurrentState('onboarding');
  };

  const handleIdentifyType = (preferences: VehiclePreferences) => {
    setVehiclePreferences(preferences);
    setCurrentState('identification');
  };

  const handleViewDetails = (vehicle: VehicleRecommendation) => {
    setSelectedVehicle(vehicle);
    setCurrentState('details');
  };

  const handleBackToHome = () => {
    setCurrentState('homepage');
    setVehiclePreferences(null);
    setSelectedVehicle(null);
    setAddedVehicles([]);
  };

  const handleBackToOnboarding = () => {
    setCurrentState('onboarding');
  };

  const handleBackToIdentification = () => {
    setCurrentState('identification');
    setSelectedVehicle(null);
  };

  const handleAddVehicle = (vehicle: VehicleRecommendation) => {
    if (!addedVehicles.find(v => v.id === vehicle.id)) {
      setAddedVehicles(prev => [...prev, vehicle]);
    }
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    setAddedVehicles(prev => prev.filter(v => v.id !== vehicleId));
  };

  const handleFindListings = () => {
    setCurrentState('listings');
  };

  const handleBackToListings = () => {
    setCurrentState('listings');
  };

  switch (currentState) {
    case 'onboarding':
      return (
        <div className="min-h-screen bg-background">
          <VehicleOnboarding 
            onBack={handleBackToHome} 
            onIdentifyType={handleIdentifyType}
          />
        </div>
      );

    case 'identification':
      return vehiclePreferences ? (
        <VehicleIdentification 
          preferences={vehiclePreferences}
          onBack={handleBackToOnboarding}
          onViewDetails={handleViewDetails}
          addedVehicles={addedVehicles}
          onAddVehicle={handleAddVehicle}
          onRemoveVehicle={handleRemoveVehicle}
          onFindListings={handleFindListings}
        />
      ) : null;

    case 'details':
      return selectedVehicle ? (
        <VehicleDetails 
          vehicle={selectedVehicle}
          onBack={handleBackToIdentification}
          onClose={handleBackToIdentification}
          onAddVehicle={handleAddVehicle}
          isAdded={addedVehicles.some(v => v.id === selectedVehicle.id)}
        />
      ) : null;

    case 'listings':
      return (
        <VehicleListings 
          vehicleName={addedVehicles.length > 0 ? `${addedVehicles[0].make} ${addedVehicles[0].model}` : 'Vehicle'}
          onBack={handleBackToIdentification}
        />
      );

    case 'homepage':
    default:
      return (
        <div className="min-h-screen bg-background">
          <Homepage onStartOnboarding={handleStartOnboarding} />
        </div>
      );
  }
}