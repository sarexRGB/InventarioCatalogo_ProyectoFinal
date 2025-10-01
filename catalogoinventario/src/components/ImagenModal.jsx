import React from 'react'
import '../styles/ImagenModal.css'

function ImagenModal({ imageUrl, onClose }) {
    if (!imageUrl) return null;

  return (
    <div>
        <div className="imageModalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="imageModalClose" onClick={onClose}>&times;</button>
            <img src={imageUrl} alt="Imagen completa del item" className='imageModalImage' />
            </div>
        </div>
    </div>
  )
}

export default ImagenModal