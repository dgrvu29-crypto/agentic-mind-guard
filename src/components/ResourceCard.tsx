import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, ExternalLink, Calendar } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  department?: string;
  contactEmail?: string;
  contactPhone?: string;
  tags?: string[];
  onBook?: () => void;
}

export const ResourceCard = ({
  title,
  description,
  department,
  contactEmail,
  contactPhone,
  tags,
  onBook,
}: ResourceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {department && (
              <CardDescription className="mt-1">{department}</CardDescription>
            )}
          </div>
          {tags && tags.length > 0 && (
            <Badge variant="secondary" className="flex-shrink-0">
              {tags[0]}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {(contactEmail || contactPhone) && (
          <div className="mt-4 space-y-2">
            {contactEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${contactEmail}`}
                  className="text-primary hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
            )}
            {contactPhone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`tel:${contactPhone}`}
                  className="text-primary hover:underline"
                >
                  {contactPhone}
                </a>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {onBook && (
        <CardFooter className="gap-2">
          <Button onClick={onBook} variant="default" size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={contactEmail ? `mailto:${contactEmail}` : '#'}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Contact
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
