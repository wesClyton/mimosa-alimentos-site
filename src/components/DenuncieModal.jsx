import { zodResolver } from '@hookform/resolvers/zod';
import Cleave from 'cleave.js/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { z } from 'zod';

// Crie uma instância do SweetAlert com suporte a React
const ReactSwal = withReactContent(Swal);

// Schema de validação com Zod
const schema = z.object({
  nome: z.string().min(3, 'Informe seu nome completo'),
  telefone: z
    .string()
    .trim()
    .refine((v) => v.length === 14 || v.length === 15, {
      message: 'Telefone inválido',
    }),
  descricao: z.string().min(10, 'Descreva melhor a denúncia'),
});

// Tipo inferido do schema
// type FormData = z.infer<typeof schema>;

// Componente do formulário
function DenunciaForm({ onSuccess, onError }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await fetch('/api/denuncia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        reset();
        onSuccess();
      } else {
        throw new Error(`Erro ${resp.status}: ${(await resp.text()) || 'Falha no servidor'}`);
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
      <div>
        <input
          {...register('nome')}
          placeholder="Nome completo"
          className={`w-full rounded border px-3 py-2 ${errors.nome ? 'border-red-800 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.nome && <span className="text-xs text-red-800">{errors.nome.message}</span>}
      </div>

      <div>
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <Cleave
              {...field}
              options={{
                delimiters: ['(', ') ', '-'], // Delimitadores corretos
                blocks: [0, 2, 5, 4], // Blocos ajustados
                numericOnly: true,
              }}
              className={`w-full rounded border px-3 py-2 ${
                errors.telefone ? 'border-red-800 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="(99) 99999-9999"
            />
          )}
        />
        {errors.telefone && <span className="text-xs text-red-800">{errors.telefone.message}</span>}
      </div>

      <div>
        <textarea
          {...register('descricao')}
          placeholder="Descreva sua denúncia"
          className={`w-full rounded border px-3 py-2 ${
            errors.descricao ? 'border-red-800 bg-red-50' : 'border-gray-300'
          }`}
          rows={4}
        />
        {errors.descricao && <span className="text-xs text-red-800">{errors.descricao.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-red-800 px-4 py-2 font-bold text-white transition duration-150 hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Enviando...' : 'Enviar denúncia'}
      </button>
    </form>
  );
}

// Componente principal
export default function DenuncieAqui() {
  // Função para mostrar o formulário em um modal
  const openFormModal = () => {
    ReactSwal.fire({
      title: 'Denuncie aqui',
      html: <DenunciaForm onSuccess={handleSuccess} onError={handleError} />,
      showConfirmButton: false,
      showCloseButton: true,
      width: 600,
    });
  };

  // Funções de sucesso e erro
  const handleSuccess = () => {
    ReactSwal.close();
    ReactSwal.fire({
      icon: 'success',
      title: 'Enviado com sucesso!',
      confirmButtonColor: '#b91c1c',
    });
  };

  const handleError = (error) => {
    ReactSwal.close();
    ReactSwal.fire({
      icon: 'error',
      title: 'Erro ao enviar',
      text: error instanceof Error ? error.message : 'Tente novamente mais tarde.',
      confirmButtonColor: '#b91c1c',
    });
  };

  return (
    <button
      type="button"
      className="btn --red my-2 mb-0 flex cursor-pointer items-center justify-center"
      onClick={openFormModal}
      aria-label="Denuncie aqui"
    >
      Denuncie aqui
    </button>
  );
}
