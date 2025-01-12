import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import HatiraPage from './HatiraPage';

const GenerateImagePage = () => {
  const { name } = useParams();
  const [generatedImages, setGeneratedImages] = useState([null, null]);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const canvasRefs = [useRef(null), useRef(null)];
  const backgroundImageSrcs = ['/assets/hatirakartı.png', '/assets/hatirakartıı.png'];
  const textColors = ['#343434', '#fff', '#3E3B4E', '#603814'];

  // Font ve görsellerin yüklenmesini kontrol eden fonksiyon
  const loadAssets = async () => {
    try {
      // Font yükleme kontrolü
      await document.fonts.load('900 62px "Montserrat"');
      
      // Görsellerin yüklenmesini bekle
      const imagePromises = backgroundImageSrcs.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setAssetsLoaded(true);
    } catch (err) {
      setError('Font veya görseller yüklenemedi. Lütfen sayfayı yenileyiniz.');
    }
  };

  useEffect(() => {
    loadAssets(); // İlk olarak assetleri yükle
  }, []);

  useEffect(() => {
    // Assetler yüklenmeden işleme başlama
    if (!assetsLoaded) return;

    const generateImages = async () => {
      try {
        setStep(1);
        for (let i = 0; i <= 33; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        setStep(2);
        for (let i = 34; i <= 66; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
    
        const newGeneratedImages = await Promise.all(canvasRefs.map(async (canvasRef, index) => {
          const canvas = canvasRef.current;
          if (!canvas) throw new Error(`Canvas element not found for image ${index + 1}`);
    
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error(`Unable to get 2D context from canvas for image ${index + 1}`);
    
          const backgroundImage = await loadImage(backgroundImageSrcs[index]);
          
          canvas.width = backgroundImage.width;
          canvas.height = backgroundImage.height;
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
          ctx.font = '900 195px "Montserrat"';
          ctx.fillStyle = textColors[index];
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
    
          // Türkçe karakter düzeltmesi
          const turkishToUpper = (text) => {
            return text
              .replace(/i/g, 'İ')
              .toUpperCase();
          };
    
          const decodedName = turkishToUpper(decodeURIComponent(name));
          const words = decodedName.split(' ');
          
          const fontSize = 62;
          const lineHeight = fontSize * 3.6;
          
          let lines = words.length >= 3 
            ? [words.slice(0, -1).join(' '), words[words.length - 1]]
            : [decodedName];
    
          const totalTextHeight = lines.length * lineHeight;
          let startY = (canvas.height * 0.77) - (totalTextHeight / 2) + (fontSize / 2);
    
          lines.forEach((line, i) => {
            const y = startY + (i * lineHeight);
            ctx.fillText(line, canvas.width / 2, y);
          });
    
          return canvas.toDataURL();
        }));
    
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
  }, [name, assetsLoaded]);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const shareImage = async (index) => {
    if (!generatedImages[index]) return;
  
    try {
      const blob = await (await fetch(generatedImages[index])).blob();
      const file = new File([blob], `hatira_${index + 1}.png`, { type: 'image/png' });
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Ulaştırma Memur-Sen 22. Yıl Hatıra Kartı'
        });
      }
    } catch (error) {
      console.error('Paylaşım sırasında hata oluştu:', error);
    }
  };


  const downloadImage = (index) => {
    if (!generatedImages[index]) return;
    const link = document.createElement('a');
    link.href = generatedImages[index];
    link.download = `hatira_${index + 1}.png`;
    link.click();
  };

  // Hata durumunda yeniden deneme
  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setStep(0);
    loadAssets();
  };

  // Hidden canvas elementleri
  const canvasElements = (
    <div style={{ display: 'none' }}>
      {canvasRefs.map((ref, index) => (
        <canvas key={index} ref={ref} />
      ))}
    </div>
  );

  // Progress 100 ve görseller oluşturulduysa Hatıra sayfasını göster
  if (progress === 100 && generatedImages[0] && generatedImages[1]) {
    return (
      <HatiraPage 
        images={generatedImages}
        onShare={shareImage}
        onDownload={downloadImage}
      />
    );
  }

  // Yükleme veya hata durumunda Loading sayfasını göster
  return (
    <>
      {canvasElements}
      <LoadingPage 
        error={error}
        progress={progress}
        step={step}
        onRetry={handleRetry}
      />
    </>
  );
};

export default GenerateImagePage;