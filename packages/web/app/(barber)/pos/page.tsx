import { Container, Heading, Text, Box, Card } from '@radix-ui/themes';

export default function POSPage() {
  return (
    <Container size="4" p="4">
      <Box mb="4">
        <Heading size="8" mb="2">
          Point of Sale
        </Heading>
        <Text size="3" color="gray">
          Process payments and manage transactions
        </Text>
      </Box>

      <Card>
        <Text size="3" color="gray">
          POS interface will be displayed here
        </Text>
      </Card>
    </Container>
  );
}
