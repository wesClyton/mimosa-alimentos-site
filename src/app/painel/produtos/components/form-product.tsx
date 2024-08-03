"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../shared/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shared/components/ui/form"
import { Input } from "../../shared/components/ui/input"

import { IProductFormProps } from "../interface/IProductFormProps.interface"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { IProductForm } from "../interface/IProductForm.interface"
import { Switch } from "../../shared/components/ui/switch"
import { getImageData } from "../../shared/utils/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { BsCardImage } from "react-icons/bs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../shared/components/ui/select"
import { ProdutcCategory } from "../enum/category-product.enum"

export const ProductForm: FunctionComponent<IProductFormProps> = (props: IProductFormProps) => {
  const [defaultValues, setDefaultValues] = useState<IProductForm>({
    category: "",
    name: "",
    size: "",
    description: "",
    active: true,
    image: "",
  })

  const FormSchema = z.object({
    category: z.string().min(1, {
      message: "Campo requerido",
    }),
    name: z.string().min(1, {
      message: "Campo requerido",
    }),
    size: z.string().min(1, {
      message: "Campo requerido",
    }),
    description: z.string().min(1, {
      message: "Campo requerido",
    }),
    image: z.any().optional(),
    active: z.boolean(),
  })

  const [preview, setPreview] = useState("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    disabled: props.disableForm,
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
        category: props.defaultValues?.category || "",
        description: props.defaultValues?.description || "",
        name: props.defaultValues?.name || "",
        size: props.defaultValues?.size || "",
        active: props.defaultValues?.active || true,
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
            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger {...field}>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ProdutcCategory).map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição do produto" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho</FormLabel>
                    <FormControl>
                      <Input placeholder="1 Kg e 5 Kg" {...field} autoComplete="off" />
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
          </div>
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
