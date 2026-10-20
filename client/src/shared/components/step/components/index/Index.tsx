export const Index = ({ indexes }: { indexes: string[] }) => {
    return (
        <div className="flex flex-col gap-2">
            {indexes.map((index) => (
                <div
                    key={index}
                    className="flex items-center gap-2"
                >
                    <span className="text-sm font-semibold">{index}</span>
                </div>
            ))}
        </div>
    );
};
