import { AnchorHTMLAttributes, MouseEventHandler } from 'react';
import { useNavigate, useChildRoutes } from './hooks';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to:
    | string
    | {
        _get(): string;
      };
};

export function Link(props: Props) {
  const { children, onClick, to, ...rest } = props;

  const url = typeof to === 'string' ? to : to._get();

  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigate(url);
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <a href={url} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function ChildRoutes() {
  const childRoutes = useChildRoutes();
  return <>{childRoutes}</>;
}
