import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { formatEther, parseEther } from "ethers";

describe("SeiyajToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const ONE_GWEI = 1_000_000_000;

    // const lockedAmount = ONE_GWEI;
    // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
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

    it("Should revert minting", async function () {
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

  it("Should revert burning", async function () {
    const { token, otherAccount } = await loadFixture(deployFixture);

    await expect(
      token.connect(otherAccount).burn(otherAccount, 10)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("Should burn 100 tokens", async function () {
    const { token, owner } = await loadFixture(deployFixture);

    var balance = await token.balanceOf(owner);
    await token.connect(owner).burn(owner, balance);

    balance = await token.balanceOf(owner);
    expect(formatEther(balance)).to.equal("0.0");
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
