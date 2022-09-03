import React from "react";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main">
        <header className="main-header">

        </header>
        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-2">
                <div className="card-item b-white">
                  <div className="card-item-img"></div>
                  <div className="card-item-content">
                    <h5>Gracias Kasongo</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="card-item b-white">
                  <div className="card-item-img"></div>
                  <div className="card-item-content">
                    <h5>Gracias Kasongo</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="card-item b-white">
                  <div className="card-item-img"></div>
                  <div className="card-item-content">
                    <h5>Gracias Kasongo</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
