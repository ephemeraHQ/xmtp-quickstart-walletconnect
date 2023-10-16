# XMTP PWA with Privy Tutorial

### Installation

```bash
bun install
bun start
```

This tutorial will guide you through the process of creating an XMTP app with Privy.

### Step 1: Setup

First, you need to import the necessary libraries and components. In your index.js file, import the `PrivyProvider` from @privy-io/react-auth and wrap your main component with it.

```jsx
import { PrivyProvider } from "@privy-io/react-auth";
```

```jsx
<PrivyProvider
appId={process.env.REACT_APP_PRIVY_APP_ID}
onSuccess={(user) => console.log(User ${user.id} logged in!)}
>
<InboxPage />
</PrivyProvider>
```

### Step 2: User Authentication

In your main component, use the `usePrivy` hook to get the user's authentication status and other details.

```jsx
const { ready, authenticated, user, login, logout } = usePrivy();
```

### Step 3: Wallet Integration

Use the `useWallets` hook to get the user's wallets. Then, find the embedded wallet and set it as the signer.

```jsx
useEffect(() => {
  const getSigner = async () => {
    const embeddedWallet =
      wallets.find((wallet) => wallet.walletClientType === "privy") ||
      wallets[0];
    if (embeddedWallet) {
      const provider = await embeddedWallet.getEthersProvider();
      setSigner(provider.getSigner());
    }
  };

  if (wallets.length > 0) {
    getSigner();
  }
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

That's it! You've now created an XMTP app with Privy.
