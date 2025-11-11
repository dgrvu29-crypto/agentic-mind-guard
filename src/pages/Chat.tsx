import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ConsentModal } from '@/components/ConsentModal';
import { ChatMessage } from '@/components/ChatMessage';
import { ResourceCard } from '@/components/ResourceCard';
import { BookingModal } from '@/components/BookingModal';
import { UrgencyBadge } from '@/components/UrgencyBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Send, Heart, Settings, LogOut, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [showConsent, setShowConsent] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'green' | 'yellow' | 'red' | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth', { replace: true });
      return;
    }
    checkConsent();
    loadResources();
  }, [user, authLoading, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkConsent = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('consent_timestamp')
      .eq('id', user.id)
      .single();
    
    if (data?.consent_timestamp) {
      setHasConsent(true);
      initializeChat();
    } else {
      setShowConsent(true);
    }
  };

  const handleConsent = async () => {
    if (!user) return;
    
    await supabase
      .from('profiles')
      .update({ 
        consent_timestamp: new Date().toISOString(),
        consent_version: '1.0'
      })
      .eq('id', user.id);
    
    setShowConsent(false);
    setHasConsent(true);
    initializeChat();
  };

  const initializeChat = async () => {
    // Start assessment
    const { data: assessment } = await supabase
      .from('assessments')
      .insert({ user_id: user!.id })
      .select()
      .single();
    
    if (assessment) {
      setCurrentAssessmentId(assessment.id);
      
      const welcomeMsg: Message = {
        role: 'assistant',
        content: `Hello! I'm Agentic, your compassionate well-being assistant. I'm here to listen and support you.\n\nI'm not a medical professional, but I can help you explore how you're feeling, provide initial screening, and connect you with campus resources.\n\nHow are you feeling today?`,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages([welcomeMsg]);
    }
  };

  const loadResources = async () => {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .eq('access_level', 'public')
      .limit(3);
    
    if (data) setResources(data);
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentAssessmentId) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Call edge function for assessment
      const { data, error } = await supabase.functions.invoke('chat-assessment', {
        body: { 
          assessmentId: currentAssessmentId,
          message: input,
          conversationHistory: messages 
        }
      });
      
      if (error) throw error;
      
      if (data.crisisDetected) {
        const crisisMsg: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, crisisMsg]);
        setUrgencyLevel('red');
        return;
      }
      
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      if (data.urgency) setUrgencyLevel(data.urgency);
      if (data.progress) setAssessmentProgress(data.progress);
      if (data.resources) setResources(data.resources);
      
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (dates: Date[], notes: string) => {
    if (!currentAssessmentId) return;
    
    const { error } = await supabase.from('bookings').insert({
      user_id: user!.id,
      assessment_id: currentAssessmentId,
      preferred_date_1: dates[0]?.toISOString(),
      preferred_date_2: dates[1]?.toISOString(),
      preferred_date_3: dates[2]?.toISOString(),
      notes,
    });
    
    if (!error) {
      toast({
        title: 'Booking requested',
        description: 'A counselor will contact you to confirm your appointment.',
      });
    }
  };

  if (!hasConsent) {
    return <ConsentModal open={showConsent} onConsent={handleConsent} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">AgenticAI</h1>
              <p className="text-xs text-muted-foreground">Student Well-being Support</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {urgencyLevel && <UrgencyBadge level={urgencyLevel} />}
            <Button variant="ghost" size="icon" onClick={() => navigate('/privacy')}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
          {assessmentProgress > 0 && assessmentProgress < 100 && (
            <Card className="mb-4 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Assessment Progress</span>
                  <span className="text-muted-foreground">{assessmentProgress}%</span>
                </div>
                <Progress value={assessmentProgress} />
              </div>
            </Card>
          )}

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <ChatMessage 
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
              {loading && (
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <div className="animate-pulse">●</div>
                  <span>Agentic is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Share how you're feeling..."
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Crisis Warning */}
          {urgencyLevel === 'red' && (
            <Card className="mt-4 border-destructive bg-destructive/5">
              <div className="p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">Emergency Resources</p>
                  <p className="text-sm">
                    National Crisis Hotline: <strong>988</strong><br/>
                    Campus Emergency: <strong>(555) 123-4567</strong>
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Resources Sidebar */}
        <aside className="w-80 border-l bg-muted/20 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4">Campus Resources</h2>
          <div className="space-y-4">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                department={resource.department}
                contactEmail={resource.contact_email}
                contactPhone={resource.contact_phone}
                tags={resource.tags}
                onBook={() => setShowBooking(true)}
              />
            ))}
          </div>
        </aside>
      </div>

      <BookingModal
        open={showBooking}
        onClose={() => setShowBooking(false)}
        onSubmit={handleBooking}
      />
    </div>
  );
};

export default Chat;
