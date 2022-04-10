// libs
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Global } from "@emotion/react";

// component
import NotFound from "components/NotFound";
import ErrorBoundary from "components/ErrorBoundary";

import routes from "./routes";
import globalStyles from "./globalStyles";

function App() {
  let element = useRoutes(routes);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Route....</div>}>{element}</Suspense>
      <Global styles={globalStyles} />
    </ErrorBoundary>
  );
}

export default App;
