import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function ReportsPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Reports
        </Heading>
        <Text size="3" color="gray">
          View detailed analytics and reports
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          Report tables and charts will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
