import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Patient name',
                    time: '8:00 - 9:00 Chủ nhật 2-9-2022',
                    doctorName: 'Doctor name',
                    redirectLink: 'http://localhost:3000/home',
                });

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                    raw: false,
                });

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                }

                resolve({
                    errCode: 0,
                    message: 'Save infor patient successfully',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
