"use client";

import { useEffect, useState } from "react";

interface Atividade {
  id: number;
  dia: string;
  atividade: string;
  horario: string;
  cargaHoraria: string;
}

export default function PlanoDeTrabalhoPage() {
  const [monitor, setMonitor] = useState("");

  const [atividades, setAtividades] = useState<Atividade[]>([
    {
      id: 1,
      dia: "SEGUNDA-FEIRA",
      atividade: "",
      horario: "",
      cargaHoraria: "",
    },
    {
      id: 2,
      dia: "TERÇA-FEIRA",
      atividade: "",
      horario: "",
      cargaHoraria: "",
    },
    {
      id: 3,
      dia: "QUARTA-FEIRA",
      atividade: "",
      horario: "",
      cargaHoraria: "",
    },
    {
      id: 4,
      dia: "QUINTA-FEIRA",
      atividade: "",
      horario: "",
      cargaHoraria: "",
    },
    {
      id: 5,
      dia: "SEXTA-FEIRA",
      atividade: "",
      horario: "",
      cargaHoraria: "",
    },
  ]);

  useEffect(() => {
    const dados = sessionStorage.getItem("anatolab_monitor");

    if (!dados) return;

    try {
      const usuario = JSON.parse(dados);
      setMonitor(usuario.nome || "");
    } catch {
      setMonitor("");
    }
  }, []);

  function atualizarAtividade(
    id: number,
    campo: keyof Atividade,
    valor: string
  ) {
    setAtividades((atual) =>
      atual.map((atividade) =>
        atividade.id === id
          ? { ...atividade, [campo]: valor }
          : atividade
      )
    );
  }

  return (
    <main className="registro-app">
      <header className="registro-topbar no-print">
        <div className="registro-brand">
          <div className="registro-logo">A</div>

          <div>
            <strong>ANATOLAB</strong>
            <span>Plano de Trabalho da Monitoria</span>
          </div>
        </div>

        <div className="registro-acoes">
          <span className="monitor-logado">
            {monitor || "Monitor"}
          </span>

          <button
            className="botao-secundario"
            onClick={() => window.history.back()}
          >
            Voltar
          </button>

          <button
            className="botao-principal"
            onClick={() => window.print()}
          >
            <span>↥</span>
            Gerar PDF
          </button>
        </div>
      </header>

      <div className="registro-editor">
        <div className="editor-titulo no-print">
          <div>
            <span className="status-documento">
              Documento
            </span>

            <h1>Plano de Trabalho da Monitoria</h1>
          </div>

          <span className="formato-documento">
            A4 · 12 pt · Times New Roman
          </span>
        </div>

        <section className="registro-folha">
          <header className="registro-cabecalho">
            <div className="registro-logo-faculdade">
              <img
                src="/logo-faculdade.png"
                alt="Logo da instituição"
              />
            </div>

            <div className="registro-instituicao">
              <strong>
                CENTRO UNIVERSITÁRIO ESTÁCIO DO CEARÁ
              </strong>

              <span>CAMPUS QUIXADÁ – CE</span>

              <span>
                Avenida Jesus Maria e José, S/N, Quadra 40,
                Lote 100 – Jardim dos Monólitos – Quixadá - CE
              </span>

              <span>INSTITUTO DE EDUCAÇÃO MÉDICA</span>

              <span>
                PROGRAMA DE MONITORIA ACADÊMICA EM MEDICINA
              </span>
            </div>
          </header>

          <div className="linha-horizontal" />

          <h2 className="titulo-folha">
            PLANO DE TRABALHO DA MONITORIA
          </h2>

          <p className="subtitulo-folha">
            Planejamento das atividades a serem desenvolvidas
            durante o período de monitoria.
          </p>

          <section className="documento-secao">
            <h3>IDENTIFICAÇÃO</h3>

            <div className="campo-largo">
              <label>Monitor(a)</label>

              <input
                value={monitor}
                onChange={(e) => setMonitor(e.target.value)}
              />
            </div>

            <div className="campo-largo">
              <label>Professor(a) Orientador(a)</label>
              <input />
            </div>

            <div className="campo-largo">
              <label>Disciplina</label>
              <input />
            </div>

            <div className="campo-duplo">
              <div className="campo-largo">
                <label>Período letivo</label>
                <input />
              </div>

              <div className="campo-largo">
                <label>Modalidade de remuneração</label>
                <input />
              </div>
            </div>

            <div className="campo-largo">
              <label>Período de vigência do plano</label>
              <input />
            </div>
          </section>

          <section className="documento-secao">
            <h3>1. METODOLOGIA DE TRABALHO</h3>

            <textarea
              className="campo-texto-grande"
              placeholder="Descreva a metodologia de trabalho da monitoria..."
            />
          </section>

          <section className="documento-secao">
            <h3>2. CRONOGRAMA SEMANAL DE ATIVIDADES</h3>

            <table className="tabela-registro">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Atividade prevista</th>
                  <th>Horário</th>
                  <th>Carga horária</th>
                </tr>
              </thead>

              <tbody>
                {atividades.map((atividade) => (
                  <tr key={atividade.id}>
                    <td>
                      <strong>{atividade.dia}</strong>
                    </td>

                    <td>
                      <textarea
                        value={atividade.atividade}
                        onChange={(e) =>
                          atualizarAtividade(
                            atividade.id,
                            "atividade",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        value={atividade.horario}
                        onChange={(e) =>
                          atualizarAtividade(
                            atividade.id,
                            "horario",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        value={atividade.cargaHoraria}
                        onChange={(e) =>
                          atualizarAtividade(
                            atividade.id,
                            "cargaHoraria",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="documento-secao">
            <h3>
              3. INSTRUMENTOS DE AVALIAÇÃO DA MONITORIA
              PELO(A) ORIENTADOR(A)
            </h3>

            <textarea
              className="campo-texto-grande"
              placeholder="Descreva os instrumentos de avaliação que serão utilizados pelo(a) professor(a) orientador(a)..."
            />
          </section>

          <section className="assinaturas-finais">
            <p>
              Quixadá, _____ de __________________________
              de ______.
            </p>

            <div className="assinaturas-grid">
              <div>
                <div className="linha-assinatura" />

                <strong>Aluno Monitor</strong>

                <span></span>
              </div>

              <div>
                <div className="linha-assinatura" />

                <strong>Professor(a) Orientador(a)</strong>

                <span></span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}