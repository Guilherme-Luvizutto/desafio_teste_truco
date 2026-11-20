
let totalTestes = 0;
let testesPassaram = 0;
let testesFalharam = 0;

function executarTeste(nome, resultadoEsperado, resultadoObtido) {
    totalTestes++;

    if (resultadoEsperado === resultadoObtido) {
        testesPassaram++;
        console.log(`✅ PASSOU: ${nome}`);
    } else {
        testesFalharam++;
        console.log(`❌ FALHOU: ${nome}`);
        console.log(`Esperado: ${resultadoEsperado}`);
        console.log(`Obtido: ${resultadoObtido}`);
    }
}

function exibirResumo() {
    console.log("\n========== RESUMO DOS TESTES ==========");
    console.log(`Total: ${totalTestes}`);
    console.log(`Aprovados: ${testesPassaram}`);
    console.log(`Reprovados: ${testesFalharam}`);
}

let truco = null;

try {
    truco = require("./truco.js");
} catch (erro) {
    console.log("Implementação do Truco ainda não encontrada.");
}

function obterResultado(funcao, ...argumentos) {
    if (!truco || typeof truco[funcao] !== "function") {
        return `FUNCAO_NAO_IMPLEMENTADA: ${funcao}`;
    }

    return truco[funcao](...argumentos);
}

// VALIDAÇÃO DAS CARTAS

executarTeste(
    "T01 - Aceitar carta Ás",
    true,
    obterResultado("validarCarta", "A", "copas")
);

executarTeste(
    "T02 - Aceitar carta 2",
    true,
    obterResultado("validarCarta", "2", "ouros")
);

executarTeste(
    "T03 - Aceitar carta 3",
    true,
    obterResultado("validarCarta", "3", "espadas")
);

executarTeste(
    "T04 - Aceitar carta 7",
    true,
    obterResultado("validarCarta", "7", "paus")
);

executarTeste(
    "T05 - Rejeitar carta 8",
    false,
    obterResultado("validarCarta", "8", "copas")
);

executarTeste(
    "T06 - Rejeitar carta 9",
    false,
    obterResultado("validarCarta", "9", "ouros")
);

executarTeste(
    "T07 - Rejeitar carta 10",
    false,
    obterResultado("validarCarta", "10", "espadas")
);

executarTeste(
    "T08 - Rejeitar carta inválida",
    false,
    obterResultado("validarCarta", "11", "paus")
);

// VALIDAÇÃO DO BARALHO

const valoresBaralho = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
const naipesBaralho = ["copas", "ouros", "espadas", "paus"];

const baralhoCompleto = valoresBaralho.flatMap(valor =>
    naipesBaralho.map(naipe => ({ valor, naipe }))
);

const baralhoDuplicado = [...baralhoCompleto];
baralhoDuplicado[39] = { ...baralhoDuplicado[0] };

const baralhoCartaInvalida = [...baralhoCompleto];
baralhoCartaInvalida[0] = { valor: "8", naipe: "copas" };

const baralhoNaipeInvalido = [...baralhoCompleto];
baralhoNaipeInvalido[0] = { valor: "4", naipe: "invalido" };

executarTeste(
    "T09 - Aceitar baralho completo com 40 cartas",
    true,
    obterResultado("validarBaralho", baralhoCompleto)
);

executarTeste(
    "T10 - Rejeitar baralho com 39 cartas",
    false,
    obterResultado("validarBaralho", baralhoCompleto.slice(0, 39))
);

executarTeste(
    "T11 - Rejeitar baralho com 41 cartas",
    false,
    obterResultado("validarBaralho", [...baralhoCompleto, baralhoCompleto[0]])
);

executarTeste(
    "T12 - Rejeitar baralho com cartas duplicadas",
    false,
    obterResultado("validarBaralho", baralhoDuplicado)
);

executarTeste(
    "T13 - Rejeitar baralho com carta ausente",
    false,
    obterResultado("validarBaralho", baralhoCompleto.slice(1))
);

executarTeste(
    "T14 - Rejeitar baralho com valor inválido",
    false,
    obterResultado("validarBaralho", baralhoCartaInvalida)
);

executarTeste(
    "T15 - Rejeitar baralho com naipe inválido",
    false,
    obterResultado("validarBaralho", baralhoNaipeInvalido)
);

executarTeste(
    "T16 - Rejeitar baralho vazio",
    false,
    obterResultado("validarBaralho", [])
);

// VALIDAÇÃO DOS JOGADORES E DUPLAS

const jogadoresValidos = [1, 2, 3, 4];
const duplasValidas = [[1, 3], [2, 4]];

executarTeste(
    "T17 - Aceitar partida com 4 jogadores",
    true,
    obterResultado("validarJogadores", jogadoresValidos)
);

executarTeste(
    "T18 - Rejeitar partida com 3 jogadores",
    false,
    obterResultado("validarJogadores", [1, 2, 3])
);

