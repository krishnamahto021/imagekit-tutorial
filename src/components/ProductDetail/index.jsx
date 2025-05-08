import React, { useState } from "react";
import { downloadImage } from "../../utils/download";

const ProductDetail = ({ product, onClose }) => {
  // ImageKit configuration
  const publicKey = "public_DgBwSasX9BfkWFoueiwkJr0Rsp0="; // Replace with your ImageKit public key
  const urlEndpoint = "https://ik.imagekit.io/ezcodin"; // Replace with your ImageKit URL endpoint

  // State for image transformations
  const [backgroundType, setBackgroundType] = useState("original"); // "original", "removed", "color", "custom"
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [customBackground, setCustomBackground] = useState("");
  const [transformedImageUrl, setTransformedImageUrl] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null); // Track which operation is loading
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Function to extract the image URL and apply transformations
  const applyTransformation = (transformation) => {
    const originalUrl = product.baseImage;

    // Check if the URL already contains the ImageKit endpoint
    if (originalUrl.includes(urlEndpoint)) {
      // Extract the path after the endpoint
      const pathAfterEndpoint = originalUrl.split(urlEndpoint)[1];
      // Remove leading slash if present
      const cleanPath = pathAfterEndpoint.startsWith("/")
        ? pathAfterEndpoint.substring(1)
        : pathAfterEndpoint;
      // Create the transformed URL
      return `${urlEndpoint}/${transformation}/${cleanPath}`;
    } else {
      // For URLs not from ImageKit, use a different approach or return the original
      console.warn(
        "The image is not hosted on ImageKit, transformations may not work correctly"
      );
      return originalUrl;
    }
  };

  // Function to remove background (using e-bgremove which is more cost-efficient)
  const handleRemoveBackground = async () => {
    setIsLoading(true);
    setImageLoading(true);
    setActiveOperation("remove");

    try {
      const newUrl = applyTransformation("tr:e-bgremove");
      setTransformedImageUrl(newUrl);
      setBackgroundType("removed");
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
      // Image loading state will be handled by onLoad event of image
    }
  };

  // Function to change background color
  const handleChangeBackgroundColor = async (color) => {
    setIsLoading(true);
    setImageLoading(true);
    setActiveOperation("color");

    try {
      setBackgroundColor(color);

      if (backgroundType !== "removed" && backgroundType !== "color") {
        // If background not removed yet, remove it first
        const newUrl = applyTransformation("tr:e-bgremove");
        setTransformedImageUrl(newUrl);
        setBackgroundType("color");
        return;
      }

      // Remove # from color hex
      const colorHex = color.replace("#", "");
      const transformations = ["e-bgremove"];
      transformations.push(`bg-${colorHex}`);

      const newUrl = applyTransformation(`tr:${transformations.join(",")}`);
      setTransformedImageUrl(newUrl);
      setBackgroundType("color");
    } catch (error) {
      console.error("Error changing background color:", error);
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
      // Image loading state will be handled by onLoad event of image
    }
  };

  // Function to change background with a prompt
  const handleChangeBackgroundWithPrompt = async () => {
    if (customBackground.trim() === "") return;

    setIsLoading(true);
    setImageLoading(true);
    setActiveOperation("custom");

    try {
      const encodedPrompt = encodeURIComponent(customBackground);
      const transformations = ["e-changebg-prompt-" + encodedPrompt];

      const newUrl = applyTransformation(`tr:${transformations.join(",")}`);
      setTransformedImageUrl(newUrl);
      setBackgroundType("custom");
    } catch (error) {
      console.error("Error changing background with prompt:", error);
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
      // Image loading state will be handled by onLoad event of image
    }
  };

  // Function to reset image to original
  const handleResetImage = () => {
    setIsLoading(true);
    setImageLoading(true);
    setActiveOperation("reset");

    try {
      setTransformedImageUrl("");
      setBackgroundType("original");
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
      setImageLoading(false);
    }
  };

  // Function to handle image load completion
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Function to download transformed image using the utility function
  const handleDownload = async () => {
    const imageUrl = transformedImageUrl || product.baseImage;

    setDownloadLoading(true);
    setActiveOperation("download");

    try {
      // Create a filename from product name
      const filename = product.name.toLowerCase().replace(/\s+/g, "-");
      const fileExtension = backgroundType === "original" ? "jpg" : "png";
      const fullFilename = `${filename}-edited.${fileExtension}`;

      // Use the utility function to download the image
      await downloadImage(imageUrl, fullFilename);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setDownloadLoading(false);
      setActiveOperation(null);
    }
  };

  // Loading spinner component - improved with Tailwind animation
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image Section */}
          <div className="w-full lg:w-3/5 relative overflow-hidden">
            <div className="aspect-square relative flex items-center justify-center bg-gray-100">
              {/* Loading overlay */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center z-10">
                  <div className="bg-white p-3 rounded-full">
                    <LoadingSpinner />
                  </div>
                </div>
              )}

              {/* Display image */}
              <img
                src={transformedImageUrl || product.baseImage}
                alt={product.name}
                className="w-full h-full object-contain"
                onLoad={handleImageLoad}
                style={{ opacity: imageLoading ? 0.3 : 1 }}
              />
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end">
              <div className="flex space-x-2"></div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-2/5 p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-xl font-semibold text-indigo-600 mt-2">
              {product.price}
            </p>
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Image Editing Tools */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Image Editing</h3>

              {/* Background Options */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`${
                      backgroundType === "removed"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    onClick={handleRemoveBackground}
                    disabled={isLoading || backgroundType === "removed"}
                  >
                    {activeOperation === "remove" ? (
                      <LoadingSpinner />
                    ) : (
                      "Remove Background"
                    )}
                  </button>

                  <button
                    className={`${
                      backgroundType === "original"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    onClick={handleResetImage}
                    disabled={isLoading || backgroundType === "original"}
                  >
                    {activeOperation === "reset" ? (
                      <LoadingSpinner />
                    ) : (
                      "Original Image"
                    )}
                  </button>
                </div>

                {/* Background Color */}
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className={`w-10 h-10 rounded cursor-pointer ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      className={`${
                        backgroundType === "color"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      } flex-grow font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        handleChangeBackgroundColor(backgroundColor)
                      }
                      disabled={isLoading}
                    >
                      {activeOperation === "color" ? (
                        <LoadingSpinner />
                      ) : (
                        "Apply Color"
                      )}
                    </button>
                  </div>
                </div>

                {/* Custom Background */}
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Custom Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customBackground}
                      onChange={(e) => setCustomBackground(e.target.value)}
                      placeholder="e.g., beach, office, snow"
                      className={`flex-grow p-2 border rounded-lg ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      className={`${
                        backgroundType === "custom" && customBackground
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      } font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center min-w-[80px] ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      onClick={handleChangeBackgroundWithPrompt}
                      disabled={isLoading || !customBackground}
                    >
                      {activeOperation === "custom" ? (
                        <LoadingSpinner />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6">
              <button
                className={`w-full ${
                  transformedImageUrl && !isLoading && !downloadLoading
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400"
                } text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  isLoading || downloadLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleDownload}
                disabled={!transformedImageUrl || isLoading || downloadLoading}
              >
                {activeOperation === "download" ? (
                  <LoadingSpinner />
                ) : (
                  "Download Edited Image"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
