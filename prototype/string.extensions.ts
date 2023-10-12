interface String {
    getIdFromExercicio(): string;
}

/**
 * A função pega a string no formato: testando aqui&-&5646564
 * e utiliza this.split('&-&')[1] retornando apenas 5646564
 * que será o id da função.
 */
String.prototype.getIdFromExercicio = function () {
    return this.split('&-&')[1]
}