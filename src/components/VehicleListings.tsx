import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Heart, MapPin, Clock, Fuel, Users, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface VehicleListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  dealer: string;
  image: string;
  isFairValue: boolean;
  days: number;
  fuelType: string;
  transmission: string;
  previousOwners: number;
}

interface VehicleListingsProps {
  vehicleName: string;
  onBack: () => void;
  onSave?: () => void;
}

export function VehicleListings({ vehicleName, onBack, onSave }: VehicleListingsProps) {
  const [activeTab, setActiveTab] = useState<'fair-value' | 'live-deals'>('fair-value');
  const [calculatorData, setCalculatorData] = useState({
    url: '',
    listedPrice: '',
    mileage: ''
  });
  const [fairValueResult, setFairValueResult] = useState<number | null>(null);

  // Generate mock listings data
  const generateListings = (): VehicleListing[] => {
    const baseListings = [
      { price: 18500, mileage: 15000, location: 'London', dealer: 'Motors Direct', days: 5 },
      { price: 19200, mileage: 22000, location: 'Birmingham', dealer: 'AutoHub', days: 12 },
      { price: 17800, mileage: 28000, location: 'Manchester', dealer: 'City Cars', days: 8 },
      { price: 20500, mileage: 12000, location: 'Leeds', dealer: 'Premium Motors', days: 3 },
      { price: 16900, mileage: 35000, location: 'Liverpool', dealer: 'Value Cars', days: 15 },
      { price: 21200, mileage: 8000, location: 'Bristol', dealer: 'Elite Auto', days: 7 },
      { price: 18000, mileage: 25000, location: 'Newcastle', dealer: 'North East Motors', days: 20 },
      { price: 19800, mileage: 18000, location: 'Sheffield', dealer: 'Steel City Cars', days: 4 },
      { price: 17200, mileage: 42000, location: 'Nottingham', dealer: 'Midlands Auto', days: 25 },
      { price: 22000, mileage: 5000, location: 'Edinburgh', dealer: 'Scottish Motors', days: 2 },
      { price: 16500, mileage: 38000, location: 'Cardiff', dealer: 'Welsh Auto', days: 18 },
      { price: 20800, mileage: 14000, location: 'Glasgow', dealer: 'Highland Cars', days: 9 },
      { price: 18800, mileage: 20000, location: 'Belfast', dealer: 'Irish Auto', days: 11 },
      { price: 17500, mileage: 32000, location: 'Plymouth', dealer: 'Southwest Motors', days: 22 },
      { price: 19500, mileage: 16000, location: 'Portsmouth', dealer: 'Coastal Cars', days: 6 }
    ];

    return baseListings.map((listing, index) => {
      // Calculate fair value based on mileage (simple linear depreciation)
      const baseFairValue = 23000 - (listing.mileage / 1000) * 150;
      const isFairValue = listing.price <= baseFairValue * 1.05;

      return {
        id: `listing-${index}`,
        make: vehicleName.split(' ')[0] || 'Volkswagen',
        model: vehicleName.split(' ')[1] || 'Golf',
        year: 2021 + Math.floor(Math.random() * 3),
        price: listing.price,
        mileage: listing.mileage,
        location: listing.location,
        dealer: listing.dealer,
        image: `https://images.unsplash.com/photo-1556391744-2afb52eb5a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&auto=format&fit=crop&w=400&h=300`,
        isFairValue,
        days: listing.days,
        fuelType: 'Petrol',
        transmission: Math.random() > 0.5 ? 'Automatic' : 'Manual',
        previousOwners: Math.floor(Math.random() * 3) + 1
      };
    });
  };

  const listings = generateListings();

  // Prepare data for scatter chart
  const chartData = listings.map(listing => ({
    x: listing.mileage,
    y: listing.price,
    isFairValue: listing.isFairValue,
    ...listing
  }));

  // Calculate fair value line (simple linear regression approximation)
  const fairValueLine = (mileage: number) => 23000 - (mileage / 1000) * 150;

  const calculateFairValue = () => {
    const mileage = parseInt(calculatorData.mileage);
    const listedPrice = parseInt(calculatorData.listedPrice);
    
    if (mileage && listedPrice) {
      const fairValue = fairValueLine(mileage);
      setFairValueResult(fairValue);
    }
  };

  const formatPrice = (price: number) => `£${price.toLocaleString()}`;
  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} miles`;

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
                <h1 className="text-xl font-semibold">{vehicleName}</h1>
                <p className="text-sm text-muted-foreground">Live market analysis and deals</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onSave}>
              <Heart className="h-4 w-4 mr-2" />
              Save?
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Vehicle Description */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Popular family hatchback known for reliability, fuel efficiency, and practicality. 
              Great all-round vehicle for daily commuting and family use with modern safety features and technology.
            </p>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === 'fair-value' ? 'default' : 'outline'}
            onClick={() => setActiveTab('fair-value')}
          >
            Fair value
          </Button>
          <Button 
            variant={activeTab === 'live-deals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('live-deals')}
          >
            Live deals
          </Button>
        </div>

        {activeTab === 'fair-value' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Price vs Mileage Analysis</CardTitle>
                  <CardDescription>Current market listings with fair value indicator</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="x" 
                          type="number" 
                          domain={[0, 50000]}
                          tickFormatter={(value) => `${value/1000}k`}
                          name="Mileage"
                        />
                        <YAxis 
                          dataKey="y" 
                          type="number" 
                          domain={[15000, 25000]}
                          tickFormatter={(value) => `£${value/1000}k`}
                          name="Price"
                        />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'y' ? formatPrice(value as number) : formatMileage(value as number),
                            name === 'y' ? 'Price' : 'Mileage'
                          ]}
                          labelFormatter={() => ''}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-semibold">{data.year} {data.make} {data.model}</p>
                                  <p>Price: {formatPrice(data.price)}</p>
                                  <p>Mileage: {formatMileage(data.mileage)}</p>
                                  <p>Location: {data.location}</p>
                                  {data.isFairValue ? (
                                    <Badge className="mt-1 bg-green-100 text-green-800">Good Value</Badge>
                                  ) : (
                                    <Badge variant="secondary" className="mt-1">Above Market</Badge>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        
                        {/* Fair value line */}
                        <ReferenceLine 
                          segment={[
                            { x: 0, y: fairValueLine(0) },
                            { x: 50000, y: fairValueLine(50000) }
                          ]}
                          stroke="#8884d8" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        
                        {/* Good value points (below line) */}
                        <Scatter
                          data={chartData.filter(item => item.isFairValue)}
                          fill="#22c55e"
                        />
                        
                        {/* Above market points */}
                        <Scatter
                          data={chartData.filter(item => !item.isFairValue)}
                          fill="#ef4444"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Good Value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Above Market</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-blue-500"></div>
                      <span>Fair Value Line</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fair Price Calculator */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Fair price calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">URL</label>
                    <Input 
                      placeholder="Paste listing URL here"
                      value={calculatorData.url}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Listed price</label>
                    <Input 
                      type="number"
                      placeholder="18500"
                      value={calculatorData.listedPrice}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, listedPrice: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Mileage</label>
                    <Input 
                      type="number"
                      placeholder="25000"
                      value={calculatorData.mileage}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, mileage: e.target.value }))}
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateFairValue}
                    disabled={!calculatorData.listedPrice || !calculatorData.mileage}
                    className="w-full"
                  >
                    Calculate Fair Value
                  </Button>
                  
                  {fairValueResult && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(Math.round(fairValueResult))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Estimated fair market value
                      </p>
                      {calculatorData.listedPrice && (
                        <div className="mt-2">
                          {parseInt(calculatorData.listedPrice) <= fairValueResult * 1.05 ? (
                            <Badge className="bg-green-100 text-green-800">Good Deal</Badge>
                          ) : (
                            <Badge variant="secondary">Above Market Price</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'live-deals' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">All prices</Badge>
                  <Badge variant="outline">All mileage</Badge>
                  <Badge variant="outline">All locations</Badge>
                  <Badge variant="outline">All years</Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    More filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback 
                      src={listing.image}
                      alt={`${listing.year} ${listing.make} ${listing.model}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {listing.isFairValue && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                        Good Value
                      </Badge>
                    )}
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      {listing.days} days
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold">{listing.year} {listing.make} {listing.model}</h3>
                        <div className="text-2xl font-bold text-primary">{formatPrice(listing.price)}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatMileage(listing.mileage)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {listing.fuelType}
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          {listing.transmission}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {listing.previousOwners} owner{listing.previousOwners > 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{listing.location}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{listing.dealer}</span>
                      </div>
                      
                      <Button className="w-full mt-3">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}