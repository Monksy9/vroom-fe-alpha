import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Plus, Info, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VehiclePreferences } from './VehicleOnboarding';

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

interface VehicleIdentificationProps {
  preferences: VehiclePreferences;
  onBack: () => void;
  onViewDetails: (vehicle: VehicleRecommendation) => void;
  addedVehicles: VehicleRecommendation[];
  onAddVehicle: (vehicle: VehicleRecommendation) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onFindListings: () => void;
}

export function VehicleIdentification({ preferences, onBack, onViewDetails, addedVehicles, onAddVehicle, onRemoveVehicle, onFindListings }: VehicleIdentificationProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecommendation | null>(null);

  // Generate mock recommendations based on preferences
  const getRecommendations = (): VehicleRecommendation[] => {
    const baseRecommendations = {
      car: [
        {
          id: '1',
          make: 'Volkswagen',
          model: 'Golf',
          description: 'Reliable family hatchback with excellent fuel economy',
          priceRange: '£15k - £25k',
          image: 'https://images.unsplash.com/photo-1556391744-2afb52eb5a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '15%',
          matchScore: 95,
          reasons: ['Perfect size for daily commuting', 'Excellent fuel efficiency', 'Strong safety ratings']
        },
        {
          id: '2',
          make: 'Toyota',
          model: 'Corolla Hybrid',
          description: 'Eco-friendly sedan with hybrid technology',
          priceRange: '£20k - £30k',
          image: 'https://images.unsplash.com/photo-1748621019980-8c9278b61974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '12%',
          matchScore: 90,
          reasons: ['Hybrid efficiency matches your priorities', 'Great for family trips', 'Low running costs']
        },
        {
          id: '3',
          make: 'BMW',
          model: '3 Series',
          description: 'Premium sedan with advanced safety features',
          priceRange: '£30k - £45k',
          image: 'https://images.unsplash.com/photo-1687184471624-a7128c42c0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '8%',
          matchScore: 85,
          reasons: ['Premium safety technology', 'Excellent for long distance travel', 'High-quality interior']
        },
        {
          id: '4',
          make: 'Honda',
          model: 'Civic',
          description: 'Sporty and practical compact car',
          priceRange: '£20k - £28k',
          image: 'https://images.unsplash.com/photo-1696580998112-ebea6a6fad63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '10%',
          matchScore: 82,
          reasons: ['Great for city driving', 'Reliable and economical', 'Modern technology features']
        },
        {
          id: '5',
          make: 'Ford',
          model: 'Kuga',
          description: 'Versatile SUV perfect for families',
          priceRange: '£25k - £35k',
          image: 'https://images.unsplash.com/photo-1721451834922-c12659bc19b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '14%',
          matchScore: 88,
          reasons: ['Spacious for family trips', 'Good ground clearance', 'Excellent cargo space']
        }
      ],
      van: [
        {
          id: '6',
          make: 'Volkswagen',
          model: 'California',
          description: 'Perfect camper van for weekend adventures',
          priceRange: '£55k - £75k',
          image: 'https://images.unsplash.com/flagged/photo-1579158620196-6a8ba90777cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '18%',
          matchScore: 96,
          reasons: ['Built-in camping features', 'Perfect for weekend adventures', 'Reliable and well-equipped']
        },
        {
          id: '7',
          make: 'Ford',
          model: 'Transit Custom',
          description: 'Versatile commercial van with great payload',
          priceRange: '£25k - £35k',
          image: 'https://images.unsplash.com/photo-1703597803465-20f393f84e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '12%',
          matchScore: 87,
          reasons: ['Excellent for work/commercial use', 'High payload capacity', 'Fuel efficient for its class']
        }
      ],
      bike: [
        {
          id: '8',
          make: 'Yamaha',
          model: 'MT-07',
          description: 'Versatile naked bike perfect for commuting',
          priceRange: '£6k - £9k',
          image: 'https://images.unsplash.com/photo-1598915850224-386a8a520c29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '15%',
          matchScore: 91,
          reasons: ['Great for daily commuting', 'Excellent fuel economy', 'Easy to handle']
        },
        {
          id: '9',
          make: 'NIU',
          model: 'NGT',
          description: 'Electric scooter with zero emissions',
          priceRange: '£3k - £5k',
          image: 'https://images.unsplash.com/photo-1713777439918-4e0ccff0343b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
          savings: '20%',
          matchScore: 89,
          reasons: ['Zero emissions', 'Very low running costs', 'Perfect for city driving']
        }
      ]
    };

    return baseRecommendations[preferences.vehicleType as keyof typeof baseRecommendations] || baseRecommendations.car;
  };

  const recommendations = getRecommendations();
  const formatBudget = (value: number) => {
    if (value >= 1000) return `£${(value / 1000).toFixed(0)}k`;
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                {getVehicleIcon()} Vehicle Recommendations for {preferences.vehicleType.charAt(0).toUpperCase() + preferences.vehicleType.slice(1)}
              </h1>
              <p className="text-sm text-muted-foreground">Budget: {formatBudget(preferences.budget[0])}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What we understood as your requirements:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>• Budget: {formatBudget(preferences.budget[0])}</div>
                <div>• Primary use: {preferences.useCase.join(', ')}</div>
                <div>• Fuel type: {preferences.fuelType}</div>
              </div>
              <div className="space-y-2">
                <div>• Size: {preferences.sizeRequirement}</div>
                <div>• Safety: {preferences.safetyPriority}</div>
                <div>• Timeline: {preferences.timeline}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Added Vehicles Section */}
        {addedVehicles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Selected Vehicles ({addedVehicles.length})</CardTitle>
                {addedVehicles.length >= 2 && (
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={onFindListings}
                  >
                    Let's find a listing for what you want
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addedVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="cursor-pointer hover:shadow-lg transition-shadow border-green-200 bg-green-50/50"
                        onClick={() => onViewDetails(vehicle)}>
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                              <ImageWithFallback 
                                src={vehicle.image} 
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{vehicle.make} {vehicle.model}</h3>
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  {vehicle.matchScore}% match
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-semibold text-lg">{vehicle.priceRange}</div>
                          <div className="text-sm text-green-600">You could save {vehicle.savings}</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(vehicle);
                          }}>
                            <Info className="h-4 w-4 mr-2" />
                            More Info
                          </Button>
                          <Button variant="outline" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            onRemoveVehicle(vehicle.id);
                          }}>
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Vehicle Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended Vehicles</h2>
            <p className="text-sm text-muted-foreground">
              {addedVehicles.length > 0 ? `${addedVehicles.length} selected` : 'Select vehicles to compare'}
            </p>
          </div>
          
          <div className="space-y-4">
            {recommendations.filter(vehicle => !addedVehicles.find(added => added.id === vehicle.id)).map((vehicle) => (
              <Card key={vehicle.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onViewDetails(vehicle)}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <ImageWithFallback 
                            src={vehicle.image} 
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{vehicle.make} {vehicle.model}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {vehicle.matchScore}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-lg">{vehicle.priceRange}</div>
                      <div className="text-sm text-green-600">You could save {vehicle.savings}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(vehicle);
                      }}>
                        <Info className="h-4 w-4 mr-2" />
                        More Info
                      </Button>
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onAddVehicle(vehicle);
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Refine Search */}
        <Card className="mt-8">
          <CardContent className="py-6">
            <div className="text-center">
              <Button variant="outline">
                Refine your search?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}