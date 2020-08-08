import React, { useState, FormEvent } from 'react';

import './style.css';
import api from '../../services/api';

import PageHeader from '../../componets/PageHeader';
import TeacherItem, { Teacher } from '../../componets/TeacherItem';
import Input from '../../componets/Input';
import Select from '../../componets/Select';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) 
    {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={ searchTeachers }>
                    <Select
                      name="subject"
                      label="Matéria" 
                      value={ subject }
                      onChange={(e) => { setSubject(e.target.value) }} 
                      options={[
                          { value: 'Algoritmos', label: 'Algoritmos' },
                          { value: 'Banco de Dados', label: 'Banco de Dados' },
                          { value: 'Engenharia de Software', label: 'Engenharia de Software' },
                          { value: 'Lógica', label: 'Lógica' },
                          { value: 'Programação', label: 'Programação' },
                      ]}
                    />
                    <Select
                      name="week_day"
                      label="Dia da Semana"
                      value={ week_day }
                      onChange={(e) => { setWeekDay(e.target.value) }} 
                      options={[
                          { value: '0', label: 'Domingo' },
                          { value: '1', label: 'Segunda' },
                          { value: '2', label: 'Terça' },
                          { value: '3', label: 'Quarta' },
                          { value: '4', label: 'Quinta' },
                          { value: '5', label: 'Sexta' },
                          { value: '6', label: 'Sabado' }
                      ]}
                    />
                    <Input
                      type="time"
                      label="Horário"
                      name="time"
                      value={ time }
                      onChange={(e) => { setTime(e.target.value) }} 
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                { teachers.map( (teacher: Teacher , index) => {
                    return (<TeacherItem key={ teacher.id } teacher={teacher} />);
                })}
            </main>
        </div>
    )
}

export default TeacherList;