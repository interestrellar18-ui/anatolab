"use client";

import { useEffect, useState } from "react";

type Atividade = {
  data: string;
  descricao: string;
  carga: string;
  semana: string;
};

const atividadesIniciais: Atividade[] = [
  {
    data: "",
    descricao: "",
    carga: "",
    semana: "Semana 1",
  },
  {
    data: "",
    descricao: "",
    carga: "",
    semana: "Semana 2",
  },
  {
    data: "",
    descricao: "",
    carga: "",
    semana: "Semana 3",
  },
  {
    data: "",
    descricao: "",
    carga: "",
    semana: "Semana 4",
  },
  {
    data: "",
    descricao: "",
    carga: "",
    semana: "Semana 5",
  },
];

export default function FrequenciaPage() {
  const [monitor, setMonitor] = useState("");
  const [orientador, setOrientador] = useState("");
  const [disciplina, setDisciplina] = useState("Anatomia II");
  const [periodoLetivo, setPeriodoLetivo] = useState("2026.2");
  const [mesReferencia, setMesReferencia] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [atividades, setAtividades] =
    useState<Atividade[]>(atividadesIniciais);
  const [dataDocumento, setDataDocumento] = useState("");

  useEffect(() => {
    try {
      const dados = sessionStorage.getItem("anatolab_monitor");

      if (dados) {
        const monitorLogado = JSON.parse(dados);
        setMonitor(monitorLogado.nome || "");
      }
    } catch {
      setMonitor("");
    }

    const hoje = new Date();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    setMesReferencia(`${mes}/${ano}`);

    setDataDocumento(
      hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  function atualizarAtividade(
    index: number,
    campo: keyof Atividade,
    valor: string
  ) {
    setAtividades((atual) =>
      atual.map((atividade, i) =>
        i === index
          ? {
              ...atividade,
              [campo]: valor,
            }
          : atividade
      )
    );
  }

  function adicionarAtividade() {
    setAtividades((atual) => [
      ...atual,
      {
        data: "",
        descricao: "",
        carga: "",
        semana: `Semana ${atual.length + 1}`,
      },
    ]);
  }

  function removerAtividade(index: number) {
    setAtividades((atual) => atual.filter((_, i) => i !== index));
  }

  function voltar() {
    window.history.back();
  }

  function gerarPDF() {
    window.print();
  }

  return (
    <main className="registro-app">
      {/* BARRA SUPERIOR — NÃO IMPRIME */}
      <header className="registro-topbar no-print">
        <div className="registro-brand">
          <div className="registro-logo">ANATOLAB</div>

          <div className="registro-brand-text">
            <strong>Registro de Monitoria</strong>
            <span>Frequência mensal</span>
          </div>
        </div>

        <div className="monitor-logado">
          {monitor || "Monitor(a)"}
        </div>

        <div className="registro-acoes">
          <button
            type="button"
            className="botao-secundario"
            onClick={voltar}
          >
            Voltar
          </button>

          <button
            type="button"
            className="botao-principal"
            onClick={gerarPDF}
          >
            Gerar PDF
          </button>
        </div>
      </header>

      {/* ÁREA DO EDITOR */}
      <section className="registro-editor">
        <div className="editor-titulo no-print">
          <div>
            <h1>Relatório de Frequência Mensal</h1>
            <p>
              Preencha os dados abaixo. O documento será formatado para
              impressão em A4.
            </p>
          </div>

          <span className="status-documento">
            Documento editável
          </span>
        </div>

        {/* FOLHA A4 */}
        <article className="registro-folha">
          {/* CABEÇALHO INSTITUCIONAL */}
          <header className="registro-cabecalho">
  <div className="registro-logo-faculdade">
    <img
      src="/logo-faculdade.png"
      alt="Logo da instituição"
    />
  </div>

  <div className="registro-instituicao">
            </div>

            <div className="registro-instituicao">
              <strong>
                CENTRO UNIVERSITÁRIO ESTÁCIO DO CEARÁ – CAMPUS
                QUIXADÁ – CE
              </strong>

              <span>
                Avenida Jesus Maria e José, S/N, Quadra 40, Lote 100 –
                Jardim dos Monólitos – Quixadá - CE
              </span>

              <strong>
                CENTRO UNIVERSITÁRIO ESTÁCIO DO CEARÁ – CAMPUS
                QUIXADÁ - CE
              </strong>

              <strong>INSTITUTO DE EDUCAÇÃO MÉDICA</strong>

              <strong>
                PROGRAMA DE MONITORIA ACADÊMICA EM MEDICINA
              </strong>
            </div>
          </header>

          <div className="linha-horizontal" />

          {/* TÍTULO */}
          <div className="titulo-folha">
            <h2>RELATÓRIO DE FREQUÊNCIA MENSAL</h2>

            <p>
              Este documento deve ser entregue até o 2º dia útil do
              mês, assinado pelo(a) monitor(a) e pelo(a) orientador(a).
            </p>
          </div>

          {/* IDENTIFICAÇÃO */}
          <section className="documento-secao">
            <div className="campo-largo">
              <label>Monitora:</label>

              <input
                type="text"
                value={monitor}
                onChange={(e) => setMonitor(e.target.value)}
              />
            </div>

            <div className="campo-largo">
              <label>Orientador:</label>

              <input
                type="text"
                value={orientador}
                onChange={(e) => setOrientador(e.target.value)}
              />
            </div>

            <div className="campo-largo">
              <label>Disciplina:</label>

              <input
                type="text"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
              />
            </div>

            <div className="campo-duplo">
              <div>
                <label>Período letivo:</label>

                <input
                  type="text"
                  value={periodoLetivo}
                  onChange={(e) =>
                    setPeriodoLetivo(e.target.value)
                  }
                />
              </div>

              <div>
                <label>Mês de referência:</label>

                <input
                  type="text"
                  value={mesReferencia}
                  onChange={(e) =>
                    setMesReferencia(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="campo-largo">
              <label>
                Período de Vigência da Monitoria:
              </label>

              <input
                type="text"
                value={vigencia}
                onChange={(e) => setVigencia(e.target.value)}
                placeholder="Ex.: 01/09/2026 - 30/11/2026"
              />
            </div>
          </section>

          {/* TABELA DE FREQUÊNCIA */}
          <section className="documento-secao">
            <div className="secao-titulo-linha">
              <h3>Registro das atividades</h3>

              <button
                type="button"
                className="botao-adicionar no-print"
                onClick={adicionarAtividade}
              >
                + Adicionar atividade
              </button>
            </div>

            <div className="tabela-container">
              <table className="tabela-registro tabela-frequencia">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição da atividade realizada</th>
                    <th>Carga horária dedicada</th>
                    <th>Semana</th>
                    <th className="coluna-acoes no-print">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {atividades.map((atividade, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={atividade.data}
                          onChange={(e) =>
                            atualizarAtividade(
                              index,
                              "data",
                              e.target.value
                            )
                          }
                          placeholder="dd/mm/aaaa"
                        />
                      </td>

                      <td>
                        <textarea
                          value={atividade.descricao}
                          onChange={(e) =>
                            atualizarAtividade(
                              index,
                              "descricao",
                              e.target.value
                            )
                          }
                          placeholder="Descreva a atividade realizada"
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={atividade.carga}
                          onChange={(e) =>
                            atualizarAtividade(
                              index,
                              "carga",
                              e.target.value
                            )
                          }
                          placeholder="Ex.: 2h"
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={atividade.semana}
                          onChange={(e) =>
                            atualizarAtividade(
                              index,
                              "semana",
                              e.target.value
                            )
                          }
                        />
                      </td>

                      <td className="coluna-acoes no-print">
                        <button
                          type="button"
                          className="botao-excluir"
                          onClick={() =>
                            removerAtividade(index)
                          }
                          title="Excluir atividade"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* DATA E ASSINATURAS */}
          <section className="assinaturas-finais">
            <p className="data-documento">
              Quixadá – CE,{" "}
              <input
                type="text"
                value={dataDocumento}
                onChange={(e) =>
                  setDataDocumento(e.target.value)
                }
              />
              .
            </p>

            <div className="assinaturas-grid">
              <div className="assinatura">
                <div className="linha-assinatura" />

                <strong>Aluno Monitor</strong>
              </div>

              <div className="assinatura">
                <div className="linha-assinatura" />

                <strong>Professor Orientador</strong>
              </div>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}