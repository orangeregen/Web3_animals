import Head from "next/head";
import React from "react";
import styles from '../styles/Home.module.css';
import Link from "next/link";

const UploadPage = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [img, setImg] = React.useState(null);
    const [createObjectURL, setCreateObjectURL] = React.useState(null);
    let isEmpty = 0;
    
    const uploadToServer = async (event) => {
      const body = new FormData();
      body.append("file", image);
      body.append("file", img);
      const response = await fetch("/api/handleUploadImg", {
        method: "POST",
        body
      });
      
      if (isEmpty != -1)
      alert("Карточка успешно загружена");
    };
    
    const uploadToClient = (event) => {
      
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setImage(i);
        const img = i.name;
        const type = i.type;
        //console.log(type);
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(type)) {
          alert("Разрешены только изображения.");
          return;
        }
        setImg(img);
      }
    };

      const handleSubmit = e => {
        e.preventDefault();
        if (name.valueOf(name) == "" || place.valueOf(place) == "" || email.valueOf(email) == "") {
          alert("Необходимо заполнить все поля");
          isEmpty = -1;
          return;
        }

          const data = {
            name,
            place,
            email,
            img,
          }; 


        console.log(data);
        fetch('/api/handleUpload', {
            method: 'post',
            body: JSON.stringify(data, null, 2),
          });
      
        }
  
  return(
    <>
      <Head>
        <title>Загрузка карточки животного</title>
      </Head>
      <h2 className={styles.text3}>Ваше животное потерялось?</h2>
      <p>Загрузите карточку с информацией о нем, чтобы мы могли вам помочь найти его</p>
      <form onSubmit={handleSubmit}>
        <p>Кличка животного</p>
        <input type="text" name="name" id="name" className={styles.textarea} onChange={e => setName(e.target.value)}/> <br />
        <p>Место, где последний раз видели животное</p>
        <input type="text" name="place" id="place" className={styles.textarea} onChange={e => setPlace(e.target.value)} /> <br />
        <p>Ваш email</p>
        <input type="text" name="email" id="email" className={styles.textarea} onChange={e => setEmail(e.target.value)} /> <br />
        <p>Фотография животного</p>
        <input type="file" name="img" id="img" onChange={uploadToClient}/> <br/><br></br>
        <button type="submit" className={styles.btnUpload} onClick={uploadToServer} >Загрузить</button>
      </form>
      <br></br><br></br>
      <Link href='./' className={styles.linkUpload}>Вернуться на главную</Link>
    </>
  );
};

export default UploadPage;