import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function ClientsPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Clients
        </Heading>
        <Text size="3" color="gray">
          Manage your client list and history
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          Client list will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
