import '../styles/globals.css'
import {SessionProvider, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function App({Component, pageProps: {session, ...pageProps},}) {
    return (
        <SessionProvider session={session}>
          {Component.auth ? (
              <Auth adminOnly={Component.auth.adminOnly}>
        <Component {...pageProps} />
              </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    )
}

function Auth({children, adminOnly}) {
  const router = useRouter();
  const {status, data: session} = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  // @ts-ignore
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}
