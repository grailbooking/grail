import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function TodayPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Today&apos;s Schedule
        </Heading>
        <Text size="3" color="gray">
          View and manage today&apos;s appointments
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          Appointments will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
