"use client";

import { useEffect, useState } from "react";

interface Semana {
  id: number;
  semana: string;
  atividade: string;
  cargaHoraria: string;
}

export default function RelatorioFinal() {
  const [monitor, setMonitor] = useState("");

  const [semanas, setSemanas] = useState<Semana[]>([
    {
      id: 1,
      semana: "",
      atividade: "",
      cargaHoraria: "",
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

  function adicionarSemana() {
    setSemanas((atual) => [
      ...atual,
      {
        id: Date.now(),
        semana: "",
        atividade: "",
        cargaHoraria: "",
      },
    ]);
  }

  function removerSemana(id: number) {
    if (semanas.length === 1) return;

    setSemanas((atual) =>
      atual.filter((semana) => semana.id !== id)
    );
  }

  function atualizarSemana(
    id: number,
    campo: keyof Semana,
    valor: string
  ) {
    setSemanas((atual) =>
      atual.map((semana) =>
        semana.id === id
          ? { ...semana, [campo]: valor }
          : semana
      )
    );
  }

  return (
    <main className="documento-app">
      <div className="barra-documento no-print">
        <div>
          <strong>ANATOLAB</strong>
          <span>Relatório Final de Monitoria</span>
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

        <div className="capa-relatorio">
          <h1 className="titulo-documento">
            RELATÓRIO FINAL DE MONITORIA
          </h1>

          <div className="campo-documento">
            <label>Nome completo do(a) monitor(a):</label>
            <input
              type="text"
              value={monitor}
              onChange={(e) => setMonitor(e.target.value)}
            />
          </div>

          <div className="campo-documento">
            <label>Matrícula:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Professor(a) Orientador(a):</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Curso:</label>
            <input type="text" value="Medicina" readOnly />
          </div>

          <div className="campo-documento">
            <label>Semestre:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Turmas assistidas:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Período da monitoria:</label>
            <input type="text" />
          </div>
        </div>

        <section className="secao-documento quebra-pagina">
          <h2>DADOS DE IDENTIFICAÇÃO</h2>

          <div className="campo-documento">
            <label>Nome do(a) monitor(a):</label>
            <input type="text" value={monitor} readOnly />
          </div>

          <div className="campo-documento">
            <label>Disciplina:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Modalidade:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Período:</label>
            <input type="text" />
          </div>

          <div className="campo-documento">
            <label>Instituição:</label>
            <input
              type="text"
              value="Centro Universitário Estácio do Ceará – Campus Quixadá – CE"
              readOnly
            />
          </div>

          <div className="campo-documento">
            <label>Professor(a) Orientador(a):</label>
            <input type="text" />
          </div>
        </section>

        <section className="secao-documento">
          <h2>1. INTRODUÇÃO</h2>

          <textarea
            className="textarea-relatorio"
            placeholder="Apresente a monitoria, a disciplina, sua importância e os objetivos desenvolvidos durante o período..."
          />
        </section>

        <section className="secao-documento">
          <h2>2. DESENVOLVIMENTO</h2>

          <h3>2.1 Período de realização da monitoria</h3>

          <textarea
            className="textarea-medio"
            placeholder="Informe o período de realização da monitoria..."
          />

          <h3>2.2 Carga horária semanal</h3>

          <table className="tabela-documento">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Atividade realizada</th>
                <th>Carga horária</th>
                <th className="no-print">Ação</th>
              </tr>
            </thead>

            <tbody>
              {semanas.map((semana) => (
                <tr key={semana.id}>
                  <td>
                    <input
                      type="text"
                      value={semana.semana}
                      onChange={(e) =>
                        atualizarSemana(
                          semana.id,
                          "semana",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <textarea
                      value={semana.atividade}
                      onChange={(e) =>
                        atualizarSemana(
                          semana.id,
                          "atividade",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={semana.cargaHoraria}
                      onChange={(e) =>
                        atualizarSemana(
                          semana.id,
                          "cargaHoraria",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="no-print">
                    <button
                      className="botao-remover"
                      onClick={() => removerSemana(semana.id)}
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
            onClick={adicionarSemana}
          >
            + Adicionar semana
          </button>

          <h3>2.3 Atividades desenvolvidas</h3>

          <textarea
            className="textarea-grande"
            placeholder="Descreva detalhadamente as atividades desenvolvidas..."
          />

          <h3>2.4 Atividades planejadas e não desenvolvidas</h3>

          <textarea
            className="textarea-grande"
            placeholder="Informe as atividades que estavam previstas, mas não foram desenvolvidas, se houver..."
          />

          <h3>2.5 Atividades não planejadas e desenvolvidas</h3>

          <textarea
            className="textarea-grande"
            placeholder="Informe as atividades realizadas que não estavam inicialmente planejadas, se houver..."
          />

          <h3>2.6 Dificuldades encontradas</h3>

          <textarea
            className="textarea-grande"
            placeholder="Descreva as principais dificuldades encontradas durante a monitoria..."
          />
        </section>

        <section className="secao-documento quebra-pagina">
          <h2>3. EVIDÊNCIAS DAS ATIVIDADES REALIZADAS</h2>

          <p className="texto-informativo">
            Inserir, nesta seção, as fichas de evidência das atividades
            realizadas durante o período de monitoria, organizadas
            cronologicamente.
          </p>

          <div className="area-evidencias-relatorio">
            <span>
              ESPAÇO RESERVADO PARA INSERÇÃO DAS FICHAS DE EVIDÊNCIA
            </span>
          </div>
        </section>

        <section className="secao-documento">
          <h2>4. REFERÊNCIAS</h2>

          <textarea
            className="textarea-grande"
            placeholder="Insira as referências utilizadas durante o desenvolvimento das atividades..."
          />
        </section>

        <section className="secao-documento">
          <h2>5. AUTOAVALIAÇÃO DO(A) DISCENTE MONITOR(A)</h2>

          <textarea
            className="textarea-relatorio"
            placeholder="Realize sua autoavaliação sobre a experiência de monitoria, desenvolvimento acadêmico, aprendizagem e contribuição para os discentes..."
          />
        </section>

        <section className="secao-documento">
          <h2>6. PARECER DO(A) ORIENTADOR(A)</h2>

          <textarea
            className="textarea-relatorio"
            placeholder="Espaço destinado ao parecer do(a) professor(a) orientador(a)..."
          />
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