executarTeste(
    "T19 - Rejeitar partida com 5 jogadores",
    false,
    obterResultado("validarJogadores", [1, 2, 3, 4, 5])
);

executarTeste(
    "T20 - Rejeitar jogadores repetidos",
    false,
    obterResultado("validarJogadores", [1, 2, 2, 4])
);

executarTeste(
    "T21 - Aceitar duas duplas completas",
    true,
    obterResultado("validarDuplas", duplasValidas, jogadoresValidos)
);

executarTeste(
    "T22 - Rejeitar dupla incompleta",
    false,
    obterResultado("validarDuplas", [[1], [2, 3, 4]], jogadoresValidos)
);

executarTeste(
    "T23 - Rejeitar jogador em duas duplas",
    false,
    obterResultado("validarDuplas", [[1, 2], [2, 4]], jogadoresValidos)
);

executarTeste(
    "T24 - Rejeitar jogador que não pertence à partida",
    false,
    obterResultado("validarDuplas", [[1, 5], [2, 4]], jogadoresValidos)
);

// DISTRIBUIÇÃO DAS CARTAS

executarTeste(
    "T25 - Aceitar distribuição de 3 cartas para cada jogador",
    true,
    obterResultado("validarDistribuicao", 4, 3, 40)
);

executarTeste(
    "T26 - Rejeitar distribuição para apenas 3 jogadores",
    false,
    obterResultado("validarDistribuicao", 3, 3, 40)
);

executarTeste(
    "T27 - Rejeitar distribuição para 5 jogadores",
    false,
    obterResultado("validarDistribuicao", 5, 3, 40)
);

executarTeste(
    "T28 - Rejeitar distribuição de 2 cartas por jogador",
    false,
    obterResultado("validarDistribuicao", 4, 2, 40)
);

executarTeste(
    "T29 - Rejeitar distribuição de 4 cartas por jogador",
    false,
    obterResultado("validarDistribuicao", 4, 4, 40)
);

executarTeste(
    "T30 - Rejeitar distribuição com baralho incompleto",
    false,
    obterResultado("validarDistribuicao", 4, 3, 39)
);

executarTeste(
    "T31 - Rejeitar distribuição com baralho vazio",
    false,
    obterResultado("validarDistribuicao", 4, 3, 0)
);

executarTeste(
    "T32 - Rejeitar quantidade negativa de cartas por jogador",
    false,
    obterResultado("validarDistribuicao", 4, -1, 40)
);

// HIERARQUIA DAS CARTAS

executarTeste(
    "T33 - Reconhecer 3 como carta mais forte entre as comuns",
    9,
    obterResultado("obterForcaCarta", "3", "copas", "A")
);

executarTeste(
    "T34 - Reconhecer 4 como carta mais fraca entre as comuns",
    0,
    obterResultado("obterForcaCarta", "4", "copas", "A")
);

executarTeste(
    "T35 - Reconhecer 2 como mais forte que Ás",
    true,
    obterResultado("compararCartas", ["2", "copas"], ["A", "ouros"], "A")
);

executarTeste(
    "T36 - Reconhecer Ás como mais forte que Rei",
    true,
    obterResultado("compararCartas", ["A", "copas"], ["K", "ouros"], "A")
);

executarTeste(
    "T37 - Reconhecer manilha como mais forte que carta comum",
    true,
    obterResultado("compararCartas", ["4", "ouros"], ["3", "copas"], "3")
);

executarTeste(
    "T38 - Reconhecer manilha de paus como mais forte que manilha de copas",
    true,
    obterResultado("compararCartas", ["4", "paus"], ["4", "copas"], "3")
);

executarTeste(
    "T39 - Reconhecer manilha de ouros como mais fraca entre as manilhas",
    true,
    obterResultado("compararCartas", ["4", "espadas"], ["4", "ouros"], "3")
);

executarTeste(
    "T40 - Rejeitar carta inválida na comparação",
    false,
    obterResultado("compararCartas", ["8", "copas"], ["3", "ouros"], "A")
);

// RODADAS E DEFINIÇÃO DA DUPLA VENCEDORA

executarTeste(
    "T41 - Aceitar rodada com quatro cartas",
    true,
    obterResultado("validarRodada", [
        ["3", "copas"],
        ["A", "ouros"],
        ["2", "paus"],
        ["K", "espadas"]
    ])
);

executarTeste(
    "T42 - Rejeitar rodada com apenas três cartas",
    false,
    obterResultado("validarRodada", [
        ["3", "copas"],
        ["A", "ouros"],
        ["2", "paus"]
    ])
);

executarTeste(
    "T43 - Rejeitar rodada com cinco cartas",
    false,
    obterResultado("validarRodada", [
        ["3", "copas"],
        ["A", "ouros"],
        ["2", "paus"],
        ["K", "espadas"],
        ["4", "copas"]
    ])
);

executarTeste(
    "T44 - Identificar vitória da dupla 1 na rodada",
    1,
    obterResultado("determinarVencedorRodada", [
        ["3", "copas"],
        ["A", "ouros"],
        ["2", "paus"],
        ["K", "espadas"]
    ])
);

