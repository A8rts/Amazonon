import "./Header.css";

function Header({ authenticated }: { authenticated: boolean }) {
  return (
    <header className="header">
      {authenticated ? (
        <strong>this use is authenticated</strong>
      ) : (
        <div className="not-authenticated-header">
          <p>به بازی آمازونوم خوش آمدید :)</p>
        </div>
      )}
    </header>
  );
}

export default Header;
