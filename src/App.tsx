// import { LoginScreen } from "screens/login";
// import { ProjectListScreen } from "screens/project-list";
// import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageError, FullPageLoading } from "components/lib";
import { useAuth } from "context/auth-context";
// import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";
import React from "react";

const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError} />
      {/* <ProjectListScreen /> */}
      {/* <LoginScreen /> */}
      <React.Suspense fallback={<FullPageLoading />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </div>
  );
}

export default App;
