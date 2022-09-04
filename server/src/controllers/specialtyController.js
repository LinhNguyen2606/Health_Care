import specialtyService from '../services/specialtyService';

let saveSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let getAllSpecialties = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialties();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    saveSpecialty: saveSpecialty,
    getAllSpecialties: getAllSpecialties,
};
