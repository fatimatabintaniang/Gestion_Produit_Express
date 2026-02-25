import prisma from '../config/db.js'

export const createBaseRepository = (modelName, include = null) => {
  const model = prisma[modelName]
  const withInclude = include ? { include } : {}

  return {
    findAll: () => model.findMany(withInclude),

    findById: (id) => model.findUnique({ where: { id }, ...withInclude }),

    create: (data) => model.create({ data, ...withInclude }),

    update: (id, data) => model.update({ where: { id }, data, ...withInclude }),

    delete: (id) => model.delete({ where: { id } })
  }
}