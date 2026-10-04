import RouterWrapper from "@/router";
import { ThemeProvider } from "@/shared";
import Layout from "@/shared/layout/Layout";

export default function App() {
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
