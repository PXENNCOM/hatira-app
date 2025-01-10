import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './still.css'

const Generateİmageİnput = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/generate/${encodeURIComponent(name)}`);
    }
  };

  return (
      <div className='ser-containerr'>
        <h1>İmam Hatiplerliler Haftası Hatırası</h1>
        <div className='sertifika-desc'>
          <p>ÖNDER, gençlerimizin eğitim hayatında maddi ve manevi olarak desteklenmesi amacıyla ve imam hatip okullarının hamisi olarak bundan 66 yıl önce yola çıktı. 
            Dünden bugüne on binlerce gencin yetişmesine, yarınlara adım atmasına destek oldu. Bugün de nitelikli geleceği inşa etmek üzere “Köklerine sadık, geleceğine ÖNDER” olarak yoluna devam ediyor. 
          </p>
          <p className='ser-p-desc'>Sizler de imam hatip ailesinin bir parçası olarak bu sertifikayı sosyal medya hesaplarınızda “Ben de varım, buradayım” diyebilirsiniz...</p>
        </div>
        <form class="search" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
          />
          <button type="submit">
            Hatıra Oluştur
          </button>
          
        </form>
      </div>
  );
};


export default Generateİmageİnput;