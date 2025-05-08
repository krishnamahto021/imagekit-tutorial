/**
 * Downloads an image from a URL by creating a blob
 *
 * @param {string} imageUrl - URL of the image to download
 * @param {string} fileName - Name to save the file as
 * @returns {Promise<void>}
 */
export const downloadImage = async (imageUrl, fileName) => {
  try {
    // Show loading cursor
    document.body.style.cursor = "wait";

    // Fetch the image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to download: ${response.status} ${response.statusText}`
      );
    }

    // Get the blob from the response
    const imageBlob = await response.blob();

    // Create a blob URL
    const blobUrl = URL.createObjectURL(imageBlob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || "downloaded-image.jpg";

    // Append to body, click the link, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Free up memory by revoking the blob URL
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  } catch (error) {
    console.error("Error downloading image:", error);
    alert("Failed to download image. Please try again.");
  } finally {
    // Reset cursor
    document.body.style.cursor = "default";
  }
};
