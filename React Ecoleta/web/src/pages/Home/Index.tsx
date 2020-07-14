import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
import {FiLogIn} from 'react-icons/fi';

import logo from '../../assets/logo.svg'


const Home = () => {
    return (
        <div id='page-home'>
            <div className="content">
                <header>
                    <img src={logo} alt='Ecoleta' />
                </header>
                <main>
                    <h1>Seu marketplace de coleta de residuos</h1>
                    <p>Ajudamis Oessias a encotrarem pontos de coleta de forma eficiente</p>
                   <Link to="/createpoint">
                      <span>
                         <FiLogIn />
                      </span>
                      <strong>Cdastre um ponto de coleta</strong>
                    </Link> 
                 </main>

            </div>
        </div>
    )
}

export default Home