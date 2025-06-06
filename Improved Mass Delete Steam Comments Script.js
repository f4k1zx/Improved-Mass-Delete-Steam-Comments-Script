(async function() {
    // Function to wait for a specified time (in milliseconds)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Function to scroll to the bottom of the page to load all comments
    async function scrollToLoadComments() {
        let lastHeight = document.body.scrollHeight;
        let retries = 3; // Number of retries to ensure all comments are loaded
        while (retries > 0) {
            window.scrollTo(0, document.body.scrollHeight);
            await sleep(1000); // Reduced to 1 second for faster loading
            let newHeight = document.body.scrollHeight;
            if (newHeight === lastHeight) {
                retries--;
                await sleep(1000); // Brief pause before retrying
                continue;
            }
            lastHeight = newHeight;
            console.log("Loading more comments...");
            retries = 3; // Reset retries if new content is loaded
        }
        console.log("All comments have been loaded.");
    }

    // Scroll the page to load all comments
    await scrollToLoadComments();

    // Loop to handle comments in batches
    while (true) {
        // Selector for comment deletion buttons
        const deleteButtons = document.querySelectorAll('.commentthread_comment_actions a[href*="DeleteComment"]');
        
        if (deleteButtons.length === 0) {
            console.log("No comments remaining or no delete buttons available.");
            break; // Exit if no delete buttons are found
        }

        console.log(`Found ${deleteButtons.length} comments to delete in this batch.`);

        // Iterate through each delete button
        for (const button of deleteButtons) {
            try {
                console.log("Deleting a comment...");
                button.click(); // Simulate a click on the delete button
                await sleep(1500); // Reduced to 1.5 seconds for faster deletion
            } catch (error) {
                console.error("Error while deleting a comment:", error);
            }
        }

        // Brief pause and check if more comments need to be loaded
        await sleep(3000); // Reduced to 3 seconds for batch processing
        await scrollToLoadComments();
    }

    console.log("Deletion completed! No remaining comments detected.");
})();
