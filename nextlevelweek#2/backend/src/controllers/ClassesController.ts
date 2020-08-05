import {Request, Response} from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missinng filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .join('users', 'classes.user_id', '=', 'users.id')
            .where('classes.subject', '=', subject)
            .select(['classes.*', 'users.*'])

        return response.json(classes);
    }
    
    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insetedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insetedUsersIds[0];
        
            const insetedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insetedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            });
        
            const schedules = await trx('class_schedule').insert(classSchedule);
        
            trx.commit();
            
            return response.status(201).send({user_id, class_id, schedules});
        } catch (err) {
            
            console.log(err);
    
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected erros while creating new class'            
            });        
        }
    }
}