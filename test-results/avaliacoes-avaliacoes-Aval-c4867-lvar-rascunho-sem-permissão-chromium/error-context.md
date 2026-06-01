# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: avaliacoes\avaliacoes.spec.ts >> Avaliações - CRUD >> [TRISTE] Deve mostrar erro ao tentar salvar rascunho sem permissão
- Location: tests\avaliacoes\avaliacoes.spec.ts:164:7

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('heading').filter({ hasText: 'Avaliação Teste 1780325176006' }).first().locator('xpath=ancestor::div[contains(@class, "generic")]').first().getByRole('button', { name: 'Elaborar' }).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - link "Logomarca" [ref=e8] [cursor=pointer]:
          - /url: /
          - img "Logomarca" [ref=e9]
        - generic [ref=e10]:
          - img [ref=e13]
          - generic [ref=e17]:
            - generic [ref=e18]: Colégio Estadual Sra. Melina Lourenço Jimenes
            - generic [ref=e19]: Super Professor
        - generic [ref=e21]:
          - button [ref=e22] [cursor=pointer]:
            - img [ref=e23]
          - generic [ref=e25] [cursor=pointer]:
            - img "avatar" [ref=e26]
            - img [ref=e27]
    - navigation "Main" [ref=e31]:
      - list [ref=e33]:
        - listitem [ref=e34]:
          - link "Dashboard" [ref=e35] [cursor=pointer]:
            - /url: /dashboard
        - listitem [ref=e36]:
          - button "Disciplinas" [ref=e37] [cursor=pointer]:
            - text: Disciplinas
            - img [ref=e38]
        - listitem [ref=e40]:
          - button "Turmas" [ref=e41] [cursor=pointer]:
            - text: Turmas
            - img [ref=e42]
        - listitem [ref=e44]:
          - button "Colaboradores" [ref=e45] [cursor=pointer]:
            - text: Colaboradores
            - img [ref=e46]
        - listitem [ref=e48]:
          - button "Questões" [ref=e49] [cursor=pointer]:
            - text: Questões
            - img [ref=e50]
        - listitem [ref=e52]:
          - link "Avaliações" [ref=e53] [cursor=pointer]:
            - /url: /avaliacoes
        - listitem [ref=e54]:
          - link "Redação" [ref=e55] [cursor=pointer]:
            - /url: /redacoes
        - listitem [ref=e56]:
          - button "Centro de Dados" [ref=e57] [cursor=pointer]:
            - text: Centro de Dados
            - img [ref=e58]
    - main [ref=e60]:
      - generic [ref=e61]:
        - generic [ref=e63]:
          - generic [ref=e64]:
            - heading "Avaliações" [level=1] [ref=e65]
            - link "Avaliações" [ref=e67] [cursor=pointer]:
              - /url: /avaliacoes
          - button "Criar Avaliação" [ref=e71] [cursor=pointer]:
            - img [ref=e72]
            - text: Criar Avaliação
        - generic [ref=e73]:
          - generic [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]: Pesquisar
              - generic [ref=e79]:
                - img [ref=e80]
                - textbox "Pesquisar" [active] [ref=e83]:
                  - /placeholder: Pesquisar avaliações...
                  - text: Avaliação Teste 1780325176006
            - generic [ref=e84]:
              - button "Limpar" [ref=e85] [cursor=pointer]:
                - img [ref=e86]
                - generic [ref=e89]: Limpar
              - button "Aplicar" [ref=e91] [cursor=pointer]:
                - img [ref=e92]
                - generic [ref=e95]: Aplicar
              - button "Filtros" [ref=e96] [cursor=pointer]:
                - generic [ref=e97]: Filtros
                - img [ref=e98]
          - generic [ref=e101]:
            - generic [ref=e105]:
              - heading "Lista de Avaliações" [level=2] [ref=e106]
              - generic [ref=e107]: (22 avaliações encontradas)
            - generic [ref=e111]:
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - heading "#557 - Avaliação Teste 1780325176006 B2" [level=3] [ref=e117]:
                    - text: "#557 - Avaliação Teste 1780325176006"
                    - generic [ref=e119]: B2
                  - generic [ref=e120]:
                    - generic [ref=e121]:
                      - generic [ref=e122]: "Turmas:"
                      - generic [ref=e125]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e126]:
                      - generic [ref=e127]: "Disciplinas (blocos):"
                      - generic [ref=e129]:
                        - generic [ref=e130]: Literatura (OB)
                        - generic [ref=e131]:
                          - generic [ref=e132]: "Q. inseridas: 0 de 1"
                          - img [ref=e134]
                  - generic [ref=e139]:
                    - button "Elaborar" [ref=e141]:
                      - img [ref=e143]
                      - generic [ref=e146]: Elaborar
                    - button "Revisão" [disabled] [ref=e149]:
                      - img [ref=e151]
                      - generic [ref=e154]: Revisão
                    - button "Imprimir" [disabled] [ref=e157]:
                      - img [ref=e159]
                      - generic [ref=e162]: Imprimir
                    - button "Corrigir" [disabled] [ref=e165]:
                      - img [ref=e167]
                      - generic [ref=e170]: Corrigir
                    - button "Concluída" [disabled] [ref=e173]:
                      - img [ref=e175]
                      - generic [ref=e178]: Concluída
                  - generic [ref=e179]:
                    - generic [ref=e180]:
                      - img [ref=e181]
                      - generic [ref=e183]: "Elaboração: 05/06/2026"
                    - generic [ref=e184]:
                      - img [ref=e185]
                      - generic [ref=e187]: "Aplicação: 12/06/2026"
                - generic [ref=e189]:
                  - heading "Ações Rápidas" [level=4] [ref=e190]:
                    - img [ref=e191]
                    - text: Ações Rápidas
                  - generic [ref=e193]:
                    - button "Elaborar" [ref=e195] [cursor=pointer]:
                      - img [ref=e196]
                      - generic [ref=e199]: Elaborar
                    - generic [ref=e200]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e201]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e202]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e203]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e204]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e206]:
                      - img [ref=e207]
                      - generic [ref=e212]: Anular Questão
                    - generic [ref=e213]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e215] [cursor=pointer]:
                      - img [ref=e216]
                      - generic [ref=e220]: Histórico
                  - button "Mais Ações" [ref=e221] [cursor=pointer]:
                    - img [ref=e222]
                    - text: Mais Ações
              - generic [ref=e228]:
                - generic [ref=e229]:
                  - heading "#556 - Avaliação Teste 1780324827808 B2" [level=3] [ref=e231]:
                    - text: "#556 - Avaliação Teste 1780324827808"
                    - generic [ref=e233]: B2
                  - generic [ref=e234]:
                    - generic [ref=e235]:
                      - generic [ref=e236]: "Turmas:"
                      - generic [ref=e239]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e240]:
                      - generic [ref=e241]: "Disciplinas (blocos):"
                      - generic [ref=e243]:
                        - generic [ref=e244]: Literatura (OB)
                        - generic [ref=e245]:
                          - generic [ref=e246]: "Q. inseridas: 0 de 1"
                          - img [ref=e248]
                  - generic [ref=e253]:
                    - button "Elaborar" [ref=e255]:
                      - img [ref=e257]
                      - generic [ref=e260]: Elaborar
                    - button "Revisão" [disabled] [ref=e263]:
                      - img [ref=e265]
                      - generic [ref=e268]: Revisão
                    - button "Imprimir" [disabled] [ref=e271]:
                      - img [ref=e273]
                      - generic [ref=e276]: Imprimir
                    - button "Corrigir" [disabled] [ref=e279]:
                      - img [ref=e281]
                      - generic [ref=e284]: Corrigir
                    - button "Concluída" [disabled] [ref=e287]:
                      - img [ref=e289]
                      - generic [ref=e292]: Concluída
                  - generic [ref=e293]:
                    - generic [ref=e294]:
                      - img [ref=e295]
                      - generic [ref=e297]: "Elaboração: 08/06/2026"
                    - generic [ref=e298]:
                      - img [ref=e299]
                      - generic [ref=e301]: "Aplicação: 15/06/2026"
                - generic [ref=e303]:
                  - heading "Ações Rápidas" [level=4] [ref=e304]:
                    - img [ref=e305]
                    - text: Ações Rápidas
                  - generic [ref=e307]:
                    - button "Elaborar" [ref=e309] [cursor=pointer]:
                      - img [ref=e310]
                      - generic [ref=e313]: Elaborar
                    - generic [ref=e314]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e315]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e316]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e317]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e318]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e320]:
                      - img [ref=e321]
                      - generic [ref=e326]: Anular Questão
                    - generic [ref=e327]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e329] [cursor=pointer]:
                      - img [ref=e330]
                      - generic [ref=e334]: Histórico
                  - button "Mais Ações" [ref=e335] [cursor=pointer]:
                    - img [ref=e336]
                    - text: Mais Ações
              - generic [ref=e342]:
                - generic [ref=e343]:
                  - heading "#555 - Avaliação Teste 1780324768729 B2" [level=3] [ref=e345]:
                    - text: "#555 - Avaliação Teste 1780324768729"
                    - generic [ref=e347]: B2
                  - generic [ref=e348]:
                    - generic [ref=e349]:
                      - generic [ref=e350]: "Turmas:"
                      - generic [ref=e353]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e354]:
                      - generic [ref=e355]: "Disciplinas (blocos):"
                      - generic [ref=e357]:
                        - generic [ref=e358]: Literatura (OB)
                        - generic [ref=e359]:
                          - generic [ref=e360]: "Q. inseridas: 0 de 1"
                          - img [ref=e362]
                  - generic [ref=e367]:
                    - button "Elaborar" [ref=e369]:
                      - img [ref=e371]
                      - generic [ref=e374]: Elaborar
                    - button "Revisão" [disabled] [ref=e377]:
                      - img [ref=e379]
                      - generic [ref=e382]: Revisão
                    - button "Imprimir" [disabled] [ref=e385]:
                      - img [ref=e387]
                      - generic [ref=e390]: Imprimir
                    - button "Corrigir" [disabled] [ref=e393]:
                      - img [ref=e395]
                      - generic [ref=e398]: Corrigir
                    - button "Concluída" [disabled] [ref=e401]:
                      - img [ref=e403]
                      - generic [ref=e406]: Concluída
                  - generic [ref=e407]:
                    - generic [ref=e408]:
                      - img [ref=e409]
                      - generic [ref=e411]: "Elaboração: 05/06/2026"
                    - generic [ref=e412]:
                      - img [ref=e413]
                      - generic [ref=e415]: "Aplicação: 12/06/2026"
                - generic [ref=e417]:
                  - heading "Ações Rápidas" [level=4] [ref=e418]:
                    - img [ref=e419]
                    - text: Ações Rápidas
                  - generic [ref=e421]:
                    - button "Elaborar" [ref=e423] [cursor=pointer]:
                      - img [ref=e424]
                      - generic [ref=e427]: Elaborar
                    - generic [ref=e428]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e429]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e430]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e431]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e432]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e434]:
                      - img [ref=e435]
                      - generic [ref=e440]: Anular Questão
                    - generic [ref=e441]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e443] [cursor=pointer]:
                      - img [ref=e444]
                      - generic [ref=e448]: Histórico
                  - button "Mais Ações" [ref=e449] [cursor=pointer]:
                    - img [ref=e450]
                    - text: Mais Ações
              - generic [ref=e456]:
                - generic [ref=e457]:
                  - heading "#554 - Avaliação Teste 1780324583339 B2" [level=3] [ref=e459]:
                    - text: "#554 - Avaliação Teste 1780324583339"
                    - generic [ref=e461]: B2
                  - generic [ref=e462]:
                    - generic [ref=e463]:
                      - generic [ref=e464]: "Turmas:"
                      - generic [ref=e467]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e468]:
                      - generic [ref=e469]: "Disciplinas (blocos):"
                      - generic [ref=e471]:
                        - generic [ref=e472]: Literatura (OB)
                        - generic [ref=e473]:
                          - generic [ref=e474]: "Q. inseridas: 0 de 1"
                          - img [ref=e476]
                  - generic [ref=e481]:
                    - button "Elaborar" [ref=e483]:
                      - img [ref=e485]
                      - generic [ref=e488]: Elaborar
                    - button "Revisão" [disabled] [ref=e491]:
                      - img [ref=e493]
                      - generic [ref=e496]: Revisão
                    - button "Imprimir" [disabled] [ref=e499]:
                      - img [ref=e501]
                      - generic [ref=e504]: Imprimir
                    - button "Corrigir" [disabled] [ref=e507]:
                      - img [ref=e509]
                      - generic [ref=e512]: Corrigir
                    - button "Concluída" [disabled] [ref=e515]:
                      - img [ref=e517]
                      - generic [ref=e520]: Concluída
                  - generic [ref=e521]:
                    - generic [ref=e522]:
                      - img [ref=e523]
                      - generic [ref=e525]: "Elaboração: 05/06/2026"
                    - generic [ref=e526]:
                      - img [ref=e527]
                      - generic [ref=e529]: "Aplicação: 12/06/2026"
                - generic [ref=e531]:
                  - heading "Ações Rápidas" [level=4] [ref=e532]:
                    - img [ref=e533]
                    - text: Ações Rápidas
                  - generic [ref=e535]:
                    - button "Elaborar" [ref=e537] [cursor=pointer]:
                      - img [ref=e538]
                      - generic [ref=e541]: Elaborar
                    - generic [ref=e542]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e543]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e544]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e545]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e546]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e548]:
                      - img [ref=e549]
                      - generic [ref=e554]: Anular Questão
                    - generic [ref=e555]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e557] [cursor=pointer]:
                      - img [ref=e558]
                      - generic [ref=e562]: Histórico
                  - button "Mais Ações" [ref=e563] [cursor=pointer]:
                    - img [ref=e564]
                    - text: Mais Ações
              - generic [ref=e570]:
                - generic [ref=e571]:
                  - heading "#553 - Avaliação Teste 1780324583339 B2" [level=3] [ref=e573]:
                    - text: "#553 - Avaliação Teste 1780324583339"
                    - generic [ref=e575]: B2
                  - generic [ref=e576]:
                    - generic [ref=e577]:
                      - generic [ref=e578]: "Turmas:"
                      - generic [ref=e581]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e582]:
                      - generic [ref=e583]: "Disciplinas (blocos):"
                      - generic [ref=e585]:
                        - generic [ref=e586]: Literatura (OB)
                        - generic [ref=e587]:
                          - generic [ref=e588]: "Q. inseridas: 0 de 1"
                          - img [ref=e590]
                  - generic [ref=e595]:
                    - button "Elaborar" [ref=e597]:
                      - img [ref=e599]
                      - generic [ref=e602]: Elaborar
                    - button "Revisão" [disabled] [ref=e605]:
                      - img [ref=e607]
                      - generic [ref=e610]: Revisão
                    - button "Imprimir" [disabled] [ref=e613]:
                      - img [ref=e615]
                      - generic [ref=e618]: Imprimir
                    - button "Corrigir" [disabled] [ref=e621]:
                      - img [ref=e623]
                      - generic [ref=e626]: Corrigir
                    - button "Concluída" [disabled] [ref=e629]:
                      - img [ref=e631]
                      - generic [ref=e634]: Concluída
                  - generic [ref=e635]:
                    - generic [ref=e636]:
                      - img [ref=e637]
                      - generic [ref=e639]: "Elaboração: 05/06/2026"
                    - generic [ref=e640]:
                      - img [ref=e641]
                      - generic [ref=e643]: "Aplicação: 12/06/2026"
                - generic [ref=e645]:
                  - heading "Ações Rápidas" [level=4] [ref=e646]:
                    - img [ref=e647]
                    - text: Ações Rápidas
                  - generic [ref=e649]:
                    - button "Elaborar" [ref=e651] [cursor=pointer]:
                      - img [ref=e652]
                      - generic [ref=e655]: Elaborar
                    - generic [ref=e656]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e657]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e658]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e659]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e660]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e662]:
                      - img [ref=e663]
                      - generic [ref=e668]: Anular Questão
                    - generic [ref=e669]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e671] [cursor=pointer]:
                      - img [ref=e672]
                      - generic [ref=e676]: Histórico
                  - button "Mais Ações" [ref=e677] [cursor=pointer]:
                    - img [ref=e678]
                    - text: Mais Ações
              - generic [ref=e684]:
                - generic [ref=e685]:
                  - heading "#552 - Avaliação Teste 1780324432048 B2" [level=3] [ref=e687]:
                    - text: "#552 - Avaliação Teste 1780324432048"
                    - generic [ref=e689]: B2
                  - generic [ref=e690]:
                    - generic [ref=e691]:
                      - generic [ref=e692]: "Turmas:"
                      - generic [ref=e695]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e696]:
                      - generic [ref=e697]: "Disciplinas (blocos):"
                      - generic [ref=e699]:
                        - generic [ref=e700]: Literatura (OB)
                        - generic [ref=e701]:
                          - generic [ref=e702]: "Q. inseridas: 0 de 1"
                          - img [ref=e704]
                  - generic [ref=e709]:
                    - button "Elaborar" [ref=e711]:
                      - img [ref=e713]
                      - generic [ref=e716]: Elaborar
                    - button "Revisão" [disabled] [ref=e719]:
                      - img [ref=e721]
                      - generic [ref=e724]: Revisão
                    - button "Imprimir" [disabled] [ref=e727]:
                      - img [ref=e729]
                      - generic [ref=e732]: Imprimir
                    - button "Corrigir" [disabled] [ref=e735]:
                      - img [ref=e737]
                      - generic [ref=e740]: Corrigir
                    - button "Concluída" [disabled] [ref=e743]:
                      - img [ref=e745]
                      - generic [ref=e748]: Concluída
                  - generic [ref=e749]:
                    - generic [ref=e750]:
                      - img [ref=e751]
                      - generic [ref=e753]: "Elaboração: 05/06/2026"
                    - generic [ref=e754]:
                      - img [ref=e755]
                      - generic [ref=e757]: "Aplicação: 12/06/2026"
                - generic [ref=e759]:
                  - heading "Ações Rápidas" [level=4] [ref=e760]:
                    - img [ref=e761]
                    - text: Ações Rápidas
                  - generic [ref=e763]:
                    - button "Elaborar" [ref=e765] [cursor=pointer]:
                      - img [ref=e766]
                      - generic [ref=e769]: Elaborar
                    - generic [ref=e770]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e771]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e772]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e773]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e774]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e776]:
                      - img [ref=e777]
                      - generic [ref=e782]: Anular Questão
                    - generic [ref=e783]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e785] [cursor=pointer]:
                      - img [ref=e786]
                      - generic [ref=e790]: Histórico
                  - button "Mais Ações" [ref=e791] [cursor=pointer]:
                    - img [ref=e792]
                    - text: Mais Ações
              - generic [ref=e798]:
                - generic [ref=e799]:
                  - heading "#551 - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" [level=3] [ref=e801]
                  - generic [ref=e802]:
                    - generic [ref=e803]:
                      - generic [ref=e804]: "Turmas:"
                      - generic [ref=e807]: "4º teste para vc ver | curso-1779538808961 | Integral | 2025 | #186"
                    - generic [ref=e808]:
                      - generic [ref=e809]: "Disciplinas (blocos):"
                      - generic [ref=e811]:
                        - generic [ref=e812]: Literatura (OB)
                        - generic [ref=e813]:
                          - generic [ref=e814]: "Q. inseridas: 0 de 10"
                          - img [ref=e816]
                  - generic [ref=e821]:
                    - button "Elaborar" [ref=e823]:
                      - img [ref=e825]
                      - generic [ref=e828]: Elaborar
                    - button "Revisão" [disabled] [ref=e831]:
                      - img [ref=e833]
                      - generic [ref=e836]: Revisão
                    - button "Imprimir" [disabled] [ref=e839]:
                      - img [ref=e841]
                      - generic [ref=e844]: Imprimir
                    - button "Corrigir" [disabled] [ref=e847]:
                      - img [ref=e849]
                      - generic [ref=e852]: Corrigir
                    - button "Concluída" [disabled] [ref=e855]:
                      - img [ref=e857]
                      - generic [ref=e860]: Concluída
                  - generic [ref=e861]:
                    - generic [ref=e862]:
                      - img [ref=e863]
                      - generic [ref=e865]: "Elaboração: Não definida"
                    - generic [ref=e866]:
                      - img [ref=e867]
                      - generic [ref=e869]: "Aplicação: Não definida"
                - generic [ref=e871]:
                  - heading "Ações Rápidas" [level=4] [ref=e872]:
                    - img [ref=e873]
                    - text: Ações Rápidas
                  - generic [ref=e875]:
                    - generic [ref=e876]:
                      - button "Elaborar" [disabled]:
                        - img
                        - generic: Elaborar
                    - generic [ref=e877]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e878]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e879]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e880]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e881]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e883]:
                      - img [ref=e884]
                      - generic [ref=e889]: Anular Questão
                    - generic [ref=e890]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e892] [cursor=pointer]:
                      - img [ref=e893]
                      - generic [ref=e897]: Histórico
                  - button "Mais Ações" [ref=e898] [cursor=pointer]:
                    - img [ref=e899]
                    - text: Mais Ações
              - generic [ref=e905]:
                - generic [ref=e906]:
                  - heading "#550 - aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" [level=3] [ref=e908]
                  - generic [ref=e909]:
                    - generic [ref=e910]:
                      - generic [ref=e911]: "Turmas:"
                      - generic [ref=e914]: "4º teste para vc ver | curso-1779538808961 | Integral | 2025 | #186"
                    - generic [ref=e915]:
                      - generic [ref=e916]: "Disciplinas (blocos):"
                      - generic [ref=e918]:
                        - generic [ref=e919]: Literatura (OB)
                        - generic [ref=e920]:
                          - generic [ref=e921]: "Q. inseridas: 0 de 10"
                          - img [ref=e923]
                  - generic [ref=e928]:
                    - button "Elaborar" [ref=e930]:
                      - img [ref=e932]
                      - generic [ref=e935]: Elaborar
                    - button "Revisão" [disabled] [ref=e938]:
                      - img [ref=e940]
                      - generic [ref=e943]: Revisão
                    - button "Imprimir" [disabled] [ref=e946]:
                      - img [ref=e948]
                      - generic [ref=e951]: Imprimir
                    - button "Corrigir" [disabled] [ref=e954]:
                      - img [ref=e956]
                      - generic [ref=e959]: Corrigir
                    - button "Concluída" [disabled] [ref=e962]:
                      - img [ref=e964]
                      - generic [ref=e967]: Concluída
                  - generic [ref=e968]:
                    - generic [ref=e969]:
                      - img [ref=e970]
                      - generic [ref=e972]: "Elaboração: Não definida"
                    - generic [ref=e973]:
                      - img [ref=e974]
                      - generic [ref=e976]: "Aplicação: Não definida"
                - generic [ref=e978]:
                  - heading "Ações Rápidas" [level=4] [ref=e979]:
                    - img [ref=e980]
                    - text: Ações Rápidas
                  - generic [ref=e982]:
                    - generic [ref=e983]:
                      - button "Elaborar" [disabled]:
                        - img
                        - generic: Elaborar
                    - generic [ref=e984]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e985]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e986]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e987]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e988]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e990]:
                      - img [ref=e991]
                      - generic [ref=e996]: Anular Questão
                    - generic [ref=e997]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e999] [cursor=pointer]:
                      - img [ref=e1000]
                      - generic [ref=e1004]: Histórico
                  - button "Mais Ações" [ref=e1005] [cursor=pointer]:
                    - img [ref=e1006]
                    - text: Mais Ações
              - generic [ref=e1012]:
                - generic [ref=e1013]:
                  - heading "#549 - teste20 B2 AVB" [level=3] [ref=e1015]:
                    - text: "#549 - teste20"
                    - generic [ref=e1016]:
                      - generic [ref=e1017]: B2
                      - generic [ref=e1018]: AVB
                  - generic [ref=e1019]:
                    - generic [ref=e1020]:
                      - generic [ref=e1021]: "Turmas:"
                      - generic [ref=e1024]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e1025]:
                      - generic [ref=e1026]: "Disciplinas (blocos):"
                      - generic [ref=e1027]:
                        - generic [ref=e1028]:
                          - generic [ref=e1029]: Literatura (OB)
                          - generic [ref=e1030]:
                            - generic [ref=e1031]: "Q. inseridas: 0 de 1"
                            - img [ref=e1033]
                        - generic [ref=e1035]:
                          - generic [ref=e1036]: Literatura (OB)
                          - generic [ref=e1037]:
                            - generic [ref=e1038]: "Q. inseridas: 0 de 1"
                            - img [ref=e1040]
                  - generic [ref=e1045]:
                    - button "Elaborar" [ref=e1047]:
                      - img [ref=e1049]
                      - generic [ref=e1052]: Elaborar
                    - button "Revisão" [disabled] [ref=e1055]:
                      - img [ref=e1057]
                      - generic [ref=e1060]: Revisão
                    - button "Imprimir" [disabled] [ref=e1063]:
                      - img [ref=e1065]
                      - generic [ref=e1068]: Imprimir
                    - button "Corrigir" [disabled] [ref=e1071]:
                      - img [ref=e1073]
                      - generic [ref=e1076]: Corrigir
                    - button "Concluída" [disabled] [ref=e1079]:
                      - img [ref=e1081]
                      - generic [ref=e1084]: Concluída
                  - generic [ref=e1085]:
                    - generic [ref=e1086]:
                      - img [ref=e1087]
                      - generic [ref=e1089]: "Elaboração: 16/06/2026"
                    - generic [ref=e1090]:
                      - img [ref=e1091]
                      - generic [ref=e1093]: "Aplicação: 23/06/2026"
                - generic [ref=e1095]:
                  - heading "Ações Rápidas" [level=4] [ref=e1096]:
                    - img [ref=e1097]
                    - text: Ações Rápidas
                  - generic [ref=e1099]:
                    - generic [ref=e1100]:
                      - button "Elaborar" [disabled]:
                        - img
                        - generic: Elaborar
                    - generic [ref=e1101]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e1102]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e1103]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e1104]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e1105]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e1107]:
                      - img [ref=e1108]
                      - generic [ref=e1113]: Anular Questão
                    - generic [ref=e1114]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e1116] [cursor=pointer]:
                      - img [ref=e1117]
                      - generic [ref=e1121]: Histórico
                  - button "Mais Ações" [ref=e1122] [cursor=pointer]:
                    - img [ref=e1123]
                    - text: Mais Ações
              - generic [ref=e1129]:
                - generic [ref=e1130]:
                  - heading "#548 - teste5 B2 AVB" [level=3] [ref=e1132]:
                    - text: "#548 - teste5"
                    - generic [ref=e1133]:
                      - generic [ref=e1134]: B2
                      - generic [ref=e1135]: AVB
                  - generic [ref=e1136]:
                    - generic [ref=e1137]:
                      - generic [ref=e1138]: "Turmas:"
                      - generic [ref=e1141]: "6º ABC | curso-1780063364085 | Vespertino | 2026 | #183"
                    - generic [ref=e1142]:
                      - generic [ref=e1143]: "Disciplinas (blocos):"
                      - generic [ref=e1144]:
                        - generic [ref=e1145]:
                          - generic [ref=e1146]: Biologia (OB)
                          - generic [ref=e1147]:
                            - generic [ref=e1148]: "Q. inseridas: 0 de 1"
                            - img [ref=e1150]
                        - generic [ref=e1152]:
                          - generic [ref=e1153]: Filosofia (OB)
                          - generic [ref=e1154]:
                            - generic [ref=e1155]: "Q. inseridas: 0 de 1"
                            - img [ref=e1157]
                  - generic [ref=e1162]:
                    - button "Elaborar" [ref=e1164]:
                      - img [ref=e1166]
                      - generic [ref=e1169]: Elaborar
                    - button "Revisão" [disabled] [ref=e1172]:
                      - img [ref=e1174]
                      - generic [ref=e1177]: Revisão
                    - button "Imprimir" [disabled] [ref=e1180]:
                      - img [ref=e1182]
                      - generic [ref=e1185]: Imprimir
                    - button "Corrigir" [disabled] [ref=e1188]:
                      - img [ref=e1190]
                      - generic [ref=e1193]: Corrigir
                    - button "Concluída" [disabled] [ref=e1196]:
                      - img [ref=e1198]
                      - generic [ref=e1201]: Concluída
                  - generic [ref=e1202]:
                    - generic [ref=e1203]:
                      - img [ref=e1204]
                      - generic [ref=e1206]: "Elaboração: 08/06/2026"
                    - generic [ref=e1207]:
                      - img [ref=e1208]
                      - generic [ref=e1210]: "Aplicação: 15/06/2026"
                - generic [ref=e1212]:
                  - heading "Ações Rápidas" [level=4] [ref=e1213]:
                    - img [ref=e1214]
                    - text: Ações Rápidas
                  - generic [ref=e1216]:
                    - button "Elaborar" [ref=e1218] [cursor=pointer]:
                      - img [ref=e1219]
                      - generic [ref=e1222]: Elaborar
                    - generic [ref=e1223]:
                      - button "Ver Avaliações" [disabled]:
                        - img
                        - generic: Ver Avaliações
                    - generic [ref=e1224]:
                      - button "Folha Resposta" [disabled]:
                        - img
                        - generic: Folha Resposta
                    - generic [ref=e1225]:
                      - button "Ver Gabarito" [disabled]:
                        - img
                        - generic: Ver Gabarito
                    - generic [ref=e1226]:
                      - button "Corrigir" [disabled]:
                        - img
                        - generic: Corrigir
                    - generic [ref=e1227]:
                      - button "Ver Notas" [disabled]:
                        - img
                        - generic: Ver Notas
                    - button "Anular Questão" [disabled] [ref=e1229]:
                      - img [ref=e1230]
                      - generic [ref=e1235]: Anular Questão
                    - generic [ref=e1236]:
                      - button "Relatório" [disabled]:
                        - img
                        - generic: Relatório
                    - button "Histórico" [ref=e1238] [cursor=pointer]:
                      - img [ref=e1239]
                      - generic [ref=e1243]: Histórico
                  - button "Mais Ações" [ref=e1244] [cursor=pointer]:
                    - img [ref=e1245]
                    - text: Mais Ações
            - generic [ref=e1250]:
              - generic [ref=e1251]:
                - generic [ref=e1252]: Registros por página
                - combobox [ref=e1253]:
                  - generic: "10"
                  - img [ref=e1254]
              - generic [ref=e1256]:
                - generic [ref=e1257]: 1 - 10 de 22
                - generic [ref=e1258]:
                  - button "Ir para página anterior" [disabled]:
                    - generic: Ir para página anterior
                    - img
                  - button "1" [disabled]
                  - button "2" [ref=e1259] [cursor=pointer]
                  - button "3" [ref=e1260] [cursor=pointer]
                  - button "Ir para próxima página" [ref=e1261] [cursor=pointer]:
                    - generic [ref=e1262]: Ir para próxima página
                    - img [ref=e1263]
  - region "Notifications alt+T"
  - alert [ref=e1265]
