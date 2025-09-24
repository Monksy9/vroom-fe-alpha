import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { VehicleOnboarding } from './components/VehicleOnboarding';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <VehicleOnboarding onBack={() => setShowOnboarding(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Homepage onStartOnboarding={() => setShowOnboarding(true)} />
    </div>
  );
}