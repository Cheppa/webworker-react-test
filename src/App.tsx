import { useState } from "react";
import Working from "./Working";

export default function App() {
  const [page, setPage] = useState(true);

  const pageChanger = (
    <button onClick={() => setPage((page) => !page)}>page</button>
  );
  if (page) {
    return (
      <div>
        <div>
          <span>new page</span>
        </div>
        {pageChanger}
      </div>
    );
  }
  return (
    <div className="App">
      <Working />
      {pageChanger}
    </div>
  );
}
