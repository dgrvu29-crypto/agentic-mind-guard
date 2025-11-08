import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (dates: Date[], notes: string) => Promise<void>;
}

export const BookingModal = ({ open, onClose, onSubmit }: BookingModalProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedDates.length === 0) return;
    
    setLoading(true);
    try {
      await onSubmit(selectedDates, notes);
      setSelectedDates([]);
      setNotes('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Request Appointment
          </DialogTitle>
          <DialogDescription>
            Select up to 3 preferred dates and times. A counselor will confirm your appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Preferred Dates ({selectedDates.length}/3)
            </Label>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => {
                if (dates && dates.length <= 3) {
                  setSelectedDates(dates);
                }
              }}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific concerns or preferences..."
              className="mt-2"
              rows={3}
            />
          </div>

          {selectedDates.length > 0 && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-2">Selected dates:</p>
              <ul className="text-sm space-y-1">
                {selectedDates.map((date, i) => (
                  <li key={i} className="text-muted-foreground">
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedDates.length === 0 || loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
