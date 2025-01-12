import React, { useState } from 'react';
import { Share, Download, Copy, Check } from 'lucide-react';
import Logo from '../../assets/ulastirmalogo.png'


const HatiraPage = ({ images, onShare, onDownload }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const shareTexts = [
    "Hak, Emek ve Özgürlük Mücadelesinde Ben de Varım! #birliktegüçlüyüz\n\nUlaştırma Memur-Sen'in 22. Yıl Hatıra Kartı",
    "22 Yıldır Hak İçin, Emek İçin, Özgürlük İçin Mücadele Ediyoruz! #birliktegüçlüyüz\n\nUlaştırma Memur-Sen'in 22. Yıl Hatıra Kartı",
    "22 Yıllık Onurlu Mücadelede Ben de Varım! #birliktegüçlüyüz\n\nUlaştırma Memur-Sen'in 22. Yıl Hatıra Kartı"
  ];

  const handleCopyText = async (index) => {
    try {
      await navigator.clipboard.writeText(shareTexts[index]);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Metin kopyalama hatası:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <img
            src={Logo}
            alt="Logo"
            className="header-logo"
          />
        </div>
      </header>

      <main className="main-content">
        <div className="generation-complete">
          <div className="complete-header">
            <h2 className="complete-title">Hatıranız Hazır!</h2>
            <p className="complete-subtitle">
              Hatıra kartınızı paylaşabilir veya indirebilirsiniz
            </p>
          </div>

          <div className="images-grid">
            {images.map((image, index) => (
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
                    onClick={() => onShare(index)}
                    className="action-button share-button"
                  >
                    <Share size={18} />
                    <span>Paylaş</span>
                  </button>
                  <button
                    onClick={() => onDownload(index)}
                    className="action-button download-button"
                  >
                    <Download size={18} />
                    <span>İNDİR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="share-texts-container">
            <h3 className="share-texts-title">Paylaşım için önerilen metinler:</h3>
            {shareTexts.map((text, index) => (
              <div key={index} className="share-text-item">
                <p className="share-text">{text}</p>
                <button 
                  onClick={() => handleCopyText(index)}
                  className="copy-button"
                  title={copiedIndex === index ? "Kopyalandı!" : "Metni Kopyala"}
                >
                  {copiedIndex === index ? <Check size={20} /> : <Copy size={20} />}
                </button>
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
      </main>

      <footer className="app-footer">
        <p>© 2025 ULAŞTIRMA MEMUR-SEN - Tüm hakları saklıdır</p>
      </footer>
    </div>
  );
};

export default HatiraPage;