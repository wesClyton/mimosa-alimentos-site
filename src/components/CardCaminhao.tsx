import { useState } from 'react';

interface CardCaminhaoProps {
  showInput: boolean;
  valueChangesInput?: (value: string) => void;
}

export default function CardCaminhao({ showInput, valueChangesInput }: CardCaminhaoProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (valueChangesInput) {
      valueChangesInput(value);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        <div className="relative rounded-tl-2xl rounded-tr-2xl bg-yellow-300 p-5 md:flex-1/2 md:rounded-tr-none md:rounded-bl-2xl lg:flex lg:flex-col lg:justify-center lg:p-10">
          <h1 className="text-2xl leading-7 font-black text-red-800">Mimosa mais próxima de você!</h1>
          <h2 className="my-3 leading-5 text-gray-700">
            Acesse agora a nossa área de Lojas e Parceiros e descubra onde encontrar nossos produtos pertinho da sua
            casa.
          </h2>

          {!showInput && (
            <a className="btn --red inline-block w-full lg:w-75" href="#">
              Encontre nossos fornecedores
            </a>
          )}

          {showInput && (
            <input
              type="text"
              placeholder="Digite o nome da sua cidade"
              className="mt-3 w-full rounded-md bg-white p-2 text-xs lg:w-75"
              value={inputValue}
              onChange={handleInputChange}
            />
          )}

          <img
            className="absolute right-0 bottom-0 z-5 -mr-14 -mb-1 hidden w-45 lg:block xl:-mb-2 xl:w-70 2xl:-mb-4 2xl:w-100"
            src="/home/coracao.png"
            alt="Mimosa Alimentos"
          />
        </div>
        <div className="rounded-br-2xl rounded-bl-2xl bg-red-800 pt-5 md:flex md:flex-1/2 md:items-end md:rounded-tl-none md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:pt-0 lg:pt-10">
          <img
            className="lg:relative lg:z-10 lg:-ml-10 xl:-ml-12 2xl:-ml-15"
            src="/home/caminhao.png"
            alt="Caminhão Mimosa"
          />
        </div>
      </div>

      {showInput && <p>carregando mapa...</p>}
    </div>
  );
}
