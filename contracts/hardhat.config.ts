import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/b280b8aa6cda4dba845afb03d46c2396`,
      accounts: [
        "b82fdc6d3ddd62b106819a75c892c7f1c1075e0cbaa672b31b44a99525f26e7a",
      ],
    },
  },
};

export default config;