```

# Test source

```ts
  94  |     const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
  95  |     await searchBox.click();
  96  |     await searchBox.fill(descricao);
  97  |     await page.waitForTimeout(1500);
  98  |     
  99  |     // Edita a avaliação
  100 |     await avaliacoesPage.editarAvaliacao(descricao, novaData);
  101 |     
  102 |     // Aguarda a confirmação e volta para listagem
  103 |     await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  104 |     await page.waitForTimeout(2000);
  105 |     
  106 |     // Procura novamente pela avaliação na listagem
  107 |     await searchBox.click();
  108 |     await searchBox.fill(descricao);
  109 |     await page.waitForTimeout(1500);
  110 |     
  111 |     // Verifica se a avaliação ainda está lá (editada)
  112 |     const avaliacaoHeading = page.getByRole('heading').filter({ hasText: descricao }).first();
  113 |     const isVisible = await avaliacaoHeading.isVisible().catch(() => false);
  114 |     expect(isVisible).toBe(true);
  115 |   });
  116 | 
  117 |   // ❌ CASOS INFELIZES (Sad Path)
  118 |   test('[TRISTE] Deve mostrar erro ao tentar criar avaliação sem descrição', async ({ page }) => {
  119 |     // Clica em Criar Avaliação
  120 |     await avaliacoesPage.criarAvaliacaoButton.click();
  121 |     await page.waitForTimeout(1000);
  122 |     
  123 |     // Tenta salvar sem preencher a descrição (campo obrigatório)
  124 |     // Seleciona turma
  125 |     await avaliacoesPage.selecionarTurmasButton.click();
  126 |     await page.waitForTimeout(500);
  127 |     const turmaOption = page.getByRole('option').filter({ hasText: '6º' }).first();
  128 |     await turmaOption.click();
  129 |     await page.waitForTimeout(500);
  130 |     
  131 |     // Seleciona marcador
  132 |     await avaliacoesPage.selecionarMarcadoresButton.click();
  133 |     await page.waitForTimeout(500);
  134 |     const marcadorOption = page.getByRole('option', { name: '2º Bimestre' });
  135 |     await marcadorOption.click();
  136 |     await page.waitForTimeout(500);
  137 |     
  138 |     // Preenche data
  139 |     await avaliacoesPage.dataAplicacaoInput.click();
  140 |     await avaliacoesPage.dataAplicacaoInput.fill('12/06/2026');
  141 |     await page.waitForTimeout(500);
  142 |     
  143 |     // Seleciona modo
  144 |     await avaliacoesPage.modoSelect.click();
  145 |     await page.waitForTimeout(300);
  146 |     const modoOption = page.getByRole('option', { name: 'Convencional' });
  147 |     await modoOption.click();
  148 |     await page.waitForTimeout(500);
  149 |     
  150 |     // Tenta salvar sem descrição
  151 |     await avaliacoesPage.salvarAvaliacaoButton.click();
  152 |     await page.waitForTimeout(1000);
  153 |     
  154 |     // Verifica se há erro (mensagem de validação ou permanece na página)
  155 |     const errorMessage = page.locator('[role="alert"]').first();
  156 |     const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
  157 |     
  158 |     // Ou verifica se ainda está na página de criação (não salvou)
  159 |     const criarButton = await avaliacoesPage.criarAvaliacaoButton.isVisible({ timeout: 2000 }).catch(() => false);
  160 |     
  161 |     expect(hasError || !criarButton).toBe(true);
  162 |   });
  163 | 
  164 |   test('[TRISTE] Deve mostrar erro ao tentar salvar rascunho sem permissão', async ({ page }) => {
  165 |     const descricao = `Avaliação Teste ${Date.now()}`;
  166 |     const dataAplicacao = '12/06/2026';
  167 |     
  168 |     // Cria a avaliação normalmente
  169 |     await avaliacoesPage.criarAvaliacao(
  170 |       descricao,
  171 |       '6º',
  172 |       '2º Bimestre',
  173 |       dataAplicacao,
  174 |       'Convencional'
  175 |     );
  176 |     
  177 |     // Aguarda redirecionamento
  178 |     await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  179 |     await page.waitForTimeout(2000);
  180 |     
  181 |     // Procura pela avaliação
  182 |     const searchBox = page.getByRole('textbox', { name: 'Pesquisar' });
  183 |     await searchBox.click();
  184 |     await searchBox.fill(descricao);
  185 |     await page.waitForTimeout(1500);
  186 |     
  187 |     // Encontra a avaliação no heading e pega o card correspondente
  188 |     const avaliacaoHeading = page.getByRole('heading').filter({ hasText: descricao }).first();
  189 |     await avaliacaoHeading.waitFor({ state: 'visible', timeout: 5000 });
  190 |     
  191 |     // Procura pelo botão "Elaborar" mais próximo do heading encontrado
  192 |     const cardParent = avaliacaoHeading.locator('xpath=ancestor::div[contains(@class, "generic")]').first();
  193 |     const elaborarButton = cardParent.getByRole('button', { name: 'Elaborar' }).first();
> 194 |     await elaborarButton.click();
      |                          ^ Error: locator.click: Test timeout of 120000ms exceeded.
  195 |     
  196 |     // Aguarda o carregamento da página de elaboração
  197 |     await page.waitForLoadState('networkidle').catch(() => {});
  198 |     await page.waitForTimeout(2000);
  199 |     
  200 |     // Verifica se conseguiu entrar na página de elaboração (se não há erro de acesso)
  201 |     const pageHeading = page.getByRole('heading', { level: 1 }).first();
  202 |     const hasHeading = await pageHeading.isVisible({ timeout: 3000 }).catch(() => false);
  203 |     
  204 |     if (!hasHeading) {
  205 |       // Se não conseguiu carregar a página, é porque não tem permissão
  206 |       expect(true).toBe(true); // Teste passa - acesso negado é o esperado
  207 |       return;
  208 |     }
  209 |     
  210 |     // Se conseguiu carregar, tenta salvar rascunho
  211 |     const salvarRascunhoButton = page.getByRole('button', { name: 'Salvar rascunho da prova' });
  212 |     const isDisabled = await salvarRascunhoButton.isDisabled().catch(() => true);
  213 |     const isVisible = await salvarRascunhoButton.isVisible({ timeout: 3000 }).catch(() => false);
  214 |     
  215 |     // Verifica se o botão está desabilitado ou gera erro ao clicar
  216 |     if (isVisible && !isDisabled) {
  217 |       await salvarRascunhoButton.click();
  218 |       await page.waitForTimeout(1000);
  219 |       
  220 |       const errorMessage = page.locator('[role="alert"]').first();
  221 |       const hasError = await errorMessage.isVisible({ timeout: 3000 }).catch(() => false);
  222 |       expect(hasError).toBe(true);
  223 |     } else {
  224 |       // Botão desabilitado ou não encontrado é esperado
  225 |       expect(isDisabled || !isVisible).toBe(true);
  226 |     }
  227 |   });
  228 | 
  229 |   // 🔲 CASOS DE BORDA (Edge Cases)
  230 |   test('[BORDA] Deve detectar injeção de script JS na descrição', async ({ page }) => {
  231 |     const descricaoComScript = '<script>alert("xss")</script>';
  232 |     const dataAplicacao = '12/06/2026';
  233 |     
  234 |     // Tenta criar com script no descrição
  235 |     await avaliacoesPage.criarAvaliacaoButton.click();
  236 |     await page.waitForTimeout(1000);
  237 |     
  238 |     // Preenche com script
  239 |     await avaliacoesPage.descricaoInput.waitFor({ state: 'visible', timeout: 10000 });
  240 |     await avaliacoesPage.descricaoInput.fill(descricaoComScript);
  241 |     await page.waitForTimeout(500);
  242 |     
  243 |     // Seleciona turma
  244 |     await avaliacoesPage.selecionarTurmasButton.click();
  245 |     await page.waitForTimeout(500);
  246 |     const turmaOption = page.getByRole('option').filter({ hasText: '6º' }).first();
  247 |     await turmaOption.click();
  248 |     await page.waitForTimeout(500);
  249 |     
  250 |     // Seleciona marcador
  251 |     await avaliacoesPage.selecionarMarcadoresButton.click();
  252 |     await page.waitForTimeout(500);
  253 |     const marcadorOption = page.getByRole('option', { name: '2º Bimestre' });
  254 |     await marcadorOption.click();
  255 |     await page.waitForTimeout(500);
  256 |     
  257 |     // Preenche data
  258 |     await avaliacoesPage.dataAplicacaoInput.click();
  259 |     await avaliacoesPage.dataAplicacaoInput.fill(dataAplicacao);
  260 |     await page.waitForTimeout(500);
  261 |     
  262 |     // Seleciona modo
  263 |     await avaliacoesPage.modoSelect.click();
  264 |     await page.waitForTimeout(300);
  265 |     const modoOption = page.getByRole('option', { name: 'Convencional' });
  266 |     await modoOption.click();
  267 |     await page.waitForTimeout(500);
  268 |     
  269 |     // Preenche bloco objetivo
  270 |     const professorButton = page.getByLabel('Bloco objetivo 1').getByRole('button').filter({ hasText: 'Professor' }).first();
  271 |     await professorButton.click();
  272 |     await page.waitForTimeout(500);
  273 |     const primeiroProf = page.getByRole('option').first();
  274 |     await primeiroProf.click();
  275 |     await page.waitForTimeout(500);
  276 |     
  277 |     const disciplinaSelect = page.getByRole('combobox', { name: /Selecionar disciplina para Bloco objetivo/ }).first();
  278 |     await disciplinaSelect.click();
  279 |     await page.waitForTimeout(500);
  280 |     const primeiraDisciplina = page.getByRole('option').first();
  281 |     await primeiraDisciplina.click();
  282 |     await page.waitForTimeout(500);
  283 |     
  284 |     // Tenta salvar
  285 |     await avaliacoesPage.salvarAvaliacaoButton.click();
  286 |     await page.waitForTimeout(1000);
  287 |     
  288 |     // Verifica se há erro de validação
  289 |     const errorMessage = page.locator('[role="alert"]').first();
  290 |     const hasError = await errorMessage.isVisible({ timeout: 5000 }).catch(() => false);
  291 |     
  292 |     // Ou verifica se ainda está na página (não salvou)
  293 |     const descricaoInput = await avaliacoesPage.descricaoInput.isVisible({ timeout: 2000 }).catch(() => false);
  294 |     
```