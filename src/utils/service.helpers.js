// Vérifie l'existence, throw 404 si absent
export const findOrFail = async (repository, id, entityName) => {
  const entity = await repository.findById(id)
  if (!entity) throw { status: 404, message: `${entityName} non trouvé(e)` }
  return entity
}

// Vérifie l'unicité d'un champ, throw 400 si doublon
export const checkUnique = async (finderFn, value, message, excludeId = null) => {
  const existing = await finderFn(value)
  if (existing && existing.id !== excludeId)
    throw { status: 400, message }
}