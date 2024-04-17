import { Notification } from "@mantine/core";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Notification title="Hello, World!" />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
