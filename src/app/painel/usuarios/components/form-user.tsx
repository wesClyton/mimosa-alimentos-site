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
import { Switch } from "../../shared/components/ui/switch"

export const UserForm: FunctionComponent<IUserFormProps> = (props: IUserFormProps) => {
  const [defaultValues, setDefaultValues] = useState<IUserForm>({
    active: false,
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    changePassword: true,
  })

  const FormSchema = z
    .object({
      name: z.string().min(1, {
        message: "Campo requerido",
      }),
      email: z.string().email({
        message: "Email inválido",
      }),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
      active: z.boolean(),
      changePassword: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.changePassword) {
        if (!data.password || !data.confirmPassword) {
          ctx.addIssue({
            code: "custom",
            message: "Campo requerido",
            path: ["password"],
          })
        }
        if (data.password !== data.confirmPassword) {
          ctx.addIssue({
            code: "custom",
            message: "Senhas não coincidem",
            path: ["confirmPassword"],
          })
        }
        if (data.password && data.password.length < 8) {
          ctx.addIssue({
            code: "custom",
            message: "Seua senha deve ter no minimo 8 caracteres",
            path: ["password"],
          })
        }
      }
      return true
    })

  // .refine((data) => {
  //   data.password === data.confirmPassword,
  //     {
  //       message: "Senhas não coincidem",
  //       path: ["confirmPassword"],
  //     }
  // })

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
        changePassword: props.defaultValues.id ? false : true,
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
                      <Input placeholder="Nome" {...field} autoComplete="off" />
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
                      <Input type="email" placeholder="Email" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {props.defaultValues?.id && (
              <div className="md:col-span-12">
                <FormField
                  control={form.control}
                  name="changePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mudar senha?</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {form.getValues("changePassword") && (
              <>
                <div className="md:col-span-12">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Senha" {...field} autoComplete="off" />
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
                          <Input type="password" placeholder="Repita a senha" {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
