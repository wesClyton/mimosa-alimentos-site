import Cleave from 'cleave.js/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { APP } from '@utils/app.contants';
import { MENU_ITEMS } from '@utils/menu.contants';

// Zod schema para validação
const formSchema = z.object({
  razaoSocial: z.string().min(1, 'Razão social é obrigatória'),
  nomeFantasia: z.string().min(1, 'Nome fantasia é obrigatório'),
  cnpj: z
    .string()
    .min(18, 'CNPJ inválido')
    .refine((value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length === 14;
    }, 'CNPJ inválido'),
  nomeResponsavel: z.string().min(1, 'Nome do responsável é obrigatório'),
  whatsapp: z
    .string()
    .min(14, 'WhatsApp inválido')
    .refine((value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10;
    }, 'WhatsApp inválido'),
  cep: z
    .string()
    .min(9, 'CEP inválido')
    .refine((value) => {
      const digits = value.replace(/\D/g, '');
      return digits.length === 8;
    }, 'CEP inválido'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  termos: z.literal(true, {
    errorMap: () => ({ message: 'Você precisa aceitar os termos para continuar' }),
  }),
  comunicacoes: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  nome: string;
}

export function SejaUmClienteForm() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      nomeResponsavel: '',
      whatsapp: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      estado: '',
      cidade: '',
      termos: false as any,
      comunicacoes: false,
    },
    mode: 'onBlur',
  });

  // Valores observados
  const cep = watch('cep');
  const estado = watch('estado');

  // Carregar estados brasileiros
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        if (response.ok) {
          const data = await response.json();
          setEstados(data);
        }
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      }
    };

    fetchEstados();
  }, []);

  // Carregar cidades quando o estado mudar
  useEffect(() => {
    if (!estado) return;

    const fetchCidades = async () => {
      setIsLoadingCidades(true);
      setCidades([]);
      setValue('cidade', ''); // Limpa a cidade quando o estado muda

      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios?orderBy=nome`,
        );
        if (response.ok) {
          const data = await response.json();
          setCidades(data);
        }
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      } finally {
        setIsLoadingCidades(false);
      }
    };

    fetchCidades();
  }, [estado, setValue]);

  // Buscar endereço pelo CEP
  useEffect(() => {
    if (cep && cep.replace(/\D/g, '').length === 8) {
      const fetchCep = async () => {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
          if (response.ok) {
            const data = await response.json();

            if (!data.erro) {
              setValue('endereco', data.logradouro || '');
              setValue('bairro', data.bairro || '');

              // Se encontrou um estado, atualizar estado e posteriormente as cidades
              if (data.uf) {
                setValue('estado', data.uf);

                // Aguardar o carregamento das cidades
                setTimeout(() => {
                  setValue('cidade', data.localidade || '');
                  trigger(['endereco', 'bairro', 'estado', 'cidade']);
                }, 800); // Aumentado para dar mais tempo para o carregamento das cidades
              } else {
                trigger(['endereco', 'bairro']);
              }
            }
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error);
        }
      };

      fetchCep();
    }
  }, [cep, setValue, trigger]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Preparar dados para envio
      const payload = {
        message: {
          'Razão Social': data.razaoSocial,
          'Nome Fantasia': data.nomeFantasia,
          CNPJ: data.cnpj,
          'Nome do Responsável': data.nomeResponsavel,
          WhatsApp: data.whatsapp,
          CEP: data.cep,
          Endereço: data.endereco,
          Número: data.numero,
          Complemento: data.complemento || 'Não informado',
          Bairro: data.bairro,
          Estado: data.estado,
          Cidade: data.cidade,
          'Aceita Comunicações': data.comunicacoes ? 'Sim' : 'Não',
        },
      };

      const response = await fetch(`${APP.BASE_URL}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Limpar formulário
        reset();

        // Mostrar mensagem de sucesso
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Entraremos em contato em breve.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b91c1c',
        });
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);

      Swal.fire({
        title: 'Ops! Algo deu errado.',
        text: 'Não foi possível enviar seu cadastro. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b91c1c',
      });
    }
  };

  return (
    <div className="md:text-md w-full text-sm">
      <h4 className="mb-2 text-lg font-semibold text-red-800 lg:text-2xl">Dados da empresa</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-1 md:col-span-2">
          <Controller
            name="razaoSocial"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.razaoSocial ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Razão social"
              />
            )}
          />
          {errors.razaoSocial && <p className="mt-1 text-xs text-red-500">{errors.razaoSocial.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Controller
            name="nomeFantasia"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.nomeFantasia ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Nome fantasia"
              />
            )}
          />
          {errors.nomeFantasia && <p className="mt-1 text-xs text-red-500">{errors.nomeFantasia.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-1">
          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <Cleave
                {...field}
                className={`input ${errors.cnpj ? 'border-red-500' : ''}`}
                placeholder="CNPJ"
                options={{
                  delimiters: ['.', '.', '/', '-'],
                  blocks: [2, 3, 3, 4, 2],
                  numericOnly: true,
                }}
              />
            )}
          />
          {errors.cnpj && <p className="mt-1 text-xs text-red-500">{errors.cnpj.message}</p>}
        </div>
      </div>

      <h4 className="mt-5 mb-2 text-lg font-semibold text-red-800 lg:mt-10 lg:text-2xl">Dados do responsável</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1">
          <Controller
            name="nomeResponsavel"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.nomeResponsavel ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Nome completo do responsável"
              />
            )}
          />
          {errors.nomeResponsavel && <p className="mt-1 text-xs text-red-500">{errors.nomeResponsavel.message}</p>}
        </div>

        <div className="col-span-1">
          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <Cleave
                {...field}
                className={`input ${errors.whatsapp ? 'border-red-500' : ''}`}
                placeholder="WhatsApp"
                options={{
                  delimiters: ['(', ') ', '-'],
                  blocks: [0, 2, 5, 4],
                  numericOnly: true,
                }}
              />
            )}
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp.message}</p>}
        </div>
      </div>

      <h4 className="mt-5 mb-2 text-lg font-semibold text-red-800 lg:mt-10 lg:text-2xl">Endereço da empresa</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="col-span-1 md:col-span-2">
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <Cleave
                {...field}
                className={`input ${errors.cep ? 'border-red-500' : ''}`}
                placeholder="CEP"
                options={{
                  delimiters: ['-'],
                  blocks: [5, 3],
                  numericOnly: true,
                }}
              />
            )}
          />
          {errors.cep && <p className="mt-1 text-xs text-red-500">{errors.cep.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-3 md:col-start-1">
          <Controller
            name="endereco"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.endereco ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Endereço"
              />
            )}
          />
          {errors.endereco && <p className="mt-1 text-xs text-red-500">{errors.endereco.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-1">
          <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.numero ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Número"
              />
            )}
          />
          {errors.numero && <p className="mt-1 text-xs text-red-500">{errors.numero.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Controller
            name="complemento"
            control={control}
            render={({ field }) => <input {...field} className="input" type="text" placeholder="Complemento" />}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Controller
            name="bairro"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`input ${errors.bairro ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Bairro"
              />
            )}
          />
          {errors.bairro && <p className="mt-1 text-xs text-red-500">{errors.bairro.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <select {...field} className={`input ${errors.estado ? 'border-red-500' : ''}`}>
                <option value="" disabled>
                  Estado
                </option>
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.estado && <p className="mt-1 text-xs text-red-500">{errors.estado.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`input ${errors.cidade ? 'border-red-500' : ''}`}
                disabled={!estado || isLoadingCidades}
              >
                <option value="" disabled>
                  {isLoadingCidades ? 'Carregando cidades...' : 'Cidade'}
                </option>
                {cidades.map((cidade) => (
                  <option key={cidade.nome} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.cidade && <p className="mt-1 text-xs text-red-500">{errors.cidade.message}</p>}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-start gap-2">
        <Controller
          name="termos"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <input
              type="checkbox"
              id="termos"
              ref={ref}
              checked={value}
              onChange={onChange}
              className={`translate-y-0.75 xl:translate-y-1.5 ${errors.termos ? 'border-red-500' : ''}`}
            />
          )}
        />
        <label htmlFor="termos" className="paragraph">
          Confirmo a validade das informações e confirmo que li e estou de acordo com os
          <a href={MENU_ITEMS.termoDeUso.href} className="mx-1 font-bold">
            {MENU_ITEMS.termoDeUso.label}
          </a>
          e com as
          <a href={MENU_ITEMS.politica.href} className="mx-1 font-bold">
            {MENU_ITEMS.politica.label}
          </a>
          .
        </label>
      </div>
      {errors.termos && <p className="mt-1 text-xs text-red-500">{errors.termos.message}</p>}

      <div className="mt-5 flex items-start justify-start gap-2">
        <Controller
          name="comunicacoes"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <input
              type="checkbox"
              id="comunicacoes"
              ref={ref}
              checked={value}
              onChange={onChange}
              className="translate-y-0.75 xl:translate-y-1.5"
            />
          )}
        />
        <label htmlFor="comunicacoes" className="paragraph">
          Aceito receber comunicações via e-mail, SMS e telefone.
        </label>
      </div>

      <div className="mt-5">
        <button
          className="btn --red w-full cursor-pointer"
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
