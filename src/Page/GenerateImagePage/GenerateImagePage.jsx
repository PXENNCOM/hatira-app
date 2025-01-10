import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Share, Download, Camera, RefreshCw } from 'lucide-react';

import './generateimage.css'

const GenerateImagePage = () => {
  const { name } = useParams();
  const [generatedImages, setGeneratedImages] = useState([null, null]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const canvasRefs = [useRef(null), useRef(null)];
  const backgroundImageSrcs = ['/assets/hatirakartı.png', '/assets/hatirakartıı.png'];
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
          ctx.font = '400 195px "Archivo Black", sans-serif';
          ctx.fillStyle = textColors[index];
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const decodedName = decodeURIComponent(name).toUpperCase();
          const words = decodedName.split(' ');
          
          const fontSize = 62;
          const lineHeight = fontSize * 3.5; // Line height'ı font boyutunun 1.2 katı olarak ayarlıyoruz
          
          let lines = [];
          if (words.length >= 3) {
            lines = [words.slice(0, -1).join(' '), words[words.length - 1]];
          } else {
            lines = [decodedName];
          }

          const totalTextHeight = lines.length * lineHeight;
          let startY = (canvas.height * 0.77) - (totalTextHeight / 2) + (fontSize / 2);

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
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <img 
            src="https://www.ulastirmamemursen.org.tr/images/memursen.png" 
            alt="Logo" 
            className="header-logo" 
          />
          <div className="header-text">
            <h1 className="header-title">Hatıra Oluştur</h1>
            <p className="header-subtitle">ULAŞTIRMA MEMURSEN</p>
          </div>
        </div>
      </header>
  
      <main className="main-content">
        {/* Error State */}
        {error ? (
          <div className="error-container">
            <div className="error-content">
              <div className="error-icon">⚠️</div>
              <h2>Bir Hata Oluştu</h2>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                <RefreshCw size={16} />
                Tekrar Dene
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Canvas Elements (Hidden) */}
            <div style={{ display: 'none' }}>
              {canvasRefs.map((ref, index) => (
                <canvas key={index} ref={ref} />
              ))}
            </div>
  
            {/* Loading State */}
            {step < 3 ? (
              <div className="loading-container">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <div className="loading-progress-container">
                    <div className="loading-bar">
                      <div 
                        className="loading-progress" 
                        style={{width: `${(step / 3) * 100}%`}}
                      ></div>
                    </div>
                    <p className="loading-percentage">
                      {Math.round((step / 3) * 100)}%
                    </p>
                  </div>
                  <p className="loading-text">
                    {step === 0 && 'Hazırlanıyor...'}
                    {step === 1 && 'Hatıranız oluşturuluyor...'}
                    {step === 2 && 'Son rötuşlar yapılıyor...'}
                  </p>
                </div>
              </div>
            ) : (
              /* Generated Images Display */
              <div className="generation-complete">
                <div className="complete-header">
                  <h2 className="complete-title">Hatıranız Hazır! 🎉</h2>
                  <p className="complete-subtitle">
                    Hatıra kartınızı paylaşabilir veya indirebilirsiniz
                  </p>
                </div>
                
                <div className="images-grid">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="image-card">
                      <div className="image-wrapper">
                        <img 
                          src={image} 
                          alt={`Hatıra ${index + 1}`} 
                          className="generated-image" 
                        />
                       
                      </div>
                      
                      <div className="card-actions">
                        <button 
                          onClick={() => shareImage(index)} 
                          className="action-button share-button"
                        >
                          <Share size={18} />
                          <span>Paylaş</span>
                        </button>
                        <button 
                          onClick={() => downloadImage(index)} 
                          className="action-button download-button"
                        >
                          <Download size={18} />
                          <span>İndir</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="generation-info">
                  <p>
                    Not: Yüksek kalitede indirmek için "İndir" butonunu kullanınız
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
  
      <footer className="app-footer">
        <p>© 2025 ULAŞTIRMA MEMURSEN - Tüm hakları saklıdır</p>
    </footer>
    </div>
  );
};

export default GenerateImagePage;