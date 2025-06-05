(async function() {
    // Function to wait for a specified time (in milliseconds)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Function to scroll to the bottom of the page to load all comments
    async function scrollToLoadComments() {
        let lastHeight = document.body.scrollHeight;
        while (true) {
            window.scrollTo(0, document.body.scrollHeight);
            await sleep(2000); // Wait for content to load
            let newHeight = document.body.scrollHeight;
            if (newHeight === lastHeight) break; // No more new comments loaded
            lastHeight = newHeight;
            console.log("Loading more comments...");
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
                await sleep(3000); // Wait 3 seconds to avoid server issues
            } catch (error) {
                console.error("Error while deleting a comment:", error);
            }
        }

        // Wait a bit and check if more comments need to be loaded
        await sleep(5000);
        await scrollToLoadComments();
    }

    console.log("Deletion completed! No remaining comments detected.");
})();
