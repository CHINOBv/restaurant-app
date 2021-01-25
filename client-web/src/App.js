import { Switch, Route } from "react-router-dom";

import firebase, { FirebaseContext } from "./firebase";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import NewDish from "./pages/NewDish";
import Menu from "./pages/Menu";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/new-dish" component={NewDish} />
            <Route exact path="/menu" component={Menu} />
          </Switch>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
