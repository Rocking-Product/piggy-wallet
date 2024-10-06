'use client';

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
            loginMethods: ['email', 'wallet'],
            appearance: {
                theme: 'light',
                accentColor: '#676FFF'
            },
            embeddedWallets: {
                createOnLogin: 'all-users',
                noPromptOnSignature: true
            },
        }}
         
    >
        {children}
    </PrivyProvider>
  );
}