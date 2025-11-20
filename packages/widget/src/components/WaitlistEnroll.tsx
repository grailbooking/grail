import { Box, Heading, Text, Button, Card } from '@radix-ui/themes';
import type { WidgetView } from '../Widget';

interface WaitlistEnrollProps {
  onNavigate: (view: WidgetView) => void;
}

export function WaitlistEnroll({ onNavigate }: WaitlistEnrollProps) {
  return (
    <Box p="4">
      <Heading size="5" mb="2">
        Join Waitlist
      </Heading>
      <Text size="2" color="gray" mb="4">
        We&apos;ll notify you when a slot becomes available
      </Text>
      <Card mb="4">
        <Text size="2" color="gray">
          Waitlist enrollment form will be displayed here
        </Text>
      </Card>
      <Button variant="soft" onClick={() => onNavigate('home')}>
        Back
      </Button>
    </Box>
  );
}
