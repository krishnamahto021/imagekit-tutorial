import React, { useState } from "react";
import { IKContext } from "imagekitio-react";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import { products } from "./data/products";
import { imageKitConfig } from "./config/imagekit";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <IKContext
      publicKey={imageKitConfig.publicKey}
      urlEndpoint={imageKitConfig.urlEndpoint}
      authenticationEndpoint={imageKitConfig.authenticationEndpoint}
    >
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-indigo-600">
              ImageKit Product Showcase
            </h1>
          </div>
        </header>

        <main>
          <ProductGrid
            products={products}
            onSelectProduct={handleProductSelect}
          />

          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={handleCloseDetail}
            />
          )}
        </main>

        <footer className="bg-white mt-12 py-6 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              Product showcase gallery powered by ImageKit
            </p>
          </div>
        </footer>
      </div>
    </IKContext>
  );
};

export default App;
