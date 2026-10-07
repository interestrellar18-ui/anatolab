"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Monitor = {
  id: string;
  nome: string;
  senha: string;
};

const MONITORES: Monitor[] = [
  {
    id: "jean",
    nome: "Jean Saraiva Lima",
    senha: "JEAN1234",
  },
  {
    id: "emilly",
    nome: "Êmilly Fernandes de Assis e Silva",
    senha: "1808",
  },
];

export default function MonitorPage() {
  const router = useRouter();

  const [monitorSelecionado, setMonitorSelecionado] =
    useState<Monitor | null>(null);

  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  function selecionarMonitor(monitor: Monitor) {
    setMonitorSelecionado(monitor);
    setSenha("");
    setErro("");
  }

  function voltarSelecao() {
    setMonitorSelecionado(null);
    setSenha("");
    setErro("");
  }

  function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!monitorSelecionado) {
      return;
    }

    if (senha === monitorSelecionado.senha) {
      setErro("");
      setEntrando(true);

      // Guarda temporariamente quem fez o login
      // para o painel saber qual monitor está acessando.
      sessionStorage.setItem(
        "anatolab_monitor",
        JSON.stringify({
          id: monitorSelecionado.id,
          nome: monitorSelecionado.nome,
        })
      );

      router.push("/monitor/painel");

      return;
    }

    setErro("Senha incorreta. Verifique os dados e tente novamente.");
  }

  return (
    <main className="min-h-screen bg-[#F2E5C6] text-[#3B010B]">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-[#75162D]/15 px-6 py-5 md:px-12">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-wide text-[#560B18]">
            ANATOLAB
          </h1>

          <p className="text-xs tracking-[0.25em] text-[#75162D]/70">
            ANATOMIA II · LHS
          </p>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-[#75162D] transition hover:text-[#3B010B]"
        >
          Voltar
        </Link>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-5xl items-center justify-center px-6 py-16">

        <div className="w-full max-w-3xl">

          {/* TÍTULO */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#75162D]">
              Área restrita
            </p>

            <h2 className="font-serif text-4xl font-bold text-[#3B010B] md:text-5xl">
              Acesso do monitor.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[#560B18]/70">
              Selecione seu perfil para acessar o ambiente administrativo
              do ANATOLAB.
            </p>
          </div>

          {/* SELEÇÃO DO MONITOR */}
          {!monitorSelecionado ? (
            <div className="rounded-3xl bg-[#560B18] p-6 shadow-xl md:p-10">

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E2D9A0]">
                  Identificação
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold text-[#F2E5C6]">
                  Quem está acessando?
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                {MONITORES.map((monitor) => (
                  <button
                    key={monitor.id}
                    type="button"
                    onClick={() => selecionarMonitor(monitor)}
                    className="group rounded-2xl border border-[#E2D9A0]/20 bg-[#75162D] p-6 text-left transition duration-300 hover:-translate-y-1 hover:bg-[#3B010B]"
                  >
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#E2D9A0]/70">
                      Monitor
                    </p>

                    <h4 className="font-serif text-xl font-bold text-[#F2E5C6]">
                      {monitor.nome}
                    </h4>

                    <p className="mt-5 text-sm text-[#E2D9A0]">
                      Acessar →
                    </p>
                  </button>
                ))}

              </div>
            </div>
          ) : (

            /* LOGIN */
            <div className="mx-auto max-w-xl rounded-3xl bg-[#560B18] p-7 shadow-xl md:p-10">

              <div className="mb-8">

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E2D9A0]">
                  Monitor selecionado
                </p>

                <h3 className="mt-2 font-serif text-2xl font-bold text-[#F2E5C6]">
                  {monitorSelecionado.nome}
                </h3>

              </div>

              <form onSubmit={entrar}>

                <label
                  htmlFor="senha"
                  className="mb-2 block text-sm font-medium text-[#E2D9A0]"
                >
                  Senha de acesso
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setErro("");
                  }}
                  placeholder="Digite sua senha"
                  autoFocus
                  className="w-full rounded-xl border border-[#E2D9A0]/20 bg-[#F2E5C6] px-4 py-4 text-[#3B010B] outline-none transition placeholder:text-[#560B18]/40 focus:border-[#E2D9A0] focus:ring-2 focus:ring-[#E2D9A0]/20"
                />

                {erro && (
                  <p className="mt-3 rounded-xl border border-red-300/20 bg-red-950/30 px-4 py-3 text-sm text-red-200">
                    {erro}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={entrando}
                  className="mt-6 w-full rounded-xl bg-[#E2D9A0] px-5 py-4 font-semibold text-[#560B18] transition hover:bg-[#F2E5C6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {entrando ? "Entrando..." : "Acessar painel"}
                </button>

              </form>

              <button
                type="button"
                onClick={voltarSelecao}
                className="mt-5 w-full text-sm text-[#E2D9A0]/70 transition hover:text-[#F2E5C6]"
              >
                ← Escolher outro monitor
              </button>

            </div>
          )}

        </div>

      </section>
    </main>
  );
}