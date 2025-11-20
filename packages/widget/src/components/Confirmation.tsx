import { Box, Heading, Text, Button, Card } from '@radix-ui/themes';
import { CheckIcon } from '@radix-ui/react-icons';
import type { WidgetView } from '../Widget';

interface ConfirmationProps {
  onNavigate: (view: WidgetView) => void;
}

export function Confirmation({ onNavigate }: ConfirmationProps) {
  return (
    <Box p="4">
      <Card mb="4">
        <Box style={{ textAlign: 'center' }}>
          <CheckIcon width="48" height="48" color="green" />
          <Heading size="5" mt="3" mb="2">
            Booking Confirmed!
          </Heading>
          <Text size="2" color="gray">
            You&apos;ll receive a confirmation email shortly
          </Text>
        </Box>
      </Card>
      <Button variant="soft" onClick={() => onNavigate('home')}>
        Book Another
      </Button>
    </Box>
  );
}
