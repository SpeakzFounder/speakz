export const metadata = {
  title: 'Speakz – Lexique',
  description: 'Grand lexique d’argot – Speakz'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <a href="/" style={{ fontWeight: 700, textDecoration: 'none' }}>Speakz</a>
          <nav style={{ marginTop: 8 }}>
            <a href="/entries" style={{ marginRight: 12 }}>Entries</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
