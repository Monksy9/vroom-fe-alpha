import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface VehicleDetailsProps {
  vehicle: VehicleRecommendation;
  onBack: () => void;
  onClose: () => void;
  onAddVehicle: (vehicle: VehicleRecommendation) => void;
  isAdded: boolean;
}

export function VehicleDetails({ vehicle, onBack, onClose, onAddVehicle, isAdded }: VehicleDetailsProps) {
  const getDetailedSpecs = () => {
    return {
      engine: '1.5L - 2.0L Turbo',
      fuelEconomy: '40 - 50 MPG',
      transmission: 'Manual',
      year: '2021 - 2024',
      mileage: '8,000 - 25,000 miles',
      color: 'Various',
      seats: '5',
      doors: '5'
    };
  };

  const getProsAndCons = () => {
    return {
      pros: [
        'Excellent fuel efficiency',
        'Spacious interior',
        'Reliable brand reputation',
        'Advanced safety features',
        'Good resale value'
      ],
      cons: [
        'Higher initial purchase price',
        'Limited cargo space',
        'Road noise at highway speeds'
      ]
    };
  };

  const specs = getDetailedSpecs();
  const { pros, cons } = getProsAndCons();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h1>
                <p className="text-sm text-muted-foreground">Model Overview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Model
              </Button>
              <Button variant="ghost" size="sm">
                Next Model
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Match Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              How {vehicle.make} {vehicle.model} is a good fit for you
              <Badge variant="secondary">{vehicle.matchScore}% match</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {vehicle.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-sm">{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Main Vehicle Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={vehicle.image} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">You could save {vehicle.savings}</div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1,247 listings available</div>
                    <div>Average deal time: 3.2 days</div>
                    <div>Best deals in: Manchester, Birmingham</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{vehicle.make} {vehicle.model}</h2>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  <div className="text-3xl font-bold text-primary">{vehicle.priceRange}</div>
                  <p className="text-sm text-muted-foreground mt-1">Typical price range for this model</p>
                </div>

                {/* Specifications */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Key Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Engine:</span>
                      <span className="ml-2">{specs.engine}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">MPG:</span>
                      <span className="ml-2">{specs.fuelEconomy}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <span className="ml-2">{specs.year}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mileage:</span>
                      <span className="ml-2">{specs.mileage}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seats:</span>
                      <span className="ml-2">{specs.seats}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transmission:</span>
                      <span className="ml-2">{specs.transmission}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => onAddVehicle(vehicle)}
                    disabled={isAdded}
                  >
                    {isAdded ? 'Added ✓' : 'Add to Selection'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Dealer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pros & Cons */}
        <Card>
          <CardHeader>
            <CardTitle>Pros & Cons</CardTitle>
            <CardDescription>What you should know about this Model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pros */}
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                <ul className="space-y-2">
                  {pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1 text-sm">✓</span>
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h4 className="font-semibold text-orange-700 mb-3">Cons</h4>
                <ul className="space-y-2">
                  {cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1 text-sm">⚠</span>
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            View Other Options
          </Button>
          <div className="flex gap-3">
            <Button 
              onClick={() => onAddVehicle(vehicle)}
              disabled={isAdded}
            >
              {isAdded ? 'Added to Selection ✓' : 'Add'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}