import { useState } from 'react'
import './style.css'

import Tarihce from '../../../pages/Tarihce'
import BizKimiz from '../../../pages/BizKimiz'
import Hedeflerimiz from '../../../pages/Hedeflerimiz'
import Misyon from '../../../pages/Misyon'
import Vizyon from '../../../pages/Vizyon'
import GenerateImagePage from '../../GenerateImagePage/Generateİmageİnput'

const OnderNavigation = () => {
    const [activeItem, setActiveItem] = useState('generateImage');
  
    const renderContent = () => {
      switch (activeItem) {
        case 'generateImage':
          return <GenerateImagePage />;
        case 'tarihce':
          return <Tarihce />;
        case 'kimiz':
          return <BizKimiz />;
        case 'hedefler':
          return <Hedeflerimiz />;
        case 'misyon':
          return <Misyon />;
        case 'vizyon':
          return <Vizyon />;
        default:
          return <Tarihce />;
      }
    };
  
    return (
        <div className="onder-container">
          <nav className="onder-nav">
            <ul>
              {['generateImage', 'kimiz', 'hedefler', 'misyon', 'vizyon', 'tarihce'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActiveItem(item)}
                    className={activeItem === item ? 'active' : ''}
                  >
                    
                    {item === 'generateImage' ? 'Sertifika Oluştur' :
                     item === 'kimiz' ? 'Biz Kimiz?' :
                     item === 'hedefler' ? 'Hedeflerimiz' :
                     item === 'misyon' ? 'Misyon' :
                     item === 'vizyon' ? 'Vizyon' :
                     'Tarihce'}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className="onder-content">
            {renderContent()}
          </main>
        </div>
      );
    };

export default OnderNavigation