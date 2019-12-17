module.exports = function(app) {
    this.load = function() {
        // Responsável por carregar arquivo das models, para criação das tabelas
        app.models.Auth
        app.models.Level
        app.models.Profile
        app.models.User
    }
}