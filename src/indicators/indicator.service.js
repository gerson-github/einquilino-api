const repository = require("./indicator.repository");

exports.getMonthly = async () => {
  const data = await repository.getMonthly();
  
  //aqui coloca-se as regras de negocio, tipo filtro, calculo, normaliacao etc
  return data;
};

