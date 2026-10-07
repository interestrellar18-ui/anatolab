import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2E5C6] text-[#3B010B]">
      <div className="relative min-h-screen overflow-hidden">

        {/* Elementos decorativos de fundo */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#E2D9A0]/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#75162D]/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-7 md:px-10">

          {/* Cabeçalho */}
          <header className="flex items-center justify-between border-b border-[#560B18]/20 pb-5">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center border border-[#75162D] bg-[#75162D] font-serif text-xl font-semibold text-[#F2E5C6]">
                A
              </div>

              <div>
                <p className="font-serif text-xl font-semibold tracking-[0.16em] text-[#560B18]">
                  ANATOLAB
                </p>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[#75162D]">
                  Anatomia II · LHS
                </p>
              </div>

            </div>

            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#75162D]">
                Laboratório de
              </p>

              <p className="mt-1 font-serif text-sm italic text-[#560B18]">
                Habilidades Simuladas
              </p>
            </div>

          </header>

          {/* Conteúdo principal */}
          <section className="flex flex-1 items-center py-14 md:py-20">

            <div className="grid w-full gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

              {/* Apresentação */}
              <div>

                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#75162D]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#75162D]">
                    Sistema de treinamento prático
                  </p>
                </div>

                <h1 className="font-serif text-6xl font-medium leading-[0.9] tracking-tight text-[#3B010B] md:text-8xl">
                  MONITORIA
                  <br />
                  <span className="italic text-[#75162D]">
                    De Anatomia
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-base leading-8 text-[#560B18]/70 md:text-lg">
                  Um espaço de treinamento prático para Anatomia II,
                  desenvolvido para transformar conhecimento anatômico
                  em execução.
                </p>

                {/* Pequenas informações */}
                <div className="mt-10 flex flex-wrap gap-3">

                  <div className="border border-[#560B18]/20 bg-[#F2E5C6] px-5 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#75162D]">
                      Disciplina
                    </p>

                    <p className="mt-1 font-serif text-sm text-[#3B010B]">
                      Anatomia II
                    </p>
                  </div>

                  <div className="border border-[#560B18]/20 bg-[#F2E5C6] px-5 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#75162D]">
                      Ambiente
                    </p>

                    <p className="mt-1 font-serif text-sm text-[#3B010B]">
                      LHS
                    </p>
                  </div>

                  <div className="border border-[#560B18]/20 bg-[#F2E5C6] px-5 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#75162D]">
                      Modo
                    </p>

                    <p className="mt-1 font-serif text-sm text-[#3B010B]">
                      Prático
                    </p>
                  </div>

                </div>

              </div>

              {/* Menu principal */}
              <div className="relative">

                {/* Moldura externa */}
                <div className="border border-[#75162D]/40 p-2">

                  <div className="bg-[#560B18] p-7 md:p-9">

                    {/* Título */}
                    <div className="mb-8 flex items-end justify-between border-b border-[#E2D9A0]/25 pb-5">

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E2D9A0]">
                          Menu principal
                        </p>

                        <h2 className="mt-2 font-serif text-3xl text-[#F2E5C6]">
                          Escolha seu acesso
                        </h2>
                      </div>

                      <span className="font-mono text-[10px] text-[#E2D9A0]/60">
                        01
                      </span>

                    </div>

                    {/* Opções */}
                    <div className="space-y-4">

                      {/* Aluno */}
                      <Link
                        href="/aluno"
                        className="group block border border-[#E2D9A0]/30 bg-[#F2E5C6] p-5 transition-all duration-300 hover:border-[#E2D9A0] hover:bg-[#E2D9A0]"
                      >

                        <div className="flex items-center gap-5">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#75162D]/30 bg-[#75162D] font-mono text-sm text-[#F2E5C6]">
                            01
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#75162D]">
                              Acesso
                            </p>

                            <h3 className="mt-1 font-serif text-xl text-[#3B010B]">
                              Área do Aluno
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-[#560B18]/60">
                              Acesse Conteúdos.
                            </p>

                          </div>

                          <span className="font-serif text-xl text-[#75162D] transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>

                        </div>

                      </Link>

                      {/* Monitor */}
                      <Link
                        href="/monitor"
                        className="group block border border-[#E2D9A0]/30 bg-[#75162D] p-5 transition-all duration-300 hover:border-[#E2D9A0] hover:bg-[#8A2038]"
                      >

                        <div className="flex items-center gap-5">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#E2D9A0]/40 bg-[#3B010B] font-mono text-sm text-[#E2D9A0]">
                            02
                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E2D9A0]">
                              Acesso restrito
                            </p>

                            <h3 className="mt-1 font-serif text-xl text-[#F2E5C6]">
                              Área do Monitor
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-[#F2E5C6]/65">
                              Gerencie monitoria.
                            </p>

                          </div>

                          <span className="font-serif text-xl text-[#E2D9A0] transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>

                        </div>

                      </Link>

                    </div>

                    {/* Rodapé do menu */}
                    <div className="mt-8 flex items-center justify-between border-t border-[#E2D9A0]/20 pt-5">

                      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#F2E5C6]/40">
                        Sistema interno · LHS
                      </p>

                      <div className="h-1.5 w-1.5 rounded-full bg-[#E2D9A0]" />

                    </div>

                  </div>

                </div>

                {/* Detalhes da moldura */}
                <div className="absolute -right-2 -top-2 h-6 w-6 border-r border-t border-[#75162D]" />

                <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b border-l border-[#75162D]" />

              </div>

            </div>

          </section>

          {/* Rodapé */}
          <footer className="flex flex-col justify-between gap-3 border-t border-[#560B18]/20 pt-5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#560B18]/50 md:flex-row">

            <span>
              ANATOLAB · Anatomia II
            </span>

            <span>
              Laboratório de Habilidades Simuladas
            </span>

            <span>
              Uso interno
            </span>

          </footer>

        </div>
      </div>
    </main>
  );
}