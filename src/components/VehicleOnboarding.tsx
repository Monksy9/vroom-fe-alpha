import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ChevronRight, ChevronLeft, Car, Truck, Bike, PoundSterling, MapPin, Fuel, Clock, Shield, Ruler, Calendar, Upload, MessageSquare, Check, Heart } from 'lucide-react';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

export interface VehiclePreferences {
  vehicleType: string;
  budget: number[];
  useCase: string[];
  fuelType: string;
  mileageImportance: number;
  sizeRequirement: string;
  safetyPriority: string;
  timeline: string;
  additionalNotes: string;
  uploadedImage: File | null;
  selectedInspiration: string[];
}

export function VehicleOnboarding({ onBack }: { onBack?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<VehiclePreferences>({
    vehicleType: '',
    budget: [15000],
    useCase: [],
    fuelType: '',
    mileageImportance: 5,
    sizeRequirement: '',
    safetyPriority: '',
    timeline: '',
    additionalNotes: '',
    uploadedImage: null,
    selectedInspiration: []
  });

  const totalSteps = 9;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updatePreferences = (updates: Partial<VehiclePreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleUseCase = (useCase: string) => {
    const current = preferences.useCase;
    if (current.includes(useCase)) {
      updatePreferences({ useCase: current.filter(item => item !== useCase) });
    } else {
      updatePreferences({ useCase: [...current, useCase] });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <VehicleTypeStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={onBack} />;
      case 1:
        return <BudgetStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <UseCaseStep preferences={preferences} toggleUseCase={toggleUseCase} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <FuelTypeStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <MileageStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <AdditionalFactorsStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <AdditionalNotesStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <ImageUploadStep preferences={preferences} updatePreferences={updatePreferences} onNext={nextStep} onBack={prevStep} />;
      case 8:
        return <BriefGenerationStep preferences={preferences} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {renderStep()}
    </div>
  );
}



function VehicleTypeStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack?: () => void;
}) {
  const vehicleTypes = [
    { id: 'car', label: 'Car', icon: Car, description: 'Personal vehicles, family cars, city cars' },
    { id: 'van', label: 'Van', icon: Truck, description: 'Commercial vans, camper vans, cargo vehicles' },
    { id: 'bike', label: 'Motorcycle', icon: Bike, description: 'Motorcycles, scooters, electric bikes' }
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>What type of vehicle are you looking for?</CardTitle>
        <CardDescription>Choose the category that best fits your needs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {vehicleTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                preferences.vehicleType === type.id ? 'border-primary bg-accent' : 'border-border'
              }`}
              onClick={() => updatePreferences({ vehicleType: type.id })}
            >
              <div className="flex items-center gap-3">
                <type.icon className="h-8 w-8" />
                <div>
                  <h3>{type.label}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          {onBack ? (
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={onNext} disabled={!preferences.vehicleType}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const formatBudget = (value: number) => {
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}k`;
    }
    return `£${value}`;
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>What's your budget range?</CardTitle>
        <CardDescription>This helps us find vehicles within your price range</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            <span>Budget: {formatBudget(preferences.budget[0])}</span>
          </div>
          
          <Slider
            value={preferences.budget}
            onValueChange={(value) => updatePreferences({ budget: value })}
            max={100000}
            min={1000}
            step={1000}
            className="w-full"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>£1k</span>
            <span>£100k+</span>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UseCaseStep({ preferences, toggleUseCase, onNext, onBack }: {
  preferences: VehiclePreferences;
  toggleUseCase: (useCase: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const useCases = [
    'Daily commuting',
    'Family trips',
    'Weekend adventures',
    'Work/Commercial use',
    'City driving',
    'Long distance travel',
    'Off-road activities',
    'Cargo/Moving'
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>How will you use your vehicle?</CardTitle>
        <CardDescription>Select all that apply to help us understand your needs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                preferences.useCase.includes(useCase) ? 'border-primary bg-accent' : 'border-border'
              }`}
              onClick={() => toggleUseCase(useCase)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{useCase}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={preferences.useCase.length === 0}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FuelTypeStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const fuelTypes = [
    { id: 'petrol', label: 'Petrol', description: 'Traditional, widely available' },
    { id: 'diesel', label: 'Diesel', description: 'Better fuel economy, longer range' },
    { id: 'hybrid', label: 'Hybrid', description: 'Combined efficiency, lower emissions' },
    { id: 'electric', label: 'Electric', description: 'Zero emissions, lowest running costs' },
    { id: 'any', label: 'No preference', description: 'Open to any fuel type' }
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Fuel type preference</CardTitle>
        <CardDescription>What type of fuel efficiency matters to you?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {fuelTypes.map((fuel) => (
            <div
              key={fuel.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                preferences.fuelType === fuel.id ? 'border-primary bg-accent' : 'border-border'
              }`}
              onClick={() => updatePreferences({ fuelType: fuel.id })}
            >
              <div className="flex items-center gap-3">
                <Fuel className="h-5 w-5" />
                <div>
                  <h4>{fuel.label}</h4>
                  <p className="text-sm text-muted-foreground">{fuel.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!preferences.fuelType}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MileageStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const importanceLabels = ['Not important', 'Slightly important', 'Moderately important', 'Very important', 'Extremely important'];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>How important are low running costs?</CardTitle>
        <CardDescription>Including fuel efficiency, maintenance, insurance, and depreciation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Importance: {importanceLabels[preferences.mileageImportance - 1]}</span>
          </div>
          
          <Slider
            value={[preferences.mileageImportance]}
            onValueChange={(value) => updatePreferences({ mileageImportance: value[0] })}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Not important</span>
            <span>Extremely important</span>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdditionalFactorsStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const sizeOptions = ['Compact', 'Mid-size', 'Large', 'No preference'];
  const safetyOptions = ['Basic', 'High safety features', 'Premium safety tech', 'No preference'];
  const timelineOptions = ['Immediate (within 1 month)', 'Within 3 months', 'Within 6 months', 'Just browsing'];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Final preferences</CardTitle>
        <CardDescription>Help us refine your vehicle brief with these additional factors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="h-5 w-5" />
              <label>Size requirement</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sizeOptions.map((size) => (
                <Button
                  key={size}
                  variant={preferences.sizeRequirement === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePreferences({ sizeRequirement: size })}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5" />
              <label>Safety priority</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {safetyOptions.map((safety) => (
                <Button
                  key={safety}
                  variant={preferences.safetyPriority === safety ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePreferences({ safetyPriority: safety })}
                >
                  {safety}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5" />
              <label>Timeline</label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {timelineOptions.map((timeline) => (
                <Button
                  key={timeline}
                  variant={preferences.timeline === timeline ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePreferences({ timeline: timeline })}
                >
                  {timeline}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!preferences.sizeRequirement || !preferences.safetyPriority || !preferences.timeline}>
            Generate Brief
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdditionalNotesStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Any additional requirements?</CardTitle>
        <CardDescription>Share any specific features, brands, or requirements that are important to you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <label>Additional notes (optional)</label>
          </div>
          
          <Textarea
            placeholder="E.g., Must have leather seats, prefer German brands, need towing capacity, automatic transmission only, specific color preferences..."
            value={preferences.additionalNotes}
            onChange={(e) => updatePreferences({ additionalNotes: e.target.value })}
            className="min-h-32"
          />
          
          <p className="text-sm text-muted-foreground">
            This helps us understand your specific preferences and find vehicles that match exactly what you're looking for.
          </p>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ImageUploadStep({ preferences, updatePreferences, onNext, onBack }: {
  preferences: VehiclePreferences;
  updatePreferences: (updates: Partial<VehiclePreferences>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    updatePreferences({ uploadedImage: file });
  };

  const toggleInspiration = (imageUrl: string) => {
    const current = preferences.selectedInspiration;
    if (current.includes(imageUrl)) {
      updatePreferences({ selectedInspiration: current.filter(url => url !== imageUrl) });
    } else {
      updatePreferences({ selectedInspiration: [...current, imageUrl] });
    }
  };

  // Curated inspiration images from Unsplash
  const getInspirationImages = () => {
    const carImages = [
      {
        url: "https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzU4NjMzODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Luxury Sports Car",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1735620731955-b047a7122892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXYlMjBjYXJ8ZW58MXx8fHwxNzU4NzI0NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Family SUV",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1651688730796-151972ba8f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjYXJ8ZW58MXx8fHwxNzU4NjUyMTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Electric Vehicle",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1652727743972-5fd1483a23ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnxlbnwxfHx8fDE3NTg2NTQxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Vintage Classic",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1757695526350-1a2db6ff8e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYXRjaGJhY2slMjBjYXJ8ZW58MXx8fHwxNzU4NzI0NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Modern Hatchback",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1748214547184-d994bfe53322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2l0eSUyMGNhcnxlbnwxfHx8fDE3NTg2OTI4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Compact City Car",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1731142582229-e0ee70302c02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTg2NTMxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Luxury Sedan",
        category: "car"
      },
      {
        url: "https://images.unsplash.com/photo-1591105327764-4c4b76f9e6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmYlMjByb2FkJTIwdmVoaWNsZXxlbnwxfHx8fDE3NTg3MjQ1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Off-Road Vehicle",
        category: "car"
      }
    ];

    const vanImages = [
      {
        url: "https://images.unsplash.com/photo-1703597803465-20f393f84e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHZhbiUyMHZlaGljbGV8ZW58MXx8fHwxNzU4NzI0NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Cargo Van",
        category: "van"
      },
      {
        url: "https://images.unsplash.com/flagged/photo-1579158620196-6a8ba90777cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjB2YW4lMjB0cmF2ZWx8ZW58MXx8fHwxNzU4NzI0NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Camper Van",
        category: "van"
      }
    ];

    const bikeImages = [
      {
        url: "https://images.unsplash.com/photo-1598915850224-386a8a520c29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYmlrZXxlbnwxfHx8fDE3NTg2MzQzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Sport Motorcycle",
        category: "bike"
      },
      {
        url: "https://images.unsplash.com/photo-1713777439918-4e0ccff0343b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBiaWtlfGVufDF8fHx8MTc1ODcyNDUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        title: "Electric Scooter",
        category: "bike"
      }
    ];

    // Return images based on selected vehicle type, or all if no type selected
    if (preferences.vehicleType === 'car') return carImages;
    if (preferences.vehicleType === 'van') return vanImages;
    if (preferences.vehicleType === 'bike') return bikeImages;
    
    return [...carImages.slice(0, 4), ...vanImages, ...bikeImages];
  };

  const inspirationImages = getInspirationImages();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1>Find Your Inspiration</h1>
        <p className="text-muted-foreground">Select vehicle styles that catch your eye to help us understand your preferences</p>
      </div>

      {/* Pinterest-style image grid */}
      <div className="mb-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {inspirationImages.map((image, index) => (
            <div
              key={image.url}
              className={`relative group break-inside-avoid cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
                preferences.selectedInspiration.includes(image.url) ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => toggleInspiration(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 3 === 1 ? '4/5' : '2/3' }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {preferences.selectedInspiration.includes(image.url) && (
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <label>Or upload your own inspiration image</label>
            </div>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
              <div className="space-y-3">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>
            </div>
            
            {preferences.uploadedImage && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Upload className="h-4 w-4 text-green-600" />
                <span className="text-sm">{preferences.uploadedImage.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updatePreferences({ uploadedImage: null })}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selection summary */}
      {preferences.selectedInspiration.length > 0 && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {preferences.selectedInspiration.length} inspiration image{preferences.selectedInspiration.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Generate Brief
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function BriefGenerationStep({ preferences, onBack }: {
  preferences: VehiclePreferences;
  onBack: () => void;
}) {
  const formatBudget = (value: number) => {
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}k`;
    }
    return `£${value}`;
  };

  const getVehicleIcon = () => {
    switch (preferences.vehicleType) {
      case 'car': return '🚗';
      case 'van': return '🚐';
      case 'bike': return '🏍️';
      default: return '🚗';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1>Your Personalized Vehicle Brief</h1>
        <p className="text-muted-foreground">Share this with dealers or use it to guide your search</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{getVehicleIcon()}</span>
            {preferences.vehicleType.charAt(0).toUpperCase() + preferences.vehicleType.slice(1)} Search Brief
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3>Primary Use</h3>
                <p className="text-muted-foreground">{preferences.useCase.join(', ')}</p>
              </div>
              
              <div>
                <h3>Budget</h3>
                <p className="text-muted-foreground">Up to {formatBudget(preferences.budget[0])}</p>
              </div>
              
              <div>
                <h3>Fuel Type</h3>
                <p className="text-muted-foreground">{preferences.fuelType.charAt(0).toUpperCase() + preferences.fuelType.slice(1)}</p>
              </div>
              
              <div>
                <h3>Size Requirement</h3>
                <p className="text-muted-foreground">{preferences.sizeRequirement}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3>Safety Priority</h3>
                <p className="text-muted-foreground">{preferences.safetyPriority}</p>
              </div>
              
              <div>
                <h3>Running Costs Priority</h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i <= preferences.mileageImportance ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({preferences.mileageImportance}/5)
                  </span>
                </div>
              </div>
              
              <div>
                <h3>Timeline</h3>
                <p className="text-muted-foreground">{preferences.timeline}</p>
              </div>
              
              {preferences.additionalNotes && (
                <div>
                  <h3>Additional Requirements</h3>
                  <p className="text-muted-foreground">{preferences.additionalNotes}</p>
                </div>
              )}
              
              {preferences.selectedInspiration.length > 0 && (
                <div>
                  <h3>Inspiration Images</h3>
                  <p className="text-muted-foreground">
                    {preferences.selectedInspiration.length} style{preferences.selectedInspiration.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
              
              {preferences.uploadedImage && (
                <div>
                  <h3>Uploaded Image</h3>
                  <p className="text-muted-foreground">Custom image: {preferences.uploadedImage.name}</p>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3>Recommendations Summary</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p>Based on your preferences, look for:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  {preferences.vehicleType === 'car' ? 'Cars' : preferences.vehicleType === 'van' ? 'Vans' : 'Motorcycles'} 
                  {preferences.sizeRequirement !== 'No preference' ? ` in ${preferences.sizeRequirement.toLowerCase()} size` : ''}
                </li>
                <li>
                  {preferences.fuelType !== 'any' ? `${preferences.fuelType.charAt(0).toUpperCase() + preferences.fuelType.slice(1)} powered vehicles` : 'Any fuel type'}
                </li>
                <li>Budget range up to {formatBudget(preferences.budget[0])}</li>
                <li>
                  {preferences.safetyPriority !== 'No preference' ? `${preferences.safetyPriority} safety features` : 'Standard safety features'}
                </li>
                {preferences.mileageImportance >= 4 && (
                  <li>Models with excellent fuel economy and low maintenance costs</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
            <Button className="flex-1">
              Share Brief
            </Button>
            <Button variant="outline">
              Start New Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}