
const Title = ({ title }: { title: string }) => {
    return (
        <div>
             <h1 className="text-3xl font-bold py-10 mb-4 text-center">{title}</h1>
        </div>
    );
};

export default Title;