import { useEffect, useState } from "react"
import { IStateGetResponse } from "../../interface/IStateGetResponse.interface"
import { GetService } from "../../services/api.service"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { cn } from "../../lib/utils"
import { ICityGetResponse } from "../../interface/ICityGetResponse.interface"

interface IInputStateProps {
  form: any
  defaultValues?: {
    id: number
    name: string
    state: {
      id: number
      name: string
      uf: string
    }
    stateid: number
  }
}

export function InputGroupCityState({ form, defaultValues }: IInputStateProps) {
  const [states, setStates] = useState<Array<IStateGetResponse>>([])
  const [cities, setCities] = useState<Array<ICityGetResponse>>([])

  const getStates = async () => {
    GetService("state", { perPage: 999 }).then((data) => setStates(data.data))
  }

  const getCities = async (stateid: number) => {
    GetService("city", { perPage: 999, stateid }).then((data) => setCities(data.data))
  }

  useEffect(() => {
    getStates()
    defaultValues?.stateid && getCities(defaultValues?.stateid)
  }, [defaultValues])

  return (
    <>
      <div className="md:col-span-6">
        <FormField
          control={form.control}
          name="stateid"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Estado</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground", "w-full")}
                      disabled={!states.length}
                    >
                      {field.value ? states.find((state) => state.id === field.value)?.name : "Selecione o estado"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar estado..." />
                    <CommandList>
                      <CommandEmpty>Nenhum estado selecionado.</CommandEmpty>
                      <CommandGroup>
                        {states.map((state) => (
                          <CommandItem
                            value={state.name}
                            key={state.id}
                            onSelect={() => {
                              form.setValue("stateid", state.id)
                              getCities(state.id)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", state.id === field.value ? "opacity-100" : "opacity-0")}
                            />
                            {state.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="md:col-span-6">
        <FormField
          control={form.control}
          name="cityid"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cidade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground", "w-full")}
                      disabled={!cities.length}
                    >
                      {field.value
                        ? cities.find((city) => city.id === field.value)?.name || !field.value
                        : "Selecione a cidade"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquisar cidade..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma cidade selecionada.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            value={city.name}
                            key={city.id}
                            onSelect={() => {
                              form.setValue("cityid", city.id)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", city.id === field.value ? "opacity-100" : "opacity-0")}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
