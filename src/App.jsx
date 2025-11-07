import { useState, useEffect } from "react";

function App() {
  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem("counters");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const addCounter = () => {
    if (title.trim() === "") return;
    const newCounter = { id: Date.now(), title, count: 0 };
    setCounters((prev) => [...prev, newCounter]);
    setTitle("");
  };

  const increment = (id) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: c.count + 1 } : c))
    );
  };

  const decrement = (id) => {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, count: Math.max(0, c.count - 1) } : c
      )
    );
  };

  const deleteCounter = (id) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen bg-base-200">
      <div className="w-full max-w-md shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="justify-center card-title">Counters</h2>
          <div className="flex flex-col gap-2 mt-4">
            {counters.length === 0 && (
              <div className="justify-center text-sm alert alert-info">
                No counters yet
              </div>
            )}

            {counters.map((counter) => (
              <div
                key={counter.id}
                className="flex flex-row justify-between items-center px-4 py-2 shadow-sm card bg-base-300"
              >
                <div>
                  <h3 className="text-lg font-bold">{counter.title}</h3>
                  <p className="text-sm opacity-80">Count: {counter.count}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <button
                    onClick={() => increment(counter.id)}
                    className="btn btn-success btn-sm"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => decrement(counter.id)}
                    className="btn btn-error btn-sm"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteCounter(counter.id)}
                    className="btn btn-ghost btn-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New counter name..."
                className="w-full input input-bordered"
              />
              <button onClick={addCounter} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
