import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SeiyajTokenModule = buildModule("SeiyajTokenModule", (m) => {
  const token = m.contract("SeiyajToken");

  return { token };
});

export default SeiyajTokenModule;
