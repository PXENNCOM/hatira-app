import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Share, Download, RefreshCw } from 'lucide-react';

const GenerateImagePage = () => {
  const { name } = useParams();
  const [generatedImages, setGeneratedImages] = useState([null, null]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRefs = [useRef(null), useRef(null)];
  const backgroundImageSrcs = ['/assets/hatirakartı.png', '/assets/hatirakartıı.png'];
  const textColors = ['#343434', '#fff', '#3E3B4E', '#603814'];

  useEffect(() => {
    const generateImages = async () => {
      try {
        await document.fonts.load('900 195px "Montserrat"');

        // Step 1: İlk yükleme - 0% to 33%
        setStep(1);
        for (let i = 0; i <= 33; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Step 2: İsim yazma - 34% to 66%
        setStep(2);
        for (let i = 34; i <= 66; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }

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

          ctx.font = '900 195px "Montserrat"';
          ctx.fillStyle = textColors[index];
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const decodedName = decodeURIComponent(name).toUpperCase();
          const words = decodedName.split(' ');
          
          const fontSize = 62;
          const lineHeight = fontSize * 3.5;
          
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

        // Step 3: Final yükleme - 67% to 100%
        setStep(3);
        for (let i = 67; i <= 100; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 20));
        }

        setGeneratedImages(newGeneratedImages);
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
        
        // Paylaşım metni
        const shareText = "Hak, Emek ve Özgürlük Mücadelesinde Ben de Varım! #birliktegüçlüyüz\n\nUlaştırma Memur-Sen'in 22. Yıl Hatıra Kartı"; 
  
        await navigator.share({
          title: 'Ulaştırma Memur-Sen 22. Yıl Hatıra Kartı',
          text: shareText,
          files: [file]
        });
      } catch (error) {
        console.error('Paylaşım sırasında hata oluştu:', error);
        // Paylaşım başarısız olursa yedek olarak indirme işlemi
        downloadImage(index);
      }
    } else {
      // Share API desteklenmiyorsa indirme işlemi
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

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-content">
          <img 
            src="https://www.ulastirmamemursen.org.tr/images/logo.png" 
            alt="Logo" 
            className="header-logo" 
          />
        </div>
      </header>
  
      <main className="main-content">
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
            <div style={{ display: 'none' }}>
              {canvasRefs.map((ref, index) => (
                <canvas key={index} ref={ref} />
              ))}
            </div>
  
            {progress < 100 ? (
              <div className="loading-container">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <div className="loading-progress-container">
                    <div className="loading-bar">
                      <div 
                        className="loading-progress" 
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                    <p className="loading-percentage">
                      {progress}%
                    </p>
                  </div>
                  <p className="loading-text">
                    {step === 1 && 'Hatıranız oluşturuluyor...'}
                    {step === 2 && 'Adınız Hatıraya yazılıyor...'}
                    {step === 3 && 'Bitti sayılır...'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="generation-complete">
                <div className="complete-header">
                  <h2 className="complete-title">Hatıranız Hazır!</h2>
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
                          <span>İNDİR</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="generation-info">
                  <p>
                    Not: Yüksek kalitede indirmek için "İndir" butonunu kullanınız
                  </p>
                  <p>
                    UYARI: İsminizde Türkçe karakter sorunu varsa sayfayı yenileyiniz!
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
  
      <footer className="app-footer">
        <p>© 2025 ULAŞTIRMA MEMUR-SEN - Tüm hakları saklıdır</p>
      </footer>
    </div>
  );
};

export default GenerateImagePage;