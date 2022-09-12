import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const validateSession = async () => {
    const user = supabase.auth.user();
    if (user && pathname === "/") {
      push("/notes");
    } else if (!user && pathname !== "/") {
      await push("/");
    }
  };
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === "SIGNED_IN" && pathname === "/") {
      push("/notes");
    }
    if (event === "SIGNED_OUT") {
      push("/");
    }
  });
  useEffect(() => {
    validateSession();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

// import "../../styles/globals.css";
// import type { AppProps } from "next/app";
// import { MantineProvider } from "@mantine/core";
// import { NotificationsProvider } from "@mantine/notifications";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { supabase } from "utils/supabase";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// function MyApp({ Component, pageProps }: AppProps) {
//   const { push, pathname } = useRouter();
//   const validateSession = async () => {
//     const user = supabase.auth.user();
//     if (user && pathname === "/") {
//       push("/notes");
//     } else if (!user && pathname !== "/") {
//       await push("/");
//     }
//   };
//   supabase.auth.onAuthStateChange((event, _) => {
//     if (event === "SIGNED_IN" && pathname === "/") {
//       push("/notes");
//     }
//     if (event === "SIGNED_OUT") {
//       push("/");
//     }
//   });
//   useEffect(() => {
//     validateSession();
//   }, []);
//   return (
//     <QueryClientProvider client={queryClient}>
//       <MantineProvider
//         withGlobalStyles
//         withNormalizeCSS
//         theme={{ colorScheme: "light" }}
//       >
//         <NotificationsProvider limit={2}>
//           <Component {...pageProps} />
//         </NotificationsProvider>
//       </MantineProvider>
//       {/* <ReactQueryDevtools initialIsOpen={false} /> */}
//     </QueryClientProvider>
//   );
// }

// export default MyApp;
