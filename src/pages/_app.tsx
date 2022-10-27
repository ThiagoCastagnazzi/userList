import type { AppProps } from "next/app";

import { theme } from "../styles/theme";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ChakraProvider } from "@chakra-ui/react";
import { queryClient } from "../services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
