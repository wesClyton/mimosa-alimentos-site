"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../shared/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shared/components/ui/form"
import { Input } from "../../shared/components/ui/input"

import { IUserFormProps } from "../interface/IUserFormProps"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { IUserForm } from "../interface/IUserForm"

const defaultUserFormValues: IUserForm = {
  active: false,
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
}

export const UserForm: FunctionComponent<IUserFormProps> = (props: IUserFormProps) => {
  const [defaultValues, setDefaultValues] = useState<IUserForm>(defaultUserFormValues)

  const FormSchema = z
    .object({
      name: z.string().min(1, {
        message: "Campo requerido",
      }),
      email: z
        .string()
        .email({
          message: "Email inválido",
        })
        .optional(),
      password: z.string().min(8, {
        message: "Seua senha deve ter no minimo 8 caracteres",
      }),
      confirmPassword: z.string(),
      active: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Senhas não coincidem",
      path: ["confirmPassword"],
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  useEffect(() => {
    if (props.defaultValues) {
      setDefaultValues({
        name: props.defaultValues?.name || "",
        email: props.defaultValues?.email || "",
        active: props.defaultValues?.active || false,
        password: "",
        confirmPassword: "",
      })
    }
  }, [props.defaultValues])

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    props.handleSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repita a senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Repita a senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
