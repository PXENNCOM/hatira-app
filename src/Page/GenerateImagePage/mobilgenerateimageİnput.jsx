import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './mobilİnput.css'

const MobileGenerateImageInput  = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/generate/${encodeURIComponent(name)}`);
    }
  };

  return (
      <div className='mobil-ser-container'>
        <h1>İmam Hatipliler <br /> Haftası Hatırası</h1>
        <div className='sertifika-desc'>
          
          <p className='ser-p-desc'>Sizler de imam hatip ailesinin bir parçası olarak bu sertifikayı sosyal medya hesaplarınızda “#YıllardırÖNDER ve #Sadakatle" etiketleriyle paylaşabilirsiniz.</p>
        </div>
        <form class="mobilSearch" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
          /> <br />
          <button type="submit">
            Görsel Oluştur
          </button>
        </form>
      </div>
  );
};


export default MobileGenerateImageInput ;