import { cn } from '@/utils/cn';
import '@/components/form/styles/form-layout.css';
import { FieldWrapperPropsType } from '@/components/types/common-components.types';

const FieldWrapper = ({ id, children, className = '', flexdirection, error, ...props }: FieldWrapperPropsType) => {
  return (
    <div id={id} {...props} className={cn('fieldWrapper', className)}>
      <div className="w-full flex flex-col">
        {props.label && (
          <label htmlFor={id} className={cn('text-sm mb-2', props.labelClass)}>
            {props.label}
          </label>
        )}
        <div
          className={cn(
            'gap-5 flex',
            flexdirection ? 'md:flex-' + flexdirection : 'md:flex-col',
            props.childrenClass,
            'flex-col'
          )}
        >
          {children}
        </div>
      </div>
      {error && <span className="text-sm text-[hsl(var(--destructive))]">{error}</span>}
    </div>
  );
};

export default FieldWrapper;
