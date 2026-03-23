export default function Layout({ children }) {
  return (
    <div>
      <header>Ecommerce App Header</header>
      <main>{children}</main>
      <footer>Ecommerce App Footer</footer>
    </div>
  );
}
