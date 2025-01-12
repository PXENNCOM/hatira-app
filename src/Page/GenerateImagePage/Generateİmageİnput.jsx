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
        <h1>ULAŞTIRMA MEMUR-SEN <br /> <span>22. Yıl Hatıra Kartı</span></h1>
        <div className='sertifika-desc'>
          <p>
          Ulaştırma Memur-Sen, ulaştırma hizmet kolundaki emekçilerin refahı için 22 yıldır sahada ve masada her türlü gayreti gösteriyor. Masada, meydanda ve dahi yollarda memurun hakkı için mücadele eden Ulaştırma Çalışanları Memur Sendikası <span style={{ fontSize: "15px", color:"black", fontWeight:"600"}}>ULAŞTIRMA MEMUR-SEN</span>, <br /><h2>22 YAŞINDA.</h2>
          </p>
          <p className='ser-p-desc'>Siz de ulaştırma hizmet kolunun genel yetkili ve tek etkili sendikası Ulaştırma Memur-Sen'in bir ferdi olarak bu hatıra kartını sosyal medya hesaplarınızda "Hak, Emek ve Özgürlük Mücadelesinde "Ben de Varım" yazarak #birliktegüçlüyüz hashtagi ile paylaşabilirsiniz.</p>
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