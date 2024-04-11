import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { formatEther, parseEther } from "ethers";

describe("SeiyajToken", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory("SeiyajToken");
    const token = await Token.deploy();

    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy and mint 100 tokens", async function () {
      const { token, owner, otherAccount } = await loadFixture(deployFixture);
      var balance = formatEther(await token.balanceOf(owner));

      expect(balance).to.equal("100.0");
    });

    describe("Minting", function () {
      it("Should revert minting for non-onwers", async function () {
        const { token, otherAccount } = await loadFixture(deployFixture);

        await expect(
          token.connect(otherAccount).mint(otherAccount, 10)
        ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
      });

      it("Should mint 10 tokens", async function () {
        const { token, owner } = await loadFixture(deployFixture);

        await token.connect(owner).mint(owner, parseEther("10"));

        var balance = await token.balanceOf(owner);
        expect(formatEther(balance)).to.equal("110.0");
      });
    });

    describe("Transferring", function () {
      it("Should revert transferring if balance is insufficient", async function () {
        const { token, owner, otherAccount } = await loadFixture(deployFixture);

        await expect(
          token.connect(owner).safeTransfer(otherAccount, parseEther("200"))
        ).to.be.revertedWith("Insufficient balance");
      });

      it("Should transfer 100 tokens", async function () {
        const { token, owner, otherAccount } = await loadFixture(deployFixture);

        var balance = await token.balanceOf(owner);
        await token.connect(owner).mint(otherAccount, balance);

        balance = await token.balanceOf(otherAccount);
        expect(formatEther(balance)).to.equal(formatEther(balance));
      });
    });

    describe("Burning", function () {
      it("Should revert burning if balance is insufficient", async function () {
        const { token, owner } = await loadFixture(deployFixture);

        await expect(
          token.connect(owner).burn(parseEther("150"))
        ).to.be.revertedWith("Insufficient balance");
      });

      it("Should burn 100 tokens", async function () {
        const { token, owner } = await loadFixture(deployFixture);

        var balance = await token.balanceOf(owner);
        await token.connect(owner).burn(balance);

        balance = await token.balanceOf(owner);
        expect(formatEther(balance)).to.equal("0.0");
      });
    });
  });
});
