import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function SettingsPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Settings
        </Heading>
        <Text size="3" color="gray">
          Manage shop settings and configuration
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          Settings form will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
