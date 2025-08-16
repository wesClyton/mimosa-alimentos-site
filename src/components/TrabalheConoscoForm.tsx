import { zodResolver } from '@hookform/resolvers/zod';
import { APP } from '@utils/app.contants';
import 'cleave.js/dist/addons/cleave-phone.br';
import Cleave from 'cleave.js/react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const schema = z.object({
  nome: z.string().min(3, 'Informe seu nome completo'),
  telefone: z
    .string()
    .trim()
    .refine((v) => v.length === 12 || v.length === 13, {
      message: 'Telefone inválido',
    }),
  email: z.string().email('E-mail inválido'),
  curriculo: z
    .instanceof(File)
    .refine((file) => file && file.type === 'application/pdf', 'Envie o currículo em PDF')
    .refine((file) => file && file.size <= MAX_FILE_SIZE, 'Máx 5MB'),
});

type FormData = z.infer<typeof schema>;

export default function TrabalheConoscoForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const curriculoFile = watch('curriculo');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDrop: (files) => {
      if (files && files.length > 0) {
        setValue('curriculo', files[0], { shouldValidate: true });
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('name', data.nome);
    formData.append('phone', data.telefone);
    formData.append('email', data.email);
    formData.append('file', data.curriculo);

    Swal.fire({
      title: 'Enviando...',
      text: 'Aguarde enquanto processamos seus dados.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const resp = await fetch(`${APP.BASE_URL}/curriculum`, {
        method: 'POST',
        body: formData,
      });

      if (resp.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Seus dados foram enviados com sucesso.',
          confirmButtonColor: '#b91c1c',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falha ao enviar os dados. Tente novamente.',
          confirmButtonColor: '#b91c1c',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão!',
        text: 'Não foi possível enviar os dados. Verifique sua internet.',
        confirmButtonColor: '#b91c1c',
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className="mt-5 flex flex-col gap-5"
    >
      <div>
        <input
          {...register('nome')}
          type="text"
          placeholder="Nome completo"
          className={`input ${errors.nome ? 'border-red-800 bg-red-50' : ''}`}
        />
        {errors.nome && <span className="mt-1 block text-xs text-red-800">{errors.nome.message}</span>}
      </div>

      <div>
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <Cleave
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              options={{
                phone: true,
                phoneRegionCode: 'BR', // máscara de telefone BR
                prefix: '',
              }}
              className={`input ${errors.telefone ? 'border-red-800 bg-red-50' : ''}`}
              placeholder="(99) 99999-9999"
            />
          )}
        />
        {errors.telefone && <span className="mt-1 block text-xs text-red-800">{errors.telefone.message}</span>}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="E-mail"
          className={`input ${errors.email ? 'border-red-800 bg-red-50' : ''}`}
        />
        {errors.email && <span className="mt-1 block text-xs text-red-800">{errors.email.message}</span>}
      </div>

      <div>
        <label
          {...getRootProps()}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-red-800 bg-white px-5 py-4 transition hover:bg-gray-100 ${
            isDragActive ? 'border-red-700 bg-yellow-100' : ''
          }`}
        >
          <img src="/trabalhe-conosco/upload.png" alt="Upload" className="h-auto w-6" />
          <span className="text-xs font-bold text-red-800">
            {curriculoFile ? `Arquivo: ${curriculoFile.name}` : 'Arraste ou Clique para adicionar o currículo (PDF)'}
          </span>
          <input {...getInputProps()} className="hidden" />
        </label>
        {errors.curriculo && <span className="mt-1 block text-xs text-red-800">{errors.curriculo.message}</span>}
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-red-800 px-4 py-2 font-bold text-white transition duration-150 hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-red-900"
      >
        Enviar meus dados
      </button>
    </form>
  );
}
