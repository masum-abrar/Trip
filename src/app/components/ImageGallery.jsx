'use client';
import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* Display Grid (show up to 4 images) */}
      <div
        className={`mt-2 ${
          images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"
        } gap-2 relative`}
      >
        {images.slice(0, 4).map((imgObj, index) => (
          <div key={index} className="relative">
            <img
              src={imgObj.image}
              alt={`Post image ${index + 1}`}
              className={`w-full ${
                images.length === 1 ? "h-56" : "h-40"
              } object-cover rounded-md cursor-pointer hover:opacity-90 transition`}
              onClick={() => setSelectedImage(imgObj.image)}
            />

            {/* Overlay if there are more than 4 images */}
            {index === 3 && images.length > 4 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md cursor-pointer"
                onClick={() => setShowAllImages(true)}
                
              >
                <span className="text-white text-lg font-semibold">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Single Image Preview Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xl px-2 py-1 rounded-md hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Show All Images Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-5xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowAllImages(false)}
              className="absolute top-4 right-4 text-black text-3xl"
            >
              ✕
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((imgObj, index) => (
                <img
                  key={index}
                  src={imgObj.image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                  onClick={() => setSelectedImage(imgObj.image)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
