import Board from "./components/Board";
import Filter from "./components/Filter";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-surfaceContainerHighest h-[100vh]">
      <Header />
      <Filter />
      <Board />
    </div>
  );
}

export default App;
