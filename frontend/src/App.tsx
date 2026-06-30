import RouterWrapper from "./router";
import ThemeProvider from "./shared/context/context";
import Layout from "./shared/layout/Layout";

function App() {
  return (
    <>
      <ThemeProvider>
        <Layout>
          <RouterWrapper />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
