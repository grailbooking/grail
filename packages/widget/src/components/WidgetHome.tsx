import { Box, Heading, Text, Button, Flex } from '@radix-ui/themes';
import type { WidgetView } from '../Widget';

interface WidgetHomeProps {
  onNavigate: (view: WidgetView) => void;
}

export function WidgetHome({ onNavigate }: WidgetHomeProps) {
  return (
    <Box p="4">
      <Heading size="6" mb="2">
        Book Your Appointment
      </Heading>
      <Text size="3" color="gray" mb="4">
        Choose from available slots or join the waitlist
      </Text>
      <Flex direction="column" gap="3">
        <Button size="3" onClick={() => onNavigate('calendar')}>
          View Available Times
        </Button>
        <Button size="3" variant="soft" onClick={() => onNavigate('waitlist')}>
          Join Waitlist
        </Button>
      </Flex>
    </Box>
  );
}
