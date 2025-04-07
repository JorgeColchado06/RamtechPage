import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", // Ajuste de columnas y espaciado
          className
        )}
      >
        {children}
      </div>
    );
  };

  export const BentoGridItem = ({
    title,
    description,
    header,
    icon,
    className, // Permitir clases personalizadas
  }: {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string; // Nueva propiedad para clases personalizadas
  }) => {
    return (
      <div
        className={cn(
          "group/bento shadow-lg flex flex-col items-center justify-center space-y-6 rounded-xl border border-[#3d8eba] p-8 transition duration-200", // Ajustes de diseño
          className // Aplicar clases personalizadas
        )}
      >
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-2 flex flex-col items-center">
          {icon && (
            <div className="w-20 h-20 bg-[rgba(61,142,186,0.25)] rounded-full flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="mt-4 mb-2 text-lg font-bold text-white text-center">
            {title}
          </div>
          <div className="text-sm font-normal text-gray-300 text-center">
            {description}
          </div>
        </div>
      </div>
    );
  };

  export default BentoGrid;