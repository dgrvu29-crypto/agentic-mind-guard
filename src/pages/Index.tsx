import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Brain, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <header className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AgenticAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your compassionate, privacy-first mental health support system for students
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Private & Secure</h3>
            <p className="text-muted-foreground">End-to-end encrypted conversations and HIPAA-compliant storage</p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <Brain className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Evidence-Based</h3>
            <p className="text-muted-foreground">Validated PHQ/GAD screening tools and grounded resource recommendations</p>
          </div>
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-lg">Easy Booking</h3>
            <p className="text-muted-foreground">Seamless appointment scheduling with campus counselors</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
