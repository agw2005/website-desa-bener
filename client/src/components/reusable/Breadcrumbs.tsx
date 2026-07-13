import { Link } from "react-router";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs.tsx";

const Breadcrumbs = () => {
  const crumbs = useBreadcrumbs();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex gap-2 text-white font-bold">
        {crumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <span>&gt;</span>}
            {index === crumbs.length - 1
              ? <span className="select-none">{crumb.label}</span>
              : (
                <Link
                  to={crumb.path}
                  className="hover:text-blue-900 active:text-blue-800"
                >
                  {crumb.label}
                </Link>
              )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
