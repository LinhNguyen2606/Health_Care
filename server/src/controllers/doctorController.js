import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        //+ help to convert string to int
        let respone = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(respone);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
};
