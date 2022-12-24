import { ethers } from "hardhat";
//Polygon 37258883
//Ethereum 16261600

async function main() {
  const MysteryBox = await ethers.getContractFactory("MysteryBox");
  const mysteryBox = await MysteryBox.deploy(16261600);
  await mysteryBox.deployed();

  console.log("MysteryBox deployed to:", mysteryBox.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
