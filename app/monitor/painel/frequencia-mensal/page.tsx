"use client";

import { useEffect, useState } from "react";

interface Registro {
  id: number;
  data: string;
  descricao: string;
  cargaHoraria: string;
  semana: string;
}

export default function FrequenciaMensal() {
  const [monitor, setMonitor] = useState("");

  const [registros, setRegistros] = useState<Registro[]>([
    {
      id: 1,
      data: "",
      descricao: "",
      cargaHoraria: "",
      semana: "",
    },
  ]);

  useEffect(() => {
    const dados = sessionStorage.getItem("anatolab_monitor");

    if (dados) {
      try {
        const usuario = JSON.parse(dados);
        setMonitor(usuario.nome || "");
      } catch {
        setMonitor("");
      }
    }
  }, []);

  function adicionarRegistro() {
    setRegistros((atual) => [
      ...atual,
      {
        id: Date.now(),
        data: "",
        descricao: "",
        cargaHoraria: "",
        semana: "",
      },
    ]);
  }

  function removerRegistro(id: number) {
    if (registros.length === 1) return;

    setRegistros((atual) =>
      atual.filter((registro) => registro.id !== id)
    );
  }

  function atualizarRegistro(
    id: number,
    campo: keyof Registro,
    valor: string
  ) {
    setRegistros((atual) =>
      atual.map((registro) =>
        registro.id === id
          ? { ...registro, [campo]: valor }
          : registro
      )
    );
  }

  return (
    <main className="documento-app">
      <div className="barra-documento no-print">
        <div>
          <strong>ANATOLAB</strong>
          <span>Relatório de Frequência Mensal</span>
        </div>

        <div className="acoes-documento">
          <span>{monitor || "Monitor"}</span>

          <button onClick={() => window.print()}>
            Imprimir / Salvar PDF
          </button>

          <button onClick={() => window.history.back()}>
            Voltar
          </button>
        </div>
      </div>

      <section className="folha-a4">
        <header className="cabecalho-institucional">
          <div className="logo-container">
            <img
              src="/logo-faculdade.png"
              alt="Logo da instituição"
              className="logo-faculdade"
            />
          </div>

          <div className="identificacao-institucional">
            <p>
              CENTRO UNIVERSITÁRIO ESTÁCIO DO CEARÁ – CAMPUS QUIXADÁ – CE
            </p>

            <p>
              Avenida Jesus Maria e José, S/N, Quadra 40, Lote 100 –
              Jardim dos Monólitos – Quixadá - CE
            </p>

            <p>INSTITUTO DE EDUCAÇÃO MÉDICA</p>

            <p>PROGRAMA DE MONITORIA ACADÊMICA EM MEDICINA</p>
          </div>
        </header>

        <h1 className="titulo-documento">
          RELATÓRIO DE FREQUÊNCIA MENSAL
        </h1>

        <p className="texto-informativo">
          O relatório de frequência mensal deverá ser preenchido pelo(a)
          monitor(a) e encaminhado para assinatura do(a) professor(a)
          orientador(a), conforme o período de monitoria.
        </p>

        <section className="secao-documento">
          <h2>IDENTIFICAÇÃO</h2>

          <div className="campo-documento">
            <label>Monitor(a):</label>
            <input
              type="text"
              value={monitor}
              onChange={(e) => setMonitor(e.target.value)}
            />
          </div>

          <div className="campo-documento">
            <label>Professor(a) Orientador(a):</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Disciplina:</label>
            <input type="text" />
          </div>

          <div className="linha-campos">
            <div className="campo-documento">
              <label>Período:</label>
              <input type="text" />
            </div>

            <div className="campo-documento">
              <label>Mês:</label>
              <input type="text" />
            </div>
          </div>

          <div className="campo-documento">
            <label>Período de vigência da monitoria:</label>
            <input type="text" />
          </div>
        </section>

        <section className="secao-documento">
          <h2>REGISTRO DAS ATIVIDADES</h2>

          <table className="tabela-documento">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição da atividade realizada</th>
                <th>Carga horária dedicada</th>
                <th>Semana</th>
                <th className="no-print">Ação</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id}>
                  <td>
                    <input
                      type="date"
                      value={registro.data}
                      onChange={(e) =>
                        atualizarRegistro(
                          registro.id,
                          "data",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <textarea
                      value={registro.descricao}
                      onChange={(e) =>
                        atualizarRegistro(
                          registro.id,
                          "descricao",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={registro.cargaHoraria}
                      onChange={(e) =>
                        atualizarRegistro(
                          registro.id,
                          "cargaHoraria",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={registro.semana}
                      onChange={(e) =>
                        atualizarRegistro(
                          registro.id,
                          "semana",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="no-print">
                    <button
                      className="botao-remover"
                      onClick={() => removerRegistro(registro.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="botao-adicionar no-print"
            onClick={adicionarRegistro}
          >
            + Adicionar registro
          </button>
        </section>

        <section className="assinaturas-documento">
          <div className="campo-data">
            Quixadá, _____ de __________________________ de ______.
          </div>

          <div className="linha-assinaturas">
            <div>
              <div className="linha-assinatura" />
              <p>Aluno Monitor</p>
            </div>

            <div>
              <div className="linha-assinatura" />
              <p>Professor(a) Orientador(a)</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}