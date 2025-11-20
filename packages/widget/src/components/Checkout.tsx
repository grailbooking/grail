import { Box, Heading, Text, Button, Card } from '@radix-ui/themes';
import type { WidgetView } from '../Widget';

interface CheckoutProps {
  onNavigate: (view: WidgetView) => void;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  return (
    <Box p="4">
      <Heading size="5" mb="2">
        Checkout
      </Heading>
      <Text size="2" color="gray" mb="4">
        Review your appointment and complete booking
      </Text>
      <Card mb="4">
        <Text size="2" color="gray">
          Checkout form with payment will be displayed here
        </Text>
      </Card>
      <Button onClick={() => onNavigate('confirmation')}>Confirm Booking</Button>
    </Box>
  );
}
