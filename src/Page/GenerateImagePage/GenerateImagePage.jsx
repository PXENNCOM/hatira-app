import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Share, Download } from 'lucide-react';

import './generateimage.css'

const GenerateImagePage = () => {
  const { name } = useParams();
  const [generatedImages, setGeneratedImages] = useState([null, null, null, null]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const backgroundImageSrcs = ['../assets/imamhatiplilerhaftası_hatıra.jpg', '../assets/imamhatiplilerhaftası_hatıra2.jpg', '../assets/imamhatiplilerhaftası_hatıra3.jpg', '../assets/imamhatiplilerhaftası_hatıra4.jpg'];
  const textColors = ['#343434', '#fff', '#3E3B4E', '#603814'];

  useEffect(() => {
    const generateImages = async () => {
      try {
        await document.fonts.load('400 65px "Archivo Black"');

        setStep(1); // Hatıran hazırlanıyor
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStep(2); // Adınız Hatıraya yazılıyor
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newGeneratedImages = await Promise.all(canvasRefs.map(async (canvasRef, index) => {
          const canvas = canvasRef.current;
          if (!canvas) {
            throw new Error(`Canvas element not found for image ${index + 1}`);
          }

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error(`Unable to get 2D context from canvas for image ${index + 1}`);
          }

          const backgroundImage = await loadImage(backgroundImageSrcs[index]);
        
          canvas.width = backgroundImage.width;
          canvas.height = backgroundImage.height;
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

          // İsim için
          ctx.font = '400 65px "Archivo Black", sans-serif';
          ctx.fillStyle = textColors[index];
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const decodedName = decodeURIComponent(name);
          const words = decodedName.split(' ');
          
          const fontSize = 62;
          const lineHeight = fontSize * 1.1; // Line height'ı font boyutunun 1.2 katı olarak ayarlıyoruz
          
          let lines = [];
          if (words.length >= 3) {
            lines = [words.slice(0, -1).join(' '), words[words.length - 1]];
          } else {
            lines = [decodedName];
          }

          const totalTextHeight = lines.length * lineHeight;
          let startY = (canvas.height * 0.62) - (totalTextHeight / 2) + (fontSize / 2);

          lines.forEach((line, i) => {
            const y = startY + (i * lineHeight);
            ctx.fillText(line, canvas.width / 2, y);
          });

          return canvas.toDataURL();
        }));

        setGeneratedImages(newGeneratedImages);
        setStep(3); 
      } catch (err) {
        console.error('Error generating images:', err);
        setError(err.message);
      }
    };

    generateImages();
  }, [name]);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const shareImage = async (index) => {
    if (!generatedImages[index]) return;

    if (navigator.share) {
      try {
        const blob = await (await fetch(generatedImages[index])).blob();
        const file = new File([blob], `hatira_${index + 1}.png`, { type: 'image/png' });
        await navigator.share({
          title: 'Oluşturulan Hatıra',
          text: 'İşte oluşturduğum hatıra!',
          files: [file]
        });
      } catch (error) {
        console.error('Paylaşım sırasında hata oluştu:', error);
      }
    } else {
      downloadImage(index);
    }
  };

  const downloadImage = (index) => {
    if (!generatedImages[index]) return;
    const link = document.createElement('a');
    link.href = generatedImages[index];
    link.download = `hatira_${index + 1}.png`;
    link.click();
  };

  if (error) {
    return <div className="error-container">Hata oluştu: {error}</div>;
  }

  return (
    <div className="generate-image-container">
      <h1 className="generate-image-title">İmam Hatipler Haftası Hatırası</h1>
      {canvasRefs.map((ref, index) => (
        <canvas key={index} ref={ref} style={{ display: 'none' }} />
      ))}
      {step < 3 ? (
        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-progress" style={{width: `${(step / 3) * 100}%`}}></div>
          </div>
          <p className="loading-text">
            {step === 1 ? 'Hatıran hazırlanıyor...' : 'Adınız Hatıraya yazılıyor...'}
          </p>
        </div>
      ) : generatedImages.every(img => img !== null) ? (
        <div className="images-container">
          {generatedImages.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image} alt={`Oluşturulan hatıra ${index + 1}`} className="certificate-image" />
              <div className="button-container">
                <button onClick={() => shareImage(index)} className="button">
                  <Share size={16} className="button-icon" />
                  Paylaş
                </button>
                <button onClick={() => downloadImage(index)} className="button download-button">
                  <Download size={16} className="button-icon" />
                  İndir
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-text">Hatıralarınız yükleniyor...</div>
      )}
    </div>
  );
};

export default GenerateImagePage;