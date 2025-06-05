(async function() {
    // Fonction pour attendre un certain temps (en millisecondes)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Fonction pour faire défiler la page jusqu'en bas pour charger tous les commentaires
    async function scrollToLoadComments() {
        let lastHeight = document.body.scrollHeight;
        while (true) {
            window.scrollTo(0, document.body.scrollHeight);
            await sleep(2000); // Attendre que le contenu charge
            let newHeight = document.body.scrollHeight;
            if (newHeight === lastHeight) break; // Plus de nouveaux commentaires chargés
            lastHeight = newHeight;
            console.log("Chargement de nouveaux commentaires...");
        }
        console.log("Tous les commentaires sont chargés.");
    }

    // Faire défiler la page pour charger tous les commentaires
    await scrollToLoadComments();

    // Boucle pour gérer les commentaires par lots
    while (true) {
        // Sélecteur pour les boutons de suppression des commentaires
        const deleteButtons = document.querySelectorAll('.commentthread_comment_actions a[href*="DeleteComment"]');
        
        if (deleteButtons.length === 0) {
            console.log("Aucun commentaire restant ou aucun bouton de suppression disponible.");
            break; // Sortir si aucun bouton de suppression n'est trouvé
        }

        console.log(`Trouvé ${deleteButtons.length} commentaires à supprimer dans ce lot.`);

        // Parcourir chaque bouton de suppression
        for (const button of deleteButtons) {
            try {
                console.log("Suppression d'un commentaire...");
                button.click(); // Simuler le clic sur le bouton de suppression
                await sleep(3000); // Attendre 3 secondes pour éviter les problèmes de serveur
            } catch (error) {
                console.error("Erreur lors de la suppression d'un commentaire :", error);
            }
        }

        // Attendre un peu et vérifier si de nouveaux commentaires doivent être chargés
        await sleep(5000);
        await scrollToLoadComments();
    }

    console.log("Suppression terminée ! Aucun commentaire restant détecté.");
})();