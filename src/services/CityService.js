const CityDao = require('../dao/CityDao');
const NotFound = require('../errors/NotFound');
const UnprocessableEntity = require('../errors/UnprocessableEntity');
const states = require('../enums/stateEnum');

class CityService {
  async find(param) {
    let cidade;
    if (Object.keys(param).length === 1) {
      if (param.estado) {
        const existe = states.some((state) => state === param.estado);
        if (!existe) {
          throw new NotFound('Estado informado não existe');
        }
        return await CityDao.findByState(param);
      }

      cidade = await CityDao.find(param);
      if (!cidade) {
        throw new NotFound('Não foi possível encontrar a cidade informada');
      }
      return cidade;
    }

    throw new UnprocessableEntity('Parametros invalidos');
  }

  async register(dados) {
    const existe = states.some((state) => state === dados.estado);
    if (!existe) {
      throw new NotFound('Estado informado nao existe');
    }
    const cidade = await CityDao.find({ nome: dados.nome });
    if (cidade) {
      throw new NotFound('Cidade ja cadastrada');
    }
    const result = await CityDao.register(dados);
    return result;
  }
}

module.exports = new CityService();
