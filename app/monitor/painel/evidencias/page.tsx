"use client";

import { useEffect, useState } from "react";

interface Evidencia {
  id: number;
  data: string;
  descricao: string;
}

export default function EvidenciasPage() {
  const [monitor, setMonitor] = useState("");

  const [evidencias, setEvidencias] = useState<Evidencia[]>([
    {
      id: 1,
      data: "",
      descricao: "",
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

  function adicionarEvidencia() {
    setEvidencias((atual) => [
      ...atual,
      {
        id: Date.now(),
        data: "",
        descricao: "",
      },
    ]);
  }

  function removerEvidencia(id: number) {
    if (evidencias.length === 1) return;

    setEvidencias((atual) =>
      atual.filter((evidencia) => evidencia.id !== id)
    );
  }

  function atualizarEvidencia(
    id: number,
    campo: keyof Evidencia,
    valor: string
  ) {
    setEvidencias((atual) =>
      atual.map((evidencia) =>
        evidencia.id === id
          ? { ...evidencia, [campo]: valor }
          : evidencia
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
            <span>Fichas de Evidência da Monitoria</span>
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

            <h1>Fichas de Evidência da Monitoria</h1>
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
            FICHAS DE EVIDÊNCIA DA MONITORIA
          </h2>

          <p className="subtitulo-folha">
            Registro das evidências das atividades realizadas
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
                <label>Período</label>
                <input />
              </div>

              <div className="campo-largo">
                <label>Mês</label>
                <input />
              </div>
            </div>

            <div className="campo-largo">
              <label>Período de vigência da monitoria</label>
              <input />
            </div>
          </section>

          <section className="documento-secao">
            <div className="secao-titulo-linha">
              <h3>EVIDÊNCIAS</h3>

              <span>
                {evidencias.length}{" "}
                {evidencias.length === 1
                  ? "evidência"
                  : "evidências"}
              </span>
            </div>

            {evidencias.map((evidencia, index) => (
              <article
                key={evidencia.id}
                className="bloco-evidencia"
              >
                <div className="secao-titulo-linha">
                  <strong>
                    EVIDÊNCIA{" "}
                    {String(index + 1).padStart(2, "0")}
                  </strong>

                  <button
                    className="botao-excluir no-print"
                    onClick={() =>
                      removerEvidencia(evidencia.id)
                    }
                  >
                    ×
                  </button>
                </div>

                <div className="campo-largo">
                  <label>Data</label>

                  <input
                    type="date"
                    value={evidencia.data}
                    onChange={(e) =>
                      atualizarEvidencia(
                        evidencia.id,
                        "data",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="campo-largo">
                  <label>Descrição</label>

                  <textarea
                    className="campo-texto-grande"
                    value={evidencia.descricao}
                    onChange={(e) =>
                      atualizarEvidencia(
                        evidencia.id,
                        "descricao",
                        e.target.value
                      )
                    }
                    placeholder="Descreva a atividade realizada..."
                  />
                </div>

                <div className="foto-evidencia">
                  <span>
                    ESPAÇO PARA FOTO / EVIDÊNCIA
                  </span>
                </div>
              </article>
            ))}

            <button
              className="botao-adicionar no-print"
              onClick={adicionarEvidencia}
            >
              <span>+</span>
              Adicionar evidência
            </button>
          </section>

          <section className="assinaturas-finais">
            <p>
              Quixadá, _____ de __________________________
              de ______.
            </p>

            <div className="assinaturas-grid">
              <div>
                <div className="linha-assinatura" />

                <strong>Aluna Monitora</strong>

                <span>Assinatura</span>
              </div>

              <div>
                <div className="linha-assinatura" />

                <strong>Professor(a) Orientador(a)</strong>

                <span>Assinatura</span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}