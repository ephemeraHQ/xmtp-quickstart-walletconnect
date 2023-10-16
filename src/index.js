import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import InboxPage from "./InboxPage-hooks";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// 1. Get projectId
const projectId = "026ac8812e46e03ede0fa590783d1242";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <InboxPage />
    </WagmiConfig>
  </React.StrictMode>
);

// Register service worker
serviceWorkerRegistration.register();
