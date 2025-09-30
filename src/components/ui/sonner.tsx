import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useTheme().theme ?? "system"

  return (
    <Sonner
      theme={theme as "system" | "light" | "dark"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:bg-green-100 group-[.toast]:text-green-900 group-[.toast]:border-green-300",
          error: "group-[.toast]:bg-red-100 group-[.toast]:text-red-900 group-[.toast]:border-red-300",
          warning: "group-[.toast]:bg-yellow-100 group-[.toast]:text-yellow-900 group-[.toast]:border-yellow-300",
          info: "group-[.toast]:bg-blue-100 group-[.toast]:text-blue-900 group-[.toast]:border-blue-300",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
