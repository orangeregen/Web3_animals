import React from 'react';
import Head from 'next/head';
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import styles from '../styles/Home.module.css';
import Link from "next/link";

function sendEmail(email){
  const body = `Здравствйте! Я нашел вашего питомца%0A-----------%0AС уважением, ${localStorage.user}`;
  window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}

function Animal(props){
    if(!props.data) return <p>Loading</p>
    const {name,place,img} = props.data;
    return (
        <div>
          <h1 className={styles.headerStyle}>{name}</h1> <br />
          <h2 className={styles.contentStyle}>{place}</h2>
          <img
            className={styles.bgImg}
            src={img}
          />
        </div>
    );
}

export default function Home() {
  const [animals,setAnimals] = React.useState([]);
  React.useEffect(()=>{
    fetch('/animals.json').then(data=>data.json()).then(data=>setAnimals(data));
  },[]);
  React.useEffect(()=>{
    let user = localStorage.getItem('user');
    if (user===null){
      while (user===null){
        user=prompt("Введите ваше имя пользователя");
        if (!user){
          alert('Обязательно!');
        }
        else {
          localStorage.setItem('user',user);
        }
      }
    }
  },[]);
  
  function logout(){
    localStorage.clear();
    location.reload();
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Пропавшие животные</title>
        <meta name="description" content="Социальная сеть для питомцев" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <div className={styles.text}>Помогите найти их!</div>
      <main className={styles.main}>   
        <AwesomeSlider style={{ "--slider-height-percentage": "50%" }}>
          {
            animals.map((data,i)=><div key={i} style={{ zIndex: 2 }} onClick={()=>sendEmail(data?.email)}>
            <Animal data={data} />
          </div>)
          }
      </AwesomeSlider>
      <br></br> <br></br> <br></br> <br></br> <br></br> 
      <div className={styles.text2}>Если ваше животное потерялось, заполните форму по ссылке ниже</div>
      <br></br> <br></br> 
      <Link href='/uploadCard' className={styles.link}>Помогите мне!</Link>
      <button onClick={logout} className={styles.buttonStyle}>Выйти</button>
      </main>

      <footer className={styles.footer}>
      Социальная сеть для питомцев, (c) 2024
      </footer>
    </div>
  )
}