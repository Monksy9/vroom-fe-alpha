import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Car, 
  Truck, 
  Bike, 
  Search, 
  Target, 
  Clock, 
  Shield, 
  TrendingDown, 
  Users, 
  Star,
  ChevronRight,
  Menu,
  Globe,
  Phone,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import broomLogo from 'figma:asset/43d8df857f2809aa91f07281bc68c37f33965705.png';

interface HomepageProps {
  onStartOnboarding: () => void;
}

export function Homepage({ onStartOnboarding }: HomepageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={broomLogo} alt="Broom" className="h-10 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
              <a href="#why-us" className="text-muted-foreground hover:text-foreground transition-colors">Why us</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                <Globe className="h-4 w-4" />
                EN
              </Button>
              <Button variant="ghost" size="sm">Log in</Button>
              <Button size="sm">Sign up</Button>
            </div>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.1)', transform: 'scale(1.25)' }}
          >
            <source src="/video0.mp4" type="video/mp4" />
            {/* Fallback gradient for when video doesn't load */}
          </video>
          {/* Fallback background with car-themed gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 opacity-30"></div>
          
          {/* Car-themed overlay patterns */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Additional flowing elements */}
          <motion.div
            className="absolute top-1/2 left-20 w-20 h-20 bg-white/5 rounded-full blur-2xl"
            animate={{
              x: [0, 150, 0],
              y: [0, -80, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-white/5 rounded-full blur-2xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 70, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                Find your perfect vehicle deal
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Sweep away
                <br />
                bad deals
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Find the perfect vehicle deal with Broom's intelligent matching system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 space-y-8"
            >
              {/* Vehicle Types */}
              <div className="flex justify-center gap-8 mb-8">
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-white/90">Cars</span>
                </motion.div>
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-white/90">Vans</span>
                </motion.div>
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Bike className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-white/90">Bikes</span>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-white/90 font-semibold"
                    onClick={onStartOnboarding}
                  >
                    Find Your Perfect Deal
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold backdrop-blur-sm"
                  >
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Need Help with a Deal?
                  </Button>
                </motion.div>
              </div>

              {/* Download Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded"></div>
                    App Store
                  </div>
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white/20 rounded"></div>
                    Google Play
                  </div>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Need Help Section */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Need help with a deal?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our expert team is here to help you evaluate, negotiate, and secure the best possible deal
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle>Chat with Expert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Get instant advice from our vehicle experts via live chat
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle>Call for Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Speak directly with our team for personalized guidance
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle>Deal Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Send us any listing for a free professional assessment
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Get Analysis
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section id="why-us" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why choose Broom?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make finding the perfect vehicle simple, fast, and tailored to your exact needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your personalized vehicle brief in just a few simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" onClick={onStartOnboarding} className="px-8">
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={broomLogo} alt="Broom" className="h-8 w-auto" />
            </div>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2024 Broom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Target,
    title: "Personalized Matching",
    description: "Our smart algorithm analyzes your preferences to find vehicles that perfectly match your needs, budget, and lifestyle."
  },
  {
    icon: Clock,
    title: "Save Time & Effort",
    description: "No more endless browsing. Get a curated list of the best deals based on your personalized brief in minutes."
  },
  {
    icon: TrendingDown,
    title: "Best Prices Guaranteed",
    description: "We compare prices across thousands of dealers and private sellers to ensure you get the best possible deal."
  },
  {
    icon: Shield,
    title: "Trusted & Secure",
    description: "All vehicles are verified and we provide detailed history reports. Your data is always protected and secure."
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our team of vehicle experts is here to help you throughout your buying journey, from search to purchase."
  },
  {
    icon: Star,
    title: "5-Star Experience",
    description: "Join thousands of satisfied customers who found their perfect vehicle through our platform."
  }
];

const stats = [
  { value: "50k+", label: "Happy Customers" },
  { value: "100k+", label: "Vehicles Listed" },
  { value: "£2M+", label: "Money Saved" },
  { value: "98%", label: "Success Rate" }
];

const steps = [
  {
    title: "Tell us your needs",
    description: "Answer a few questions about your vehicle preferences, budget, and requirements."
  },
  {
    title: "Get your brief",
    description: "We create a personalized vehicle brief that captures exactly what you're looking for."
  },
  {
    title: "Find perfect deals",
    description: "Share your brief with dealers or use it to guide your search for the best matches."
  }
];