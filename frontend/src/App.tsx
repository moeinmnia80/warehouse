import RouterWrapper from "@/router";
import Layout from "@/shared/layout/Layout";
import ThemeProvider from "@/shared/context/context";

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
