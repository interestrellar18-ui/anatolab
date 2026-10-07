"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Monitor {
  id: string;
  nome: string;
}

const documentos = [
  {
    titulo: "Plano de Trabalho",
    descricao:
      "Planejamento das atividades, metodologia, cronograma e instrumentos de avaliação da monitoria.",
    rota: "/monitor/painel/plano-de-trabalho",
  },
  {
    titulo: "Frequência",
    descricao:
      "Registro das atividades previstas, desenvolvidas, materiais utilizados e carga horária.",
    rota: "/monitor/painel/frequencia",
  },
  {
    titulo: "Frequência Mensal",
    descricao:
      "Registro mensal das atividades realizadas e da carga horária dedicada.",
    rota: "/monitor/painel/frequencia-mensal",
  },
  {
    titulo: "Registro de Evidências",
    descricao:
      "Criação e organização das fichas de evidência da monitoria, com datas, descrições e fotos.",
    rota: "/monitor/painel/evidencias",
  },
  {
    titulo: "Relatório Final",
    descricao:
      "Documento final com identificação, desenvolvimento, evidências, referências e avaliações.",
    rota: "/monitor/painel/relatorio-final",
  },
];

export default function PainelMonitor() {
  const [monitor, setMonitor] = useState<Monitor | null>(null);

  useEffect(() => {
    const dados = sessionStorage.getItem("anatolab_monitor");

    if (!dados) {
      return;
    }

    try {
      const usuario = JSON.parse(dados);
      setMonitor(usuario);
    } catch {
      sessionStorage.removeItem("anatolab_monitor");
    }
  }, []);

  function sair() {
    sessionStorage.removeItem("anatolab_monitor");
    window.location.href = "/monitor";
  }

  return (
    <main className="min-h-screen bg-[#F2E5C6] text-[#3B010B]">

      {/* CABEÇALHO */}

      <header className="border-b border-[#75162D] bg-[#560B18] text-[#F2E5C6]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#E2D9A0]">
              ANATOLAB
            </p>

            <h1 className="mt-1 text-2xl font-semibold">
              Painel do Monitor
            </h1>
          </div>

          <div className="flex items-center gap-6">

            <div className="text-right">
              <p className="text-xs text-[#E2D9A0]">
                Acesso autorizado
              </p>

              <p className="font-medium">
                {monitor?.nome || "Monitor"}
              </p>
            </div>

            <button
              onClick={sair}
              className="rounded-lg border border-[#E2D9A0] px-4 py-2 text-sm font-medium transition hover:bg-[#E2D9A0] hover:text-[#560B18]"
            >
              Sair
            </button>

          </div>

        </div>
      </header>

      {/* CONTEÚDO */}

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.25em] text-[#75162D]">
            Área administrativa
          </p>

          <h2 className="mt-2 text-4xl font-semibold">
            Documentos da Monitoria
          </h2>

          <p className="mt-3 max-w-2xl text-[#560B18]/70">
            Acesse, preencha e organize os documentos referentes à
            monitoria acadêmica.
          </p>

        </div>

        {/* DOCUMENTOS */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {documentos.map((documento, index) => (

            <Link
              key={documento.rota}
              href={documento.rota}
              className="group block"
            >

              <article className="flex h-full min-h-[270px] flex-col justify-between rounded-2xl border border-[#E2D9A0] bg-[#F8F1DF] p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#75162D] hover:shadow-xl">

                <div>

                  <div className="mb-6 flex items-center justify-between">

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#75162D] text-sm font-semibold text-[#F2E5C6]">
                      0{index + 1}
                    </span>

                    <span className="text-xs uppercase tracking-[0.2em] text-[#75162D]">
                      Documento
                    </span>

                  </div>

                  <h3 className="text-2xl font-semibold">
                    {documento.titulo}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#560B18]/70">
                    {documento.descricao}
                  </p>

                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#E2D9A0] pt-5">

                  <span className="text-sm font-semibold text-[#75162D]">
                    Acessar
                  </span>

                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </article>

            </Link>

          ))}

        </div>

        {/* BLOCO INFORMATIVO */}

        <section className="mt-10 rounded-2xl bg-[#3B010B] p-8 text-[#F2E5C6]">

          <p className="text-xs uppercase tracking-[0.3em] text-[#E2D9A0]">
            ANATOLAB · Monitoria
          </p>

          <h3 className="mt-3 text-2xl font-semibold">
            Central de documentação
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#F2E5C6]/75">
            Os documentos podem ser preenchidos dentro do sistema e,
            posteriormente, impressos ou salvos em PDF pelo navegador.
          </p>

        </section>

      </div>

    </main>
  );
}