import { Container, Heading, Text, Box, Flex, Button, Card } from '@radix-ui/themes';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container size="4" p="4">
      <Flex direction="column" gap="6" align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Box>
          <Heading size="9" align="center" mb="2">
            Grail
          </Heading>
          <Text size="5" align="center" color="gray">
            Barbershop Booking & POS Platform
          </Text>
        </Box>

        <Flex gap="4" wrap="wrap" justify="center">
          <Card>
            <Heading size="5" mb="2">
              Barber Dashboard
            </Heading>
            <Text size="3" color="gray" mb="4">
              Manage your daily schedule and clients
            </Text>
            <Flex gap="2" direction="column">
              <Button asChild>
                <Link href="/today">Today&apos;s Schedule</Link>
              </Button>
              <Button variant="soft" asChild>
                <Link href="/calendar">Calendar</Link>
              </Button>
              <Button variant="soft" asChild>
                <Link href="/clients">Clients</Link>
              </Button>
              <Button variant="soft" asChild>
                <Link href="/pos">Point of Sale</Link>
              </Button>
            </Flex>
          </Card>

          <Card>
            <Heading size="5" mb="2">
              Owner Dashboard
            </Heading>
            <Text size="3" color="gray" mb="4">
              Manage your shop and view analytics
            </Text>
            <Flex gap="2" direction="column">
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="soft" asChild>
                <Link href="/settings">Settings</Link>
              </Button>
              <Button variant="soft" asChild>
                <Link href="/reports">Reports</Link>
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Container>
  );
}
