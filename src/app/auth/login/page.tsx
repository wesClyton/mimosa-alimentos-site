import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/painel/shared/components/ui/card"
import { LoginForm } from "../component/form-login"

import "../../painel/painel.css"
import { ThemeProvider } from "@/app/painel/shared/components/theme-provider"

export default function LoginPage() {
  return (
    <ThemeProvider themes={["dark", "custom", "light"]} attribute="class" enableSystem disableTransitionOnChange>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o painel.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}
