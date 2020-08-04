import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css';

export default function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://avatars2.githubusercontent.com/u/3782288?s=460&u=614c23ac1abcc71b850c08fc6a9a209fab8f2c0a&v=4" alt="Willian Reis"/>
            <div>
                <strong>Willian Reis</strong>
                <span>Algoritmos</span>
            </div>
        </header>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis sapien libero. Proin in ante erat. Nam condimentum posuere risus id congue. Vivamus accumsan justo sagittis turpis vulputate, at vehicula augue convallis. Cras quis interdum mi. Nunc ac purus arcu. Sed condimentum tortor lectus, auctor tincidunt turpis tempor at. Cras feugiat suscipit porttitor. Maecenas vel vestibulum justo. Mauris fermentum ante non quam tincidunt facilisis. Donec eleifend metus at mauris pulvinar, volutpat fermentum eros varius. Suspendisse potenti. Proin ut lorem quis neque dapibus laoreet. Fusce non ante et nibh laoreet condimentum quis at orci. Phasellus sed sagittis est. Nulla sem nibh, vulputate pharetra elit ut, tempus fermentum nisl.
        </p>
        <footer>
            <p>
                Preço/hora
                <strong>R$50,00</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="Whatsapp Icone"/>
                Entrar em contato
            </button>
        </footer>
    </article>
    )
}