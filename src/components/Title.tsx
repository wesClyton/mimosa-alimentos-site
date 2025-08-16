import type { IBreadcrumbItem } from '@interfaces/breadcrumb.interface';

interface TitleProps {
  title: string;
  breadcrumbs: IBreadcrumbItem[];
  inVideo?: boolean;
}

export function Title({ title, breadcrumbs, inVideo }: TitleProps) {
  const colorText = inVideo ? 'text-white' : 'text-red-800';

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 md:gap-5">
      <h1 className={`title-page ${colorText}! ${inVideo ? 'pt-10' : 'pt-5'}`}>{title}</h1>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className={`flex w-full flex-row items-center justify-center gap-1 uppercase ${colorText}`}>
          {breadcrumbs.map((item, index) => (
            <span key={index} className="flex flex-row items-center justify-center gap-1">
              <a className={`text-xs hover:underline md:text-sm`} href={item.href}>
                {item.label}
              </a>
              {index < breadcrumbs.length - 1 ? ' > ' : ''}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
}
