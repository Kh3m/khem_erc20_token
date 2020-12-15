const Kh3mToken = artifacts.require("./Kh3mToken.sol");
contract( "Kh3mToken", (accounts) => {
    console.log("=============== TEST ACCOUNTS ===============");
    console.log(accounts);

    it("it allocates initial supply upon deployment", async () => {
        const instance = await Kh3mToken.deployed();
        const totalSupply = await instance.totalSupply();
        const balanceOf = await instance.balanceOf( accounts[0] );

        assert.equal(1000000, totalSupply.toNumber(), "sets the total supply to 1,000,000");
        assert.equal(1000000, balanceOf.toNumber(), "allocates the initial supply to the admin account");
    });

    it("initializes the contract with correct values", async () => {
        const instance = await Kh3mToken.deployed();
        const name = await instance.name();
        const symbol = await instance.symbol();
        const standard = await instance.standard();

        assert.equal("Kh3m Token", name, "sets the token name to Kh3m Token");
        assert.equal("K3T", symbol, "sets the token symbol to K3T");
        assert.equal("Kh3m Token v1.0", standard, "sets the correct token standard");
    });

    it("transfer token ownership", async () => {
        const instance = await Kh3mToken.deployed();
        const receipt = await instance.transfer(accounts[1], 250000, {from: accounts[0]});
        const isTransfer = await instance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        const senderBalance = await instance.balanceOf(accounts[0]);
        const receipientBalance = await instance.balanceOf(accounts[1]);

        assert.equal(750000, senderBalance.toNumber());
        assert.equal(250000, receipientBalance.toNumber());
        assert.equal(true, isTransfer);

        // Check that event was fired
        assert.equal(1, receipt.logs.length, "triggers one event")
        assert.equal("Transfer", receipt.logs[0].event, "Should be the 'Transfer' event")
        assert.equal(accounts[0], receipt.logs[0].args._from, "logs the account token was transferred from")
        assert.equal(accounts[1], receipt.logs[0].args._to, "logs the account token was transferred to")
        assert.equal(250000, receipt.logs[0].args.value.toNumber(), "logs the transferred amount")
    })
});
