interface HeaderProps {
    title: string;
    description?: string | null;
    className?: string;
}

const Heading = ({ title, description, className }: HeaderProps) => {
    const defaultClasses = "space-y-1";
    const combinedClasses = className
        ? `${defaultClasses} ${className}`
        : defaultClasses;

    return (
        <div className={combinedClasses}>
            <h3 className="text-foreground text-xl font-bold capitalize">{title}</h3>
            <div className="text-muted-foreground text-sm">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Heading;
