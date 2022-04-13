@Library(['aic-jenkins-sharedlib']) _

jsBuildPipeline {
    nomePod                      = 'node14' // Versão do node utilizada no build
    habilitarValidacaoEstatica   = false // habilita a validação estática do código fonte
    habilitarConstrucao          = true // habilita a construção da aplicação
    habilitarTestesUnidade       = false // habilita a execução dos testes de unidade
    habilitarTestesIntegracao    = false // habilita a execução dos testes de integração
    habilitarSonar               = false // habilita a execução do SonarQube Scanner
    habilitarEmpacotamento       = false // habilita o empacotamento da aplicação
    habilitarEmpacotamentoDocker = true // habilita a publicação da imagem docker no repositório corporativo
    habilitarPublicacao          = true // habilita a publicação do pacote no repositório corporativo
    habilitarDebug               = false // habilita debug
}
// Documentação das pipelines: https://fontes.intranet.bb.com.br/aic/publico/atendimento/-/wikis/Pipelines