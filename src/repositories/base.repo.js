import prisma from '../config/db.js'

export const createBaseRepository = (modelName, include = null) => {
  const model = prisma[modelName]
  // La variable withInclude est créée pour conditionner l'inclusion des relations dans les requêtes Prisma. Si l'argument include est fourni, withInclude contiendra un objet avec la clé include et sa valeur correspondante. Sinon, withInclude sera un objet vide. Cela permet de réutiliser cette variable dans les différentes méthodes du repository pour inclure ou non les relations selon les besoins.
  const withInclude = include ? { include } : {}

  return {
    findAll: () => model.findMany(withInclude),

    findById: (id) => model.findUnique({ where: { id }, ...withInclude }),

    create: (data) => model.create({ data, ...withInclude }),

    update: (id, data) => model.update({ where: { id }, data, ...withInclude }),

    delete: (id) => model.delete({ where: { id } })
  }
}