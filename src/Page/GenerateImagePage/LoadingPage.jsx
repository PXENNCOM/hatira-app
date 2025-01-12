// LoadingPage.js
import React from 'react';
import { RefreshCw } from 'lucide-react';
import Logo from '../../assets/ulastirmalogo.png'

const LoadingPage = ({ progress, step, error, onRetry }) => {
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
        {error ? (
          <div className="error-container">
            <div className="error-content">
              <div className="error-icon">⚠️</div>
              <h2>Bir Hata Oluştu</h2>
              <p>{error}</p>
              <button onClick={onRetry} className="retry-button">
                <RefreshCw size={16} />
                Tekrar Dene
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 ULAŞTIRMA MEMUR-SEN - Tüm hakları saklıdır</p>
      </footer>
    </div>
  );
};

export default LoadingPage;