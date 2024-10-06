import "./App.css";

function App() {
  return (
    <>
      <div className="mt-8">
        <nav className="navbar__items">
          <ul className="navbar__list font-bold text-xl flex justify-center">
            <li className="navbar__item hover:cursor-pointer">Home</li>
            <li className="navbar__item ml-12 hover:cursor-pointer">Members</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
