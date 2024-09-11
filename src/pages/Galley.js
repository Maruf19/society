import React from 'react';
import img from '../components/Assets/22.jpg'
import img1 from '../components/Assets/11.jpg'
import img2 from '../components/Assets/mu.jpeg'
import img3 from '../components/Assets/mu1.jpg'
import img4 from '../components/Assets/mu2.jpg'
import img5 from '../components/Assets/22.jpg'
const Gallery = () => {
  const images = [
    { id: 1, src: img, alt: 'Image 1' },
    { id: 2, src: img1, alt: 'Image 2' },
    { id: 3, src: img2, alt: 'Image 3' },
    { id: 4, src: img3, alt: 'Image 4' },
    { id: 5, src: img4, alt: 'Image 5' },
    { id: 6, src: img5, alt: 'Image 6' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-300"
              src={image.src}
              alt={image.alt}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="text-white border border-white px-6 py-2 rounded-full bg-transparent hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
