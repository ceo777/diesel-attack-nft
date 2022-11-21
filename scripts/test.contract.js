const sh = require("shelljs");

// Parse near call response and return result of contract function call
const getResult = (res) => {
  return res.stdout.split(/\r?\n/).slice(-2, -1)[0];
};

const main = async () => {
  const contractName =
    process.env.CONTRACT_NAME ||
    fs.readFileSync("./neardev/dev-account").toString();

  // Get token supply
  console.log("Get total token supply for near account ...");
  sh.exec(`near view ${contractName} nft_total_supply`);
  sh.exec(`near view ${contractName} nft_supply_for_owner '{"account_id": "dieselattack.testnet"}'`);

  // Mint and send NFT
  console.log("Try to mint a new NFT ...");
  let res = await sh.exec(`near call ${contractName} nft_mint '{"username": "dieselattack.testnet"}' --deposit-yocto 10000000000000000000000 --account-id ${contractName} --gas 200000000000000`);
  const tokenId = getResult(res);

  // Get info
  // console.log("Try to get NFT info ...");
  // sh.exec(`near view ${contractName} nft_tokens_for_owner '{"account_id": "dieselattack.testnet"}'`);

  // Exit script with the same code as the build command
  process.exit();
};

// Run tests
main();