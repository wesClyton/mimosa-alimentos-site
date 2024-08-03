import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog"
import { Button } from "../button"

interface AlertDialogProps {
  triggerElm: React.ReactNode
  title?: string
  description?: string
  onConfirm: () => void
  onCancel?: () => void
}

export function Alert({
  triggerElm,
  title = "Excluir",
  description = "Realmente deseja excluir esse registro? A exclusão não poderá ser desfeita. Deseja continuar?",
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerElm}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel && onCancel()}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
