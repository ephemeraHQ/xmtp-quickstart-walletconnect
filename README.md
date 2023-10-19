# XMTP PWA with WalletConnect & Wagmi

### Installation

```bash
bun install
bun start
```

This tutorial will guide you through the process of creating an XMTP app with WalletConnect & Wagmi.

https://github.com/fabriguespe/xmtp-quickstart-pwa-walletconnect/blob/main/public/video.mp4

### Step 1: Setup

First, you need to import the necessary libraries and components. In your index.js file, import the `WagmiConfig` from `wagmi` and wrap your main component with it.

```jsx
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// 1. Get projectId
const projectId = "projectId";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });
```

```jsx
<WagmiConfig config={wagmiConfig}>
  <InboxPage />
</WagmiConfig>
```

### Step 2: User Authentication

In your main component, use the `useAccount` hook to get the user's authentication status and other details.

```jsx
const { address, isConnecting, isDisconnected } = useAccount();
```

### Step 3: Wallet Integration

Use the `useWalletClient` hook to get the user's wallets. Then, find the embedded wallet and set it as the signer.

```jsx
//This is the signer to send to the xmtp client
const { data: walletClient } = useWalletClient();
await initialize({ keys, options, signer /*: walletClient*/ });
```

### Step 4: XMTP Integration

In your `Home` component, use the `useClient` hook from `@xmtp/react-sdk` to get the XMTP client.

```jsx
const { client, error, isLoading, initialize } = useClient();
```

### Step 5: Message Handling

In your `MessageContainer` component, use the `useMessages` and `useSendMessage` hooks from `@xmtp/react-sdk` to get the messages and send messages.

```jsx
const { messages, isLoading } = useMessages(conversation);
const { sendMessage } = useSendMessage();
```

### Step 6: Conversation Handling

In your ListConversations component, use the useConversations and useStreamConversations hooks from @xmtp/react-sdk to get the conversations and stream new conversations.

```jsx
const { conversations } = useConversations();
const { error } = useStreamConversations(onConversation);
```

### Step 7: Logout Handling

Finally, handle the logout process by setting the isConnected state to false, wiping the keys, and removing the signer.

```jsx
const handleLogout = async () => {
  setIsConnected(false);
  const address = await getAddress(signer);
  wipeKeys(address);
  setSigner(null);
  setIsOnNetwork(false);
  setSelectedConversation(null);
  localStorage.removeItem("isOnNetwork");
  localStorage.removeItem("isConnected");
  if (typeof onLogout === "function") {
    onLogout();
  }
};
```

That's it! You've now created an XMTP app with WalletConnect & Wagmi.
