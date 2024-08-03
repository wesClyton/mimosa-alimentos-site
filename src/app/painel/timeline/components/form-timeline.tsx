"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../shared/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shared/components/ui/form"
import { Input } from "../../shared/components/ui/input"

import { ITimelineFormProps } from "../interface/ITimelineFormProps"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { ITimelineForm } from "../interface/ITimelineForm"
import { Switch } from "../../shared/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { getImageData } from "../../shared/utils/utils"
import { BsCardImage } from "react-icons/bs"

export const TimelineForm: FunctionComponent<ITimelineFormProps> = (props: ITimelineFormProps) => {
  const [defaultValues, setDefaultValues] = useState<ITimelineForm>({
    title: "",
    description: "",
    date: "",
    active: true,
    image: "",
  })

  const FormSchema = z.object({
    title: z.string().min(1, {
      message: "Campo requerido",
    }),
    description: z.string().min(1, {
      message: "Campo requerido",
    }),
    date: z.string().min(1, {
      message: "Campo requerido",
    }),
    image: z.any().optional(),
    active: z.boolean(),
  })

  const [preview, setPreview] = useState("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  useEffect(() => {
    if (props.defaultValues) {
      if (typeof props.defaultValues.image === "string") {
        setPreview(`${process.env.NEXT_PUBLIC_S3_BUCKET}/${props.defaultValues.image}`)
      }

      setDefaultValues({
        title: props.defaultValues?.title || "",
        description: props.defaultValues?.description || "",
        date: new Date(props.defaultValues?.date).toISOString().slice(0, 10) || "",
        active: props.defaultValues?.active || false,
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Titulo" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Descrição" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Data" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-12">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <div className="flex items-center border-dashed border rounded">
                        <Avatar className="w-24 h-24 flex items-center justify-center border-r border border-dashed">
                          <AvatarImage src={preview} className="object-cover w-full h-full" />
                          <AvatarFallback>
                            <BsCardImage className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>

                        <Input
                          type="file"
                          className="border-0"
                          placeholder="Imagem"
                          {...rest}
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event)
                            setPreview(displayUrl || "")
                            onChange(files[0])
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-12">
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="mx-3">Ativo</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
