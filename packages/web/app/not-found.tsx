import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F0F0F',
        color: '#FAFAFA',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 200,
          color: '#C9A962',
          marginBottom: '1rem',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '1.25rem',
          color: '#A3A3A3',
          marginBottom: '2rem',
        }}
      >
        Page not found
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#C9A962',
          color: '#0F0F0F',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'opacity 0.2s',
        }}
      >
        Go home
      </Link>
    </div>
  );
}
