const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting - Gestion des propositions", function () {
    let Voting, voting, owner, voter1, voter2;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
        await voting.deployed();
        
        // Ajout des votants
        await voting.addVoter(voter1.address);
        await voting.addVoter(voter2.address);

        // Passage à l'étape des propositions
        await voting.startProposalsRegistering();
    });

    it("Un votant peut proposer une idée", async function () {
        await voting.connect(voter1).addProposal("Proposition A");
        const proposal = await voting.proposals(0);
        expect(proposal.description).to.equal("Proposition A");
    });

    it("Un utilisateur non-enregistré ne peut pas proposer", async function () {
        const [, , nonVoter] = await ethers.getSigners();
        await expect(voting.connect(nonVoter).addProposal("Proposition B"))
            .to.be.revertedWith("Vous n'êtes pas enregistré comme votant");
    });

    it("Ne peut pas ajouter de propositions hors de la phase de proposition", async function () {
        await voting.endProposalsRegistering();
        await expect(voting.connect(voter1).addProposal("Proposition C"))
            .to.be.revertedWith("L'ajout de propositions n'est pas autorisé actuellement");
    });
});
