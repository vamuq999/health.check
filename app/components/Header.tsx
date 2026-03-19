"use client";

type HeaderProps = {
  onStart: () => void;
};

export default function Header({ onStart }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand">BOARDIUM</div>

        <nav className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#assessment">Assessment</a>
          <a href="#results">Results</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="hello-btn" onClick={onStart}>
          Start Health Check
        </button>
      </div>
    </header>
  );
}