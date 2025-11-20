import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function CalendarPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Calendar
        </Heading>
        <Text size="3" color="gray">
          View your schedule and manage availability
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          Calendar view will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
