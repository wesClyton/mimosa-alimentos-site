import { zodResolver } from '@hookform/resolvers/zod';
import { APP } from '@utils/app.contants';
import Cleave from 'cleave.js/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { z } from 'zod';

// Crie uma instância do SweetAlert com suporte a React
const ReactSwal = withReactContent(Swal);

// Schema de validação com Zod
const schema = z
  .object({
    type: z.string().min(2, 'Informe o tipo de denúncia'),
    place: z.string().min(2, 'Informe o local da ocorrência'),
    description: z.string().min(10, 'Descreva melhor a denúncia'),
    wantsIdentification: z.boolean().optional(),
    name: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    contact: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    attachments: z.any().optional(),
  })
  .refine(
    (data) => {
      // Se wantsIdentification for true, name e contato são obrigatórios
      if (data.wantsIdentification) {
        return !!data.name && !!data.contact;
      }
      return true;
    },
    {
      message: 'Nome e contato são obrigatórios quando identificação está marcada',
      path: ['wantsIdentification'],
    },
  );

// Componente do formulário
function DenunciaForm({ onSuccess, onError }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      wantsIdentification: false,
      attachments: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const wantsIdentification = watch('wantsIdentification');

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Verificar tamanho dos arquivos (limite de 10MB cada)
      const validFiles = Array.from(e.target.files).filter((file) => file.size <= 10 * 1024 * 1024);

      if (validFiles.length !== e.target.files.length) {
        alert('Alguns arquivos excedem o tamanho máximo de 10MB e foram ignorados.');
      }

      setFiles(validFiles);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Criar FormData para upload de arquivos
      const formData = new FormData();
      formData.append('type', data.type);
      formData.append('place', data.place);
      formData.append('description', data.description);
      formData.append('wantsIdentification', data.wantsIdentification);

      if (data.wantsIdentification) {
        formData.append('name', data.name);
        formData.append('contact', data.contact);
      }

      // Adicionar arquivos
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append('attachments', file);
        });
      }

      // Enviar para o endpoint correto
      const resp = await fetch(`${APP.BASE_URL}/reports`, {
        method: 'POST',
        body: formData,
        // Não definir Content-Type para que o navegador defina o boundary correto para FormData
      });

      if (resp.ok) {
        reset();
        setFiles([]);
        onSuccess();
      } else {
        const errorText = await resp.text();
        throw new Error(`Erro ${resp.status}: ${errorText || 'Falha no servidor'}`);
      }
    } catch (error) {
      console.error('Erro no envio da denúncia:', error);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
      <div>
        <input
          {...register('type')}
          placeholder="Tipo da denúncia"
          className={`w-full rounded border px-3 py-2 ${errors.type ? 'border-red-800 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.type && <span className="text-xs text-red-800">{errors.type.message}</span>}
      </div>

      <div>
        <input
          {...register('place')}
          placeholder="Local da ocorrência"
          className={`w-full rounded border px-3 py-2 ${errors.place ? 'border-red-800 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.place && <span className="text-xs text-red-800">{errors.place.message}</span>}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Descreva sua denúncia detalhadamente"
          className={`w-full rounded border px-3 py-2 ${
            errors.description ? 'border-red-800 bg-red-50' : 'border-gray-300'
          }`}
          rows={4}
        />
        {errors.description && <span className="text-xs text-red-800">{errors.description.message}</span>}
      </div>

      <div className="file-upload-container">
        <label className="mb-2 block text-sm font-medium">Anexos (opcional)</label>
        <div className="flex w-full items-center justify-center">
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-red-800 bg-white">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <img src="/trabalhe-conosco/upload.png" alt="Upload" className="mb-2 h-auto w-10" />
              <p className="mb-2 text-sm text-red-800">
                <span className="font-semibold">Clique para upload</span> ou arraste arquivos
              </p>
              <p className="text-xs text-red-800">PNG, JPG, PDF (MAX. 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">{files.length} arquivo(s) selecionado(s)</p>
            <ul className="mt-1 max-h-24 overflow-auto text-xs text-gray-500">
              {files.map((file, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="truncate">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center">
        <input
          type="checkbox"
          id="wantsIdentification"
          {...register('wantsIdentification')}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-red-800 focus:ring-red-800"
        />
        <label htmlFor="wantsIdentification" className="ms-2 text-sm font-medium">
          Desejo me identificar
        </label>
      </div>

      {wantsIdentification && (
        <>
          <div>
            <input
              {...register('name')}
              placeholder="Nome completo"
              className={`w-full rounded border px-3 py-2 ${errors.name ? 'border-red-800 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.name && <span className="text-xs text-red-800">{errors.name.message}</span>}
          </div>

          <div>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <Cleave
                  {...field}
                  options={{
                    delimiters: ['(', ') ', '-'],
                    blocks: [0, 2, 5, 4],
                    numericOnly: true,
                  }}
                  className={`w-full rounded border px-3 py-2 ${
                    errors.contact ? 'border-red-800 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="(99) 99999-9999"
                />
              )}
            />
            {errors.contact && <span className="text-xs text-red-800">{errors.contact.message}</span>}
          </div>
        </>
      )}

      <button type="submit" disabled={loading} className="btn --red w-full rounded px-4 py-2">
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
      title: 'Denúncia enviada com sucesso!',
      text: 'Agradecemos sua colaboração.',
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
