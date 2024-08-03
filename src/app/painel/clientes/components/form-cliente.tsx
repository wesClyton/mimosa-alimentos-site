"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../shared/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shared/components/ui/form"
import { Input } from "../../shared/components/ui/input"
import InputMask, { Props as InputMaskProps } from "react-input-mask"

import { ICustomerFormProps } from "../interface/ICustomerFormProps.interface"
import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { ICustomerForm } from "../interface/ICustomerForm.interface"
import { Switch } from "../../shared/components/ui/switch"
import { InputGroupCityState } from "../../shared/components/inputs/input-state"

export const CustomerForm: FunctionComponent<ICustomerFormProps> = (props: ICustomerFormProps) => {
  const [defaultValues, setDefaultValues] = useState<ICustomerForm>({
    active: false,
    corporateName: "",
    businessName: "",
    address: "",
    stateid: 0,
    cityid: 0,
    district: "",
    latitude: "",
    longitude: "",
    zipCode: "",
    phone: "",
  })

  const FormSchema = z.object({
    corporateName: z.string().min(1, {
      message: "Campo requerido",
    }),
    businessName: z.string().optional(),
    address: z.string().min(1, {
      message: "Campo requerido",
    }),
    stateid: z.number().optional(),
    cityid: z.number().min(1, {
      message: "Campo requerido",
    }),
    district: z.string().min(1, {
      message: "Campo requerido",
    }),
    latitude: z.string().min(1, {
      message: "Campo requerido",
    }),
    longitude: z.string().min(1, {
      message: "Campo requerido",
    }),
    zipCode: z.string().min(1, {
      message: "Campo requerido",
    }),
    phone: z.string().optional(),
    active: z.boolean(),
  })

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
      setDefaultValues({
        corporateName: props.defaultValues?.corporateName || "",
        businessName: props.defaultValues?.businessName || "",
        address: props.defaultValues?.address || "",
        active: props.defaultValues?.active || false,
        stateid: props.defaultValues?.city.state.id || 0,
        cityid: props.defaultValues?.cityid || 0,
        district: props.defaultValues?.district || "",
        latitude: props.defaultValues?.latitude || "",
        longitude: props.defaultValues?.longitude || "",
        zipCode: props.defaultValues?.zipCode || "",
        phone: props.defaultValues?.phone || "",
      })
    }
  }, [props.defaultValues])

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    delete data.stateid

    const unmaskPhone = data.phone ? data.phone.replace(/[^\d]/g, "") : ""
    const unmaskZipCode = data.zipCode ? data.zipCode.replace(/[^\d]/g, "") : ""

    props.handleSubmit({ ...data, phone: unmaskPhone, zipCode: unmaskZipCode })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="corporateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Razão Social" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome Fantasia" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-subgrid md:col-span-12">
              <div className="md:col-span-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <InputMask mask="(99) 99999-9999" {...field}>
                          <Input placeholder="Telefone" autoComplete="off" />
                        </InputMask>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-subgrid md:col-span-12">
              <div className="md:col-span-6">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <InputMask mask="99999-999" {...field}>
                          <Input placeholder="CEP" />
                        </InputMask>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-subgrid md:col-span-12">
              <InputGroupCityState form={form} defaultValues={props.defaultValues?.city} />
            </div>

            <div className="md:col-span-4">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-8">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço com número" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Latitude" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-6">
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Longitude" {...field} autoComplete="off" />
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
