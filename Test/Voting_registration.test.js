const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting - Enregistrement des votants", function () {
    let Voting, voting, owner, voter1, voter2;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        await voting.deployed();
    });

    it("L'admin peut enregistrer des votants", async function () {
        await voting.addVoter(voter1.address);
        const voter = await voting.voters(voter1.address);
        expect(voter.isRegistered).to.be.true;
    });

    it("Un utilisateur non-admin ne peut pas ajouter de votants", async function () {
        await expect(voting.connect(voter1).addVoter(voter2.address))
            .to.be.revertedWith("Seul l'administrateur peut ajouter des votants");
    });

    it("Un votant ne peut être ajouté qu'une seule fois", async function () {
        await voting.addVoter(voter1.address);
        await expect(voting.addVoter(voter1.address))
            .to.be.revertedWith("Le votant est déjà enregistré");
    });
});
