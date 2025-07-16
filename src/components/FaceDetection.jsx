import  { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { detectFace } from 'face-detectify';

const FaceDetection = ({ imageUrl }) => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext('2d');

    const loadImageAndDetectFace = async () => {
      if (imgElement) {
        const faces = await detectFace(imgElement);

        // Clear the canvas
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw detected face on canvas
        if (faces.length > 0) {
          const face = faces[0].box; // Get the first detected face's bounding box
          canvasElement.width = face.width;
          canvasElement.height = face.height;
          context.drawImage(
            imgElement,
            face.x,
            face.y,
            face.width,
            face.height,
            0,
            0,
            face.width,
            face.height
          );
        }
      }
    };

    loadImageAndDetectFace();
  }, [imageUrl]);

  return (
    <div className="flex justify-center mb-4">
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Patient"
        style={{ display: 'none' }} // Hide the original image
      />
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
};

// Add propTypes for the component
FaceDetection.propTypes = {
  imageUrl: PropTypes.string.isRequired, // Specify that imageUrl is required
};

export default FaceDetection;
