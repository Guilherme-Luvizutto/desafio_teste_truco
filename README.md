# Testes TDD — Truco Paulista

## Sobre o projeto

Este projeto consiste em uma suíte de testes automatizados para o jogo **Truco Paulista**, desenvolvida utilizando JavaScript e Node.js.

O objetivo é aplicar os conceitos de **TDD (Test Driven Development)**, criando casos de teste para verificar as principais regras e funcionalidades do jogo.

A partida considera quatro jogadores, organizados em duas duplas.

## Regras consideradas

- 4 jogadores divididos em 2 duplas.
- Baralho de 40 cartas.
- Cada jogador recebe 3 cartas por mão.
- Valores das cartas: 4, 5, 6, 7, Q, J, K, A, 2 e 3.
- A manilha é definida pela carta seguinte à vira.
- Hierarquia dos naipes das manilhas: ouros, espadas, copas e paus.
- Cada mão começa valendo 1 ponto.
- Os pedidos de Truco podem aumentar o valor para 3, 6, 9 ou 12 pontos.
- A partida termina quando uma dupla alcança 12 pontos.

## Tecnologias utilizadas

- JavaScript
- Node.js

## Organização dos testes

O projeto possui **72 casos de teste**, divididos em 9 grupos:

| Grupo | Casos | Funcionalidade |
|---|---|---|
| 1 | T01–T08 | Validação das cartas |
| 2 | T09–T16 | Validação do baralho |
| 3 | T17–T24 | Jogadores e duplas |
| 4 | T25–T32 | Distribuição das cartas |
| 5 | T33–T40 | Hierarquia das cartas |
| 6 | T41–T48 | Rodadas e vencedor da mão |
| 7 | T49–T56 | Pedido de Truco e pontuação |
| 8 | T57–T64 | Pontuação da partida |
| 9 | T65–T72 | Validação das jogadas |

## Como executar

1. Instale o Node.js.
2. Abra o terminal na pasta do projeto.
3. Execute o comando:

```bash
node truco.test.js
```

## Resultado da execução

Os testes foram executados, totalizando:

- Total: 72
- Aprovados: 0
- Reprovados: 72

As reprovações ocorrem porque a implementação do jogo não foi desenvolvida. O projeto contempla somente os casos de teste, conforme a proposta da atividade.

## Estrutura do projeto

```text
desafio_teste_truco/
├── truco.test.js
└── README.md
```

## Autor

Guilherme Paschoal Luvizutto - RA 24244079-2
