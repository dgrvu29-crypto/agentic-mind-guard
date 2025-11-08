import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Lock, Eye, Download } from 'lucide-react';

interface ConsentModalProps {
  open: boolean;
  onConsent: () => void;
}

export const ConsentModal = ({ open, onConsent }: ConsentModalProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Privacy & Consent
          </DialogTitle>
          <DialogDescription>
            Your privacy and well-being are our top priorities
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                What AgenticAI Is
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                AgenticAI ("Agentic") is a compassionate, AI-powered student well-being assistant. 
                Agentic is <strong>not a medical professional</strong> and does not provide medical diagnosis or treatment. 
                This service is designed to provide initial support, screening, and signposting to appropriate campus resources.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                How Your Data Is Used
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Your conversations are encrypted and stored securely</li>
                <li>• Assessment responses are used to calculate urgency scores (PHQ/GAD-style)</li>
                <li>• Your data is only accessible to you and authorized support staff</li>
                <li>• Anonymized logs may be used to improve the service</li>
                <li>• If you indicate immediate risk, emergency protocols will be activated</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Your Rights
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You can export your data at any time</li>
                <li>• You can delete your account and all associated data</li>
                <li>• You can withdraw consent (this will end your access)</li>
                <li>• You have the right to review what data we hold about you</li>
              </ul>
            </section>

            <section className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-2">Emergency Disclaimer</h3>
              <p className="text-foreground text-sm leading-relaxed">
                <strong>If you are in immediate danger or have thoughts of harming yourself, 
                please call your local emergency number (911 in the US) or crisis hotline right now.</strong>
                {" "}AgenticAI is not a substitute for emergency services or professional mental health care.
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col gap-4 sm:flex-col">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="consent" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label
              htmlFor="consent"
              className="text-sm font-medium leading-relaxed cursor-pointer"
            >
              I understand and consent to the terms above. I acknowledge that AgenticAI is not a substitute 
              for professional mental health care or emergency services.
            </label>
          </div>
          <Button 
            onClick={onConsent} 
            disabled={!agreed}
            className="w-full"
            size="lg"
          >
            Continue to AgenticAI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
