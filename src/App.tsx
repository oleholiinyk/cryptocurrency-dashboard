import { Switch, Route } from "react-router-dom";
import MasterLayout from "./layout";
import CryptoPage from "./pages/CryptoPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <MasterLayout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/details/:id" exact component={CryptoPage} />
        <Route path="*" component={HomePage} />
      </Switch>
    </MasterLayout>
  );
}

export default App;