executarTeste(
    "T45 - Identificar vitória da dupla 2 na rodada",
    2,
    obterResultado("determinarVencedorRodada", [
        ["A", "copas"],
        ["3", "ouros"],
        ["K", "paus"],
        ["2", "espadas"]
    ])
);

executarTeste(
    "T46 - Identificar dupla vencedora após vencer duas rodadas",
    1,
    obterResultado("determinarVencedorMao", [1, 1, 2])
);

executarTeste(
    "T47 - Identificar vitória da dupla 2 após duas rodadas",
    2,
    obterResultado("determinarVencedorMao", [2, 1, 2])
);

executarTeste(
    "T48 - Rejeitar resultado de rodada inválido",
    -1,
    obterResultado("determinarVencedorMao", [1, 3, 2])
);

// PEDIDO DE TRUCO E PONTUAÇÃO

executarTeste(
    "T49 - Iniciar mão valendo 1 ponto",
    1,
    obterResultado("obterValorMao", 1)
);

executarTeste(
    "T50 - Aceitar pedido de Truco",
    3,
    obterResultado("aumentarValorMao", 1)
);

executarTeste(
    "T51 - Aumentar mão de 3 para 6 pontos",
    6,
    obterResultado("aumentarValorMao", 3)
);

executarTeste(
    "T52 - Aumentar mão de 6 para 9 pontos",
    9,
    obterResultado("aumentarValorMao", 6)
);

executarTeste(
    "T53 - Aumentar mão de 9 para 12 pontos",
    12,
    obterResultado("aumentarValorMao", 9)
);

executarTeste(
    "T54 - Rejeitar aumento após atingir 12 pontos",
    -1,
    obterResultado("aumentarValorMao", 12)
);

executarTeste(
    "T55 - Pontuar 1 ponto quando o primeiro Truco é recusado",
    1,
    obterResultado("obterPontuacaoRecusa", 1)
);

executarTeste(
    "T56 - Rejeitar valor inicial inválido da mão",
    -1,
    obterResultado("obterValorMao", 0)
);
// PONTUAÇÃO DA PARTIDA

executarTeste(
    "T57 - Aceitar pontuação inicial zero",
    true,
    obterResultado("validarPontuacaoDupla", 0)
);

executarTeste(
    "T58 - Aceitar pontuação intermediária",
    true,
    obterResultado("validarPontuacaoDupla", 6)
);

executarTeste(
    "T59 - Aceitar pontuação máxima de 12 pontos",
    true,
    obterResultado("validarPontuacaoDupla", 12)
);

executarTeste(
    "T60 - Rejeitar pontuação negativa",
    false,
    obterResultado("validarPontuacaoDupla", -1)
);

executarTeste(
    "T61 - Rejeitar pontuação acima de 12",
    false,
    obterResultado("validarPontuacaoDupla", 13)
);

executarTeste(
    "T62 - Identificar dupla 1 como vencedora com 12 pontos",
    1,
    obterResultado("determinarVencedorPartida", 12, 8)
);

executarTeste(
    "T63 - Identificar dupla 2 como vencedora com 12 pontos",
    2,
    obterResultado("determinarVencedorPartida", 7, 12)
);

executarTeste(
    "T64 - Não declarar vencedor antes de 12 pontos",
    0,
    obterResultado("determinarVencedorPartida", 8, 9)
);

// GRUPO 9 - VALIDAÇÃO DAS JOGADAS

executarTeste(
    "T65 - Aceitar carta pertencente ao jogador",
    true,
    obterResultado("validarJogada", ["A", "copas"], [["A", "copas"], ["2", "ouros"], ["3", "paus"]])
);

executarTeste(
    "T66 - Rejeitar carta que não pertence ao jogador",
    false,
    obterResultado("validarJogada", ["K", "copas"], [["A", "copas"], ["2", "ouros"], ["3", "paus"]])
);

executarTeste(
    "T67 - Rejeitar jogada sem carta",
    false,
    obterResultado("validarJogada", null, [["A", "copas"], ["2", "ouros"], ["3", "paus"]])
);

executarTeste(
    "T68 - Rejeitar jogada com carta inválida",
    false,
    obterResultado("validarJogada", ["8", "copas"], [["8", "copas"], ["2", "ouros"], ["3", "paus"]])
);

executarTeste(
    "T69 - Aceitar mão com três rodadas",
    true,
    obterResultado("validarMao", [1, 2, 1])
);

executarTeste(
    "T70 - Rejeitar mão com apenas duas rodadas",
    false,
    obterResultado("validarMao", [1, 2])
);

executarTeste(
    "T71 - Rejeitar mão com quatro rodadas",
    false,
    obterResultado("validarMao", [1, 2, 1, 2])
);

executarTeste(
    "T72 - Rejeitar resultado de rodada inválido na mão",
    false,
    obterResultado("validarMao", [1, 3, 2])
);

exibirResumo();