import React from 'react';
import { Share, Download } from 'lucide-react';

const HatiraPage = ({ images, onShare, onDownload }) => {
  return (
    <div className="app-container">
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