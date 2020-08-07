import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css';
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}
interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection () {
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt="avatar" />
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        
        <p> { teacher.bio } </p>
        <footer>
            <p>
                Preço/hora
                <strong>R${ teacher.cost }</strong>
            </p>
            <a
                onClick={ createNewConnection }
                target="_blank" href={`https://wa.me/${teacher.whatsapp}`}
                rel="noopener"
            >                
                <img
                  src={whatsappIcon}
                  alt="Whatsapp Icone"
                />                
                Entrar em contato
            </a>
        </footer>
    </article>
    )
}

export default TeacherItem;
