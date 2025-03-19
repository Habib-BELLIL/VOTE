import React, { useState } from "react";

const Proposal = ({ contract, account }) => {
    const [description, setDescription] = useState("");

    const handleSubmitProposal = async () => {
        if (!contract) {
            alert("Le contrat n'est pas chargé !");
            return;
        }

        try {
            await contract.methods.registerProposal(description).send({ from: account });
            alert("Proposition enregistrée avec succès !");
            setDescription(""); // Réinitialiser le champ après l'envoi
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
            alert("Une erreur est survenue. Vérifiez votre saisie et réessayez.");
        }
    };

    return (
        <div>
            <h2>Soumettre une proposition</h2>
            <input
                type="text"
                placeholder="Description de la proposition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmitProposal}>Soumettre</button>
        </div>
    );
};

export default Proposal;
