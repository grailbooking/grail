import { Box, Heading, Text, Button, Card } from '@radix-ui/themes';
import type { WidgetView } from '../Widget';

interface WidgetCalendarProps {
  onNavigate: (view: WidgetView) => void;
}

export function WidgetCalendar({ onNavigate }: WidgetCalendarProps) {
  return (
    <Box p="4">
      <Heading size="5" mb="2">
        Select a Time
      </Heading>
      <Text size="2" color="gray" mb="4">
        Choose from available appointment slots
      </Text>
      <Card mb="4">
        <Text size="2" color="gray">
          Calendar view with available slots will be displayed here
        </Text>
      </Card>
      <Button variant="soft" onClick={() => onNavigate('home')}>
        Back
      </Button>
    </Box>
  );
}
