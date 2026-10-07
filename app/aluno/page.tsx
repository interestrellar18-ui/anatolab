"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./aluno.css";


export default function AlunoPage() {
  const router = useRouter();

  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  function entrar() {
    const codigoDigitado = codigo.trim();

    setErro("");

    if (!codigoDigitado) {
      setErro("Digite o código de acesso.");
      return;
    }

    setEntrando(true);

    /*
      CÓDIGOS DE ACESSO

      1234 → Nervos Cranianos
    */

    if (codigoDigitado === "0710") {
      sessionStorage.setItem(
        "anatolab_acesso_nervos",
        "true"
      );

      router.push("/aluno/nervos-cranianos");

      return;
    }

    setEntrando(false);

    setErro(
      "Código inválido. Verifique o código fornecido pelo monitor."
    );
  }

  return (
    <main className="aluno-acesso-page">
      <div className="aluno-acesso-container">

        {/* MARCA */}
        <header className="aluno-acesso-header">
          <div className="aluno-acesso-marca">
            <span className="aluno-acesso-marca-principal">
              ANATOLAB
            </span>

            <span className="aluno-acesso-marca-subtitulo">
              ANATOMIA II · LHS
            </span>
          </div>
        </header>

        {/* CONTEÚDO */}
        <section className="aluno-acesso-card">

          <div className="aluno-acesso-indicador">
            ACESSO DO ALUNO
          </div>

          <h1>
            Entre no laboratório.
          </h1>

          <p className="aluno-acesso-descricao">
            Digite o código de acesso fornecido
            pelo monitor para iniciar sua atividade.
          </p>

          {/* FORMULÁRIO */}
          <div className="aluno-acesso-form">

            <label htmlFor="codigo">
              Código de acesso
            </label>

            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
                setErro("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  entrar();
                }
              }}
              placeholder="Digite o código"
              autoComplete="off"
              spellCheck={false}
              disabled={entrando}
            />

            {erro && (
              <div className="aluno-acesso-erro">
                <span className="aluno-acesso-erro-icon">
                  !
                </span>

                <span>{erro}</span>
              </div>
            )}

            <button
              type="button"
              onClick={entrar}
              disabled={entrando}
            >
              {entrando
                ? "Abrindo laboratório..."
                : "Entrar no laboratório"}

              {!entrando && (
                <span className="aluno-acesso-seta">
                  →
                </span>
              )}
            </button>
          </div>

          {/* INFORMAÇÃO */}
          <div className="aluno-acesso-info">
            <span className="aluno-acesso-info-titulo">
              CÓDIGO INDIVIDUAL
            </span>

            <p>
              O código é fornecido pelos monitores
              durante a atividade.
            </p>
          </div>

        </section>

        {/* RODAPÉ */}
        <footer className="aluno-acesso-footer">
          <button
            type="button"
            onClick={() => router.push("/")}
          >
            ← Voltar para o início
          </button>

          <span>
            ANATOLAB · Anatomia II
          </span>
        </footer>

      </div>
    </main>
  );
}