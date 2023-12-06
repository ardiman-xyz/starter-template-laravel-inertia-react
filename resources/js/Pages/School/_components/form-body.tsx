import { Button } from "@/Components/ui/button";
import { useCallback } from "react";

interface FormBodyProps {
    onSubmit: () => void;
    body?: React.ReactElement;
    disabled?: boolean;
    actionLabel: string;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    step: number;
}

const FormBody = ({
      onSubmit,
      body,
      disabled,
      actionLabel,
      secondaryAction,
      secondaryActionLabel,
      step,
  }: FormBodyProps) => {
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    return (
        <div>
            {body}
            <div className="flex items-center justify-center gap-x-3">
                {secondaryAction && secondaryActionLabel && (
                    <Button
                        disabled={disabled}
                        onClick={handleSecondaryAction}
                        className="w-max mt-14"
                        size="lg"
                        variant="outline"
                    >
                        {secondaryActionLabel}
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className="w-max mt-14 px-10"
                    size="lg"
                >
                    {actionLabel}
                </Button>
            </div>
            <div className="mt-5 text-center">
                <p className="text-xs font-semibold text-gray-400">{step + 1} dari 3</p>
            </div>
        </div>
    );
};

export default FormBody;
