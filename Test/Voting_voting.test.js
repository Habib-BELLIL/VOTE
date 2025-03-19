const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting - Processus de vote", function () {
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
        await voting.connect(voter1).addProposal("Proposition A");
        await voting.endProposalsRegistering();

        // Début du vote
        await voting.startVotingSession();
    });

    it("Un votant peut voter pour une proposition", async function () {
        await voting.connect(voter1).setVote(0);
        const voter = await voting.voters(voter1.address);
        expect(voter.hasVoted).to.be.true;
        expect(voter.votedProposalId).to.equal(0);
    });

    it("Un votant ne peut voter qu'une seule fois", async function () {
        await voting.connect(voter1).setVote(0);
        await expect(voting.connect(voter1).setVote(0))
            .to.be.revertedWith("Vous avez déjà voté");
    });

    it("Un utilisateur non-enregistré ne peut pas voter", async function () {
        const [, , nonVoter] = await ethers.getSigners();
        await expect(voting.connect(nonVoter).setVote(0))
            .to.be.revertedWith("Vous n'êtes pas enregistré comme votant");
    });

    it("Ne peut pas voter en dehors de la phase de vote", async function () {
        await voting.endVotingSession();
        await expect(voting.connect(voter1).setVote(0))
            .to.be.revertedWith("Le vote n'est pas encore ouvert");
    });
});
