const CityService = require('../services/CityService');

class CityController {
  async find(req, res, next) {
    const params = req.query;
    try {
      const city = await CityService.find(params);
      return res.status(200).json(city);
    } catch (erro) {
      next(erro);
    }
  }

  async register(req, res, next) {
    const dados = req.body;
    try {
      const city = await CityService.register(dados);
      return res.status(201).json(city);
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = new CityController();
