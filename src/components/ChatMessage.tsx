import { Bot, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
      }`}>
        {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      
      <Card className={`flex-1 p-4 max-w-[85%] ${
        isAssistant ? 'bg-card' : 'bg-secondary'
      }`}>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-2">{timestamp}</p>
        )}
      </Card>
    </div>
  );
};
